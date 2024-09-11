import type { Filter } from '@/components/FiltersBundle/types';
import ExpenseMetrics from '@/views/Finances/components/ExpenseMetrics/ExpenseMetrics';
import type { CumulativeType } from '@/views/Finances/components/ExpenseMetrics/useExpenseMetrics';
import type { LineChartSeriesData } from '@/views/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { FC } from 'react';

interface Props {
  expenseMetrics: {
    title: string;
    selectedGranularity: AnalyticGranularity;
    isCumulative: boolean;
    cumulativeType: CumulativeType;
    series: LineChartSeriesData[];
    handleToggleSeries: (series: string) => void;
    year: string;
    isLoading: boolean;
    filters: Filter[];
    canReset: boolean;
    onReset: () => void;
  };
}

const ExpenseMetricsSection: FC<Props> = ({ expenseMetrics }) => <ExpenseMetrics {...expenseMetrics} />;

export default ExpenseMetricsSection;
