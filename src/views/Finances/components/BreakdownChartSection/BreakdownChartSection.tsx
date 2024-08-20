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
  showLegendValue?: boolean;
  isChecked: boolean;
  handleChangeSwitch: () => void;
  showScrollAndToggle?: boolean;
}

const BreakdownChartSection: React.FC<BreakdownChartSectionProps> = ({
  // TODO: Work in progress. For the update the filters
  isLoading,
  year,
  selectedMetric,
  selectedGranularity,
  series,
  handleToggleSeries,
  refBreakDownChart,
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
      <div>Filters</div>
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

const Wrapper = styled('div')(({ theme }) => ({
  marginTop: 16,
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
  },
}));
