import { styled } from '@mui/material';
import SkyButton from '@/components/SkyButton/SkyButton';
import type { FC } from 'react';

interface CustomErrorProps {
  description: string;
  skyButtonTitle: string;
  callback: () => void;
}

const CustomError: FC<CustomErrorProps> = ({ description, skyButtonTitle, callback }) => (
  <Container>
    <DataContainer>
      <Title>Oops!</Title>
      <Description>{description}</Description>
      <SkyButton title={skyButtonTitle} onClick={callback} />
    </DataContainer>
  </Container>
);

export default CustomError;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  paddingTop: 88,
  paddingBottom: 64,

  [theme.breakpoints.up('tablet_768')]: {
    paddingTop: 114,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingBottom: 24,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    paddingBottom: 41,
  },
  [theme.breakpoints.up('desktop_1920')]: {
    borderBottom: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.gray[900]
    }`,
  },
}));

const DataContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 650,
  width: 'calc(100% - 32px)',
  height: 568,
  backgroundImage: theme.palette.isLight ? 'url(/assets/img/empty.png)' : 'url(/assets/img/empty-dark.png)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 704,
    width: '100%',
    height: 784,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 960,
    height: 712,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1200,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
  },
}));

const Title = styled('div')(({ theme }) => ({
  marginBottom: 16,
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: 32,
  lineHeight: '38.4px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 40,
    lineHeight: '48px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 64,
    lineHeight: '76.8px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  marginBottom: 56,
  padding: '0px 24px',
  textAlign: 'center',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: 18,
  lineHeight: '21.6px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    lineHeight: '28.8px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 32,
    lineHeight: '38.4px',
  },
}));