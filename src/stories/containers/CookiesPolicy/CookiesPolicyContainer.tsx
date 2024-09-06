import { styled } from '@mui/material';
import React, { useCallback } from 'react';
import Card from '@/components/Card/Card';
import { useCookiesContextTracking } from '../../../core/context/CookiesContext';
import { CustomButton } from '../../components/CustomButton/CustomButton';

const CookiesPolicyContainer = () => {
  const { isShowBanner, setIsShowBanner } = useCookiesContextTracking();

  const handlePolicyBanner = useCallback(() => {
    window.scrollTo(0, 0);
    setIsShowBanner(!isShowBanner);
  }, [isShowBanner, setIsShowBanner]);

  return (
    <Container>
      <ContainerData>
        <Title>Cookies Policy</Title>
        <Description>Use of Cookies and Similar Technologies</Description>
        <div>
          <ParagraphStyle>
            The Site is using cookies. Cookies are small text files that are placed on your computer by websites that
            you visit. They are widely used in order to make websites work, or work more efficiently, as well as to
            provide information to the owners of the site. Cookies are typically stored on your computer´s hard
            drive.Information collected from cookies is used by us to evaluate the effectiveness of our Site and analyze
            trends. The information collected from cookies allows us to determine such things as which parts of the Site
            are most visited and difficulties our visitors may experience in accessing the SIte. With this knowledge, we
            can improve the quality of your experience on the Site by recognizing and delivering more of the most
            desired features and information, as well as by resolving access difficulties.
          </ParagraphStyle>
          <ParagraphStyle>
            We use third party service providers, to assist us in better understanding the use of our Site. Our service
            providers will place cookies on the hard drive of your computer (or use similar technologies) and will
            receive information that we select that will educate us on such things as how visitors navigate around our
            Site. This information is aggregated to provide statistical data about our users browsing actions and
            patterns, and does not personally identify individuals. This information may include:
          </ParagraphStyle>
          <ParagraphStyle>Computer or mobile device information, Website usage information, such as:</ParagraphStyle>
          <ContainerUl>
            <ListItem>Page views,</ListItem>
            <ListItem>Button clicks,</ListItem>
            <ListItem>Input form changes (without the values being entered),</ListItem>
            <ListItem>Errors.</ListItem>
          </ContainerUl>
          <ParagraphStyle>
            Our service providers analyses this information and provides us with aggregate reports. The information and
            analysis provided by our service providers will be used to assist us in better understanding our visitors
            interests in our Site and how to better serve those interests. If you want to avoid using cookies
            altogether, you can disable cookies in your browser. However, disabling cookies might make it impossible for
            you to use certain features of the Site. Your use of the Site with a browser that is configure to accept
            cookies constitutes an acceptance of our and third-party cookies.
          </ParagraphStyle>
          <ContainerButton>
            <CustomButtonStyled label="Configure my settings" allowsHover={false} onClick={handlePolicyBanner} />
          </ContainerButton>
        </div>
      </ContainerData>
    </Container>
  );
};

export default CookiesPolicyContainer;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '104px',
  width: '100%',
  paddingBottom: '128px',
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
  [theme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    maxWidth: '1066px',
  },
  [theme.breakpoints.between('table_834', 'desktop_1194')]: {
    maxWidth: '770px',
  },
  [theme.breakpoints.between('mobile_375', 'table_834')]: {
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
  marginBottom: 16,

  [theme.breakpoints.between('table_834', 'desktop_1194')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  [theme.breakpoints.up('table_834')]: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '21.6px',
  },
}));

const ContainerUl = styled('ul')(({ theme }) => ({
  '> li': {
    marginBottom: '8px',
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[50],
    '&:last-child': {
      marginBottom: '0px',
    },
  },
}));

const ContainerButton = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: '64px',
  [theme.breakpoints.between('mobile_375', 'table_834')]: {
    marginTop: '40px',
  },
}));

const ParagraphStyle = styled('p')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[50],
  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
  },
}));

const ListItem = styled('li')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[50],
  [theme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const CustomButtonStyled = styled(CustomButton)(({ theme }) => ({
  padding: '14.5px 40px',
  width: 249,
  height: 48,
  backgroundColor: theme.palette.colors.sky[1000],
  border: 'none',
  ':hover': {
    backgroundColor: theme.palette.colors.sky[1000],
  },

  '& > div': {
    fontSize: '16px',
    color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
  },
}));
