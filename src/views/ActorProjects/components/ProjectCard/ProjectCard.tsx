import { styled, useMediaQuery } from '@mui/material';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { siteRoutes } from '@ses/config/routes';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import {
  isProject,
  isSupportedProjects,
  type Project,
  type SupportedProjects,
} from '@ses/core/models/interfaces/projects';
import Image from 'next/image';
import React, { useCallback, useMemo, useState } from 'react';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';
import BudgetTypeBadge from '../BudgetTypeBadge/BudgetTypeBadge';
import DeliverableCard from '../DeliverableCard/DeliverableCard';
import DeliverableViewModeToggle from '../DeliverableViewModeToggle/DeliverableViewModeToggle';
import ProjectOwnerChip from '../ProjectOwnerChip/ProjectOwnerChip';
import ProjectProgress from '../ProjectProgress/ProjectProgress';
import ProjectStatusChip from '../ProjectStatusChip/ProjectStatusChip';
import SupportedTeamsAvatarGroup from '../SupportedTeamsAvatarGroup/SupportedTeamsAvatarGroup';
import ViewAllButton from '../ViewAllButton/ViewAllButton';
import type { Theme } from '@mui/material';

interface ProjectCardProps {
  project: Project | SupportedProjects;
}

export type DeliverableViewMode = 'compacted' | 'detailed';

export function splitInRows<T = unknown>(arr: T[], rowLength: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr?.length; i += rowLength) {
    const row = arr.slice(i, i + rowLength);
    result.push(row);
  }

  return result;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const isUpDesktop1280 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1280'));

  const [deliverableViewMode, setDeliverableViewMode] = useState<DeliverableViewMode>('compacted');
  const handleChangeDeliverableViewMode = useCallback((viewMode: DeliverableViewMode) => {
    setDeliverableViewMode(viewMode);
  }, []);

  const [showAllDeliverables, setShowAllDeliverables] = useState<boolean>(false);

  const showGrayBackground = showAllDeliverables || !isUpDesktop1280;
  const showDeliverablesBelow = !isUpDesktop1280 || showAllDeliverables || deliverableViewMode === 'detailed';

  const allDeliverables = useMemo(
    () => (isProject(project) ? project.deliverables : project.supportedDeliverables),
    [project]
  );

  const supporters = useMemo(
    () =>
      // the supporters are the owners of the deliverables (they can be duplicated)
      Array.from(
        allDeliverables
          .filter(
            (deliverable) => deliverable.owner.id !== (isProject(project) ? project.owner : project.projectOwner).id
          )
          .reduce((prev, current) => prev.set(current.owner.id, current.owner), new Map<string, OwnerRef>())
          .values()
      ),
    [allDeliverables, project]
  );

  const statusSection = (
    <StatusData showDeliverablesBelow={showDeliverablesBelow}>
      <ProjectStatusChip status={project.status} />
      <ProgressContainer>
        <ProjectProgress percentage={project.progress?.value ?? 0} />
      </ProgressContainer>
    </StatusData>
  );

  const deliverables = showAllDeliverables
    ? allDeliverables
    : allDeliverables.slice(0, deliverableViewMode === 'detailed' && isUpDesktop1280 ? 6 : 4);
  // transforming deliverables into rows we can predict the max height needed to the cards
  const deliverablesRows = splitInRows(deliverables, isUpDesktop1280 ? 3 : 2);

  return (
    <Card id={project.code}>
      <MainContent>
        <ProjectHeader>
          <NameContainer>
            <TitleContainer>
              <ProjectCode>{project.code}</ProjectCode> <ProjectTitle>{project.title}</ProjectTitle>
            </TitleContainer>
            <BudgetTypeBadge budgetType={project.budgetType} />
          </NameContainer>

          <ParticipantsContainer>
            <ProjectOwnerChip owner={isProject(project) ? project.owner : project.projectOwner} />
            {supporters.length > 0 && <SupportedTeamsAvatarGroup supporters={supporters} />}
          </ParticipantsContainer>
        </ProjectHeader>

        <Row showDeliverablesBelow={showDeliverablesBelow}>
          <LeftColumn showDeliverablesBelow={showDeliverablesBelow}>
            {isUpDesktop1280 && !showDeliverablesBelow && statusSection}
            <ImageContainer isBigger={showDeliverablesBelow}>
              <Image
                src={project.imgUrl ?? '/assets/img/project_placeholder.png'}
                alt={project.title}
                layout="fill"
                unoptimized
              />
            </ImageContainer>
            <DataContainer showDeliverablesBelow={showDeliverablesBelow}>
              {(!isUpDesktop1280 || showDeliverablesBelow) && statusSection}
              <Description>{project.abstract}</Description>
              {isSupportedProjects(project) && (
                <ViewEcosystem
                  href={siteRoutes.ecosystemActorAbout(project.projectOwner.code ?? '')}
                  buttonType={ButtonType.Default}
                  label="View Ecosystem Actor"
                />
              )}
            </DataContainer>
          </LeftColumn>
          <RightColumn>
            <DeliverableTitleContainer>
              <DeliverablesTitle>{showAllDeliverables ? 'All' : 'Highlighted'} Deliverables</DeliverablesTitle>
              <DeliverableViewModeToggle
                deliverableViewMode={deliverableViewMode}
                onChangeDeliverableViewMode={handleChangeDeliverableViewMode}
              />
            </DeliverableTitleContainer>

            <GrayBackground showBackground={showGrayBackground}>
              <DeliverablesContainer showDeliverablesBelow={showDeliverablesBelow}>
                {deliverablesRows.map((row) =>
                  row.map((deliverable) => (
                    <DeliverableCard
                      key={deliverable.id}
                      deliverable={
                        isProject(project)
                          ? deliverable
                          : {
                              ...deliverable,
                              // supported projects doesn't have key results field in the deliverables
                              keyResults:
                                project.supportedKeyResults?.filter(
                                  (keyResult) => keyResult.parentIdRef === deliverable.id
                                ) ?? [],
                            }
                      }
                      viewMode={deliverableViewMode}
                      maxKeyResultsOnRow={
                        // supported projects doesn't have key results in the deliverables
                        isProject(project) ? row.map((d) => d.keyResults.length).reduce((a, b) => Math.max(a, b), 0) : 0
                      }
                    />
                  ))
                )}
              </DeliverablesContainer>
              {(isUpDesktop1280
                ? deliverableViewMode === 'compacted'
                  ? allDeliverables.length > 4
                  : allDeliverables.length > 6
                : allDeliverables.length > 4) && (
                <ViewAllButton viewAll={showAllDeliverables} onClick={() => setShowAllDeliverables((prev) => !prev)}>
                  View {showAllDeliverables ? 'less' : 'all'} Deliverables
                </ViewAllButton>
              )}
            </GrayBackground>
          </RightColumn>
        </Row>
      </MainContent>
    </Card>
  );
};

