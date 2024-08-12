import { styled } from '@mui/material';
import React from 'react';

interface DeliverableStoryPointsBarProps {
  total: number;
  completed: number;
}

const DeliverableStoryPointsBar: React.FC<DeliverableStoryPointsBarProps> = ({ total, completed }) => (
  <ProgressContainer>
    <ProgressBar compacted={total > 10}>
      {Array.from({ length: total }).map((_, index) => (
        <StoryPoint key={index} completed={index < completed} />
      ))}
    </ProgressBar>
    <Label>
      <Completed>{completed}</Completed> of {total}
    </Label>
  </ProgressContainer>
);

export default DeliverableStoryPointsBar;

const ProgressContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  height: 16,
  width: '100%',
});

const ProgressBar = styled('div')<{ compacted: boolean }>(({ compacted }) => ({
  display: 'flex',
  gap: compacted ? 2 : 4,
  alignItems: 'center',
  height: '100%',
  width: '100%',
}));

const StoryPoint = styled('div')<{ completed: boolean }>(({ theme, completed }) => ({
  width: '100%',
  height: '100%',
  borderRadius: 4,
  background: completed
    ? theme.palette.isLight
      ? theme.palette.colors.blue[700]
      : theme.palette.colors.blue[900]
    : theme.palette.isLight
    ? '#D1DEE6'
    : '#10191F',
}));

const Label = styled('div')(({ theme }) => ({
  width: 'fit-content',
  minWidth: 'fit-content',
  fontSize: 14,
  lineHeight: 'normal',
  fontWeight: 500,
  textAlign: 'right',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));

const Completed = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontWeight: 700,
  fontSize: 12,
  lineHeight: '18px',
}));
