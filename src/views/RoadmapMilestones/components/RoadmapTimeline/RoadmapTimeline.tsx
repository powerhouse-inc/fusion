import { styled } from '@mui/material';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import { progressPercentage } from '../../utils';
import MilestoneCard from '../MilestoneCard/MilestoneCard';
import Timeline from './Timeline/Timeline';
import type { FC } from 'react';

interface RoadmapTimelineProps {
  milestones: Milestone[];
}

const RoadmapTimeline: FC<RoadmapTimelineProps> = ({ milestones }) => {
  const up = milestones.length <= 4 ? milestones : milestones.filter((_, i) => i % 2 === 0);
  const down = milestones.filter((_, i) => i % 2 !== 0);

  const shouldAddPadding = milestones.length % 2 === 0 && milestones.length > 4;

  return (
    <>
      <MobileTimeline>
        {milestones.map((milestone) => (
          <MilestoneCard key={milestone.id} milestone={milestone} />
        ))}
      </MobileTimeline>
      <Timeline milestones={milestones} />
      <DesktopTimeline>
        <Up shouldAddPadding={shouldAddPadding}>
          {up.map((milestone) => (
            <CardWrapper key={milestone.id} isStarted={progressPercentage(milestone.scope.progress) !== 0}>
              <MilestoneCard milestone={milestone} />
            </CardWrapper>
          ))}
        </Up>
        <Down shouldAddPadding={shouldAddPadding}>
          {milestones.length > 4 &&
            down.map((milestone) => (
              <CardWrapper key={milestone.id} isStarted={progressPercentage(milestone.scope.progress) !== 0}>
                <MilestoneCard milestone={milestone} />
              </CardWrapper>
            ))}
        </Down>
      </DesktopTimeline>
    </>
  );
};

export default RoadmapTimeline;

const MobileTimeline = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  position: 'relative',
  zIndex: 1,

  '&:before': {
    zIndex: -1,
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    width: 5,
    height: '100%',
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const DesktopTimeline = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Up = styled('div')<{ shouldAddPadding: boolean }>(({ theme, shouldAddPadding }) => ({
  display: 'flex',
  gap: 40,
  ...(shouldAddPadding && { paddingRight: 'calc(12.5% - 12px)' }),

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 73,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    gap: 103,
  },

  '& > div': {
    paddingBottom: 32,

    '&:before': {
      bottom: 0,
    },

    '&:after': {
      bottom: -8,
    },
  },
}));

const Down = styled('div')<{ shouldAddPadding: boolean }>(({ theme, shouldAddPadding }) => ({
  display: 'flex',
  gap: 40,
  ...(shouldAddPadding && { paddingLeft: 'calc(12.5% - 12px)' }),

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 73,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    gap: 103,
  },

  '& > div': {
    paddingTop: 32,

    '&:before': {
      // line
      top: -0,
    },

    '&:after': {
      // circle
      top: -8,
    },
  },
}));

const CardWrapper = styled('div')<{ isStarted: boolean }>(({ theme, isStarted }) => ({
  position: 'relative',
  width: 'calc(25% - 12px)',

  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    width: 'calc(24.35% - 12px)',
  },

  '&:before': {
    // line
    zIndex: 0,
    content: '""',
    position: 'absolute',
    left: 'calc(50% - 1px)',
    width: 2,
    height: 32,
    background: theme.palette.colors.sky[1000],
  },

  '&:after': {
    // circle
    content: '""',
    position: 'absolute',
    left: 'calc(50% - 6px)',
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.colors.sky[1000]}`,
    background: isStarted ? theme.palette.colors.sky[1000] : theme.palette.isLight ? '#fff' : '#10191F',
  },
}));
