import { styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import FinancesTitle from '@/views/Finances/components/FinancesTitle/FinancesTitle';
import BreakdownChart from './BreakdownChart/BreakdownChart';
import BreakdownChartSkeleton from './BreakdownChart/BreakdownChartSkeleton';
import type { BreakdownChartSeriesData } from '../../utils/types';
import type { AnalyticGranularity, AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { EChartsOption } from 'echarts-for-react';

export interface BreakdownChartSectionProps {
  isLoading: boolean;
  selectedMetric: AnalyticMetric;
  onMetricChange: (value: AnalyticMetric) => void;
  selectedGranularity: AnalyticGranularity;
  onGranularityChange: (value: AnalyticGranularity) => void;
  year: string;
  isDisabled?: boolean;
  handleResetFilter: () => void;
  series: BreakdownChartSeriesData[];
  handleToggleSeries: (series: string) => void;
  refBreakDownChart: React.RefObject<EChartsOption | null>;
  // isChecked: boolean;
  // handleChangeSwitch: () => void;
}

const BreakdownChartSection: React.FC<BreakdownChartSectionProps> = ({
  // TODO: Work in progress. The commented code below will be removed in future updates.
  isLoading,
  year,
  selectedMetric,
  // onMetricChange,
  selectedGranularity,
  // onGranularityChange,
  // isDisabled,
  // handleResetFilter,
  series,
  handleToggleSeries,
  refBreakDownChart,
  // isChecked,
  // handleChangeSwitch,
}) => (
  <Section>
    <HeaderContainer>
      <FinancesTitle
        year={year}
        title="Breakdown Chart"
        tooltip="Explore MakerDAO's financial distribution across the 'MakerDAO Legacy', 'Atlas Immutable', and 'Scope Framework' budgets from 2021-2024. This tool helps track allocation efficiency, identify funding fluctuations, and pinpoint transitions between legacy and endgame budgets."
      />
      <div>Filters</div>
      {/*  TODO: Work in progress. The commented code below will be removed in future updates. */}
      {/* <BreakdownChartFilter
        selectedMetric={selectedMetric}
        selectedGranularity={selectedGranularity}
        onMetricChange={onMetricChange}
        onGranularityChange={onGranularityChange}
        isDisabled={isDisabled}
        handleResetFilter={handleResetFilter}
      /> */}
    </HeaderContainer>

    {isLoading ? (
      <Wrapper>
        <BreakdownChartSkeleton />
      </Wrapper>
    ) : (
      <Wrapper>
        <BreakdownChart
          // handleChangeSwitch={handleChangeSwitch}
          year={year}
          selectedGranularity={selectedGranularity as AnalyticGranularity}
          series={series}
          handleToggleSeries={handleToggleSeries}
          refBreakDownChart={refBreakDownChart}
          selectedMetric={selectedMetric}
          // isChecked={isChecked}
        />
      </Wrapper>
    )}
  </Section>
);

export default BreakdownChartSection;

const Section = styled(Card)(({ theme }) => ({
  marginTop: 40,
  width: '100%',

  padding: '8px 8px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: 24,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 64,
  },
}));

const HeaderContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const Wrapper = styled('div')({
  marginTop: 32,
});
