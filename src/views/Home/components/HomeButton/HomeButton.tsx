import { IconButton, styled } from '@mui/material';
import ArrowUpIcon from 'public/assets/svg/fusion_arrow_up.svg';
import useHomeButton from './useHomeButton';
import type { FC } from 'react';

const HomeButton: FC = () => {
  useHomeButton();

  return (
    <Container className="home-button">
      <GoUpButton
        aria-label="Home"
        disableRipple
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <ArrowUpIcon />
      </GoUpButton>
    </Container>
  );
};

export default HomeButton;

const Container = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 24,
  right: 8,
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  width: 32,
  height: 32,
  borderRadius: 8,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  opacity: 0.5,
  cursor: 'pointer',
  zIndex: 100,

  '&:hover': { opacity: 1 },

  '&:active, &:focus': {
    opacity: 1,
    border: `1.75px solid ${
      theme.palette.isLight ? theme.palette.colors.sky[400] : theme.palette.colors.charcoal[700]
    }`,

    '& > button > svg path': {
      ...(!theme.palette.isLight && {
        fill: theme.palette.colors.charcoal[100],
      }),
    },
  },

  [theme.breakpoints.up('desktop_1440')]: {
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 12,
  },
}));

const GoUpButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 32,
  height: 32,
  padding: 4,
  borderRadius: 0,

  '& > svg path': {
    ...(!theme.palette.isLight && {
      fill: theme.palette.colors.charcoal[300],
    }),
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 48,
    height: 48,
    padding: 6,
  },
}));
