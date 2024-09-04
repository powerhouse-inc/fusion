import { styled } from '@mui/material';
import React from 'react';
import type { BudgetType } from '@ses/core/models/interfaces/projects';

interface BudgetTypeBadgeProps {
  budgetType: BudgetType;
}

const BudgetTypeBadge: React.FC<BudgetTypeBadgeProps> = ({ budgetType }) => <BudgetBadge>{budgetType}</BudgetBadge>;

export default BudgetTypeBadge;

const BudgetBadge = styled('span')(({ theme }) => ({
  borderRadius: '0 12px',
  padding: '1px 8px',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900]}`,

  backgroundColor: 'transparent',

  fontSize: 14,
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900],
  lineHeight: '22px',
}));
