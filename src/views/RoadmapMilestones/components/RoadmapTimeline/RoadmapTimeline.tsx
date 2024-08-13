import { styled, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useThemeContext } from '@/core/context/ThemeContext';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import { progressPercentage } from '../../utils';
import MilestoneCard from '../MilestoneCard/MilestoneCard';
import type { Theme } from '@mui/material';

interface RoadmapTimelineProps {
  milestones: Milestone[];
}

const MIN_TO_SHOW_VIEW_ALL = 4;

const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ milestones }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const [viewAll, setViewAll] = useState(false);

  const up = milestones.length <= 4 ? milestones : milestones.filter((_, i) => i % 2 === 0);
  const down = milestones.filter((_, i) => i % 2 !== 0);

  const shouldAddPadding = milestones.length % 2 === 0 && milestones.length > 4;

  const viewAllButton = (
    <ButtonBox>
      <Button onClick={() => setViewAll((prev) => !prev)}>
        <span>Expand {viewAll ? 'Less' : 'All'}</span>
        <svg
          style={{ transform: `rotate(${viewAll ? '180' : 0}deg)` }}
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.19339 10.8631C8.35404 11.0456 8.64598 11.0456 8.80664 10.8631L13.4036 5.63952C13.6255 5.38735 13.4398 5 13.097 5H3.90306C3.56023 5 3.37451 5.38735 3.59643 5.63952L8.19339 10.8631Z"
            fill={isLight ? '#25273D' : '#B7A6CD'}
          />
        </svg>
      </Button>
    </ButtonBox>
  );

  return (
    <div>
      {isMobile ? (
        <MobileTimeline>
          {(viewAll ? milestones : milestones.slice(0, MIN_TO_SHOW_VIEW_ALL)).map((milestone) => (
            <MilestoneCard key={milestone.id} milestone={milestone} />
          ))}

          {milestones.length > MIN_TO_SHOW_VIEW_ALL && viewAllButton}
        </MobileTimeline>
      ) : (
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
      )}
    </div>
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
    background: theme.palette.isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900],
  },
}));

const ButtonBox = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const Button = styled('button')(({ theme }) => ({
  marginTop: 'auto',
  padding: '10px 15px 10px 24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  alignSelf: 'stretch',
  borderRadius: 22,
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#31424E'}`,
  background: theme.palette.isLight ? '#fff' : '#1E2C37',
  cursor: 'pointer',

  '& > span': {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: 0.4,
    color: theme.palette.isLight ? '#31424E' : '#9FAFB9',
  },

  '&:hover': {
    border: `1px solid ${theme.palette.isLight ? '#25273D' : '#D2D4EF'}`,

    '& > span': {
      color: theme.palette.isLight ? '#231536' : '#D2D4EF',
    },
  },
}));

const DesktopTimeline = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Up = styled('div')<{ shouldAddPadding: boolean }>(({ theme, shouldAddPadding }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 24,
  borderBottom: `2.5px solid ${
    theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.gray[900]
  }`,
  ...(shouldAddPadding && { paddingRight: 'calc(12.5% - 12px)' }),

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 56,
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
  justifyContent: 'center',
  gap: 24,
  borderTop: `2.5px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.gray[900]}`,
  ...(shouldAddPadding && { paddingLeft: 'calc(12.5% - 12px)' }),

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 56,
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
