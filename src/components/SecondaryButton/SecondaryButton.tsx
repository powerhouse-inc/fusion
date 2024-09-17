import { styled } from '@mui/material';
import React from 'react';

interface SecondaryButtonProps {
  title: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ title, className, disabled = false, onClick }) => (
  <Button onClick={onClick} className={className} disabled={disabled}>
    {title}
  </Button>
);

export default SecondaryButton;

const Button = styled('button')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  padding: '4px 24px ',
  border: '1px solid transparent',
  borderRadius: 8,
  textAlign: 'center',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  letterSpacing: -0.32,
  cursor: 'pointer',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[500],

  '&:hover': {
    borderColor: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[400],
    color: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.slate[50],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[500],
  },
  '&:active': {
    borderColor: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300],
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[500],
  },
  '&:disabled': {
    cursor: 'not-allowed',
    borderColor: 'transparent',
    color: theme.palette.isLight ? theme.palette.colors.gray[400] : theme.palette.colors.slate[400],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[500],
    '&:hover': {
      color: theme.palette.isLight ? theme.palette.colors.gray[400] : theme.palette.colors.slate[400],
      backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[500],
    },
  },
}));
