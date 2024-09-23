import { styled } from '@mui/material';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import type { BudgetStatement } from '@/core/models/interfaces/budgetStatement';
import { ResourceType } from '@/core/models/interfaces/types';
import { TransparencyEmptyTable } from '@/views/CoreUnitBudgetStatement/components/Placeholders/TransparencyEmptyTable';
import { useDelegatesForecast } from './useDelegatesForecast';
import type { DateTime } from 'luxon';
import type { FC } from 'react';

interface Props {
  currentMonth: DateTime;
  budgetStatement: BudgetStatement[];
}

const DelegatesForecast: FC<Props> = ({ currentMonth, budgetStatement }) => {
  const { breakdownHeadersForecast, breakdownItemsForecast, mainTableColumnsForecast, mainTableItemsForecast } =
    useDelegatesForecast(currentMonth, budgetStatement);

  return (
    <Container>
      <TotalsMonth>{currentMonth.toFormat('MMM yyyy')} Totals</TotalsMonth>
      <AdvancedInnerTable
        columns={mainTableColumnsForecast}
        items={mainTableItemsForecast}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition="top"
        longCode="DEL"
        tablePlaceholder={
          <TransparencyEmptyTable breakdown longCode="DEL" shortCode="DEL" resource={ResourceType.Delegates} />
        }
      />
      {mainTableItemsForecast.length > 0 && (
        <TitleBreakdown>{currentMonth.toFormat('MMM yyyy')} Breakdown</TitleBreakdown>
      )}

      {mainTableItemsForecast.length > 0 && (
        <AdvancedInnerTable
          columns={breakdownHeadersForecast}
          items={breakdownItemsForecast}
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

export default DelegatesForecast;
