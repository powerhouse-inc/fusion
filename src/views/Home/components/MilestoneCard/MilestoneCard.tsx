import { styled, useMediaQuery } from '@mui/material';

import ExternalLink from '@ses/components/ExternalLink/ExternalLink';
import AvatarPlaceholderIcon from 'public/assets/svg/avatar_placeholder.svg';

import Card from '@/components/Card/Card';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';

import ProgressWithStatus from '@/components/ProgressWithStatus/ProgressWithStatus';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import { siteRoutes } from '@/config/routes';

import type { Milestone } from '@/core/models/interfaces/roadmaps';
import { progressPercentage } from '@/views/RoadmapMilestones/utils';

import type { Theme } from '@mui/material';
import type { FC } from 'react';

interface MilestoneCardProps {
  slug: string;
  milestoneData: Milestone;
}

interface ElementWithTotal {
  total?: number;
}

const MilestoneCard: FC<MilestoneCardProps> = ({ slug, milestoneData }) => {
  // const { statusLabel } = useMilestoneCard(milestoneData.scope?.status);

  const progress = progressPercentage(milestoneData.scope?.progress);

  const coordinators = milestoneData.coordinators?.slice(0, 2);
  const otherCoordinatorsNumber = milestoneData.coordinators?.length - coordinators.length;

  const keyResults = milestoneData.scope?.deliverables
    ?.map((deliverableData) => deliverableData.keyResults)
    ?.flat()
    ?.slice(0, 3);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  return (
    <Container>
      <Header>
        <CodesContainer>
          <SequenceCode>{milestoneData.sequenceCode}</SequenceCode>
          <Code>{milestoneData.code}</Code>
        </CodesContainer>

        <StyledInternalLinkButton
          href={`${siteRoutes.roadmapMilestones(slug)}#${milestoneData.code}`}
          label="Details"
        />
      </Header>
      <TitleContainer className="title-container">
        <Title>{milestoneData.title}</Title>
      </TitleContainer>
      <ProgressContainer>
        <ProgressWithStatus progress={progress} status={milestoneData.scope?.status} />
      </ProgressContainer>

      <CoordinatorsContainer>
        <CoordinatorsTitle>Coordinators</CoordinatorsTitle>
        <Coordinators>
          {coordinators.map((coordinatorData) => (
            <CoordinatorAvatarContainer key={coordinatorData.id} total={milestoneData.coordinators?.length}>
              {coordinatorData.imageUrl === 'N/A' ||
              coordinatorData.imageUrl === null ||
              coordinatorData.imageUrl === undefined ||
              coordinatorData.imageUrl.trim() === '' ? (
                <CoordinatorAvatar />
              ) : (
                <CoordinatorImage alt={coordinatorData.name} src={coordinatorData.imageUrl} />
              )}
              <CoordinatorName>{coordinatorData.name}</CoordinatorName>
            </CoordinatorAvatarContainer>
          ))}
          {otherCoordinatorsNumber > 0 && (
            <SESTooltip
              content={
                <OtherCoordinators>
                  {milestoneData.coordinators?.map(
                    (coordinatorData, index) =>
                      index > 1 && (
                        <CoordinatorAvatarContainer key={coordinatorData.id}>
                          {coordinatorData.imageUrl === 'N/A' ||
                          coordinatorData.imageUrl === null ||
                          coordinatorData.imageUrl === undefined ||
                          coordinatorData.imageUrl.trim() === '' ? (
                            <CoordinatorAvatar />
                          ) : (
                            <CoordinatorImage alt={coordinatorData.name} src={coordinatorData.imageUrl} />
                          )}
                          <CoordinatorName>{coordinatorData.name}</CoordinatorName>
                        </CoordinatorAvatarContainer>
                      )
                  )}
                </OtherCoordinators>
              }
              placement="bottom-start"
              showAsModal
            >
              <CoordinatorAvatarContainer>
                <CoordinatorAvatar />
                <CoordinatorName>+{otherCoordinatorsNumber}</CoordinatorName>
              </CoordinatorAvatarContainer>
            </SESTooltip>
          )}
        </Coordinators>
      </CoordinatorsContainer>
      <LatestKeyResultsContainer className="latest-key-results-container">
        <LatestKeyResultsTitle>
          {keyResults.length === 0 && isMobile ? 'No Key Results' : 'Latest Key Results'}
        </LatestKeyResultsTitle>
        {keyResults.length === 0 && !isMobile && <NoLatestKeyResults>No Key Results</NoLatestKeyResults>}
        {keyResults.length > 0 &&
          keyResults.map((keyResultData) => (
            <KeyResult key={keyResultData.id}>
              {keyResultData.link ? (
                <KeyResultLink href={keyResultData.link} wrapText>
                  {keyResultData.title}
                </KeyResultLink>
              ) : (
                <NoKeyResultLink>
                  <span>{keyResultData.title}</span>
                  <Todo>Todo</Todo>
                </NoKeyResultLink>
              )}
            </KeyResult>
          ))}
      </LatestKeyResultsContainer>
    </Container>
  );
};

