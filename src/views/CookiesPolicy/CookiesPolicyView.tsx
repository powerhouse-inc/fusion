import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { useCallback } from 'react';
import Card from '@/components/Card/Card';
import SkyButton from '@/components/SkyButton/SkyButton';
import { useCookiesContextTracking } from '@/core/context/CookiesContext';
import type { FC } from 'react';

const CookiesPolicyView: FC = () => {
  const { isShowBanner, setIsShowBanner } = useCookiesContextTracking();

  const handlePolicyBanner = useCallback(() => {
    window.scrollTo(0, 0);
    setIsShowBanner(!isShowBanner);
  }, [isShowBanner, setIsShowBanner]);

  return (
    <Container>
      <SEOHead
        title="Sky Fusion - Cookies Policy"
        description="Sky Fusion Dashboard offers key data insights into the Sky Ecosystem's finances, governance, contributors, and roadmaps."
      />
      <DataContainer>
        <Title>Cookies Policy</Title>
        <Description>Use of Cookies and Similar Technologies</Description>
        <div>
          <TextContainer>
            <StyledParagraph>
              The Site is using cookies. Cookies are small text files that are placed on your computer by websites that
              you visit. They are widely used in order to make websites work, or work more efficiently, as well as to
              provide information to the owners of the site. Cookies are typically stored on your computer's hard drive.
              Information collected from cookies is used by us to evaluate the effectiveness of our Site and analyze
              trends. The information collected from cookies allows us to determine such things as which parts of the
              Site are most visited and difficulties our visitors may experience in accessing the SIte. With this
              knowledge, we can improve the quality of your experience on the Site by recognizing and delivering more of
              the most desired features and information, as well as by resolving access difficulties.
            </StyledParagraph>
            <StyledParagraph>
              We use third party service providers, to assist us in better understanding the use of our Site. Our
              service providers will place cookies on the hard drive of your computer (or use similar technologies) and
              will receive information that we select that will educate us on such things as how visitors navigate
              around our Site. This information is aggregated to provide statistical data about our users' browsing
              actions and patterns, and does not personally identify individuals. This information may include:
            </StyledParagraph>
            <StyledParagraph>
              Computer or mobile device information, Website usage information, such as:
            </StyledParagraph>
            <UlContainer>
              <ListItem>Page views,</ListItem>
              <ListItem>Button clicks,</ListItem>
              <ListItem>Input form changes (without the values being entered),</ListItem>
              <ListItem>Errors.</ListItem>
            </UlContainer>
            <StyledParagraph>
              Our service providers analyses this information and provides us with aggregate reports. The information
              and analysis provided by our service providers will be used to assist us in better understanding our
              visitors' interests in our Site and how to better serve those interests. If you want to avoid using
              cookies altogether, you can disable cookies in your browser. However, disabling cookies might make it
              impossible for you to use certain features of the Site. Your use of the Site with a browser that is
              configure to accept cookies constitutes an acceptance of our and third-party cookies.
            </StyledParagraph>
          </TextContainer>
          <ButtonContainer>
            <SkyButton title="Configure my settings" onClick={handlePolicyBanner} />
          </ButtonContainer>
        </div>
      </DataContainer>
    </Container>
  );
};

export default CookiesPolicyView;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  paddingTop: 88,
  paddingBottom: 64,

  [theme.breakpoints.up('tablet_768')]: {
    paddingTop: 114,
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

const DataContainer = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 16px',
  padding: '16px 16px 24px',

  [theme.breakpoints.up('tablet_768')]: {
    margin: '0 32px',
    padding: '16px 24px 24px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 960,
    padding: '16px 32px 24px',
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
  fontSize: 18,
  lineHeight: '21.6px',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
    lineHeight: '28.8px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  marginBottom: 8,
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '21.6px',
  },
}));

const TextContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}));

const StyledParagraph = styled('p')(({ theme }) => ({
  margin: 0,
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
  },
}));

const UlContainer = styled('ul')(() => ({
  margin: 0,
  paddingLeft: 20,
  '& > li': {
    marginBottom: 8,
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
}));

const ListItem = styled('li')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const ButtonContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  marginTop: 32,
}));
