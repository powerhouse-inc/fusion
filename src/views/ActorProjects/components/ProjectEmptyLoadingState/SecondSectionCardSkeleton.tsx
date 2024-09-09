import { styled } from '@mui/material';
import SkeletonEmptyCard from './SkeletonEmptyCard';

const SecondSectionCardSkeleton = () => (
  <Container>
    <SkeletonEmptyCard />
  </Container>
);

export default SecondSectionCardSkeleton;

const Container = styled('div')(() => ({
  width: '100%',
}));
