import { styled, useMediaQuery } from '@mui/material';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import type { BudgetStatement } from '@/core/models/interfaces/budgetStatement';
import { ResourceType } from '@/core/models/interfaces/types';
import { TransparencyEmptyTable } from '@/views/CoreUnitBudgetStatement/components/Placeholders/TransparencyEmptyTable';
import { useDelegatesActuals } from './useDelegatesActuals';
import type { Theme } from '@mui/material';
import type { DateTime } from 'luxon';
import type { FC } from 'react';

interface Props {
  currentMonth: DateTime;
  budgetStatement: BudgetStatement[];
}

const DelegatesActuals: FC<Props> = ({ currentMonth, budgetStatement }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
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
        <TransactionLink>
          View the
          <CustomLink
            children="onchain transactions for recognized delegates"
            href="https://makerburn.com/#/expenses/core-units/DELEGATES"
            fontSize={isMobile ? 14 : 16}
            lineHeight="18px"
            iconWidth={10}
            iconHeight={10}
          />
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

const TransactionLink = styled('div')(({ theme }) => ({
  display: 'inline',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  marginBottom: 32,
  '& > a ': {
    whiteSpace: 'unset',
  },
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'block',
    fontSize: 16,
    lineHeight: '22px',
    '& > a ': {
      fontSize: 16,
      lineHeight: '18px',
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
  marginBottom: 16,

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 24,
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
