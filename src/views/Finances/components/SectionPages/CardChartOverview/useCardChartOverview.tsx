import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { LimitedColorAssigner } from '@ses/core/utils/colors';
import { percentageRespectTo } from '@ses/core/utils/math';
import lightTheme from '@ses/styles/theme/themes';
import { useMemo, useState } from 'react';
import type { BudgetMetricWithName, DoughnutSeries } from '@/views/Finances/utils/types';
import {
  existingColors,
  existingColorsDark,
  hasSubLevels,
  formatBudgetName,
  removeBudgetWord,
  transformPathToName,
} from '@/views/Finances/utils/utils';
import { removePatternAfterSlash } from '../BreakdownTable/utils';
import { getCorrectMetricValuesOverViewChart } from './utils';
import type { AnalyticMetric, BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useCardChartOverview = (
  budgets: Budget[],
  budgetsAnalytics: BreakdownBudgetAnalytic | undefined,
  levelNumber: number,
  allBudgets: Budget[],
  codePath: string
) => {
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesk1280 = useMediaQuery(lightTheme.breakpoints.up('desktop_1280'));

  const isHasSubLevels = hasSubLevels(codePath, allBudgets);

  const [selectedMetric, setSelectedMetric] = useState<AnalyticMetric>('Budget');
  const { isLight } = useThemeContext();
  const budgetWithNotChildren = useMemo(() => {
    const data = {
      budget: 0,
      paymentsOnChain: 0,
      forecast: 0,
      actuals: 0,
    };

    if (!budgetsAnalytics) {
      // return 0 values to avoid having an empty UI

      return data;
    }

    const values = Object.values(budgetsAnalytics ?? {});
    values.forEach((item) => {
      item.forEach((element) => {
        data.budget += element.budget.value;
        data.forecast += element.forecast.value;
        data.actuals += element.actuals.value;
        data.paymentsOnChain += element.paymentsOnChain.value;
      });
    });

    return data;
  }, [budgetsAnalytics]);

  const { metric, budgetMetrics } = useMemo(() => {
    const metric: { [metric: string]: number } = {
      actuals: 0,
      forecast: 0,
      budget: 0,
      paymentsOnChain: 0,
      protocolNetOutflow: 0,
      paymentsOffChainIncluded: 0,
    };

    const budgetMetrics: Record<string, BudgetMetricWithName> = {};
    budgets.forEach((budget) => {
      const budgetKey = budget.codePath;
      const budgetName = budget.name ? formatBudgetName(budget.name) : transformPathToName(budget.codePath);
      const budgetCode = budget.code ? budget.code : transformPathToName(budget.codePath);
      if (budgetMetrics[budget.codePath]) {
        const uniqueKey = `${budgetKey}-${budget.id}`;
        budgetMetrics[uniqueKey] = {
          name: budgetName,
          code: budgetCode,
          actuals: {
            unit: 'DAI',
            value: 0,
          },
          forecast: {
            unit: 'DAI',
            value: 0,
          },
          budget: {
            unit: 'DAI',
            value: 0,
          },
          paymentsOnChain: {
            unit: 'DAI',
            value: 0,
          },
          paymentsOffChainIncluded: {
            unit: 'DAI',
            value: 0,
          },
          protocolNetOutflow: {
            unit: 'DAI',
            value: 0,
          },
        };
      } else {
        budgetMetrics[budgetKey] = {
          name: budgetName,
          code: budgetCode,
          actuals: {
            unit: 'DAI',
            value: 0,
          },

          forecast: {
            unit: 'DAI',
            value: 0,
          },
          budget: {
            unit: 'DAI',
            value: 0,
          },
          paymentsOnChain: {
            unit: 'DAI',
            value: 0,
          },
          paymentsOffChainIncluded: {
            unit: 'DAI',
            value: 0,
          },
          protocolNetOutflow: {
            unit: 'DAI',
            value: 0,
          },
        };
      }
    });
    if (budgetsAnalytics !== undefined) {
      for (const budgetMetricKey of Object.keys(budgetsAnalytics)) {
        const budgetMetric = budgetsAnalytics[budgetMetricKey];
        const searchCorrectBudget = budgets.length > 0 ? budgets : allBudgets;
        const correspondingBudget = searchCorrectBudget.find(
          (budget) => budget.codePath === removePatternAfterSlash(budgetMetricKey)
        );
        // use the name of budget or add label
        const budgetName = correspondingBudget
          ? formatBudgetName(correspondingBudget.name)
          : transformPathToName(budgetMetricKey);
        const budgetCode = correspondingBudget?.code || transformPathToName(budgetMetricKey);
        metric.actuals += budgetMetric[0].actuals.value || 0;
        metric.forecast += budgetMetric[0].forecast.value || 0;
        metric.budget += budgetMetric[0].budget.value || 0;
        metric.paymentsOnChain += Math.abs(budgetMetric[0].paymentsOnChain.value || 0);
        metric.protocolNetOutflow += budgetMetric[0].protocolNetOutflow.value || 0;
        budgetMetrics[budgetMetricKey] = {
          name: budgetName,
          actuals: budgetMetric[0].actuals,
          forecast: budgetMetric[0].forecast,
          budget: budgetMetric[0].budget,
          paymentsOnChain: budgetMetric[0].paymentsOnChain,
          paymentsOffChainIncluded: budgetMetric[0].paymentsOffChainIncluded,
          protocolNetOutflow: budgetMetric[0].protocolNetOutflow,
          code: budgetCode,
        };
      }
    }

    // if we don't have any data, we need to add a default value to avoid having an empty UI
    // this mostly happens on leave nodes (last level)
    if (Object.keys(budgetMetrics).length === 0) {
      const emptyValue = {
        unit: 'DAI',
        value: 0,
      };
      budgetMetrics[codePath] = {
        name: transformPathToName(codePath),
        actuals: emptyValue,
        forecast: emptyValue,
        budget: emptyValue,
        paymentsOnChain: emptyValue,
        paymentsOffChainIncluded: emptyValue,
        protocolNetOutflow: emptyValue,
        code: transformPathToName(codePath),
      };
    }

    return {
      metric,
      budgetMetrics,
    };
  }, [allBudgets, budgets, budgetsAnalytics, codePath]);

  const handleSelectedMetric = (metric: AnalyticMetric) => {
    setSelectedMetric(metric);
  };
  const doughnutSeriesData: DoughnutSeries[] = useMemo(() => {
    const colorAssigner = new LimitedColorAssigner(
      Object.keys(budgetMetrics).length,
      isLight ? existingColors : existingColorsDark
    );

    const keys = Object.keys(budgetMetrics);
    return keys.sort().map((item) => {
      let value;
      switch (selectedMetric) {
        case 'Actuals':
          value = budgetMetrics[item].actuals.value || 0;
          break;
        case 'Forecast':
          value = budgetMetrics[item].forecast.value || 0;
          break;
        case 'PaymentsOnChain':
          value = budgetMetrics[item].paymentsOnChain.value || 0;
          break;
        case 'ProtocolNetOutflow':
          value = budgetMetrics[item].protocolNetOutflow.value || 0;
          break;
        case 'Budget':
          value = budgetMetrics[item].budget.value || 0;
          break;
        default:
          value = budgetMetrics[item].budget.value || 0;
          break;
      }
      const keyMetricValue = getCorrectMetricValuesOverViewChart(selectedMetric);

      const color = keys.length === 1 && value === 0 ? 'rgb(204, 204, 204)' : colorAssigner.getColor(item);
      return {
        name: removeBudgetWord(budgetMetrics[item].name),
        code: budgetMetrics[item].code,
        value,
        originalValue: value,
        metrics: budgetMetrics[item],
        percent: percentageRespectTo(Math.abs(value), metric[keyMetricValue]),
        color,
        isVisible: true,
        originalColor: color,
      };
    });
  }, [budgetMetrics, isLight, metric, selectedMetric]);

  const numberItems = doughnutSeriesData.length;
  const changeAlignment = numberItems > 4;

  const showSwiper = ((isTable || isDesk1024) && numberItems >= 4) || (isDesk1280 && numberItems >= 10);

  const numberSliderPerLevel = isTable
    ? numberItems >= 4 && levelNumber < 3
      ? 3
      : 5
    : isDesk1024
    ? numberItems >= 4 && levelNumber < 3
      ? 3
      : 5
    : isDesk1280
    ? numberItems >= 10
      ? 12
      : 5
    : 5;

  return {
    paymentsOnChain: isHasSubLevels ? metric.paymentsOnChain : budgetWithNotChildren.paymentsOnChain,
    budgetCap: isHasSubLevels ? metric.budget : budgetWithNotChildren.budget,
    selectedMetric,
    handleSelectedMetric,
    doughnutSeriesData,
    changeAlignment,
    showSwiper,
    numberSliderPerLevel,
  };
};
