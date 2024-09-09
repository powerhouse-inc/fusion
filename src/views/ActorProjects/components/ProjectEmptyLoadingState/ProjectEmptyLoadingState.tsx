import { Skeleton, styled } from '@mui/material';
import FirstSectionCardSkeleton from '@/views/ActorProjects/components/ProjectEmptyLoadingState/FirstSectionCardSkeleton';
import FirstSectionPictureSkeleton from '@/views/ActorProjects/components/ProjectEmptyLoadingState/FirstSectionPictureSkeleton';
import SecondSectionCardSkeleton from '@/views/ActorProjects/components/ProjectEmptyLoadingState/SecondSectionCardSkeleton';
import type { FC } from 'react';

interface ProjectEmptyLoadingStateProps {
  text: string;
}

const ProjectEmptyLoadingState: FC<ProjectEmptyLoadingStateProps> = ({ text }) => (
  <Container>
    <FirstSection>
      <FirstSectionPictureSkeleton />
      <FirstSectionCardSkeleton />
    </FirstSection>
    <RectangleSkeleton variant="rounded" />
    <SecondSection>
      <SecondSectionCardSkeleton />
      <SecondSectionCardSkeleton />
      <SecondSectionCardSkeleton />
    </SecondSection>
    <Text>{text}</Text>
  </Container>
);

export default ProjectEmptyLoadingState;

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',

  '& .MuiSkeleton-root': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],
  },
  '& .MuiSkeleton-rounded': {
    borderRadius: 6,
  },
}));

const FirstSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 24,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const RectangleSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 217,
  height: 22,
  borderRadius: 4,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 137,
  },
}));

const SecondSection = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 24,
  width: '100%',

  '& > div:nth-of-type(2), & > div:last-of-type': {
    display: 'none',
  },

  [theme.breakpoints.up('tablet_768')]: {
    '& > div:nth-of-type(2)': {
      display: 'block',
    },
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
    '& > div:last-of-type': {
      display: 'block',
    },
  },
}));

const Text = styled('h1')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 257,
  width: 311,
  margin: '0 auto',
  padding: 32,
  fontWeight: 700,
  fontSize: 20,
  lineHeight: '24px',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  background: theme.palette.isLight
    ? 'radial-gradient(50% 50% at 50% 50%, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)'
    : 'radial-gradient(56.43% 56.54% at 50% 50%, rgba(27, 30, 36, 0.60) 0%, rgba(27, 30, 36, 0.00) 100%)',

  [theme.breakpoints.up('tablet_768')]: {
    width: 631,
    padding: '80px 40px',
    fontSize: 24,
    lineHeight: '28.8px',
    background: theme.palette.isLight
      ? 'radial-gradient(50% 50% at 50% 50%, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)'
      : 'radial-gradient(54.52% 54.52% at 50% 50%, rgba(27, 30, 36, 0.60) 0%, rgba(27, 30, 36, 0.00) 100%)',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 814,
    fontSize: 32,
    lineHeight: '38.4px',
    background: theme.palette.isLight
      ? 'radial-gradient(55.84% 55.84% at 50% 50%, rgba(255, 255, 255, 0.60) 0%, rgba(255, 255, 255, 0.00) 100%)'
      : 'radial-gradient(50% 50% at 50% 50%, #1B1E24 0%, rgba(27, 30, 36, 0.00) 73.67%)',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    background: theme.palette.isLight
      ? 'radial-gradient(50% 50% at 50% 50%, #FFF 34.5%, rgba(255, 255, 255, 0.00) 100%)'
      : 'radial-gradient(50% 50% at 50% 50%, #1B1E24 0%, rgba(27, 30, 36, 0.00) 73.67%)',
  },
}));
