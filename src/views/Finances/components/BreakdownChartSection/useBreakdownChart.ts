import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import type { Filter } from '@/components/FiltersBundle/types';
import { getBudgetsAnalytics } from '../../utils/utils';
import { getBarWidth, parseAnalyticsToSeriesBreakDownChart, setBorderRadiusForSeries } from './utils';
import type { SelectItem } from '@ses/components/SingleItemSelect/SingleItemSelect';
import type {
  AnalyticGranularity,
  AnalyticMetric,
  BreakdownBudgetAnalytic,
} from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { EChartsOption } from 'echarts-for-react';

const DEFAULT_METRIC: AnalyticMetric = 'Budget';
const DEFAULT_GRANULARITY: AnalyticGranularity = 'monthly';

const useBreakdownChart = (budgets: Budget[], year: string, codePath: string, allBudgets: Budget[]) => {
  const router = useRouter();
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.up('desktop_1280'));

  const metricItems: SelectItem<AnalyticMetric>[] = useMemo(
    () => [
      {
        label: 'Budget',
        value: 'Budget',
      },
      {
        label: 'Forecast',
        value: 'Forecast',
      },
      {
        label: 'Net Protocol Outflow',
        value: 'ProtocolNetOutflow',
        labelWhenSelected: isMobile ? 'Prtcol Outfl' : 'Protocol Outflow',
      },
      {
        label: 'Net Expenses On-Chain',
        value: 'PaymentsOnChain',
        labelWhenSelected: 'Net On-Chain',
      },
      {
        label: 'Actuals',
        value: 'Actuals',
      },
    ],
    [isMobile]
  );

  const granularityItems: SelectItem<AnalyticGranularity>[] = useMemo(
    () => [
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
    ],
    []
  );

  const [isChecked, setIsChecked] = useState(true);
  // series to be "hidden" in the chart
  const [inactiveSeries, setInactiveSeries] = useState<string[]>([]);
  const levelNumber = codePath.split('/').length;

  const [selectedMetric, setSelectedMetric] = useState<AnalyticMetric>(DEFAULT_METRIC);
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>(DEFAULT_GRANULARITY);

  // update filters from url params
  const [appliedUrlFilters, setAppliedUrlFilters] = useState<boolean>(false);
  useEffect(() => {
    if (appliedUrlFilters) return;
    setAppliedUrlFilters(true); // prevent from applying the filters twice when the component is re-rendered
    if (router.asPath.includes('#breakdown-chart')) {
      const metricInURL = router.query.metric;
      const granularityInURL = router.query.period;

      // update metric if it is valid
      if (
        typeof metricInURL === 'string' &&
        metricItems.map((item) => item.value).includes(metricInURL as AnalyticMetric)
      ) {
        setSelectedMetric(metricInURL as AnalyticMetric);
      }

      // update granularity if it is valid
      if (
        typeof granularityInURL === 'string' &&
        granularityItems.map((item) => item.value).includes(granularityInURL as AnalyticGranularity)
      ) {
        setSelectedGranularity(granularityInURL as AnalyticGranularity);
      }
    }
  }, [appliedUrlFilters, granularityItems, metricItems, router]);

  const refBreakDownChart = useRef<EChartsOption | null>(null);
  const barWidth = getBarWidth(isMobile, isTablet, isDesktop1024, isDesktop1280, selectedGranularity);

  const updateUrl = useCallback(
    (metric: AnalyticMetric, granularity: AnalyticGranularity) => {
      router
        .replace(
          {
            query: {
              path: router.query.path,
              year,
              metric,
              period: granularity,
            },
            hash: 'breakdown-chart',
          },
          undefined,
          {
            shallow: true,
          }
        )
        .catch((error) => {
          if (!error.cancelled) {
            throw error;
          }
        });
    },
    [router, year]
  );

  const handleChangeSwitch = () => {
    if (!isChecked && inactiveSeries.length > 0) {
      setInactiveSeries([]);
    } else {
      setInactiveSeries([...allSeries.map((series) => series.name)]);
    }
    setIsChecked(!isChecked);
  };

  const barBorderRadius = isMobile ? 2 : 4;

  const { data: budgetsAnalytics, isLoading } = useSWRImmutable(
    [selectedGranularity, year, codePath, codePath.split('/').length + 1, budgets],
    async () =>
      getBudgetsAnalytics(
        selectedGranularity,
        year,
        codePath,
        codePath.split('/').length + 1,
        budgets
      ) as Promise<BreakdownBudgetAnalytic>
  );

  const allSeries = useMemo(() => {
    const seriesWithoutBorder = parseAnalyticsToSeriesBreakDownChart(
      budgetsAnalytics,
      budgets,
      isLight,
      barWidth,
      selectedMetric,
      allBudgets
    );

    const series = setBorderRadiusForSeries(seriesWithoutBorder, barBorderRadius);
    // sort the series by the sum of the values in descending order
    return series.sort((a, b) => {
      const sumA = a.data.reduce((acc, cur) => acc + (cur.value ?? 0), 0);
      const sumB = b.data.reduce((acc, cur) => acc + (cur.value ?? 0), 0);
      return sumB - sumA;
    });
  }, [allBudgets, barBorderRadius, barWidth, budgets, budgetsAnalytics, isLight, selectedMetric]);

  const handleToggleSeries = (toggleSeries: string) => {
    setInactiveSeries(
      inactiveSeries.includes(toggleSeries)
        ? inactiveSeries.filter((series) => series !== toggleSeries)
        : [...inactiveSeries, toggleSeries]
    );
  };

  const series = useMemo(() => {
    const parsedSeries = allSeries.map((item) => {
      if (inactiveSeries.includes(item.name)) {
        return {
          ...item,
          isVisible: false,
          itemStyle: {
            ...item.itemStyle,
            colorOriginal: '#ccc',
          },
          data: item.data.map(() => ({
            value: 0, // set value to 0 to hide the bar
            itemStyle: { borderRadius: [0, 0, 0, 0] },
          })),
        };
      }

      return item;
    });

    return setBorderRadiusForSeries(parsedSeries, barBorderRadius);
  }, [allSeries, barBorderRadius, inactiveSeries]);

  const filters: Filter[] = [
    {
      type: 'select',
      id: 'Metrics',
      label: 'Metrics',
      selected: selectedMetric,
      multiple: false,
      onChange: (value: string | number | (string | number)[]) => {
        updateUrl(value as AnalyticMetric, selectedGranularity);
        setSelectedMetric(value as AnalyticMetric);
      },
      options: metricItems,
      withAll: false,
      widthStyles: {
        width: 'fit-content',
        menuWidth: 350,
      },
    },
    {
      type: 'select',
      id: 'Granularity',
      label: 'Granularity',
      selected: selectedGranularity,
      multiple: false,
      onChange: (value: string | number | (string | number)[]) => {
        updateUrl(selectedMetric, value as AnalyticGranularity);
        setSelectedGranularity(value as AnalyticGranularity);
      },
      options: granularityItems,
      withAll: false,
      widthStyles: {
        width: 'fit-content',
        menuWidth: 350,
      },
    },
  ];

  const canReset = selectedGranularity !== DEFAULT_GRANULARITY || selectedMetric !== DEFAULT_METRIC;
  const onReset = () => {
    setSelectedMetric(DEFAULT_METRIC);
    setSelectedGranularity(DEFAULT_GRANULARITY);
    updateUrl(DEFAULT_METRIC, DEFAULT_GRANULARITY);
  };
  // Show the toggle and scroll in the legend of the chart
  const showScrollAndToggle = isMobile ? series.length > 6 : series.length > 8;

  const showLegendValue = !(levelNumber > 2);
  return {
    isLoading,
    selectedMetric,
    selectedGranularity,
    handleToggleSeries,
    series,
    refBreakDownChart,
    isChecked,
    handleChangeSwitch,
    filters,
    canReset,
    onReset,
    showLegendValue,
    showScrollAndToggle,
  };
};

export default useBreakdownChart;
