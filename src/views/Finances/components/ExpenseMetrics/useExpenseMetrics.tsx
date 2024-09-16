import { useTheme } from '@mui/material';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import type { Filter } from '@/components/FiltersBundle/types';
import useRestorationFromUrlState from '@/core/hooks/useRestorationFromUrlState';
import { fetchAnalytics } from '@/views/Finances/api/queries';
import type { LineChartSeriesData } from '@/views/Finances/utils/types';
import { buildExpenseMetricsLineChartSeries } from '@/views/Finances/utils/utils';
import { FinancesSectionId } from '../../types';
import type { AnalyticGranularity, AnalyticMetric, AnalyticSeriesRow } from '@ses/core/models/interfaces/analytic';

export type CumulativeType = 'relative' | 'absolute';
const DEFAULT_GRANULARITY = 'monthly';
const DEFAULT_CUMULATIVE = false;
const DEFAULT_CUMULATIVE_TYPE = 'relative';

export const useExpenseMetrics = (year: string) => {
  const theme = useTheme();

  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>(DEFAULT_GRANULARITY);
  const [isCumulative, setIsCumulative] = useState(DEFAULT_CUMULATIVE);
  const [cumulativeType, setCumulativeType] = useState<CumulativeType>(DEFAULT_CUMULATIVE_TYPE);

  const router = useRouter();
  const urlPath = Array.isArray(router.query.path) ? router.query.path.join('/') : router.query.path;
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas';
  const levelOfDetail = codePath === 'atlas' ? 1 : codePath.split('/').length;

  const { handleCurrentSectionStateUpdate } = useRestorationFromUrlState(FinancesSectionId.EXPENSE_METRICS, (state) => {
    if (state?.granularity && state.granularity.length > 0) {
      setSelectedGranularity(state.granularity[0] as AnalyticGranularity);
    }
    if (state?.cumulative && state.cumulative.length > 0) {
      setIsCumulative(Boolean(state.cumulative[0]));
    }
    if (state?.cumulativeType && state.cumulativeType.length > 0) {
      setCumulativeType(state.cumulativeType[0] as CumulativeType);
    }
  });

  // fetch actual data from the API
  const { data: analytics, error } = useSWRImmutable([selectedGranularity, year, codePath, levelOfDetail], async () =>
    fetchAnalytics(selectedGranularity, year, codePath, levelOfDetail)
  );

  const handleChangeCumulativeType = (value: CumulativeType) => {
    setCumulativeType(value);
    handleCurrentSectionStateUpdate({ cumulativeType: value });
  };
  const handleToggleCumulative = () => {
    setIsCumulative(!isCumulative);
    setCumulativeType(DEFAULT_CUMULATIVE_TYPE);
    handleCurrentSectionStateUpdate({
      cumulative: (!isCumulative).toString(),
      cumulativeType: DEFAULT_CUMULATIVE_TYPE,
    });
  };

  const isLoading = !analytics && !error;

  const data = useMemo(() => {
    const data = {
      budget: [] as number[],
      forecast: [] as number[],
      actuals: [] as number[],
      onChain: [] as number[],
      protocolNetOutflow: [] as number[],
    };
    if (!analytics || !analytics.series?.length) {
      // return 0 values to avoid having an empty UI
      Object.keys(data).forEach((key) => {
        data[key as keyof typeof data] = Array(
          selectedGranularity === 'monthly' ? 12 : selectedGranularity === 'quarterly' ? 4 : 1
        ).fill(0);
      });
      return data;
    }

    // some metrics can be added if they're from future dates
    const currentDate = DateTime.utc();
    const isCurrentYear = currentDate.year === parseInt(year, 10);
    const canAddItem = (index: number) => {
      if (!isCurrentYear) return true;

      if (selectedGranularity === 'monthly') return index < currentDate.month;
      if (selectedGranularity === 'quarterly') return index < currentDate.quarter;

      return true;
    };

    const runningTotal = {
      budget: 0,
      forecast: 0,
      actuals: 0,
      onChain: 0,
      protocolNetOutflow: 0,
    };

    const getMetricItem = (rows: AnalyticSeriesRow[], metric: AnalyticMetric) => {
      const item = rows.find((row) => row.metric === metric) ?? {
        value: 0,
        sum: 0,
      };

      return item;
    };

    analytics.series.forEach((item, index) => {
      const budgetItem = getMetricItem(item.rows, 'Budget');
      const forecastItem = getMetricItem(item.rows, 'Forecast');
      const actualsItem = getMetricItem(item.rows, 'Actuals');
      const onChainItem = getMetricItem(item.rows, 'PaymentsOnChain');
      const protocolNetOutflowItem = getMetricItem(item.rows, 'ProtocolNetOutflow');
      // absolute starts from the cumulative sum from the very start (2021) till the end of the previous period (year)
      // while relative starts form 0
      if (isCumulative && cumulativeType === 'absolute' && index === 0) {
        runningTotal.budget = budgetItem.sum - budgetItem.value;
        runningTotal.forecast = forecastItem.sum - forecastItem.value;
        runningTotal.actuals = actualsItem.sum - actualsItem.value;
        runningTotal.onChain = onChainItem.sum - onChainItem.value;
        runningTotal.protocolNetOutflow = protocolNetOutflowItem.sum - protocolNetOutflowItem.value;
      }

      if (isCumulative) {
        // add the current value to the running total to get the cumulative sum
        runningTotal.budget += budgetItem.value;
        runningTotal.forecast += forecastItem.value;
        runningTotal.actuals += actualsItem.value;
        runningTotal.onChain += onChainItem.value;
        runningTotal.protocolNetOutflow += protocolNetOutflowItem.value;
      }

      data.budget.push(isCumulative ? runningTotal.budget : budgetItem.value);
      data.forecast.push(isCumulative ? runningTotal.forecast : forecastItem.value);

      if (canAddItem(index)) {
        data.actuals.push(isCumulative ? runningTotal.actuals : actualsItem.value);
        data.onChain.push(isCumulative ? runningTotal.onChain : onChainItem.value);
        data.protocolNetOutflow.push(isCumulative ? runningTotal.protocolNetOutflow : protocolNetOutflowItem.value);
      }
    });

    return data;
  }, [analytics, cumulativeType, isCumulative, selectedGranularity, year]);

  // series to be "hidden" in the line chart
  const [inactiveSeries, setInactiveSeries] = useState<string[]>([]);
  const handleToggleSeries = (toggleSeries: string) => {
    setInactiveSeries(
      inactiveSeries.includes(toggleSeries)
        ? inactiveSeries.filter((series) => series !== toggleSeries)
        : [...inactiveSeries, toggleSeries]
    );
  };

  const series: LineChartSeriesData[] = useMemo(
    () => buildExpenseMetricsLineChartSeries(data, inactiveSeries, theme.palette.isLight, selectedGranularity),
    [data, inactiveSeries, theme.palette.isLight, selectedGranularity]
  );

  const granularityItems = [
    {
      label: 'Monthly',
      value: 'monthly',
    },
    {
      label: 'Quarterly',
      value: 'quarterly',
    },
    {
      label: 'Annually',
      value: 'annual',
    },
  ];
  const cumulativeItems = [
    {
      label: 'Relative Cumulative',
      description: 'Aggregated expense metrics relative to the start of the year.',
      value: 'relative',
    },
    {
      label: 'Absolute Cumulative',
      description: 'A continuous aggregation of expenses over the entire dataset.',
      value: 'absolute',
    },
  ];

  const filters: Filter[] = [
    {
      type: 'select',
      id: 'granularity',
      label: 'Granularity',
      options: granularityItems,
      selected: selectedGranularity,
      onChange: (value: string | number | (string | number)[]) => {
        setSelectedGranularity(value as AnalyticGranularity);
        handleCurrentSectionStateUpdate({ granularity: value as string });
      },
      widthStyles: {
        width: 'fit-content',
      },
    },
    {
      type: 'cumulative',
      id: 'cumulative',
      label: 'Cumulative',
      cumulativeType,
      isCumulative,
      onChange: () => null,
      handleChangeCumulativeType,
      handleToggleCumulative,
      selected: isCumulative,
      options: cumulativeItems,
    },
  ];

  const canReset = selectedGranularity !== 'monthly' || isCumulative;

  const onReset = () => {
    setSelectedGranularity(DEFAULT_GRANULARITY);
    setIsCumulative(DEFAULT_CUMULATIVE);
    setCumulativeType(DEFAULT_CUMULATIVE_TYPE);
    handleCurrentSectionStateUpdate({
      granularity: DEFAULT_GRANULARITY,
      cumulative: DEFAULT_CUMULATIVE.toString(),
      cumulativeType: DEFAULT_CUMULATIVE_TYPE,
    });
  };

  return {
    selectedGranularity,
    isCumulative,
    cumulativeType,
    isLoading,
    series,
    handleToggleSeries,
    filters,
    canReset,
    onReset,
    handleChangeCumulativeType,
    handleToggleCumulative,
  };
};