export default ProjectCard;

const Card = styled('article')(({ theme }) => ({
  background: theme.palette.isLight ? '#fff' : '#10191F',
  borderRadius: 6,
  border: `1px solid ${theme.palette.isLight ? '#e6e6e6' : '#10191F'}`,
  boxShadow: theme.palette.isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : ' 0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  scrollMarginTop: 150,
}));

const MainContent = styled('div')(({ theme }) => ({
  padding: '15px 15px 23px 15px',

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '15px 23px 23px 23px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '15px 31px 31px 31px',
  },
}));

const ProjectHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 7,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
}));

const NameContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  alignSelf: 'stretch',

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'normal',
    alignItems: 'center',
    gap: 8,
  },
}));

const TitleContainer = styled('div')(({ theme }) => ({
  lineHeight: '17px',

  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
}));

const ProjectCode = styled('span')(({ theme }) => ({
  color: '#9FAFB9',
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 'normal',
  textTransform: 'uppercase',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.4,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
  },
}));

const ProjectTitle = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? '#25273D' : '#D2D4EF',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.4,
    lineHeight: 'normal',
    marginLeft: 3,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
  },
}));

const ParticipantsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

const Row = styled('div')<{ showDeliverablesBelow: boolean }>(({ theme, showDeliverablesBelow }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 16,
  gap: 24,

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,

    ...(!showDeliverablesBelow && {
      flexDirection: 'row',
      gap: 32,
    }),
  },

  ...(!showDeliverablesBelow && {
    [theme.breakpoints.up('desktop_1440')]: {
      gap: 64,
    },
  }),
}));

