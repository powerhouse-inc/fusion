import { styled } from '@mui/material';
import Card from '@/components/Card/Card';

const SecondSectionCardSkeleton = () => <Container>{null}</Container>;

export default SecondSectionCardSkeleton;

const Container = styled(Card)(({ theme }) => ({
  width: '100%',
  height: 200, // temporary
  padding: 16,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  boxShadow: theme.fusionShadows.shortShadow,
}));
