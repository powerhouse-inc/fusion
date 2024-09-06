import { styled } from '@mui/material';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import { progressPercentage } from '../../utils';
import MilestoneCard from '../MilestoneCard/MilestoneCard';
import Timeline from './Timeline/Timeline';
import useRoadmapTimeline from './useRoadmapTimeline';
import type { FC } from 'react';

interface RoadmapTimelineProps {
  milestones: Milestone[];
}

const RoadmapTimeline: FC<RoadmapTimelineProps> = ({ milestones }) => {
  milestones = [milestones[0]]; // here
  const up = milestones.length < 4 ? milestones : milestones.filter((_, i) => i % 2 === 0);
  const down = milestones.filter((_, i) => i % 2 !== 0);
  useRoadmapTimeline();

  return (
    <>
      <MobileTimeline>
        {milestones.map((milestone) => (
          <MilestoneCard key={milestone.id} milestone={milestone} />
        ))}
      </MobileTimeline>
      <Timeline milestones={milestones} />
      <DesktopTimeline>
        <Up totalMilestones={milestones.length}>
          {up.map((milestone) => (
            <CardWrapper
              key={milestone.id}
              className="overview-up-card-wrapper"
              isStarted={progressPercentage(milestone.scope.progress) !== 0}
              isLast={milestone === milestones[milestones.length - 1]}
            >
              <MilestoneCard milestone={milestone} />
            </CardWrapper>
          ))}
        </Up>
        {milestones.length > 3 && (
          <Down totalMilestones={milestones.length}>
            {down.map((milestone) => (
              <CardWrapper
                key={milestone.id}
                className="overview-down-card-wrapper"
                isStarted={progressPercentage(milestone.scope.progress) !== 0}
                isLast={milestone === milestones[milestones.length - 1]}
              >
                <MilestoneCard milestone={milestone} />
              </CardWrapper>
            ))}
          </Down>
        )}
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

  '&::before': {
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
    width: 'fit-content',
    margin: '0px auto',
  },
}));

const Up = styled('div')<{ totalMilestones: number }>(({ theme, totalMilestones }) => ({
  display: 'flex',
  gap: 40,
  ...(totalMilestones > 3 && { paddingRight: 130 }),

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 73,
    ...(totalMilestones > 3 && { paddingRight: 180 }),
  },
  [theme.breakpoints.up('desktop_1440')]: {
    gap: 103,
    ...(totalMilestones > 3 && { paddingRight: 195 }),
  },

  '& > div': {
    paddingBottom: 24,

    '&::before': {
      bottom: -1,

      ...(totalMilestones < 4 && {
        width: 'calc(100% + 8px)',
      }),
      ...(totalMilestones === 4 && {
        width: 'calc(25% + 24px)',
      }),
      ...(totalMilestones > 4 && {
        width: 98,
      }),

      [theme.breakpoints.up('desktop_1280')]: {
        width: totalMilestones < 4 ? 'calc(100% + 39px)' : 'calc(25% + 71px)',
      },
      [theme.breakpoints.up('desktop_1440')]: {
        width: totalMilestones < 4 ? 'calc(100% + 69px)' : 'calc(25% + 87px)',
      },
    },

    '&::after': {
      bottom: -8,
    },
  },
}));

const Down = styled('div')<{ totalMilestones: number }>(({ theme, totalMilestones }) => ({
  display: 'flex',
  gap: 40,
  ...(totalMilestones > 3 && { paddingLeft: 130 }),

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 73,
    ...(totalMilestones > 3 && { paddingLeft: 180 }),
  },
  [theme.breakpoints.up('desktop_1440')]: {
    gap: 103,
    ...(totalMilestones > 3 && { paddingLeft: 195 }),
  },

  '& > div': {
    paddingTop: 24,

    '&::before': {
      // line
      top: 0,
      width: totalMilestones === 4 ? 'calc(50% + 22px)' : 'calc(50% + 2px)',

      [theme.breakpoints.up('desktop_1280')]: {
        width: totalMilestones === 4 ? 'calc(50% + 14px)' : 'calc(50% + 4px)',
      },
      [theme.breakpoints.up('desktop_1440')]: {
        width: 'calc(50% + 27px)',
      },
    },

    '&::after': {
      // circle
      top: -8,
    },
  },
}));

const CardWrapper = styled('div')<{ isStarted: boolean; isLast: boolean }>(({ theme, isStarted, isLast }) => ({
  position: 'relative',
  width: '100%',

  '&::before': {
    // line
    zIndex: 0,
    content: '""',
    position: 'absolute',
    display: 'inline-block',
    left: 'calc(50% + 16px)',
    height: 1,
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },

  ...(isLast && {
    '&::before': {
      content: 'none',
    },
  }),

  '&::after': {
    // circle
    content: '""',
    position: 'absolute',
    display: 'inline-block',
    left: 'calc(50% - 8px)',
    width: 16,
    height: 16,
    backgroundImage: isStarted
      ? theme.palette.isLight
        ? 'url(/assets/svg/circle_outlined_filled.svg)'
        : 'url(/assets/svg/circle_outlined_filled_dark.svg)'
      : theme.palette.isLight
      ? 'url(/assets/svg/circle_outlined.svg)'
      : 'url(/assets/svg/circle_outlined_dark.svg)',
    backgroundSize: 'cover',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 291.333,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 303.667,
  },
}));
