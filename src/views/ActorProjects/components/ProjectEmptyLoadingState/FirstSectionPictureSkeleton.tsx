import { Skeleton, styled } from '@mui/material';
import Card from '@/components/Card/Card';

const FirstSectionPictureSkeleton = () => (
  <Container>
    <Skeleton variant="rectangular" width="100%" height="100%" />
    <Union>
      <svg viewBox="0 0 425 230" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M288.516 140.59C276.97 160.613 248.071 160.607 236.533 140.579L161.354 10.0817C153.66 -3.2734 134.388 -3.27342 126.694 10.0817L0 230H425L348.304 97.001C340.608 83.6558 321.348 83.6558 313.653 97.001L288.516 140.59Z"
          fill="none"
        />
      </svg>
    </Union>
    <Circle variant="circular" animation={false} />
  </Container>
);
export default FirstSectionPictureSkeleton;

const Container = styled(Card)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 200,
  padding: 10,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800]}`,
  boxShadow: 'none',

  '& .MuiSkeleton-circular': {
    backgroundColor: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],
  },

  [theme.breakpoints.up('tablet_768')]: {
    height: 320,
    padding: 20,
  },
}));

const Union = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 34,
  right: 40,
  top: 63,
  height: 127,
  margin: '0 auto',
  zIndex: 1,

  '& > svg': {
    width: '100%',
    height: 127,
    '& > path': {
      fill: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],
    },
  },

  [theme.breakpoints.up('tablet_768')]: {
    top: 50,
    height: 250,
    '& > svg': {
      height: 250,
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    left: 46,
    right: 54,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    left: 62,
    right: 72,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    left: 102,
    right: 113,
  },
}));

const Circle = styled(Skeleton)(({ theme }) => ({
  position: 'absolute',
  right: 50,
  top: 40,
  width: 56,
  height: 56,
  zIndex: 2,

  [theme.breakpoints.up('tablet_768')]: {
    right: 45,
    top: 32,
    width: 60,
    height: 60,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    right: 69,
    width: 76,
    height: 76,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    right: 85,
    width: 96,
    height: 96,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    right: 102,
  },
}));
