import { styled } from '@mui/material';
import React from 'react';

import { ProgressStatus } from '@/core/models/interfaces/types';
import useMilestoneCard from '@/views/Home/components/MilestoneCard/useMilestoneCard';
import type { FC } from 'react';
interface ElementWithStatus {
  status: ProgressStatus;
}

interface Props {
  status: ProgressStatus;
}
const StatusProgressChip: FC<Props> = ({ status }) => {
  const { statusLabel } = useMilestoneCard(status);
  return (
    <StatusLabelContainer status={status}>
      <StatusLabel status={status}>{statusLabel}</StatusLabel>
    </StatusLabelContainer>
  );
};

export default StatusProgressChip;

const StatusLabelContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'status',
})<ElementWithStatus>(({ theme, status }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1px 16px',
  borderRadius: 6,

  ...(status === ProgressStatus.FINISHED && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.green[100] : 'rgba(52, 168, 83, 0.40)',
  }),

  ...(status === ProgressStatus.IN_PROGRESS && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.blue[100] : 'rgba(0, 132, 255, 0.40)',
  }),

  ...((status === ProgressStatus.DRAFT || status === ProgressStatus.TODO) && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.orange[100] : 'rgba(255, 138, 0, 0.40)',
  }),
}));

const StatusLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'status',
})<ElementWithStatus>(({ theme, status }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',

  ...(status === ProgressStatus.FINISHED && {
    color: theme.palette.isLight ? theme.palette.colors.green[800] : theme.palette.colors.green[50],
  }),

  ...(status === ProgressStatus.IN_PROGRESS && {
    color: theme.palette.isLight ? theme.palette.colors.blue[800] : theme.palette.colors.blue[50],
  }),

  ...((status === ProgressStatus.DRAFT || status === ProgressStatus.TODO) && {
    color: theme.palette.isLight ? theme.palette.colors.orange[800] : theme.palette.colors.orange[100],
  }),
}));
