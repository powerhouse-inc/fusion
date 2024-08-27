import { styled } from '@mui/material';
import Card from '@/components/Card/Card';
import FiltersBundle from '@/components/FiltersBundle/FiltersBundle';
import type { Filter } from '@/components/FiltersBundle/types';
import FinancesTitle from '@/views/Finances/components/FinancesTitle/FinancesTitle';
import type { LineChartSeriesData } from '@/views/Finances/utils/types';
import ExpenseMetricsChart from './ExpenseMetricsChart/ExpenseMetricsChart';
import ExpenseMetricsSkeleton from './ExpenseMetricsSkeleton';
import type { CumulativeType } from './useExpenseMetrics';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { FC } from 'react';

interface Props {
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
}

const ExpenseMetricsFinances: FC<Props> = ({
  title,
  selectedGranularity,
  isCumulative,
  cumulativeType,
  series,
  handleToggleSeries,
  year,
  isLoading,
  filters,
  canReset,
  onReset,
}) => (
  <Container>
    <Header>
      <FinancesTitle
        year={year}
        title={title}
        tooltip={
          <TooltipContent>
            <p>
              Explore Sky's financial evolution in detail with this advanced line chart, which offers both cumulative
              and flat perspectives on expenses.
            </p>
            <p>
              Select the 'Absolute Cumulative' mode for a continuous tally from inception, providing a comprehensive
              overview of long-term financial movements.
            </p>
            <p>
              Use the 'Relative Cumulative' mode, which resets at the start of each chosen period, to analyze expenses
              within specific intervals.
            </p>
            <p>
              Effortlessly switch between these views to discern overarching fiscal trends or to pinpoint financial
              developments specific to a quarter or year, aiding in strategic decision-making and performance
              assessment.
            </p>
          </TooltipContent>
        }
      />
      <FilterContainer>
        <FiltersBundle
          asPopover={['desktop']}
          filters={filters}
          resetFilters={{
            canReset,
            onReset,
          }}
          snapPoints={[450, 390, 180, 0]}
        />
      </FilterContainer>
    </Header>
    {isLoading ? (
      <ExpenseMetricsSkeleton />
    ) : (
      <ExpenseMetricsChart
        year={year}
        selectedGranularity={selectedGranularity}
        series={series}
        handleToggleSeries={handleToggleSeries}
        isCumulative={isCumulative}
        cumulativeType={cumulativeType}
      />
    )}
  </Container>
);

export default ExpenseMetricsFinances;

const Container = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '8px 8px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px 24px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 584,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 640,
  },
}));

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
});

const TooltipContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  p: {
    margin: 0,
  },
});

const FilterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: 22,

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 20,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 24,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginBottom: 26,
  },
}));
