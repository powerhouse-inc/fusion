import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import Card from '@/components/Card/Card';
import type { FC } from 'react';

const DisclaimerView: FC = () => (
  <Container>
    <SEOHead
      title="Sky Fusion - Disclaimer"
      description="Sky Fusion Dashboard offers key data insights into the Sky Ecosystem's finances, governance, contributors, and roadmaps."
    />
    <DataContainer>
      <Title>Disclaimer</Title>
      <StyledParagraph>
        All content provided here in our website, hyperlinked sites, associated applications, forums, blogs, social
        media accounts and other platforms ("Site") is for your general information only, procured from third party
        sources. We make no warranties of any kind in relation to our content, including but not limited to accuracy and
        updatedness. No part of the content that we provide constitutes financial advice, legal advice or any other form
        of advice meant for your specific reliance for any purpose. Any use or reliance on our content is solely at your
        own risk and discretion. You should conduct your own research, review, analyze and verify our content before
        relying on them. Trading is a highly risky activity that can lead to major losses, please therefore consult your
        financial advisor before making any decision. No content on our Site is meant to be a solicitation or offer.
      </StyledParagraph>
    </DataContainer>
  </Container>
);

export default DisclaimerView;

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

const DataContainer = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '40px 16px 0',
  padding: '16px 16px 24px',

  [theme.breakpoints.up('tablet_768')]: {
    margin: '40px 32px 0',
    padding: '16px 24px 24px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 960,
    padding: '16px 32px 24px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1200,
    marginTop: 2,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
    marginTop: 16,
  },
}));

const Title = styled('div')(({ theme }) => ({
  marginBottom: 16,
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: 18,
  lineHeight: '21.6px',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const StyledParagraph = styled('p')(({ theme }) => ({
  margin: 0,
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },
}));
