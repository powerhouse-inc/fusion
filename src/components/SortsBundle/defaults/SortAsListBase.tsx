import { styled } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

interface SortAsListBaseProps extends PropsWithChildren {
  label: string;
}

const SortAsListBase: FC<SortAsListBaseProps> = ({ label, children }) => (
  <Container>
    <Label>{label}</Label>
    <ListContainer>{children}</ListContainer>
  </Container>
);

export default SortAsListBase;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

const Label = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 700,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.slate[600] : theme.palette.colors.slate[50],
  paddingLeft: 8,
}));

const ListContainer = styled('div')(({ theme }) => ({
  borderRadius: 12,
  overflow: 'hidden',
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(55, 62, 77, 0.30)',
  boxShadow: theme.palette.isLight
    ? '0 0 17.4px rgba(30, 33, 36, 0.03) inset'
    : '0px 0px 17.4px 0px rgba(30, 33, 36, 0.03) inset',
}));
