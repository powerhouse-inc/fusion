import type { Filter } from '@/components/FiltersBundle/types';
import ExpenseMetricsFinances from '@/views/Finances/components/ExpenseMetrics/ExpenseMetricsFinances';
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

const ExpenseMetricsSection: FC<Props> = ({ expenseMetrics }) => <ExpenseMetricsFinances {...expenseMetrics} />;

export default ExpenseMetricsSection;
