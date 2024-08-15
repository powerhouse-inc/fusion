import { LimitedColorAssigner } from '@ses/core/utils/colors';
import { existingColors, existingColorsDark, getCorrectMetric, transformPathToName } from '../../utils/utils';
import { removePatternAfterSlash } from '../SectionPages/BreakdownTable/utils';
import type { BreakdownChartSeriesData } from '../../utils/types';
import type {
  AnalyticGranularity,
  AnalyticMetric,
  BreakdownBudgetAnalytic,
} from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const parseAnalyticsToSeriesBreakDownChart = (
  budgetsAnalytics: BreakdownBudgetAnalytic | undefined,
  budgets: Budget[],
  isLight: boolean,
  barWidth: number,
  metric: AnalyticMetric,
  allBudgets: Budget[]
) => {
  const series: BreakdownChartSeriesData[] = [];

  if (budgetsAnalytics) {
    const budgetKeys = Object.keys(budgetsAnalytics).sort();
    const colorAssigner = new LimitedColorAssigner(budgetKeys.length, isLight ? existingColors : existingColorsDark);

    budgetKeys.forEach((budgetKey, index) => {
      const searchCorrectBudget = budgets.length > 0 ? budgets : allBudgets;
      const nameBudget =
        searchCorrectBudget.find((budget) => budget.codePath === removePatternAfterSlash(budgetKey))?.name ??
        (budgetKey.endsWith('/*') ? 'Others' : undefined);

      const budgetData = budgetsAnalytics[budgetKey];
      if (Array.isArray(budgetData)) {
        const dataForSeries = budgetData.map((budgetMetric) => getCorrectMetric(budgetMetric, metric));

        series[index] = {
          name: nameBudget || transformPathToName(budgetKey),
          dataOriginal: dataForSeries,
          data: dataForSeries,
          type: 'bar',
          stack: 'x',
          barWidth,
          showBackground: false,
          itemStyle: {
            color: colorAssigner.getColor(budgetKey),
            colorOriginal: colorAssigner.getColor(budgetKey),
          },
          isVisible: true,
        };
      } else {
        const dataForSeries = getCorrectMetric(budgetData, metric);
        series[index] = {
          name: nameBudget || transformPathToName(budgetKey),
          dataOriginal: [dataForSeries],
          data: [dataForSeries],
          type: 'bar',
          stack: 'x',
          barWidth,
          showBackground: false,
          itemStyle: {
            color: colorAssigner.getColor(budgetKey),
            colorOriginal: colorAssigner.getColor(budgetKey),
          },
          isVisible: true,
        };
      }
    });
  }
  return series;
};

export const setBorderRadiusForSeries = (
  series: BreakdownChartSeriesData[],
  barBorderRadius: number
): BreakdownChartSeriesData[] => {
  const seriesLength = series[0]?.data.length;

  for (let dataIndex = 0; dataIndex < seriesLength; dataIndex++) {
    let firstPositiveIndex = -1;
    let lastPositiveIndex = -1;
    let firstNegativeIndex = -1;
    let lastNegativeIndex = -1;
    let positiveCount = 0;
    let negativeCount = 0;

    // Identify first and last indices for positive and negative values
    series.forEach((s, seriesIndex) => {
      let value = s.data[dataIndex].value ?? 0;
      value = Math.abs(value) < 0.004 ? 0 : value; // if the values es too small, consider it as 0
      if (value > 0) {
        if (firstPositiveIndex === -1) firstPositiveIndex = seriesIndex;
        lastPositiveIndex = seriesIndex;
        positiveCount++;
      } else if (value < 0) {
        if (firstNegativeIndex === -1) firstNegativeIndex = seriesIndex;
        lastNegativeIndex = seriesIndex;
        negativeCount++;
      }
    });

    // Apply border styles based on position and value.
    series.forEach((s, seriesIndex) => {
      const isPositive = (s.data[dataIndex].value ?? 0) > 0;
      const isNegative = (s.data[dataIndex].value ?? 0) < 0;

      if (positiveCount + negativeCount === 1) {
        // Apply borders to the top or bottom depending of positive or negative
        s.data[dataIndex].itemStyle.borderRadius = isPositive
          ? [barBorderRadius, barBorderRadius, 0, 0]
          : [0, 0, barBorderRadius, barBorderRadius];
      } else if (isPositive && positiveCount === 1) {
        // Only one positive value, apply top borders
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, 0, 0];
      } else if (isPositive && seriesIndex === firstPositiveIndex) {
        // First positive value not bottom borders
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, 0, 0];
      } else if (isPositive && seriesIndex === lastPositiveIndex) {
        // Last positive value top borders
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, 0, 0];
      } else if (isNegative && negativeCount === 1) {
        // Only one negative value, apply bottom borders
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, barBorderRadius, barBorderRadius];
      } else if (isNegative && seriesIndex === firstNegativeIndex) {
        // First negative value, bottom borders zero
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, 0, 0];
      } else if (isNegative && seriesIndex === lastNegativeIndex) {
        // Last negative value, bottom edges (inverted)
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, barBorderRadius, barBorderRadius];
      } else {
        // No borders for intermediate values
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, 0, 0];
      }
    });
  }

  return series;
};

export const getSelectMetricText = (metric: AnalyticMetric | undefined) => {
  if (!metric) return 'Budget';
  switch (metric) {
    case 'ProtocolNetOutflow':
      return 'Net Protocol Outflow';
    case 'PaymentsOnChain':
      return 'Net Expenses On-Chain';
    default:
      return metric;
  }
};

export const getBarWidth = (
  isMobile: boolean,
  isTablet: boolean,
  isDesktop1024: boolean,
  isDesktop1280: boolean,
  selectedGranularity: AnalyticGranularity
) => {
  if (isMobile) {
    if (selectedGranularity === 'quarterly') return 16;
    if (selectedGranularity === 'annual') return 96;
    return 16;
  } else if (isTablet) {
    return 23.8;
  } else if (isDesktop1024) {
    return 30;
  } else if (isDesktop1280) {
    return 40;
  } else {
    if (selectedGranularity === 'annual') return 168;
    if (selectedGranularity === 'quarterly') return 64;
    return 40;
  }
};
