import { styled } from '@mui/material';

const Section = styled('section')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 24,
  scrollSnapAlign: 'start',
  scrollMarginTop: 80,

  [theme.breakpoints.up('tablet_768')]: {
    scrollMarginTop: 110,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,
  },
}));

export default Section;
