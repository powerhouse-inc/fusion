import { styled } from '@mui/material';
import Card from '@/components/Card/Card';

const FirstSectionCardSkeleton = () => <Container>{null}</Container>;

export default FirstSectionCardSkeleton;

const Container = styled(Card)(({ theme }) => ({
  width: '100%',
  height: 200, // temporary
  padding: '8px 16px 16px',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800]}`,
  boxShadow: 'none',
}));
