import { styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import FiltersBundle from '@/components/FiltersBundle/FiltersBundle';
import type { Filter } from '@/components/FiltersBundle/types';
import FinancesTitle from '@/views/Finances/components/FinancesTitle/FinancesTitle';
import BreakdownChart from './BreakdownChart/BreakdownChart';
import BreakdownChartSkeleton from './BreakdownChart/BreakdownChartSkeleton';
import type { BreakdownChartSeriesData } from '../../utils/types';
import type { AnalyticGranularity, AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { EChartsOption } from 'echarts-for-react';

export interface BreakdownChartSectionProps {
  isLoading: boolean;
  selectedMetric: AnalyticMetric;
  selectedGranularity: AnalyticGranularity;
  year: string;
  series: BreakdownChartSeriesData[];
  handleToggleSeries: (series: string) => void;
  refBreakDownChart: React.RefObject<EChartsOption | null>;
  filters: Filter[];
  canReset: boolean;
  onReset: () => void;
  showLegendValue?: boolean;
  isChecked: boolean;
  handleChangeSwitch: () => void;
  showScrollAndToggle?: boolean;
}

const BreakdownChartSection: React.FC<BreakdownChartSectionProps> = ({
  isLoading,
  year,
  selectedMetric,
  selectedGranularity,
  series,
  handleToggleSeries,
  refBreakDownChart,
  filters,
  onReset,
  canReset,
  showLegendValue,
  isChecked,
  handleChangeSwitch,
  showScrollAndToggle,
}) => (
  <Section>
    <HeaderContainer>
      <FinancesTitle
        year={year}
        title="Breakdown Chart"
        tooltip="Explore MakerDAO's financial distribution across the 'MakerDAO Legacy', 'Atlas Immutable', and 'Scope Framework' budgets from 2021-2024. This tool helps track allocation efficiency, identify funding fluctuations, and pinpoint transitions between legacy and endgame budgets."
      />

      <FilterContainer>
        <FiltersBundle
          asPopover={[]}
          filters={filters}
          resetFilters={{
            canReset,
            onReset,
          }}
          snapPoints={[490, 400, 250, 0]}
        />
      </FilterContainer>
    </HeaderContainer>

    {isLoading ? (
      <Wrapper>
        <BreakdownChartSkeleton />
      </Wrapper>
    ) : (
      <Wrapper>
        <BreakdownChart
          handleChangeSwitch={handleChangeSwitch}
          isChecked={isChecked}
          year={year}
          selectedGranularity={selectedGranularity as AnalyticGranularity}
          series={series}
          handleToggleSeries={handleToggleSeries}
          refBreakDownChart={refBreakDownChart}
          selectedMetric={selectedMetric}
          showLegendValue={showLegendValue}
          showScrollAndToggle={showScrollAndToggle}
        />
      </Wrapper>
    )}
  </Section>
);

export default BreakdownChartSection;

const Section = styled(Card)(({ theme }) => ({
  width: '100%',

  padding: '8px 8px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: 24,
  },
}));

const HeaderContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const Wrapper = styled('div')(({ theme }) => ({
  marginTop: 16,
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
  },
}));

const FilterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginBottom: 22,
  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 20,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 26,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginBottom: 22,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginBottom: 22,
  },
}));
