import { styled, useMediaQuery } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import React, { useState } from 'react';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import { siteRoutes } from '@/config/routes';
import type { Deliverable, IncrementedDeliverable, MDeliverable } from '@/core/models/interfaces/deliverables';
import { DeliverableStatus, isMDeliverable } from '@/core/models/interfaces/deliverables';
import DeliverablePercentageBar from '../DeliverablePercentageBar/DeliverablePercentageBar';
import DeliverableStatusChip from '../DeliverableStatusChip/DeliverableStatusChip';
import DeliverableStoryPointsBar from '../DeliverableStoryPointsBar/DeliverableStoryPointsBar';
import KeyResults from '../KeyResults/KeyResults';
import MilestoneLink from '../MilestoneLink/MilestoneLink';
import OwnerTooltipContent from '../OwnerTooltipContent/OwnerTooltipContent';
import ProjectLink from '../ProjectLink/ProjectLink';
import type { DeliverableViewMode } from '../ProjectCard/ProjectCard';
import type { Theme } from '@mui/material';

interface DeliverableCardProps {
  deliverable: Deliverable | MDeliverable;
  viewMode: DeliverableViewMode;
  maxKeyResultsOnRow: number;
  isProjectCard?: boolean;
}

const DeliverableCard: React.FC<DeliverableCardProps> = ({
  deliverable,
  viewMode,
  maxKeyResultsOnRow,
  isProjectCard = true,
}) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleToggleExpand = () => setExpanded((prev) => !prev);
  const deliverableProgress = isMDeliverable(deliverable) ? deliverable.workProgress : deliverable.progress;

  return (
    <Card fitContent={!isMobile && viewMode === 'compacted' && !expanded}>
      <HeaderContainer>
        <TitleContainer>
          <Title viewMode={viewMode}>{deliverable.title}</Title>
        </TitleContainer>
        <DeliverableOwnerContainer>
          <SESTooltip content={<OwnerTooltipContent title="Deliverable Owner" items={[deliverable.owner]} />}>
            <Link href={siteRoutes.ecosystemActorAbout(deliverable.owner.code)}>
              <OwnerImage src={deliverable.owner.imageUrl} alt={deliverable.owner.name} />
            </Link>
          </SESTooltip>
        </DeliverableOwnerContainer>
      </HeaderContainer>
      <ProgressContainer>
        <DeliverableStatusChip status={deliverable.status} />
        {deliverable.status === DeliverableStatus.IN_PROGRESS &&
          deliverableProgress &&
          (deliverableProgress.__typename === 'Percentage' ? (
            <DeliverablePercentageBar percentage={deliverableProgress.value} />
          ) : (
            <DeliverableStoryPointsBar total={deliverableProgress.total} completed={deliverableProgress.completed} />
          ))}
      </ProgressContainer>

      {(viewMode === 'detailed' || expanded) && (
        <Description>
          {deliverable.description?.split('\n').map((paragraph) => (
            <p>{paragraph}</p>
          ))}
        </Description>
      )}
      <KeyBox>
        {isProjectCard
          ? (deliverable as IncrementedDeliverable).milestoneOverride && (
              <MilestoneLink
                roadmapSlug={(deliverable as IncrementedDeliverable).milestoneOverride?.roadmapSlug ?? ''}
                code={(deliverable as IncrementedDeliverable).milestoneOverride?.code ?? ''}
              />
            )
          : (deliverable as MDeliverable).budgetAnchor.project &&
            (deliverable as MDeliverable).budgetAnchor.project.code &&
            (deliverable as MDeliverable).budgetAnchor.project.title && (
              <ProjectLink
                href={`${siteRoutes.ecosystemActorProjects('PH')}#${
                  (deliverable as MDeliverable).budgetAnchor.project.code
                }`}
                code={(deliverable as MDeliverable).budgetAnchor.project.code}
                name={(deliverable as MDeliverable).budgetAnchor.project.title}
              />
            )}
        <KeyResults
          keyResults={deliverable.keyResults}
          viewMode={viewMode}
          expanded={expanded}
          handleToggleExpand={handleToggleExpand}
          maxKeyResultsOnRow={maxKeyResultsOnRow}
        />
      </KeyBox>
    </Card>
  );
};

export default DeliverableCard;

const Card = styled('div')<{ fitContent: boolean }>(({ theme, fitContent }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderRadius: 12,
  background: theme.palette.isLight ? '#fff' : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.shortShadow : theme.fusionShadows.darkMode,
  padding: 15,
  height: fitContent ? 'fit-content' : 'auto',
}));

const HeaderContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 24,
  alignSelf: 'stretch',
});

const TitleContainer = styled('div')({
  maxWidth: 'calc(100% - 51px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: '1 0 0',
  marginBottom: 8,
});

const Title = styled('div')<{ viewMode: DeliverableViewMode }>(({ theme, viewMode }) => ({
  ...(viewMode !== 'detailed' && {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  alignSelf: 'stretch',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
}));

const DeliverableOwnerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const OwnerImage = styled(Avatar)(({ theme }) => ({
  width: 26,
  height: 26,
  borderRadius: '50%',
  border: `2px solid ${theme.palette.isLight ? '#fff' : theme.palette.colors.charcoal[300]}`,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.avatarDM,
  fontSize: 14,
  fontFamily: 'Inter, sans-serif',
}));

const ProgressContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: 8,
});

const Description = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: 0,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[800] : theme.palette.colors.slate[200],

  '& p': {
    margin: 0,
  },

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },
}));

const KeyBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingTop: 9,
  marginTop: 'auto',
});
