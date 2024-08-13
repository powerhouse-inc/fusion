// Work in progress (WIP)
import { IconButton, styled } from '@mui/material';

import ArrowUpIcon from 'public/assets/svg/fusion_arrow_up.svg';

import type { FC } from 'react';

const HomeButton: FC = () => (
  <Container>
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

export default HomeButton;

const Container = styled('div')(({ theme }) => ({
  position: 'fixed',
  display: 'none', // temporary
  // display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bottom: 50,
  right: 100,
  width: 50,
  height: 50,
  zIndex: 100,

  [theme.breakpoints.up('tablet_768')]: {},
}));

const GoUpButton = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 4,
  borderRadius: 6,

  '&:hover, &:active, &:focus': {},

  '& > svg path': {},

  [theme.breakpoints.up('tablet_768')]: {},
}));
