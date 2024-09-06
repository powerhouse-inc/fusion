import { styled } from '@mui/material';
import React from 'react';

interface DeliverablePercentageBarProps {
  percentage: number;
}

const DeliverablePercentageBar: React.FC<DeliverablePercentageBarProps> = ({ percentage }) => (
  <ProgressContainer>
    <ProgressBar progress={percentage * 100} />
    <Label>{percentage * 100}%</Label>
  </ProgressContainer>
);

export default DeliverablePercentageBar;

const ProgressContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  height: 16,
  width: '100%',
});

const ProgressBar = styled('div')<{ progress: number }>(({ theme, progress }) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  borderRadius: 6,
  overflow: 'hidden',
  background: theme.palette.isLight ? '#ECF1F3' : '#10191F',

  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 6,
    width: `${progress}%`,
    background:
      progress === 100
        ? theme.palette.isLight
          ? theme.palette.colors.green[700]
          : theme.palette.colors.green[900]
        : theme.palette.isLight
        ? theme.palette.colors.blue[700]
        : theme.palette.colors.blue[900],
  },
}));

const Label = styled('div')(({ theme }) => ({
  width: 44,
  minWidth: 44,
  fontSize: 14,
  lineHeight: 'normal',
  textAlign: 'right',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));
