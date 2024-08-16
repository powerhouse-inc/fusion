// All comments will be removed in future PRs
import { styled } from '@mui/material';
import ExpenseMetrics from '@/views/Finances/components/ExpenseMetrics/ExpenseMetrics';
import type { CumulativeType } from '@/views/Finances/components/ExpenseMetrics/useExpenseMetrics';
import type { LineChartSeriesData } from '@/views/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { FC } from 'react';

interface Props {
  expenseMetrics: {
    title: string;
    handleGranularityChange: (value: AnalyticGranularity) => void;
    selectedGranularity: AnalyticGranularity;
    isCumulative: boolean;
    handleToggleCumulative: () => void;
    cumulativeType: CumulativeType;
    handleChangeCumulativeType: (value: CumulativeType) => void;
    series: LineChartSeriesData[];
    handleToggleSeries: (series: string) => void;
    year: string;
    isLoading: boolean;
  };
}

const ExpenseMetricsSection: FC<Props> = ({ expenseMetrics }) => (
  <Container>
    <ExpenseMetrics {...expenseMetrics} />
    <CurrencyBreakdown />
  </Container>
);

export default ExpenseMetricsSection;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
  marginTop: 24,

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 32,
  },
}));

// temporary
const CurrencyBreakdown = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: '1px solid red',
}));
