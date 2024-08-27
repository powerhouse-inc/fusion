import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import { useMemo, useRef, useState } from 'react';
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

const useBreakdownChart = (budgets: Budget[], year: string, codePath: string, allBudgets: Budget[]) => {
  const { isLight } = useThemeContext();
  const [isChecked, setIsChecked] = useState(true);
  // series to be "hidden" in the chart
  const [inactiveSeries, setInactiveSeries] = useState<string[]>([]);
  const levelNumber = codePath.split('/').length;
  const [selectedMetric, setSelectedMetric] = useState<AnalyticMetric>('Budget');
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const refBreakDownChart = useRef<EChartsOption | null>(null);
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.up('desktop_1280'));
  const barWidth = getBarWidth(isMobile, isTablet, isDesktop1024, isDesktop1280, selectedGranularity);

  const metricItems: SelectItem<AnalyticMetric>[] = [
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
  ];

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

  const handleMetricChange = (value: AnalyticMetric) => {
    setSelectedMetric(value);
  };
  const handleChangeSwitch = () => {
    if (!isChecked && inactiveSeries.length > 0) {
      setInactiveSeries([]);
    } else {
      setInactiveSeries([...allSeries.map((series) => series.name)]);
    }
    setIsChecked(!isChecked);
  };
  const handleGranularityChange = (value: AnalyticGranularity) => {
    setSelectedGranularity(value);
  };
  const barBorderRadius = isMobile ? 2 : 4;

  const isDisabled = selectedMetric === 'Budget' && selectedGranularity === 'monthly';
  const handleResetFilterBreakDownChart = () => {
    setSelectedMetric('Budget');
    setSelectedGranularity('monthly');
  };

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

  const canReset = selectedGranularity !== 'monthly' || selectedMetric !== 'Budget';
  const onReset = () => {
    setSelectedMetric('Budget');
    setSelectedGranularity('monthly');
  };
  // Show the toggle and scroll in the legend of the chart
  const showScrollAndToggle = series.length > 8;

  const showLegendValue = !(levelNumber > 1);
  return {
    isLoading,
    selectedMetric,
    selectedGranularity,
    handleMetricChange,
    handleGranularityChange,
    isDisabled,
    handleResetFilterBreakDownChart,
    handleToggleSeries,
    series,
    isMobile,
    isTablet,
    isDesktop1024,
    isLight,
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
