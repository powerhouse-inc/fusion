import { useTheme } from '@mui/material';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import type { Filter } from '@/components/FiltersBundle/types';
import { fetchAnalytics } from '@/views/Finances/api/queries';
import type { LineChartSeriesData } from '@/views/Finances/utils/types';
import { buildExpenseMetricsLineChartSeries } from '@/views/Finances/utils/utils';
import type { AnalyticGranularity, AnalyticMetric, AnalyticSeriesRow } from '@ses/core/models/interfaces/analytic';

export type CumulativeType = 'relative' | 'absolute';

export const useExpenseMetrics = (year: string) => {
  const theme = useTheme();

  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const [isCumulative, setIsCumulative] = useState(false);
  const [cumulativeType, setCumulativeType] = useState<CumulativeType>('relative');

  const router = useRouter();
  const urlPath = Array.isArray(router.query.path) ? router.query.path.join('/') : router.query.path;
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas';
  const levelOfDetail = codePath === 'atlas' ? 1 : codePath.split('/').length;

  // fetch actual data from the API
  const { data: analytics, error } = useSWRImmutable([selectedGranularity, year, codePath, levelOfDetail], async () =>
    fetchAnalytics(selectedGranularity, year, codePath, levelOfDetail)
  );

  const handleChangeCumulativeType = (value: CumulativeType) => {
    setCumulativeType(value);
  };
  const handleToggleCumulative = () => {
    setIsCumulative((prev) => !prev);
    setCumulativeType('relative');
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

  const filters: Filter[] = [
    {
      type: 'select',
      id: 'granularity',
      label: 'Granularity',
      options: granularityItems,
      selected: selectedGranularity,
      onChange: (value: string | number | (string | number)[]) => {
        setSelectedGranularity(value as AnalyticGranularity);
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
      handleChangeCumulativeType,
      handleToggleCumulative,
    },
  ];

  const canReset = selectedGranularity !== 'monthly' || isCumulative;

  const onReset = () => {
    setSelectedGranularity('monthly');
    setIsCumulative(false);
    setCumulativeType('relative');
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
