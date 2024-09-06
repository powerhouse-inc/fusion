import { Box, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import StatusProgressChip from '@/components/StatusProgressChip/StatusProgressChip';
import type { ProgressStatus } from '@/core/models/interfaces/types';
import type { FC } from 'react';

interface Props {
  status: ProgressStatus;
  isActive: boolean;
  count?: string;
}

const ProjectStatusChipFilter: FC<Props> = ({ status, isActive, count = '0' }) => (
  <BoxStyle>
    <Title isActive={isActive}>{count}</Title>
    <StatusProgressChip status={status} />
  </BoxStyle>
);

export default ProjectStatusChipFilter;

const Title = styled(Typography)<{ isActive: boolean }>(({ theme, isActive }) => ({
  color: theme.palette.isLight
    ? isActive
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.gray[300]
    : isActive
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.charcoal[800],
  width: 24,
}));

const BoxStyle = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
});
