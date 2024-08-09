import { styled } from '@mui/material';
import ArrowSelect from 'public/assets/svg/arrow_select.svg';
import Login from 'public/assets/svg/login.svg';
import React from 'react';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';

interface Props {
  username?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isOpen: boolean;
}

const UserBadge: React.FC<Props> = ({ onClick, username, style, isOpen }) => (
  <>
    <Container className="no-select" style={style} onClick={onClick}>
      <ContainerArrow>
        <ContainerIconLogin>
          <LoginContainerIcon>
            <Login />
          </LoginContainerIcon>
          <UserName>{username ?? 'Username'}</UserName>
        </ContainerIconLogin>

        <IconContainer isOpen={isOpen}>
          <ArrowSelect />
        </IconContainer>
      </ContainerArrow>
    </Container>

    <CircleAvatarStyledWithoutName name={username ?? 'Username'} onClick={onClick} />
  </>
);

export default UserBadge;

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.isLight ? '#504DFF' : '#504DFF',

  border: theme.palette.isLight ? '1px solid #D4D9E1' : '1px solid #343442',
  borderRadius: 8,
  padding: '5px 8px 5px 8px',
  position: 'relative',
  display: 'none',
  alignItems: 'center',
  width: 'fit-content',
  height: 32,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: theme.palette.isLight ? '#403ECC;' : '#615EFF',
    color: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[50],
  },
  ':disabled': {
    backgroundColor: theme.palette.isLight ? 'rgba(80, 77, 255, 0.50)' : 'rgba(80, 77, 255, 0.50)',
    color: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[500],
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: theme.palette.isLight ? 'rgba(80, 77, 255, 0.50)' : 'rgba(80, 77, 255, 0.50)',
      color: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[500],
    },
  },

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'none',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
  },
}));

const UserName = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
}));

const CircleAvatarStyledWithoutName = styled(CircleAvatar)(({ theme }) => ({
  width: 35,
  height: 35,
  minWidth: 35,
  minHeight: 35,

  backgroundColor: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#708390'}`,
  cursor: 'pointer',
  color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
  fontSize: 14,
  display: 'flex',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'none',
  },
}));

const ContainerIconLogin = styled('div')({
  display: 'flex',

  gap: 8,
  alignItems: 'center',
});

const IconContainer = styled('div')<{ isOpen: boolean }>(({ isOpen, theme }) => ({
  display: 'flex',
  width: 16,
  height: 6,
  transform: isOpen ? 'scaleY(-1)' : 'scaleY(1)',
  transition: 'transform 0.3s ease-in-out',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
  },
}));

const LoginContainerIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  width: 16,
  height: 16,
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
  },
}));

const ContainerArrow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});
