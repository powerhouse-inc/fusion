import useMediaQuery from '@mui/material/useMediaQuery';
import lightTheme from '@ses/styles/theme/light';
import { useState } from 'react';
import { atlasBudget, legacyBudget, processingData, scopeBudget } from '../../utils/utils';
import type { ValueSeriesBreakdownChart } from '../../utils/types';

const useBreakdownChart = () => {
  const [isShowSeries, setIsShowSeries] = useState({
    'Endgame Atlas': true,
    'Endgame Scopes': true,
    'MakerDAO Legacy': true,
  });
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const [selectedBreakdownMetric, setSelectedBreakdownMetric] = useState<string>('Budget');
  const [selectedBreakdownGranularity, setSelectedBreakdownGranularity] = useState<string>('Monthly');

  const handleBreakdownMetricChange = (value: string) => setSelectedBreakdownMetric(value);
  const handleBreakdownGranularityChange = (value: string) => setSelectedBreakdownGranularity(value);
  const barBorderRadius = isMobile ? 4 : 6;
  const itemStyleBottom = {
    borderRadius: [0, 0, barBorderRadius, barBorderRadius],
  };
  const itemStyleTop = {
    borderRadius: [barBorderRadius, barBorderRadius, 0, 0],
  };
  const itemStyleFull = {
    borderRadius: [barBorderRadius, barBorderRadius, barBorderRadius, barBorderRadius],
  };
  const itemStyledNoBorders = {
    borderRadius: [0, 0, 0, 0],
  };
  const valuesAtlasBudget = processingData(isShowSeries['Endgame Atlas'] ? atlasBudget : []);
  const valuesScopeBudget = processingData(isShowSeries['Endgame Scopes'] ? scopeBudget : []);
  const valuesLegacyBudget = processingData(isShowSeries['MakerDAO Legacy'] ? legacyBudget : []);

  const newAtlasBudgetWithBorders = valuesAtlasBudget.map((item, index: number) => ({
    value: item.value,
    itemStyle:
      valuesScopeBudget[index].value === 0 && valuesLegacyBudget[index].value === 0 ? itemStyleFull : itemStyleBottom,
  })) as ValueSeriesBreakdownChart[];

  const newScopeBudgetWithBorders = valuesScopeBudget.map((item, index: number) => ({
    value: item.value,
    itemStyle:
      valuesAtlasBudget[index].value === 0 && valuesLegacyBudget[index].value === 0
        ? itemStyleFull
        : valuesAtlasBudget[index].value === 0 && valuesLegacyBudget[index].value !== 0
        ? itemStyleBottom
        : valuesAtlasBudget[index].value !== 0 && valuesLegacyBudget[index].value === 0
        ? itemStyleTop
        : valuesAtlasBudget[index].value !== 0 && valuesLegacyBudget[index].value !== 0
        ? itemStyledNoBorders
        : itemStyleTop,
  })) as ValueSeriesBreakdownChart[];

  const newLegacyBudgetWithBorders = valuesLegacyBudget.map((item, index: number) => ({
    value: item.value,
    itemStyle:
      valuesAtlasBudget[index].value === 0 && valuesScopeBudget[index].value === 0 ? itemStyleFull : itemStyleTop,
  })) as ValueSeriesBreakdownChart[];
  const isDisabled = selectedBreakdownMetric === 'Budget' && selectedBreakdownGranularity === 'Monthly';
  const handleResetFilterBreakDownChart = () => {
    setSelectedBreakdownMetric('Budget');
    setSelectedBreakdownGranularity('Monthly');
  };

  return {
    selectedBreakdownMetric,
    selectedBreakdownGranularity,
    handleBreakdownMetricChange,
    handleBreakdownGranularityChange,
    newAtlasBudgetWithBorders,
    newScopeBudgetWithBorders,
    newLegacyBudgetWithBorders,
    isShowSeries,
    setIsShowSeries,
    isDisabled,
    handleResetFilterBreakDownChart,
  };
};

export default useBreakdownChart;