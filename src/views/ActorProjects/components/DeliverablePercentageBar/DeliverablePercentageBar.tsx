import { styled } from '@mui/material';
import React from 'react';
import { usLocalizedNumber } from '@/core/utils/humanization';

interface ElementWithProgress {
  progress: number;
}

interface DeliverablePercentageBarProps {
  percentage: number;
}

const DeliverablePercentageBar: React.FC<DeliverablePercentageBarProps> = ({ percentage }) => (
  <ProgressBarContainer>
    <ProgressBar progress={percentage} />
    <ProgressLabel progress={percentage}>{usLocalizedNumber(percentage * 100, 0)}%</ProgressLabel>
  </ProgressBarContainer>
);

export default DeliverablePercentageBar;

const ProgressBarContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 4,
  width: '100%',

  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.slate[600],
}));

const ProgressBar = styled('div', {
  shouldForwardProp: (prop) => prop !== 'progress',
})<ElementWithProgress>(({ theme, progress }) => ({
  width: `max(${progress * 100}%, ${progress === 0 ? 0 : 0.5}px)`,
  height: 16,
  borderRadius: `4px ${progress === 1 ? '4px 4px' : '0px 0px'} 4px`,

  ...(progress === 1 && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900],
  }),

  ...(progress !== 1 && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900],
  }),
}));

const ProgressLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'progress',
})<{ progress: number }>(({ theme, progress }) => ({
  position: 'absolute',
  top: 0,
  right: 8,
  fontWeight: 700,
  fontSize: 12,
  lineHeight: '16px',

  ...(progress === 1 && {
    color: theme.palette.colors.slate[50],
  }),

  ...(progress !== 1 && {
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[600],
  }),
}));
