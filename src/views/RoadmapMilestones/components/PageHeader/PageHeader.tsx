import { styled } from '@mui/material';
import type { FC } from 'react';

interface PageHeaderProps {
  title: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title }) => (
  <Header>
    <Title>{title}</Title>
  </Header>
);

export default PageHeader;

const Header = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const Title = styled('h1')(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: 18,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 24,
    lineHeight: '29px',
  },
}));
