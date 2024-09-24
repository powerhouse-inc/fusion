import { styled } from '@mui/material';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import type { BudgetStatement } from '@/core/models/interfaces/budgetStatement';
import { ResourceType } from '@/core/models/interfaces/types';
import { TransparencyEmptyTable } from '@/views/CoreUnitBudgetStatement/components/Placeholders/TransparencyEmptyTable';
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
        <TransactionLink href="https://makerburn.com/#/expenses/core-units/DELEGATES">
          Onchain transactions for Recognized Delegates
        </TransactionLink>
      )}
      <TotalsMonth>{currentMonth.toFormat('MMM yyyy')} Totals</TotalsMonth>
      <AdvancedInnerTable
        columns={mainTableColumnsActuals}
        items={mainTableItemsActuals}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition="top"
        longCode="DEL"
        tablePlaceholder={
          <TransparencyEmptyTable breakdown longCode="DEL" shortCode="DEL" resource={ResourceType.Delegates} />
        }
      />
      {mainTableItemsActuals.length > 0 && (
        <TitleBreakdown>{currentMonth.toFormat('MMM yyyy')} Breakdown</TitleBreakdown>
      )}
      {mainTableItemsActuals.length > 0 && (
        <AdvancedInnerTable
          columns={breakdownColumnsActuals}
          items={breakdownItemsActuals}
          longCode="DEL"
          style={{ marginBottom: '64px' }}
          tablePlaceholder={
            <TransparencyEmptyTable breakdown longCode="DEL" shortCode="DEL" resource={ResourceType.Delegates} />
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

const TransactionLink = styled(ExternalLinkButton)(({ theme }) => ({
  padding: '0px 6px 0px 8px',
  alignItems: 'center',
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  '&:hover': {
    border: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
    }`,
  },
  '& div': {
    width: 16,
    height: 16,
  },

  [theme.breakpoints.up('tablet_768')]: {
    padding: '4px 16px 4px 24px',
    fontSize: 16,
    '& div': {
      width: 20,
      height: 20,
    },
  },
}));

const TotalsMonth = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: theme.palette.isLight ? '#231536' : '#9FAFB9',
  marginTop: 24,
  marginBottom: 16,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

const TitleBreakdown = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  marginTop: 40,
  marginBottom: 32,
  color: theme.palette.isLight ? '#231536' : '#9FAFB9',

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

export default DelegatesActuals;
