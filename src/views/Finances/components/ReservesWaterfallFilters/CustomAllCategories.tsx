import { styled } from '@mui/material';
import React from 'react';

interface Props {
  label: string;
  isActive?: boolean;
}

const CustomAllCategories: React.FC<Props> = ({ isActive = true, label }) => <Title isActive={isActive}>{label}</Title>;

export default CustomAllCategories;

const Title = styled('div')<{ isActive?: boolean }>(({ theme, isActive = true }) => ({
  display: 'flex',
  flexDirection: 'row',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight
    ? isActive
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.gray[300]
    : isActive
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.gray[50],
}));
