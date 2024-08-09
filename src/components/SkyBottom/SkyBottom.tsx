import { styled } from '@mui/material';
import React from 'react';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
  className?: string;
  disabled?: boolean;
}

const SkyBottom: React.FC<Props> = ({ title, onClick, className, disabled = false }) => (
  <Button onClick={onClick} className={className} disabled={disabled}>
    {title}
  </Button>
);

export default SkyBottom;
const Button = styled('button')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  padding: '4px 24px ',
  borderRadius: 8,
  textAlign: 'center',
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  cursor: 'pointer',
  letterSpacing: '-0.32px',
  backgroundColor: theme.palette.isLight ? '#504DFF' : '#504DFF',
  color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
  border: '1px solid transparent',
  ':hover': {
    backgroundColor: theme.palette.isLight ? '#403ECC;' : '#615EFF',
    color: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[50],
  },
  ':active': {
    backgroundColor: theme.palette.isLight ? '#4442D9' : '#7371FF',
    color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
    border: `1px solid ${theme.palette.isLight ? '#504DFF' : '#504DFF'}`,
  },
  ':disabled': {
    backgroundColor: theme.palette.isLight ? 'rgba(80, 77, 255, 0.50)' : 'rgba(80, 77, 255, 0.50)',
    color: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[500],
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: theme.palette.isLight ? 'rgba(80, 77, 255, 0.50)' : 'rgba(80, 77, 255, 0.50)',
      color: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[500],
    },
  },
}));
