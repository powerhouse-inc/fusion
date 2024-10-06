import { styled } from '@mui/material';
import React from 'react';

interface SkyButtonProps {
  title: string;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SkyButton: React.FC<SkyButtonProps> = ({ title, className, disabled = false, onClick }) => (
  <Button className={className} disabled={disabled} onClick={onClick}>
    {title}
  </Button>
);

export default SkyButton;

const Button = styled('button')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  padding: '3px 24px ',
  border: '1px solid transparent',
  borderRadius: 8,
  textAlign: 'center',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24.4px',
  letterSpacing: -0.32,
  cursor: 'pointer',
  color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
  backgroundColor: theme.palette.colors.sky[1000],

  '&:hover': {
    color: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[50],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.sky[900],
  },
  '&:active': {
    borderColor: theme.palette.colors.sky[1000],
    color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.sky[900],
  },
  '&:disabled': {
    cursor: 'not-allowed',
    color: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[500],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.sky[400] : theme.palette.colors.sky['+200'],
    '&:hover': {
      color: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[500],
      backgroundColor: theme.palette.isLight ? theme.palette.colors.sky[400] : theme.palette.colors.sky['+200'],
    },
  },
}));
