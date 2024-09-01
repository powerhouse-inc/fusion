import { styled } from '@mui/material';
import DelegateExpenseTrendItemSkeleton from '@/views/Finances/components/DelegateExpenseTrend/DelegateExpenseTrendItemSkeleton';

const ExpenseReportsItemsSkeleton = () => (
  <Container>
    {Array.from({ length: 10 }).map((_, index) => (
      <DelegateExpenseTrendItemSkeleton key={`item-skeleton-${index}`} />
    ))}
  </Container>
);

export default ExpenseReportsItemsSkeleton;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 8,
  },
}));
