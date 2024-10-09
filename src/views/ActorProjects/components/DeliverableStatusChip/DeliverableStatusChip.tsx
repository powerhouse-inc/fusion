import { styled } from '@mui/material';
import Chip from '@mui/material/Chip';
import React, { useMemo } from 'react';
import { DeliverableStatus } from '@/core/models/interfaces/deliverables';

interface DeliverableStatusChipProps {
  status: DeliverableStatus;
}

const DeliverableStatusChip: React.FC<DeliverableStatusChipProps> = ({ status }) => {
  const label = useMemo(() => {
    switch (status) {
      case DeliverableStatus.IN_PROGRESS:
        return 'In Progress';
      case DeliverableStatus.DELIVERED:
        return 'Delivered';
      case DeliverableStatus.BLOCKED:
        return 'Blocked';
      default:
        return 'To do';
    }
  }, [status]);

  return <StatusChip label={label} status={status} />;
};

export default DeliverableStatusChip;

const StatusChip = styled(Chip)<{ status: DeliverableStatus }>(({ theme, status }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1px 16px',
  borderRadius: 6,
  height: 'auto',

  ...(status === DeliverableStatus.DELIVERED && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.green[100] : 'rgba(52, 168, 83, 0.40)',
  }),

  ...(status === DeliverableStatus.IN_PROGRESS && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.blue[100] : 'rgba(0, 132, 255, 0.40)',
  }),

  ...((status === DeliverableStatus.DRAFT || status === DeliverableStatus.TODO) && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.orange[100] : 'rgba(255, 138, 0, 0.40)',
  }),
  ...(status === DeliverableStatus.BLOCKED && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(72, 82, 101, 0.40)',
  }),

  '.MuiChip-label': {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '22px',
    padding: 0,

    ...(status === DeliverableStatus.DELIVERED && {
      color: theme.palette.isLight ? theme.palette.colors.green[800] : theme.palette.colors.green[50],
    }),

    ...(status === DeliverableStatus.IN_PROGRESS && {
      color: theme.palette.isLight ? theme.palette.colors.blue[800] : theme.palette.colors.blue[50],
    }),

    ...((status === DeliverableStatus.DRAFT || status === DeliverableStatus.TODO) && {
      color: theme.palette.isLight ? theme.palette.colors.orange[800] : theme.palette.colors.orange[100],
    }),
    ...(status === DeliverableStatus.BLOCKED && {
      color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[50],
    }),
  },
}));
