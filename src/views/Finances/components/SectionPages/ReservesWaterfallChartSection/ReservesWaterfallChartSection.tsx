import { styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import FiltersBundle from '@/components/FiltersBundle/FiltersBundle';
import type { Filter } from '@/components/FiltersBundle/types';
import type { LegendItemsWaterfall, WaterfallChartSeriesData } from '@/views/Finances/utils/types';
import FinancesTitle from '../../FinancesTitle/FinancesTitle';
import WaterfallChart from '../../WaterfallChart/WaterfallChart';
import WaterfallSkeleton from '../../WaterfallChart/WaterfallSkeleton';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

interface Props {
  title: string;
  legends: LegendItemsWaterfall[];
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: WaterfallChartSeriesData[];
  isLoading: boolean;
  filters: Filter[];
  canReset: boolean;
  onReset: () => void;
  startPoint: number;
}

const ReservesWaterfallChartSection: React.FC<Props> = ({
  title,
  legends,
  selectedGranularity,
  series,
  year,
  isLoading,
  filters,
  canReset,
  onReset,
  startPoint,
}) => (
  <Section>
    <ContainerTitleFilter>
      <FinancesTitle
        year={year}
        title={title}
        tooltip={
          <TooltipContent>
            <p>Monitor the dynamics of Sky's reserves with precision using this interactive financial chart.</p>
            <p>
              It displays detailed inflows, outflows, and net balances, providing a clear picture of fiscal health.
              Customize the analysis by filtering specific data points and adjusting the timeline to suit your needs.{' '}
            </p>
            <p>
              Utilize this tool to identify trends in reserve movements, evaluate the sustainability of reserves, and
              guide strategic financial planning.
            </p>
          </TooltipContent>
        }
      />
      <FilterContainer>
        <FiltersBundle
          asPopover={[]}
          heightForScroll
          filters={filters}
          resetFilters={{
            canReset,
            onReset,
          }}
          snapPoints={[startPoint, 300, 250, 0]}
        />
      </FilterContainer>
    </ContainerTitleFilter>
    <ContainerChart>
      {isLoading ? (
        <WaterfallSkeleton />
      ) : (
        <WaterfallChart legends={legends} year={year} selectedGranularity={selectedGranularity} series={series} />
      )}
    </ContainerChart>
  </Section>
);

export default ReservesWaterfallChartSection;

const ContainerTitleFilter = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

const ContainerChart = styled('div')({
  display: 'flex',
  width: '100%',
});

const Section = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '8px 8px 16px',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
    gap: 24,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px 24px ',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,
    padding: '16px 24px 24px ',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 24px 24px ',
  },
}));

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
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginBottom: 22,
  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 20,
    marginLeft: -12,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 26,
    marginLeft: 'revert',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginBottom: 22,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginBottom: 22,
  },
}));
