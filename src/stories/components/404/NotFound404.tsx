import { Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Background404 from '../../../../public/assets/img/background-404.png';
import Background404Dark from '../../../../public/assets/img/background-dark-404.png';
import BackgroundMobile404 from '../../../../public/assets/img/background-mobile-404.png';
import BackgroundMobile404Dark from '../../../../public/assets/img/background-mobile-dark-404.png';
import Logo404 from '../../../../public/assets/img/logo-404.png';
import Logo404Dark from '../../../../public/assets/img/logo-dark-404.png';
import { CustomButton } from '../CustomButton/CustomButton';
import type { Theme } from '@mui/material';
import type { FC } from 'react';

const NotFound404: FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const handleOnclick = () => {
    router.push('/');
  };
  return (
    <Wrapper>
      <ImageContainer>
        <Image
          src={
            theme.palette.isLight
              ? isMobile
                ? BackgroundMobile404
                : Background404
              : isMobile
              ? BackgroundMobile404Dark
              : Background404Dark
          }
          objectFit="fill"
          alt="404"
          layout="fill"
        />
        <ContainerData>
          <LogoContainer>
            <Image
              src={theme.palette.isLight ? Logo404 : Logo404Dark}
              alt=""
              layout="fill"
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
          </LogoContainer>
          <ContainerText>
            <TextUps>Oops!</TextUps>
            <TextDescription>The page you requested couldn't be found</TextDescription>
          </ContainerText>
          <ContainerButton>
            <StyledCustomButton label="Go Back to Homepage" allowsHover={false} onClick={handleOnclick} />
          </ContainerButton>
        </ContainerData>
      </ImageContainer>
    </Wrapper>
  );
};

export default NotFound404;

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  marginTop: '132px',
  paddingBottom: '128px',

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: '128px',
  },
}));

const ImageContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  paddingTop: '110px',
  marginTop: '90px',
  maxWidth: '343px',
  margin: '0 auto',
  '& > span': {
    borderRadius: '6px',
    background: theme.palette.isLight ? '#FFFFFF' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
    boxShadow: theme.palette.isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  },
  borderRadius: '20px',

  [theme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    paddingTop: '128px',
    maxWidth: '769px',
    margin: '0 auto',
  },
  [theme.breakpoints.between('desktop_1280', 'desktop_1920')]: {
    paddingTop: '58px',
    maxWidth: '1184px',
    margin: '0 auto',
  },
  [theme.breakpoints.up('desktop_1920')]: {
    paddingTop: '58px',
    maxWidth: '1412px',
    margin: '0 auto',
    height: '785px',
  },
}));

const ContainerData = styled('div')(() => ({
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const LogoContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'block',
  width: '279px',
  height: '164px',
  marginBottom: '64px',
  marginLeft: '32px',
  marginRight: '32px',

  [theme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    marginBottom: '160px',
    width: '580px',
    height: '340px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginBottom: '37.26px',
    width: '675px',
    height: '397.74px',
  },
}));

const ContainerText = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: '32px',
  paddingLeft: '32px',
  maxWidth: '343px',

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: '100%',
  },
}));

const TextUps = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '36px',
  lineHeight: '43px',
  letterSpacing: '0.4px',
  color: theme.palette.isLight ? '#787A9B' : '#D2D4EF',
  textAlign: 'center',
  marginBottom: '24px',

  [theme.breakpoints.up('tablet_768')]: {
    fontWeight: 700,
    fontSize: '48px',
    lineHeight: '58px',
    marginBottom: '32px',
  },
}));

const TextDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: '#ADAFD4',
  marginBottom: '64px',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '24px',
    lineHeight: '29px',
    marginBottom: '40px',
  },
}));

const ContainerButton = styled('div')(({ theme }) => ({
  paddingBottom: '83px',

  [theme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    paddingBottom: '156px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingBottom: '84px',
  },
}));

const StyledCustomButton = styled(CustomButton)(({ theme }) => ({
  padding: '4px 24px',
  border: 'none',
  borderRadius: 8,
  backgroundColor: theme.palette.colors.sky[1000],
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
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: -0.32,
    color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
  },
}));
