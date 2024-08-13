import { styled, useMediaQuery } from '@mui/material';
import { CustomButton } from '@ses/components/CustomButton/CustomButton';
import TextInput from '@ses/components/TextInput/TextInput';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import Link from 'next/link';
import MakerDao from 'public/assets/svg/makerdao_connect.svg';
import SkyLogoDeskDark from 'public/assets/svg/sky-desk-dark.svg';
import SkyLogoDesk from 'public/assets/svg/sky-desk.svg';
import React from 'react';
import ExternalLinkText from '@/components/ExternalLinkText/ExternalLinkText';
import type { FormikProps } from 'formik';

export type LoginFormProps = {
  form: FormikProps<{ username: string; password: string }>;
  clearErrors: () => void;
  hasUserInactive: boolean;
  loading: boolean;
  error: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ form, clearErrors, hasUserInactive, loading, error }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));

  return (
    <Container>
      <LinkStyled href="/">
        <LogoContainerDesk>{isLight ? <MakerDao /> : <MakerDao />}</LogoContainerDesk>
        <LogoContainerDesk>{isLight ? <SkyLogoDeskDark /> : <SkyLogoDesk />}</LogoContainerDesk>
      </LinkStyled>
      <Title>Log In</Title>
      <Description>Enter your username and password to get access to the administration area.</Description>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <InputsWrapper>
          <TextInput
            name="username"
            style={{ marginBottom: 32 }}
            placeholder="Username"
            value={form.values.username}
            onChange={(e) => {
              clearErrors();
              form.handleChange(e);
            }}
            onBlur={form.handleBlur}
            error={
              (form.touched.username && form.errors.username) ||
              (hasUserInactive && 'Account disabled. Reach admin for more info.')
            }
            disabled={loading}
          />
          <TextInput
            name="password"
            placeholder="Password"
            value={form.values.password}
            onChange={(e) => {
              clearErrors();
              form.handleChange(e);
            }}
            onBlur={form.handleBlur}
            error={(form.touched.password && form.errors.password) ?? error}
            type="password"
            disabled={loading}
            errorAbsolutePosition={true}
          />
        </InputsWrapper>
        <ButtonWrapper>
          <CustomButton
            label="Log In"
            onClick={form.submitForm}
            style={{
              height: isMobile || isTable ? '34px' : '48px',
              width: isMobile ? '93px' : isTable ? '89px' : '127px',
              ...(isMobile || isTable ? { borderColor: isLight ? '#25273D' : '#343442' } : {}),
            }}
            type="submit"
            disabled={loading || !!error || Object.keys(form.errors).length > 0}
          />
        </ButtonWrapper>
      </Form>
      <RequestContainer>
        <RequestText>Don't have your Log In credentials yet?</RequestText>
        <ExternalLinkText href="https://discord.gg/UJpfgQDA" asLi={false}>
          Request Access
        </ExternalLinkText>
      </RequestContainer>
    </Container>
  );
};

export default LoginForm;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Title = styled('h1')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  textAlign: 'center',
  letterSpacing: 0.4,
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  marginTop: 24,
  marginBottom: 0,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
    fontSize: 32,
    lineHeight: '39px',
  },
}));

const Description = styled('h3')(({ theme }) => ({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  textAlign: 'center',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  marginBottom: 42,
  maxWidth: 294,

  [lightTheme.breakpoints.up('tablet_768')]: {
    maxWidth: '100%',
    marginBottom: 64,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 42,
  },
}));

export const ButtonWrapper = styled('div')({
  alignSelf: 'flex-end',
});

export const InputsWrapper = styled('div')({
  width: '100%',
  marginBottom: 40,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 64,
  },
});

export const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const RequestContainer = styled('div')({
  display: 'block',
  width: '100%',
  textAlign: 'center',
  marginTop: 48,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
  },
});

const RequestText = styled('div')(({ theme }) => ({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  marginBottom: 2,
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));

const LinkStyled = styled(Link)({
  display: 'flex',
});

const LogoContainerDesk = styled('div')(({ theme }) => ({
  display: 'flex',
  '& path:first-of-type': {
    fill: theme.palette.isLight ? '#050505' : theme.palette.colors.charcoal[100],
  },
}));