const LeftColumn = styled('div')<{ showDeliverablesBelow: boolean }>(({ theme, showDeliverablesBelow }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 24,
  },

  ...(showDeliverablesBelow
    ? {
        [theme.breakpoints.up('desktop_1440')]: {
          gap: 64,
        },
      }
    : {
        [theme.breakpoints.up('desktop_1280')]: {
          flexDirection: 'column',
          flex: 0.632,
        },

        [theme.breakpoints.up('desktop_1440')]: {
          flex: 0.639,
        },
      }),
}));

const RightColumn = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 16,

  [theme.breakpoints.up('desktop_1280')]: {
    flex: 1,
  },
}));

const ImageContainer = styled('div')<{ isBigger: boolean }>(({ theme, isBigger }) => ({
  position: 'relative',
  width: '100%',
  height: 175,
  borderRadius: 6,
  overflow: 'hidden',

  '& img': {
    objectFit: 'cover',
  },

  [theme.breakpoints.up('tablet_768')]: {
    height: 256,
    minHeight: 256,
    flex: 1,
  },

  ...(isBigger && {
    [theme.breakpoints.up('desktop_1280')]: {
      height: 320,
      minHeight: 320,
    },
  }),

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 578,
  },
}));

const DataContainer = styled('div')<{ showDeliverablesBelow: boolean }>(({ theme, showDeliverablesBelow }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    marginTop: 0,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    justifyContent: showDeliverablesBelow ? 'center' : 'flex-start',
  },
}));

const StatusData = styled('div')<{ showDeliverablesBelow: boolean }>(({ theme, showDeliverablesBelow }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  width: '100%',
  justifyContent: 'space-between',

  ...(showDeliverablesBelow && {
    [theme.breakpoints.up('desktop_1280')]: {
      justifyContent: 'normal',
      gap: 64,
    },
  }),
}));

const ProgressContainer = styled('div')({
  maxWidth: 256,
  width: '100%',
});

const Description = styled('p')(({ theme }) => ({
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': '8',
  lineClamp: '8',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  alignSelf: 'stretch',
  margin: 0,
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  fontSize: 14,
  lineHeight: 'normal',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const DeliverableTitleContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 16,
}));

const DeliverablesTitle = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
  },
}));

const GrayBackground = styled('div')<{ showBackground: boolean }>(({ theme, showBackground }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  background: showBackground
    ? theme.palette.isLight
      ? 'linear-gradient(0deg, #F6F8F9 85.04%, rgba(246, 248, 249, 0.00) 121.04%)'
      : 'none'
    : 'none',
  padding: '8px 16px 24px 16px',
  margin: '-8px -15px -23px -15px',
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 24,
    padding: '8px 23px 23px 23px',
    margin: '-8px -23px -23px -23px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    gap: 24,
    padding: '8px 31px 31px 31px',
    margin: '-8px -31px -31px -31px',
  },
}));

const DeliverablesContainer = styled('div')<{ showDeliverablesBelow: boolean }>(({ theme, showDeliverablesBelow }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    '& > *': {
      width: '100%',
      maxWidth: 'calc(50% - 8px)',
    },
  },

  ...(showDeliverablesBelow && {
    [theme.breakpoints.up('desktop_1024')]: {
      gap: 24,

      '& > *': {
        maxWidth: 'calc(50% - 12px)',
      },
    },

    [theme.breakpoints.up('desktop_1280')]: {
      gap: 16,

      '& > *': {
        maxWidth: 'calc(33% - 7px)',
      },
    },
  }),

  [theme.breakpoints.up('desktop_1440')]: {
    gap: 24,

    '& > *': {
      ...(showDeliverablesBelow
        ? {
            maxWidth: 'calc(33% - 12px)',
          }
        : {
            maxWidth: 'calc(50% - 12px)',
          }),
    },
  },
}));

const ViewEcosystem = styled(LinkButton)(({ theme }) => ({
  borderColor: theme.palette.isLight ? '#D4D9E1' : '#708390',
  borderRadius: '22px',
  fontFamily: 'Inter, sans serif',
  fontStyle: 'normal',
  padding: '7px 23px',

  '& > div': {
    color: theme.palette.isLight ? '#31424E' : '#ADAFD4',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '&:hover': {
    background: theme.palette.isLight ? '#F6F8F9' : '#10191F',
    border: `1px solid ${theme.palette.isLight ? '#ECF1F3' : '#1E2C37'}}`,
  },
}));
