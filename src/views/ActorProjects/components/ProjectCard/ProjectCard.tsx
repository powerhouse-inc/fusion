import { styled, useMediaQuery } from '@mui/material';
import { isProject, type Project, type SupportedProjects } from '@ses/core/models/interfaces/projects';
import Image from 'next/image';
import React, { useMemo } from 'react';
import ProgressWithStatus from '@/components/ProgressWithStatus/ProgressWithStatus';
import type { Deliverable } from '@/core/models/interfaces/deliverables';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';
import type { ProgressStatus } from '@/core/models/interfaces/types';
import BudgetTypeBadge from '../BudgetTypeBadge/BudgetTypeBadge';
import DeliverableCard from '../DeliverableCard/DeliverableCard';
import ProjectParticipants from '../ProjectParticipants/ProjectParticipants';
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

  const deliverables = useMemo(
    () => (isProject(project) ? project.deliverables : project.supportedDeliverables),
    [project]
  );

  const supporters = useMemo(
    () =>
      // the supporters are the owners of the deliverables (they can be duplicated)
      Array.from(
        deliverables
          .filter(
            (deliverable) => deliverable.owner.id !== (isProject(project) ? project.owner : project.projectOwner).id
          )
          .reduce((prev, current) => prev.set(current.owner.id, current.owner), new Map<string, OwnerRef>())
          .values()
      ),
    [deliverables, project]
  );

  // transforming deliverables into rows we can predict the max height needed to the cards
  const deliverablesRows = splitInRows(deliverables, isUpDesktop1280 ? 3 : 2);

  const getDeliverableWithKeyResults = (deliverable: Deliverable) => {
    if (isProject(project)) {
      return deliverable;
    }

    return {
      ...deliverable,
      keyResults:
        project.supportedDeliverables.find((support) => support.id === deliverable.id)?.supportedKeyResults || [],
    };
  };

  return (
    <Card id={project.code}>
      <MainContent>
        <ContainerImageProjectHeader>
          <ImageContainer>
            <Image
              src={project.imgUrl ?? '/assets/img/project_placeholder.png'}
              alt={project.title}
              layout="fill"
              unoptimized
              priority
            />
          </ImageContainer>

          <Row>
            <ProjectHeader>
              <NameContainer>
                <TitleContainer>
                  <ProjectCode>{project.code}</ProjectCode> <ProjectTitle>{project.title}</ProjectTitle>
                </TitleContainer>
                <BudgetTypeBadge budgetType={project.budgetType} />
              </NameContainer>
              <ContainerStatusRoleDescription>
                <Description>{project.abstract}</Description>
                <ContainerStatusRole>
                  <ProgressWithStatus
                    progress={project.progress?.value ?? 0}
                    status={project.status as unknown as ProgressStatus}
                  />

                  <ProjectParticipants project={project} supporters={supporters} isShowName={isUpDesktop1280} />
                </ContainerStatusRole>
              </ContainerStatusRoleDescription>
            </ProjectHeader>
          </Row>
        </ContainerImageProjectHeader>
        <DeliverablesWrapper>
          <DeliverableTitleContainer>
            <DeliverablesTitle>All Deliverables</DeliverablesTitle>
          </DeliverableTitleContainer>

          <DeliverablesContainer>
            {deliverablesRows.map((row) =>
              row.map((deliverable) => (
                <DeliverableCard
                  key={deliverable.id}
                  deliverable={getDeliverableWithKeyResults(deliverable)}
                  viewMode={'detailed'}
                  maxKeyResultsOnRow={
                    isProject(project)
                      ? row.map((d) => d.keyResults.length).reduce((a, b) => Math.max(a, b), 0)
                      : row.map((d) => d.supportedKeyResults.length).reduce((a, b) => Math.max(a, b), 0)
                  }
                />
              ))
            )}
          </DeliverablesContainer>
        </DeliverablesWrapper>
      </MainContent>
    </Card>
  );
};

export default ProjectCard;

const Card = styled('article')(() => ({
  borderRadius: 6,

  scrollMarginTop: 150,
}));

const MainContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const ContainerImageProjectHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 24,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const ProjectHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: 8,
  height: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
}));

const NameContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  alignSelf: 'stretch',

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'space-between',
  },
}));

const TitleContainer = styled('div')(({ theme }) => ({
  gap: 4,
  display: 'flex',
  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
}));

const ProjectCode = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  textTransform: 'uppercase',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const ProjectTitle = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const ContainerStatusRoleDescription = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
});

const Row = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  marginTop: 16,
  padding: 8,
  backgroundColor: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.charcoal[800]}`,
  boxShadow: `${theme.palette.isLight ? theme.fusionShadows.modules : 'none'}`,
  gap: 24,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    flex: 1,
    marginTop: 0,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '8px 16px 16px',
  },
}));

const DeliverablesWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 16,

  [theme.breakpoints.up('desktop_1280')]: {
    flex: 1,
  },
}));

const ImageContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 200,
  display: 'flex',
  borderRadius: 12,
  overflow: 'hidden',
  '& img': {
    objectFit: 'cover',
  },

  [theme.breakpoints.up('tablet_768')]: {
    height: 374,
    minWidth: 340,
    minHeight: 374,
    flex: 1,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 468,
    height: 320,
    minHeight: 320,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 640,
    minWidth: 640,
  },
}));

const Description = styled('p')(({ theme }) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 8,
  lineClamp: 8,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  alignSelf: 'stretch',
  margin: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[800] : theme.palette.colors.gray[600],
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  height: 'fit-content',
}));

const DeliverableTitleContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 16,
}));

const DeliverablesTitle = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '120%',
  },
}));

const DeliverablesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,

    '& > *': {
      width: '100%',
      maxWidth: 'calc(50% - 12px)',
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,

    '& > *': {
      maxWidth: 'calc(33% - 18px)',
    },
  },
}));

const ContainerStatusRole = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));
