import { styled } from '@mui/material';
import { ButtonType } from '../../../core/enums/buttonTypeEnum';
import CheckBox from '../CheckBox/CheckBox';
import { CustomButton } from '../CustomButton/CustomButton';
import type { FC } from 'react';

interface Props {
  functionalCheckbox: boolean;
  analyticsCheckbox: boolean;
  setFunctionalCheckbox: (isChecked: boolean) => void;
  setAnalyticsCheckbox: (isChecked: boolean) => void;
  handleAcceptCookies: () => void;
  handleRejectCookies: () => void;
}

const CookiesPolicyBanner: FC<Props> = ({
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
      <ContainerData>
        <StyleParagraph>
          This website uses cookies for analytic purposes only. Cookies are anonymous and do not link to user data. We
          collect information to improve the user experience and validate UI changes. You can still use the page without
          cookies. For more information, please read our <br />
          <LinkCookiesPolicy href="/cookies-policy">cookies policy.</LinkCookiesPolicy>
        </StyleParagraph>
        <ContainerCheckBox>
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
        </ContainerCheckBox>
        <ContainerButton>
          <RejectAllCookiesButton
            label="Reject all cookies"
            buttonType={ButtonType.Secondary}
            onClick={handleRejectCookies}
            allowsHover={false}
          />
          <CustomButtonStyled
            label="Accept configured cookies"
            buttonType={ButtonType.Primary}
            onClick={handleAcceptCookies}
            allowsHover={false}
          />
        </ContainerButton>
      </ContainerData>
    </Container>
  );
};

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.isLight ? '#FFFFFF' : '#10191F',
  borderRadius: '6px',
  padding: '40px 24px',
  height: '458px',
  boxShadow: !theme.palette.isLight ? '0px -15px 35px 10px rgba(0, 27, 141, 0.15)' : 'none',

  [theme.breakpoints.between('table_834', 'desktop_1194')]: {
    padding: '40px 63px',
  },
  [theme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    padding: '40px 243px',
  },
  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    padding: '40px 286px',
  },
  [theme.breakpoints.between('desktop_1440', 'desktop_1920')]: {
    padding: '40px 366px',
  },
  [theme.breakpoints.up('desktop_1920')]: {
    padding: '40px 606px',
  },
  [theme.breakpoints.up('table_834')]: {
    height: '282px',
  },
}));

const ContainerData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '375px',
  margin: '0px auto',

  [theme.breakpoints.up('table_834')]: {
    maxWidth: '708px',
    margin: '0px auto',
  },
}));

const LinkCookiesPolicy = styled('a')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.colors.sky[1000],
  marginLeft: '2px',
  textAlign: 'center',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const ContainerCheckBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '34px',
  margin: '0 auto',
  marginTop: '32px',

  [theme.breakpoints.up('table_834')]: {
    marginTop: '24px',
  },
}));

const ContainerButton = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '22px',
  paddingRight: '22px',
  marginTop: '32px',
  alignItems: 'center',

  [theme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 auto',
    marginTop: '24px',
    height: '48px',
  },
}));

const CustomButtonStyled = styled(CustomButton)(({ theme }) => ({
  padding: '14.5px 40px',
  marginTop: '24px',
  width: 285,
  height: 48,
  backgroundColor: theme.palette.colors.sky[1000],
  border: 'none',
  '&:hover': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.sky[900],
    '& > div': {
      color: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[50],
    },
  },
  '&:active': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.sky[900],
    '& > div': {
      color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
    },
  },
  '& > div': {
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
  },

  [theme.breakpoints.up('table_834')]: {
    marginTop: '0px',
  },
}));

const RejectAllCookiesButton = styled(CustomButton)(({ theme }) => ({
  width: 285,
  height: 48,
  padding: '14.5px 76px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[500],
  border: 'none',
  '& > div': {
    fontSize: '16px',
    lineHeight: '19px',
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],
  },

  [theme.breakpoints.up('table_834')]: {
    marginRight: 24,
  },
}));

const StyleParagraph = styled('p')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  marginBottom: '0px',
  marginTop: '0px',
}));

export default CookiesPolicyBanner;
