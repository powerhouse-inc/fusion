import { styled } from '@mui/material';
import { type FC } from 'react';
import Card from '@/components/Card/Card';
import FiltersBundle from '@/components/FiltersBundle/FiltersBundle';
import type { Filter } from '@/components/FiltersBundle/types';
import { useRelativePositioning } from '@/core/hooks/useDynamicRelativePosition';
import FinancesTitle from '@/views/Finances/components/FinancesTitle/FinancesTitle';
import type { LineChartSeriesData } from '@/views/Finances/utils/types';
import ExpenseMetricsChart from './ExpenseMetricsChart/ExpenseMetricsChart';
import ExpenseMetricsSkeleton from './ExpenseMetricsSkeleton';
import type { CumulativeType } from './useExpenseMetrics';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

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
  filters = [],
  canReset,
  onReset,
}) => {
  const { containerRef, height, shouldPositionBelow, titleRef, filterRef } = useRelativePositioning(title, 24);

  return (
    <Container>
      <Header ref={containerRef}>
        <ContainerFilter ref={titleRef}>
          <FinancesTitle
            year={year}
            title={title}
            tooltip={
              <TooltipContent>
                <p>
                  Explore Sky's financial evolution in detail with this advanced line chart, which offers both
                  cumulative and flat perspectives on expenses.
                </p>
                <p>
                  Select the 'Absolute Cumulative' mode for a continuous tally from inception, providing a comprehensive
                  overview of long-term financial movements.
                </p>
                <p>
                  Use the 'Relative Cumulative' mode, which resets at the start of each chosen period, to analyze
                  expenses within specific intervals.
                </p>
                <p>
                  Effortlessly switch between these views to discern overarching fiscal trends or to pinpoint financial
                  developments specific to a quarter or year, aiding in strategic decision-making and performance
                  assessment.
                </p>
              </TooltipContent>
            }
          />
        </ContainerFilter>
        <FilterContainer ref={filterRef} shouldPositionBelow={shouldPositionBelow} height={height || 0}>
          <FiltersBundle
            asPopover={[]}
            filters={filters}
            resetFilters={{
              canReset,
              onReset,
            }}
            snapPoints={[420, 340, 180, 0]}
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
};

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
    padding: 24,
  },
}));

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  position: 'relative',
  rowGap: 8,
});

const TooltipContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  p: {
    margin: 0,
  },
});

const FilterContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'height' && prop !== 'shouldPositionBelow',
})<{ height: number; shouldPositionBelow: boolean }>(({ theme, height, shouldPositionBelow }) => ({
  [theme.breakpoints.down('mobile_375')]: {
    justifyContent: 'flex-end',
    transition: 'all 0.3s ease',
    ...(shouldPositionBelow
      ? {
          position: 'absolute',
          right: 4,
          bottom: 0,
          marginTop: `${height - 24}px`,
        }
      : {
          position: 'absolute',
          right: 0,
          bottom: 0,
          marginTop: `${height - 24}px`,
        }),
  },
  [theme.breakpoints.up('mobile_375')]: {
    ...(shouldPositionBelow
      ? {
          position: 'absolute',
          right: 4,
          bottom: 0,
          marginTop: `${height - 24}px`,
        }
      : {
          position: 'absolute',
          right: 0,
          paddingLeft: 8,
        }),
  },

  [theme.breakpoints.up('tablet_768')]: {
    position: 'revert',
    marginTop: 'revert',
    marginLeft: -12,
    marginBottom: 20,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 24,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginBottom: 26,
  },
}));

const ContainerFilter = styled('div')(() => ({}));
