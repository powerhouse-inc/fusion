import { styled } from '@mui/material';
import Card from '@/components/Card/Card';
import type { FC } from 'react';

const DisclaimerView: FC = () => (
  <Container>
    <ContainerData>
      <Title>Disclaimer</Title>
      <ParagraphStyle>
        All content provided here in our website, hyperlinked sites, associated applications, forums, blogs, social
        media accounts and other platforms ("Site") is for your general information only, procured from third party
        sources. We make no warranties of any kind in relation to our content, including but not limited to accuracy and
        updatedness. No part of the content that we provide constitutes financial advice, legal advice or any other form
        of advice meant for your specific reliance for any purpose. Any use or reliance on our content is solely at your
        own risk and discretion. You should conduct your own research, review, analyze and verify our content before
        relying on them. Trading is a highly risky activity that can lead to major losses, please therefore consult your
        financial advisor before making any decision. No content on our Site is meant to be a solicitation or offer.
      </ParagraphStyle>
    </ContainerData>
  </Container>
);

export default DisclaimerView;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingTop: 88,
  paddingBottom: 64,

  [theme.breakpoints.up('tablet_768')]: {
    paddingTop: 122,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingBottom: 16,
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

const ContainerData = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '40px',
  maxWidth: '1312px',
  margin: '0 auto',
  padding: '32px',

  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    maxWidth: '1184px',
  },
  [theme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    maxWidth: '770px',
  },
  [theme.breakpoints.down('tablet_768')]: {
    maxWidth: '343px',
    padding: '32px 24px',
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  textAlign: 'center',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 18,
  lineHeight: '21.6px',
  alignItems: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  marginBottom: 24,

  [theme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const ParagraphStyle = styled('p')(({ theme }) => ({
  margin: 0,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },
}));
