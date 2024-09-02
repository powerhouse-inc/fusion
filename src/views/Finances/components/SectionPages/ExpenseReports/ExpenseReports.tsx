import { styled } from '@mui/material';
import TableEmptyState from '@/components/TableEmptyState/TableEmptyState';
import BigButton from '@/views/CoreUnitAbout/components/Button/BigButton/BigButton';
import FinancesTitle from '@/views/Finances/components/FinancesTitle/FinancesTitle';
import type { DelegateExpenseTableHeader } from '@/views/Finances/utils/types';
import DelegateExpenseTrendItem from '../../DelegateExpenseTrend/DelegateExpenseTrendItem';
import HeaderDelegateExpense from '../../DelegateExpenseTrend/HeaderDelegateExpense';
import ExpenseReportsFilters from './ExpenseReportsFilters';
import ExpenseReportsItemsSkeleton from './ExpenseReportsItemsSkeleton';
import type { ExpenseReportsFiltersProps } from './ExpenseReportsFilters';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { FC } from 'react';
import type { SWRInfiniteResponse } from 'swr/infinite';

interface Props extends ExpenseReportsFiltersProps {
  year: string;
  columns: DelegateExpenseTableHeader[];
  sortClick: (index: number) => void;
  expenseReportResponse: SWRInfiniteResponse<BudgetStatement[], unknown>;
  hasExpenseReport: boolean;
}

const ExpenseReports: FC<Props> = ({
  year,
  columns,
  sortClick,
  expenseReportResponse,
  hasExpenseReport,
  ...filterProps // props from ExpenseReportsFiltersProps
}) => {
  const isLoading =
    expenseReportResponse.isLoading ||
    (expenseReportResponse.size > 0 &&
      expenseReportResponse.data &&
      typeof expenseReportResponse.data[expenseReportResponse.size - 1] === 'undefined');

  return (
    <Container>
      <HeaderContainer>
        <FinancesTitle
          year={year}
          title="Budget Statements"
          tooltip={
            <TooltipContent>
              <p>
                Access detailed insights into budget reporting activities, including contributors, reporting month,
                actual expenditures, status, and recent modifications.
              </p>
              <p>
                Click "View" to dive into specific financial data by department, enabling effective monitoring and
                management of fiscal operations.
              </p>
            </TooltipContent>
          }
        />
        <ExpenseReportsFilters {...filterProps} />
      </HeaderContainer>

      {hasExpenseReport && (
        <Header>
          <HeaderDelegateExpense columns={columns} sortClick={sortClick} />
        </Header>
      )}
      <ItemSection>
        {expenseReportResponse.data?.map((page) =>
          page.map((budget) => (
            <DelegateExpenseTrendItem key={budget.id} budget={budget} selectedMetric={filterProps.selectedMetric} />
          ))
        )}
        {isLoading && <ExpenseReportsItemsSkeleton />}
        {!hasExpenseReport && (
          <TableEmptyState description="There are no contributors available with this combination of filters" />
        )}
      </ItemSection>

      {!isLoading &&
        !((expenseReportResponse.data?.[(expenseReportResponse.data?.length ?? 0) - 1]?.length ?? 0) < 10) && (
          <ContainerButton>
            <DividerStyled />
            <BigButtonStyled title={'Load More'} onClick={() => expenseReportResponse.setSize((size) => size + 1)} />
            <DividerStyled />
          </ContainerButton>
        )}
    </Container>
  );
};

export default ExpenseReports;

const Container = styled('div')(() => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
}));

const HeaderContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  marginBottom: 24,
}));

const ItemSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 8,
  },
}));

const Header = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flex: 1,
    width: '100%',
    marginBottom: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
}));

const ContainerButton = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  marginTop: 24,
}));

const DividerStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  borderBottom: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  '&:has(+ button:hover)': {
    borderColor: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700],
  },
}));

const BigButtonStyled = styled(BigButton)(({ theme }) => ({
  minWidth: 127,
  height: 31,
  fontWeight: 600,
  lineHeight: '15px',
  padding: '8px 24px',
  letterSpacing: 1,

  '&:hover': {
    borderColor: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700],
    color: theme.palette.isLight ? theme.palette.colors.slate[300] : theme.palette.colors.charcoal[600],
    backgroundColor: 'transparent',
    '& + div': {
      borderColor: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700],
    },
  },
  '&:active, &:focus': {
    backgroundColor: 'transparent',
  },

  [theme.breakpoints.up('tablet_768')]: {
    minWidth: 207,
    padding: '8px 64px',
  },
}));

const TooltipContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  p: {
    margin: 0,
  },
}));
