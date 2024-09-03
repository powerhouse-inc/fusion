import { UMBRAL_CHART_WATERFALL } from '@ses/core/utils/const';
import { twoSignificantDigitsHumanization } from '@ses/core/utils/humanization';
import type { MetricValues, WaterfallChartSeriesData } from '@/views/Finances/utils/types';
import { removePatternAfterSlash } from '../BreakdownTable/utils';
import type { Analytic, AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { EChartsOption } from 'echarts-for-react';

export const getArraysWaterfall = (data: number[]) => {
  const inFlow = [];
  const outFlow = [];
  const auxiliaryArray = [];
  inFlow.unshift('-');
  outFlow.unshift('-');
  auxiliaryArray.push(data[0]);
  for (let i = 1, sum = 0; i < data.length; i++) {
    if (data[i] >= 0) {
      inFlow.push(data[i]);
      outFlow.push('-');
    } else {
      inFlow.push('-');
      outFlow.push(-data[i]);
    }

    sum += data[i - 1];

    const auxValue = data[i] < 0 ? sum + data[i] : sum;
    // Fix the values very small at the end of of the waterfall
    auxiliaryArray.push(+auxValue.toFixed(3));
  }

  return {
    inFlow,
    outFlow,
    auxiliaryArray,
  };
};
export const builderWaterfallSeries = (
  data: number[],
  isMobile: boolean,
  isTable: boolean,
  isDesk1024: boolean,
  isLight: boolean
): WaterfallChartSeriesData[] => {
  const { inFlow, outFlow, auxiliaryArray } = getArraysWaterfall(data);

  // Add the same value at the end to simulate the end of array can be Increase or Decrease
  const lastInFlow = inFlow[inFlow.length - 1];
  const lastOutFlow = outFlow[outFlow.length - 1];
  if (typeof lastInFlow === 'number') {
    auxiliaryArray.push(auxiliaryArray[auxiliaryArray.length - 1] + lastInFlow);
  } else if (typeof lastOutFlow === 'number') {
    auxiliaryArray.push(auxiliaryArray[auxiliaryArray.length - 1]);
  } else {
    auxiliaryArray.push(auxiliaryArray[auxiliaryArray.length - 1]);
  }

  // This this to put the start element with the same hight
  const help = auxiliaryArray.map((element, index) => {
    if (index === 0) {
      const moment = data[index];

      return moment;
    }
    return element;
  });

  const mobileStyle = {
    fontSize: 10,
    fontFamily: 'Open Sans Condensed, sans-serif',
    fontWeight: 700,
    position: 'top',
  };

  // Get the colors of each bar
  const helpBarColors = help.map((_, index: number) => {
    if (index === 0 || index === help.length - 1) {
      return '#329DFF';
    } else {
      return 'rgba(0,0,0,0)';
    }
  });
  const series = [
    {
      name: 'Reserves Balance',
      barWidth: isMobile ? 16 : isTable ? 32 : isDesk1024 ? 44 : 48,
      data: help.map((item) => (Math.abs(item) < UMBRAL_CHART_WATERFALL ? 0 : item)),
      emphasis: {
        disabled: true,
      },
      itemStyle: {
        borderRadius: [4, 4, 0, 0],
        color: (params: EChartsOption) => helpBarColors[params.dataIndex],
      },
      isVisible: true,
      color: 'rgba(0,0,0,0)',

      label: {
        formatter: (params: EChartsOption) => {
          const formatted = twoSignificantDigitsHumanization(params.value, true);
          if (formatted.value === '0.0') return '';
          if (isMobile) {
            if (params.dataIndex === 0 || params.dataIndex === help.length - 1) {
              return `{colorful|${formatted.value}\n${formatted.suffix}}`;
            }
            return `{hidden|${formatted.value}}`;
          } else {
            if (params.dataIndex === 0 || params.dataIndex === help.length - 1) {
              return `{colorful|${formatted.value}${formatted.suffix}}`;
            }
            return `{hidden|${formatted.value}}`;
          }
        },

        rich: {
          colorful: {
            color: isLight ? '#343839' : '#D7D8D9',
            fontWeight: 700,
            fontSize: isMobile ? 10 : isTable ? 12 : 14,
            fontFamily: 'Open Sans Condensed, sans-serif',
            align: 'center',
          },
          hidden: {
            color: 'rgba(0,0,0,0)',
          },
        },
        show: true,
        position: 'top',
      },
      stack: 'all',
      type: 'bar',
    },
    {
      name: 'Outflow',
      barWidth: isMobile ? 16 : isTable ? 32 : isDesk1024 ? 44 : 48,
      data: outFlow,
      emphasis: {
        disabled: true,
      },
      itemStyle: {
        borderRadius: isMobile ? 4 : 8,
        color: isLight ? '#F07B72' : '#EA4335',
      },
      isVisible: true,
      label: {
        show: true,
        color: '#F07B72',
        fontWeight: 700,
        fontFamily: 'Open Sans Condensed, sans-serif',
        fontSize: isMobile ? 10 : isTable ? 12 : 14,

        position: 'bottom',
        formatter: (params: EChartsOption) => {
          const { value, suffix } = twoSignificantDigitsHumanization(params.value, true);

          if (value === '0.0') return '';
          if (isMobile) {
            const numberWithoutZero = value.replace('0.', '.');

            return `{value|${numberWithoutZero}}\n{suffix|${suffix}}`;
          }
          return `-${value}${suffix}`;
        },

        rich: {
          value: {
            ...mobileStyle,
            color: '#F07B72',
          },
          suffix: {
            ...mobileStyle,
            color: '#F07B72',
          },
        },
      },
      stack: 'all',
      type: 'bar',
    },
    {
      name: 'IntFlow',
      barWidth: isMobile ? 16 : isTable ? 32 : isDesk1024 ? 44 : 48,
      data: inFlow,
      emphasis: {
        disabled: true,
      },
      itemStyle: {
        borderRadius: isMobile ? 4 : 8,
        color: isLight ? '#4FC86F' : '#34A853',
      },
      isVisible: true,
      label: {
        show: true,
        color: '#4FC86F',
        fontSize: isMobile ? 10 : isTable ? 12 : 14,
        fontFamily: 'Open Sans Condensed, sans-serif',
        fontWeight: 700,
        position: 'top',
        formatter: (params: EChartsOption) => {
          const { value, suffix } = twoSignificantDigitsHumanization(params.value, true);

          if (value === '0.0') return '';
          if (isMobile) {
            const numberWithoutZero = value.replace('0.', '.');
            return `{value|${numberWithoutZero}} \n {suffix|${suffix}}`;
          }

          return `+${value}${suffix}`;
        },
        rich: {
          value: {
            color: '#4FC86F',
            fontSize: 10,
            fontFamily: 'Open Sans Condensed, sans-serif',
            fontWeight: 700,
            position: 'top',
          },
          suffix: {
            color: '#4FC86F',
            fontSize: 10,
            fontFamily: 'Open Sans Condensed, sans-serif',
            fontWeight: 700,
            position: 'top',
          },
        },
      },
      stack: 'all',
      type: 'bar',
    },
  ];
  return series as WaterfallChartSeriesData[];
};

export const calculateAccumulatedArray = (data: number[]) => {
  let accumulated = 0;
  const accumulatedArray = data.map((value) => {
    accumulated += value;
    return accumulated;
  });

  return accumulatedArray;
};

export const generateLineSeries = (lineSeriesData: number[], isLight: boolean, isMobile: boolean) => {
  const showLines = lineSeriesData.reduce((acc, curr) => acc + curr, 0);
  const series = [];
  if (showLines === 0) {
    for (let i = 1; i < lineSeriesData.length - 1; i++) {
      series.push({
        name: `Line ${i}`,
        emphasis: {
          disabled: true,
        },
        lineStyle: {
          width: isMobile ? 1 : 3,
          zIndex: -1,
          z: 2,
          join: 'end',
          borderType: 'solid',
          type: 'line',
          color: 'transparent',
          cap: 'butt',
        },

        type: 'line',
        symbol: 'none',
        z: 1,
        step: 'end',
        data: [],
      });
    }
    return series;
  }
  // Array to determine the position of the change
  const positiveNegativeLine = lineSeriesData.map((value, index, array) =>
    index === 0 ? null : value >= array[index - 1]
  );

  const newLineSeries = [...lineSeriesData, lineSeriesData[lineSeriesData.length - 1]];

  for (let i = 1; i < newLineSeries.length; i++) {
    const isAscending = positiveNegativeLine[i - 1];
    const color = isLight ? (isAscending ? '#06554C' : '#A83815') : isAscending ? '#06554C' : '#641E08';
    const seriesData = new Array(newLineSeries.length).fill('-');
    seriesData[i - 1] = newLineSeries[i - 1];
    seriesData[i] = newLineSeries[i];

    series.push({
      name: `Line ${i}`,
      emphasis: {
        disabled: true,
      },
      lineStyle: {
        width: isMobile ? 1 : 3,
        zIndex: -1,
        z: 2,
        join: 'end',
        borderType: 'solid',
        type: 'line',
        color: i === 1 ? '#5D48FF' : color,
        cap: 'butt',
      },

      type: 'line',
      symbol: 'none',
      z: 1,
      step: 'end',
      data: seriesData,
    });
  }
  return series;
};
export const getArrayLengthByGranularity = (granularity: AnalyticGranularity) => {
  switch (granularity) {
    case 'monthly':
      return 12;
    case 'quarterly':
      return 4;
    case 'annual':
      return 1;
    default:
      return 12;
  }
};
// Replace Budget for the real value
type WaterfallReserves = Pick<MetricValues, 'ProtocolNetOutflow' | 'PaymentsOnChain'>;
const EMPTY_METRIC_VALUE = {
  PaymentsOnChain: 0,
  ProtocolNetOutflow: 0,
} as WaterfallReserves;

export const getAnalyticForWaterfall = (
  budgets: Budget[],
  granularity: AnalyticGranularity,
  analytics: Analytic | undefined,
  allBudgets: Budget[]
) => {
  const budgetAnalyticMap = new Map<string, WaterfallReserves[]>();
  const arrayLength = getArrayLengthByGranularity(granularity);
  const summaryValues = new Map<string, number[]>();
  const totalToStartEachBudget = new Map<string, number>();
  // this accumulator is used to calculate the difference between the two metrics by budget
  const accumulator = new Map<string, WaterfallReserves>();

  budgets.forEach((budget) => {
    budgetAnalyticMap.set(
      budget.codePath,
      Array.from({ length: arrayLength }, () => ({ ...EMPTY_METRIC_VALUE }))
    );
    totalToStartEachBudget.set(budget.codePath, 0);
  });
  if (!analytics || !analytics.series?.length) {
    if (budgets.length > 0) {
      budgets.forEach((budget) => {
        summaryValues.set(
          budget.codePath,
          Array.from({ length: arrayLength }, () => 0)
        );
        totalToStartEachBudget.set(budget.codePath, 0);
      });
    }
    return {
      summaryValues,
      totalToStartEachBudget,
    };
  }

  if (budgets.length === 0 && analytics) {
    const values = Array.from({ length: arrayLength }, () => ({
      ...EMPTY_METRIC_VALUE,
    }));

    analytics.series.forEach((periods, index) => {
      periods.rows.forEach((row) => {
        const analyticPath = row.dimensions[0].path;
        if (!accumulator.has(analyticPath)) {
          // initialize the accumulator
          accumulator.set(analyticPath, { ...EMPTY_METRIC_VALUE });
        }

        const accumulatorForCurrentPath = accumulator.get(analyticPath) as WaterfallReserves;
        if (index === 0) {
          if (row.metric === 'ProtocolNetOutflow') {
            accumulatorForCurrentPath.ProtocolNetOutflow += row.sum - row.value;
          }
          if (row.metric === 'PaymentsOnChain') {
            accumulatorForCurrentPath.PaymentsOnChain += row.sum - row.value;
          }

          const difference = accumulatorForCurrentPath.ProtocolNetOutflow - accumulatorForCurrentPath.PaymentsOnChain;
          const checkValueLessZero = Math.abs(difference) < UMBRAL_CHART_WATERFALL ? 0 : difference;
          totalToStartEachBudget.set(removePatternAfterSlash(analyticPath), checkValueLessZero);
        }
        if (values[index]) {
          if (row.metric === 'ProtocolNetOutflow') {
            values[index].ProtocolNetOutflow += row.value;
          }
          if (row.metric === 'PaymentsOnChain') {
            values[index].PaymentsOnChain += row.value;
          }
        }

        budgetAnalyticMap.set(removePatternAfterSlash(analyticPath), values);
      });
    });
  } else {
    analytics.series.forEach((periods, index) => {
      periods.rows.forEach((row) => {
        const analyticPath = row.dimensions[0].path;
        if (!accumulator.has(analyticPath)) {
          // initialize the accumulator
          accumulator.set(analyticPath, { ...EMPTY_METRIC_VALUE });
        }
        let values = budgetAnalyticMap.get(analyticPath);
        if (!values) {
          values = Array.from({ length: arrayLength }, () => ({
            ...EMPTY_METRIC_VALUE,
          }));
        }

        const accumulatorForCurrentPath = accumulator.get(analyticPath) as WaterfallReserves;
        if (index === 0) {
          if (row.metric === 'ProtocolNetOutflow') {
            accumulatorForCurrentPath.ProtocolNetOutflow += row.sum - row.value;
          }
          if (row.metric === 'PaymentsOnChain') {
            accumulatorForCurrentPath.PaymentsOnChain += row.sum - row.value;
          }

          const difference = accumulatorForCurrentPath.ProtocolNetOutflow - accumulatorForCurrentPath.PaymentsOnChain;
          const checkValueLessZero = Math.abs(difference) < UMBRAL_CHART_WATERFALL ? 0 : difference;
          totalToStartEachBudget.set(analyticPath, checkValueLessZero);
        }
        if (values[index]) {
          if (row.metric === 'ProtocolNetOutflow') {
            values[index].ProtocolNetOutflow += row.value;
          }
          if (row.metric === 'PaymentsOnChain') {
            values[index].PaymentsOnChain += row.value;
          }
        }

        budgetAnalyticMap.set(analyticPath, values);
      });
    });
  }

  Array.from(budgetAnalyticMap.keys()).forEach((element) => {
    const values = budgetAnalyticMap.get(element) ?? [];

    const sumOfDifferences =
      values.length > 0
        ? values.map((item) => item.ProtocolNetOutflow - item.PaymentsOnChain)
        : Array.from({ length: arrayLength }, () => 0);

    summaryValues.set(element, sumOfDifferences);
  });

  //  Add correct name when there is not SubBudgets
  if (budgets.length === 0) {
    // Add correct name for the analytic
    Array.from(summaryValues.keys()).forEach((key) => {
      const findCorrectBudget = allBudgets.find((item) => item.codePath === key)?.code || 'No-key';
      if (summaryValues.has(key)) {
        const value = summaryValues.get(key) || [];
        summaryValues.delete(key);
        summaryValues.set(findCorrectBudget, value);
      }
    });
    // Add correct key for the total
    Array.from(totalToStartEachBudget.keys()).forEach((key) => {
      const findCorrectBudget = allBudgets.find((item) => item.codePath === key)?.code || 'No-key';
      if (totalToStartEachBudget.has(key)) {
        const value = totalToStartEachBudget.get(key) || 0;
        totalToStartEachBudget.delete(key);
        totalToStartEachBudget.set(findCorrectBudget, value);
      }
    });
  }
  return {
    summaryValues,

    totalToStartEachBudget,
  };
};

export const sumValuesFromMapKeys = (
  budgetAnalyticMap: Map<string, number[]>,
  activeItems: string[],
  granularity: AnalyticGranularity
) => {
  const length = getArrayLengthByGranularity(granularity);

  let sums = Array.from({ length }).map(() => 0);

  budgetAnalyticMap.forEach((values, key) => {
    if (activeItems.includes(key)) {
      sums = sums.map((sum, index) => sum + values[index]);
    }
  });
  return sums;
};
export const processDataForWaterfall = (
  data: number[],
  activeElements: string[],
  totalToStartEachBudget: Map<string, number>
): number[] => {
  let total = 0;

  // Only sum the values where the filter is active
  totalToStartEachBudget.forEach((values, key) => {
    if (activeElements.includes(key)) {
      total += values;
    }
  });

  const result: number[] = [...data];
  if (data.reduce((acc, actual) => acc + actual, 0) === 0 && total === 0) return data;
  for (let i = 0; i < result.length; i++) {
    if (Math.abs(result[i]) < UMBRAL_CHART_WATERFALL) {
      result[i] = 0;
    }
  }

  result.unshift(total);

  return result;
};
