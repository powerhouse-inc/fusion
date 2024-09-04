import { styled } from '@mui/material';
import React from 'react';
import type { Maybe } from '@/core/models/interfaces/generics';
import { DeliverableSetStatus } from '@/core/models/interfaces/roadmaps';
import useMilestoneCard from '@/views/Home/components/MilestoneCard/useMilestoneCard';
import type { FC } from 'react';
interface ElementWithStatus {
  status: Maybe<DeliverableSetStatus>;
}

interface Props {
  status: Maybe<DeliverableSetStatus>;
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

  ...(status === DeliverableSetStatus.FINISHED && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.green[100] : 'rgba(52, 168, 83, 0.40)',
  }),

  ...(status === DeliverableSetStatus.IN_PROGRESS && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.blue[100] : 'rgba(0, 132, 255, 0.40)',
  }),

  ...((status === DeliverableSetStatus.DRAFT || status === DeliverableSetStatus.TODO) && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.orange[100] : 'rgba(255, 138, 0, 0.40)',
  }),
}));

const StatusLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'status',
})<ElementWithStatus>(({ theme, status }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',

  ...(status === DeliverableSetStatus.FINISHED && {
    color: theme.palette.isLight ? theme.palette.colors.green[800] : theme.palette.colors.green[50],
  }),

  ...(status === DeliverableSetStatus.IN_PROGRESS && {
    color: theme.palette.isLight ? theme.palette.colors.blue[800] : theme.palette.colors.blue[50],
  }),

  ...((status === DeliverableSetStatus.DRAFT || status === DeliverableSetStatus.TODO) && {
    color: theme.palette.isLight ? theme.palette.colors.orange[800] : theme.palette.colors.orange[100],
  }),
}));
