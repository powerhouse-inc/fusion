import { styled } from '@mui/material';
import CheckBox from '@/components/CheckBox/CheckBox';
import SecondaryButton from '@/components/SecondaryButton/SecondaryButton';
import SkyButton from '@/components/SkyButton/SkyButton';
import type { FC } from 'react';

interface CookiesPolicyBannerProps {
  functionalCheckbox: boolean;
  analyticsCheckbox: boolean;
  setFunctionalCheckbox: (isChecked: boolean) => void;
  setAnalyticsCheckbox: (isChecked: boolean) => void;
  handleAcceptCookies: () => void;
  handleRejectCookies: () => void;
}

const CookiesPolicyBanner: FC<CookiesPolicyBannerProps> = ({
  functionalCheckbox,
  analyticsCheckbox,
  setFunctionalCheckbox,
  setAnalyticsCheckbox,
  handleAcceptCookies,
  handleRejectCookies,
}) => {
  const handleCheckbox = (key: (val: boolean) => void) => (val: boolean) => {
    key(!val);
  };

  return (
    <Container>
      <DataContainer>
        <StyledParagraph>
          This website uses cookies for analytic purposes only. Cookies are anonymous and do not link to user data. We
          collect information to improve the user experience and validate UI changes. You can still use the page without
          cookies. For more information, please read our
          <Space>&nbsp;</Space>
          <LineBreak>
            <br />
          </LineBreak>
          <CookiesPolicyLink href="/cookies-policy">cookies policy.</CookiesPolicyLink>
        </StyledParagraph>
        <CheckBoxContainer>
          <CheckBox
            label="Functional cookies"
            isChecked={functionalCheckbox}
            setIsChecked={handleCheckbox(setFunctionalCheckbox)}
          />
          <CheckBox
            label="Analytics cookies"
            isChecked={analyticsCheckbox}
            setIsChecked={handleCheckbox(setAnalyticsCheckbox)}
          />
        </CheckBoxContainer>
        <ButtonContainer>
          <SkyButton title="Accept configured cookies" onClick={handleAcceptCookies} />
          <SecondaryButton title="Reject all cookies" onClick={handleRejectCookies} />
        </ButtonContainer>
      </DataContainer>
    </Container>
  );
};

const Container = styled('div')(({ theme }) => ({
  height: '338px',
  padding: '16px 16px 40px',
  borderRadius: '6px 6px 0px 0px',
  background: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  boxShadow: '0px -4px 15px 0px rgba(74, 88, 115, 0.15)',

  [theme.breakpoints.up('tablet_768')]: {
    height: '304px',
    padding: '40px 64px 58px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: '312px',
    padding: '40px 120px 58px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    padding: '40px 163px 58px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    height: '294px',
    padding: '40px 184px 64px',
  },
}));

const DataContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '343px',
  margin: '0px auto',

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: '640px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: '784px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: '954px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: '1072px',
  },
}));

const StyledParagraph = styled('p')(({ theme }) => ({
  margin: 0,
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    textAlign: 'center',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const Space = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const LineBreak = styled('span')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'inline',
  },
}));

const CookiesPolicyLink = styled('a')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.colors.sky[1000],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const CheckBoxContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 58,
  margin: '16px auto 0px',

  [theme.breakpoints.up('tablet_768')]: {
    gap: 64,
    marginTop: 32,
  },
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  marginTop: 32,
  '& > button:first-of-type, & > button:last-of-type': {
    width: 343,
  },

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: 32,
    '& > button:first-of-type': {
      width: 251,
    },
    '& > button:last-of-type': {
      width: 256,
    },
  },
}));

export default CookiesPolicyBanner;