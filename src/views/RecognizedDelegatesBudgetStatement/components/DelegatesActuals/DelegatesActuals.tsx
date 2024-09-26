import { styled } from '@mui/material';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import BudgetStatementsPlaceholder from '@/components/PlaceHolders/BudgetStatementsPlaceholder';
import type { BudgetStatement } from '@/core/models/interfaces/budgetStatement';
import { ResourceType } from '@/core/models/interfaces/types';
import TransactionLink from '../TransactionLink/TransactionLink';
import { useDelegatesActuals } from './useDelegatesActuals';
import type { DateTime } from 'luxon';
import type { FC } from 'react';

interface Props {
  currentMonth: DateTime;
  budgetStatement: BudgetStatement[];
}

const DelegatesActuals: FC<Props> = ({ currentMonth, budgetStatement }) => {
  const {
    breakdownColumnsActuals,
    breakdownItemsActuals,
    currentBudgetStatement,
    mainTableColumnsActuals,
    mainTableItemsActuals,
  } = useDelegatesActuals(currentMonth, budgetStatement);

  return (
    <Container>
      {currentBudgetStatement && (
        <TransactionLink
          href="https://makerburn.com/#/expenses/core-units/DELEGATES"
          text="Onchain transactions for Recognized Delegates"
        />
      )}
      <TotalsMonth>{currentMonth.toFormat('MMM yyyy')} Totals</TotalsMonth>
      <AdvancedInnerTable
        columns={mainTableColumnsActuals}
        items={mainTableItemsActuals}
        cardSpacingSize="small"
        cardsTotalPosition="top"
        longCode="DEL"
        tablePlaceholder={
          <BudgetStatementsPlaceholder longCode="DEL" shortCode="DEL" resource={ResourceType.Delegates} />
        }
      />
      {mainTableItemsActuals.length > 0 && (
        <TitleBreakdown>{currentMonth.toFormat('MMM yyyy')} Breakdown</TitleBreakdown>
      )}
      {mainTableItemsActuals.length > 0 && (
        <AdvancedInnerTable
          columns={breakdownColumnsActuals}
          items={breakdownItemsActuals}
          cardSpacingSize="small"
          longCode="DEL"
          tablePlaceholder={
            <BudgetStatementsPlaceholder longCode="DEL" shortCode="DEL" resource={ResourceType.Delegates} />
          }
        />
      )}
    </Container>
  );
};

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const TotalsMonth = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  marginTop: 24,
  marginBottom: 16,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    lineHeight: '21.6px',
  },
}));

const TitleBreakdown = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '19px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  marginTop: 32,
  marginBottom: 16,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    lineHeight: '21.6px',
  },
}));

export default DelegatesActuals;
