'use client';

import 'react-toastify/dist/ReactToastify.css';
import { styled, type IconProps } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import { ToastContainer } from 'react-toastify';
import { Close } from '../svg/close';
import type { ReactElement } from 'react';

interface Props {
  message?: string;
  icon: ReactElement<IconProps>;
  widthContainer?: number;
  borderColor?: string;
  handleClose?: () => void;
}

const Notification = ({
  message = 'Your account has been removed',
  icon,
  widthContainer = 457,
  borderColor = '#B6EDE7',
  handleClose,
}: Props) => (
  <Container width={widthContainer} borderColor={borderColor}>
    <div>{icon}</div>
    <ContainerText>{message}</ContainerText>
    <Close width={10} height={10} onClick={handleClose} />
  </Container>
);

const Container = styled('div', {
  shouldForwardProp: (prop) => !['width', 'borderColor'].includes(prop as string),
})<{ width: number; borderColor: string }>(({ theme, borderColor }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 80,
  background: theme.palette.isLight ? '#FFFFFF' : '#10191F',
  border: `6px solid ${borderColor}`,
  boxShadow: theme.palette.isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '22px',
  padding: '32px 24px',
}));

const ContainerText = styled('p')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  color: theme.palette.isLight ? '#231536' : '#9FAFB9',
  marginTop: 0,
  marginBottom: 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0 10px',

  [lightTheme.breakpoints.down(451)]: {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 16,
  },
}));

export const ContainerNotification = styled(ToastContainer)(() => ({
  '&.Toastify__toast-container': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 475,
    padding: 0,

    [lightTheme.breakpoints.down('tablet_768')]: {
      width: '100%',
      padding: 0,
      margin: '0 auto',
    },
  },

  '& .Toastify__toast': {
    padding: 0,
    background: 'none',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  '& .Toastify__toast-body': {
    padding: 0,
    width: 475,
    boxShadow: 'none',
  },
}));

export default Notification;
