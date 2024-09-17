import { styled } from '@mui/material';

import React from 'react';
import { TeamStatus } from '@/core/models/interfaces/types';
import { useCustomColors } from './useCustomColors';
import type { CustomColors } from './useCustomColors';

interface StatusChipProps {
  status: TeamStatus;
  className?: string;
  isFilter?: boolean;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, className, isFilter = false }) => {
  const colors = useCustomColors();
  const removeAdditionalText =
    status === TeamStatus.FormalSubmission && !isFilter ? TeamStatus.FormalSubmission.split(' ')[1] : status;
  return (
    <Chip colors={colors} status={status} className={className}>
      {removeAdditionalText}
    </Chip>
  );
};

const Chip = styled('div', {
  shouldForwardProp: (prop) => prop !== 'colors' && prop !== 'status',
})<{ colors: CustomColors; status: TeamStatus }>(({ theme, colors, status }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'baseline',
  width: 'fit-content',
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '18px',
  borderRadius: 6,
  padding: '1px 8px 1px 8px',
  color: theme.palette.isLight ? colors[status]?.color : colors[status]?.colorDark,
  background: theme.palette.isLight ? colors[status]?.background : colors[status]?.backgroundDark,
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '1px 16px 1px 16px',
  },
}));
