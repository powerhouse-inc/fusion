import { styled } from '@mui/material';
import React from 'react';
import type { ProgressStatus } from '@/core/models/interfaces/types';
import { usLocalizedNumber } from '@/core/utils/humanization';
import StatusProgressChip from '../StatusProgressChip/StatusProgressChip';
import type { FC } from 'react';

interface ElementWithProgress {
  progress: number;
}

interface Props {
  progress: number;
  status: ProgressStatus;
}

const ProgressWithStatus: FC<Props> = ({ progress, status }) => (
  <Progress>
    <ProgressTitleWrapper>
      <ProgressTitle>Status</ProgressTitle>
      <StatusProgressChip status={status} />
    </ProgressTitleWrapper>
    <ProgressBarContainer>
      <ProgressBar progress={progress} />
      <ProgressLabel progress={progress}>{usLocalizedNumber(progress * 100, 0)}%</ProgressLabel>
    </ProgressBarContainer>
  </Progress>
);

export default ProgressWithStatus;

const ProgressBarContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 4,
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
})<ElementWithProgress>(({ theme, progress }) => ({
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

const Progress = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 8,
  padding: 8,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const ProgressTitleWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ProgressTitle = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
}));
