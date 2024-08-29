import { styled } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
}

const GenericDelegateCard: FC<Props> = ({ children, className }) => (
  <Container className={className}>{children}</Container>
);

export default GenericDelegateCard;

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.isLight ? '#FFFFFF' : '#1E2C37',
  boxShadow: theme.palette.isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25);',
  borderRadius: '6px',
}));