export default MilestoneCard;

const Container = styled(Card)(() => ({
  width: '100%',
  height: '100%',
  padding: '0px 0px 8px 0px',
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 8px 4px 8px',
  borderRadius: '12px 12px 0px 0px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
}));

const CodesContainer = styled('div')(() => ({
  display: 'flex',
  gap: 4,
}));

const SequenceCode = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
}));

const Code = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const StyledInternalLinkButton = styled(InternalLinkButton)(() => ({
  padding: 0,
  fontSize: 14,

  '&:hover': {
    gap: 8,
    padding: 0,
  },

  '&:active, &:focus': {
    borderColor: 'transparent',
  },

  '& div:last-of-type': {
    width: 20,
    height: 20,

    '& > svg': {
      width: 20,
      height: 20,
    },
  },
}));

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 58,
  gap: 4,
  margin: '8px 8px 0px',
  padding: '4px 8px',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const Title = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const ProgressContainer = styled('div')(() => ({
  display: 'flex',
  margin: '4px 8px 0px',
}));

const CoordinatorsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: '4px 8px 0px',
  padding: 8,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const CoordinatorsTitle = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
}));

const Coordinators = styled('div')(() => ({
  display: 'flex',
  gap: 16,
}));

const CoordinatorAvatarContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'total',
})<ElementWithTotal>(({ total }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,

  '&:nth-of-type(3)': {
    cursor: 'pointer',
  },

  ...(total === 1 && {
    '&:first-of-type': {
      maxWidth: '100%',
    },
  }),

  ...(total === 2 && {
    '&:first-of-type, &:last-of-type': {
      maxWidth: 'calc(50% - 8px)',
    },
  }),

  ...(total !== undefined &&
    total > 2 && {
      '&:first-of-type': {
        maxWidth: 'calc(60% - 50px)',
      },
      '&:nth-of-type(2)': {
        maxWidth: 'calc(40% - 30px)',
      },
    }),
}));

const CoordinatorAvatar = styled(AvatarPlaceholderIcon)(({ theme }) => ({
  width: 24,
  height: 24,

  '& rect': {
    fill: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700],
  },
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.charcoal[600] : theme.palette.colors.charcoal[400],
  },
}));

const CoordinatorImage = styled('img')(() => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
}));

const CoordinatorName = styled('span')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.charcoal[400],
}));

const OtherCoordinators = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

const LatestKeyResultsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 114,
  gap: 8,
  margin: '4px 8px 0px',
  padding: 8,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const LatestKeyResultsTitle = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
}));

const NoLatestKeyResults = styled('span')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400],
  textAlign: 'center',
}));

const KeyResult = styled('li')(() => ({
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
}));

const KeyResultLink = styled(ExternalLink)(({ theme }) => ({
  position: 'relative',
  maxWidth: 'calc(100% - 14px)',
  gap: 6,
  paddingLeft: 14,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '18px',

  '& span': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.colors.sky[1000],
  },

  '& svg': {
    minWidth: 11,
    minHeight: 10,

    '& path': {
      fill: theme.palette.colors.sky[1000],
    },
  },

  '&:before': {
    content: '""',
    position: 'absolute',
    display: 'block',
    left: 0,
    top: 6,
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: theme.palette.colors.sky[1000],
  },
}));

const NoKeyResultLink = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 'calc(100% - 14px)',
  display: 'flex',
  gap: 8,
  paddingLeft: 14,

  '& span': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '18px',
    color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400],
  },

  '& svg': {
    minWidth: 11,
    minHeight: 10,
  },

  '&:before': {
    content: '""',
    position: 'absolute',
    display: 'block',
    left: 0,
    top: 6,
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400],
  },
}));

const Todo = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
  padding: '0px 8px',
  borderRadius: 6,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[50],
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(72, 82, 101, 0.40)',
}));
