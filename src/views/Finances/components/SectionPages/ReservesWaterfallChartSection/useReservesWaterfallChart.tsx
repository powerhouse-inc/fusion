import { useMediaQuery, useTheme } from '@mui/material';
import sortBy from 'lodash/sortBy';
import { useEffect, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import type { Filter, SelectOption } from '@/components/FiltersBundle/types';
import useRestorationFromUrlState from '@/core/hooks/useRestorationFromUrlState';
import { fetchAnalytics } from '@/views/Finances/api/queries';

import { FinancesSectionId } from '@/views/Finances/types';
import type { LegendItemsWaterfall } from '@/views/Finances/utils/types';
import { formatBudgetName } from '@/views/Finances/utils/utils';
import BudgetItem from '../../ReservesWaterfallFilters/BudgetItem';
import CustomAllCategories from '../../ReservesWaterfallFilters/CustomAllCategories';
import {
  builderWaterfallSeries,
  getAnalyticForWaterfall,
  processDataForWaterfall,
  sumValuesFromMapKeys,
} from './utils';
import type { Theme } from '@mui/material';

import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

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

const DEFAULT_GRANULARITY: AnalyticGranularity = 'monthly';
const DEFAULT_ACTIVE_ELEMENTS: string[] = [];

export const useReservesWaterfallChart = (codePath: string, budgets: Budget[], allBudgets: Budget[], year: string) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const [activeElements, setActiveElements] = useState<string[]>(DEFAULT_ACTIVE_ELEMENTS);
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>(DEFAULT_GRANULARITY);
  const [resetActiveElements, setResetActiveElements] = useState(true);
  const levelOfDetail = codePath.split('/').length + 1;

  const { handleCurrentSectionStateUpdate } = useRestorationFromUrlState(FinancesSectionId.RESERVE_CHART, (state) => {
    if (state?.activeElements && state.activeElements.length > 0) {
      setActiveElements(state.activeElements);
      setResetActiveElements(false);
    }
    if (state?.granularity && state.granularity.length > 0) {
      setSelectedGranularity(state.granularity[0] as AnalyticGranularity);
    }
  });

  // title of the waterfall chart section
  const titleChart = useMemo(() => {
    const levelBudget = allBudgets?.find((budget) => budget.codePath === codePath);
    const titleLevelBudget = formatBudgetName(levelBudget?.name || '');
    return titleLevelBudget === '' ? 'MakerDAO Finances' : titleLevelBudget;
  }, [allBudgets, codePath]);

  // Reset all default value when codePath Change
  // we are in a different level and the chart should be reset
  useEffect(() => {
    setResetActiveElements(true);
    setSelectedGranularity('monthly');
  }, [codePath]);

  // fetch actual data from the API
  const { data: analytics, isLoading } = useSWRImmutable(
    [selectedGranularity, year, codePath, levelOfDetail],
    async () => fetchAnalytics(selectedGranularity, year, codePath, levelOfDetail)
  );

  const {
    summaryValues, // actual values for each budget
    totalToStartEachBudget, // start value for each budget
  } = useMemo(
    () => getAnalyticForWaterfall(budgets, selectedGranularity, analytics, allBudgets),
    [budgets, selectedGranularity, analytics, allBudgets]
  );

  // all items available to select
  const selectAll = useMemo(() => Array.from(summaryValues.keys()), [summaryValues]);

  useEffect(() => {
    if (!isLoading && resetActiveElements) {
      setActiveElements(selectAll);
      setResetActiveElements(false);
    }
  }, [isLoading, resetActiveElements, selectAll]);

  const handleSelectChange = (activeBudgets: string[]) => {
    setActiveElements(activeBudgets);
  };

  // reset the filters to the default values
  const handleResetFilter = () => {
    setActiveElements(selectAll);
    setSelectedGranularity('monthly');
  };

  const handleGranularityChange = (selectedGranularity: AnalyticGranularity) => {
    setSelectedGranularity(selectedGranularity);
  };

  // series of the chart (waterfall and lines)
  const series = useMemo(() => {
    const valuesToShow = sumValuesFromMapKeys(summaryValues, activeElements, selectedGranularity);
    const dataReady = processDataForWaterfall(valuesToShow, activeElements, totalToStartEachBudget);
    const series = builderWaterfallSeries(dataReady, isMobile, isTable, isDesk1024, isLight);
    return series;
  }, [
    activeElements,
    isDesk1024,
    isLight,
    isMobile,
    isTable,
    selectedGranularity,
    summaryValues,
    totalToStartEachBudget,
  ]);

  const items = useMemo(() => {
    // This to catch some analytics that don't have budgets
    const newElements = selectAll
      .filter((selectAllPath) => !allBudgets.some((budget) => budget.codePath === selectAllPath))
      .map((element) => ({
        name: element,
        codePath: element,
        image: '',
      }));
    const combinedElementsFromAnalytics = [...budgets, ...newElements];

    return sortBy(combinedElementsFromAnalytics, (subBudget) => subBudget.name).map((budget) => ({
      label: formatBudgetName(budget.name),
      value: budget.codePath,
      count: 0,
      extra: {
        url: budget.image,
      },
    }));
  }, [allBudgets, budgets, selectAll]);

  // by default 8 items are visible and the others need to be scrolled (7 + 1 for the "Select all" item)
  const itemsCount = Math.min(8, items.length + 1);
  const popupContainerHeight = itemsCount * 40 + (itemsCount - 1) * 4;

  // we always show the same legends for this chart
  const legendItems: LegendItemsWaterfall[] = [
    {
      title: 'Reserves Balance',
      color: isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[600],
    },
    {
      title: 'Outflow',
      color: isLight ? theme.palette.colors.red[700] : theme.palette.colors.red[900],
    },
    {
      title: 'Inflow',
      color: isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900],
    },
  ];
  // if the default filters are selected then the "Reset filters" button should be disabled
  const areDefaultFiltersSelected =
    activeElements.length === selectAll.length && selectedGranularity === DEFAULT_GRANULARITY;

  const canReset = selectedGranularity !== DEFAULT_GRANULARITY || activeElements.length !== selectAll.length;
  const onReset = () => {
    handleResetFilter();
    handleCurrentSectionStateUpdate({
      activeElements: DEFAULT_ACTIVE_ELEMENTS,
      granularity: DEFAULT_GRANULARITY,
    });
  };

  const filters: Filter[] = [
    {
      type: 'select',
      id: 'Granularity',
      label: 'Granularity',
      selected: selectedGranularity,
      multiple: false,
      onChange: (value: string | number | (string | number)[]) => {
        setSelectedGranularity(value as AnalyticGranularity);
        handleCurrentSectionStateUpdate({
          granularity: value as string,
        });
      },
      options: granularityItems,
      withAll: false,
      widthStyles: {
        width: 'fit-content',
      },
    },
    {
      type: 'select',
      id: 'categories',
      label: 'Categories',
      selected: activeElements,
      multiple: true,
      withAll: true,
      onChange: (value: string | number | (string | number)[]) => {
        setActiveElements(value as string[]);
        handleCurrentSectionStateUpdate({
          activeElements: value as string[],
        });
      },
      options: items,
      customOptionsRender: (option: SelectOption, isActive: boolean) => (
        <BudgetItem label={option?.label ?? ''} image={option?.extra?.url ?? ''} isActive={isActive} />
      ),
      customOptionsRenderAll: (isActive: boolean) => <CustomAllCategories label="All Categories" isActive={isActive} />,
      ...(!isMobile &&
        !isTable && {
          itemOptionStyles: {
            height: 40,
            alignItems: 'center',
          },
        }),
      widthStyles: {
        width: 'fit-content',
        menuWidth: 350,
      },
    },
  ];

  const startPoint = useMemo(
    () => items.length * 32 + 310,

    [items.length]
  );
  return {
    titleChart,
    legendItems,
    selectedGranularity,
    handleGranularityChange,
    series,
    items,
    popupContainerHeight,
    handleResetFilter,
    activeElements,
    handleSelectChange,
    isLoading,
    areDefaultFiltersSelected,
    canReset,
    onReset,
    filters,
    startPoint,
  };
};
