import { useMediaQuery, useTheme } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { percentageRespectTo } from '@ses/core/utils/math';
import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';
import type { BreadcrumbItem } from '@/components/Breadcrumb/Breadcrumb';
import useBreakdownChart from './components/BreakdownChartSection/useBreakdownChart';
import { useExpenseMetrics } from './components/ExpenseMetrics/useExpenseMetrics';
import { useBreakdownTable } from './components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from './components/SectionPages/CardChartOverview/useCardChartOverview';
import { getTotalAllMetricsBudget } from './components/SectionPages/CardChartOverview/utils';
import { useExpenseReports } from './components/SectionPages/ExpenseReports/useExpenseReports';
import { useReservesWaterfallChart } from './components/SectionPages/ReservesWaterfallChartSection/useReservesWaterfallChart';
import {
  getBudgetsAnalytics,
  newBudgetMetric,
  generateColorPalette,
  existingColors,
  existingColorsDark,
  formatBudgetName,
} from './utils/utils';
import type { Theme } from '@mui/material';
import type { BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

interface SEOData {
  title: string;
  description: string;
}

export const useFinancesView = (budgets: Budget[], allBudgets: Budget[], initialYear: string) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
  const router = useRouter();
  const [year, setYear] = useState(initialYear);

  const urlPath = Array.isArray(router.query.path) ? router.query.path.join('/') : router.query.path;
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas';
  const levelNumber = codePath.split('/').length;
  const levelOfDetail = levelNumber + 1;
  const currentBudget = allBudgets.find((budget) => budget.codePath === codePath);
  const description = currentBudget?.description;
  const icon = currentBudget?.image;
  const code = currentBudget?.code ?? '';
  const title = formatBudgetName((currentBudget?.name || codePath) ?? '');

  const handleChangeYears = (value: string) => {
    setYear(value);
    router.replace(
      {
        query: {
          ...router.query,
          year: value,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const { data: budgetsAnalytics } = useSWRImmutable(
    ['annual', year, codePath, levelOfDetail, budgets],
    async () =>
      getBudgetsAnalytics('annual', year, codePath, levelOfDetail, budgets) as Promise<BreakdownBudgetAnalytic>
  );

  // generate the breadcrumb routes
  const breakdownItems: BreadcrumbItem[] = useMemo(() => {
    const items: BreadcrumbItem[] = [];
    const segmentedCodePath = codePath.split('/');
    segmentedCodePath.forEach((item, index) => {
      if (item === 'atlas') {
        // it is the first level
        items.push({
          label: 'Finances',
          href: `${siteRoutes.finances()}?year=${year}`,
        });
      } else {
        // it is a deeper level
        items.push({
          label: formatBudgetName(
            allBudgets.find((budget) => budget.codePath === segmentedCodePath.slice(0, index + 1).join('/'))?.name ??
              codePath
          ),
          href: `${siteRoutes.finances(segmentedCodePath.slice(1, index + 1).join('/'))}?year=${year}`,
        });
      }
    });

    return items;
  }, [allBudgets, codePath, year]);

  const allMetrics = getTotalAllMetricsBudget(budgetsAnalytics);

  const colorsLight = generateColorPalette(
    existingColors.length,
    budgets.length - existingColors.length,
    existingColors
  );

  const colorsDark = generateColorPalette(180, budgets.length, existingColorsDark);

  // All the logic required by the CardChartOverview section
  const cardOverViewSectionData = useCardChartOverview(budgets, budgetsAnalytics, levelNumber, allBudgets, codePath);

  // All the logic required by the CardNavigation section
  const cardsNavigationInformation = useMemo(
    () =>
      budgets
        .map((item, index) => {
          const budgetMetric =
            budgetsAnalytics !== undefined && budgetsAnalytics[item.codePath] !== undefined
              ? budgetsAnalytics[item.codePath]
              : [newBudgetMetric()];

          return {
            image: item.image || '/assets/img/default-icon-cards-budget.svg',
            codePath: item.codePath,
            title: formatBudgetName(item.name),
            description: item.description,
            href: `${siteRoutes.finances(item.codePath.replace('atlas/', ''))}?year=${year}`,
            valueDai: budgetMetric[0].paymentsOnChain.value,
            totalDai: allMetrics.paymentsOnChain,
            budgetCapValue: budgetMetric[0].budget.value,
            code: item.code,
            color: isLight ? colorsLight[index] : colorsDark[index],
            percent: percentageRespectTo(budgetMetric[0].paymentsOnChain.value, budgetMetric[0].budget.value),
          };
        })
        .sort((a, b) => b.percent - a.percent),
    [allMetrics.paymentsOnChain, budgets, budgetsAnalytics, colorsDark, colorsLight, isLight, year]
  );

  // All the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart(budgets, year, codePath, allBudgets);

  // All the logic required by the BreakdownTable section
  const breakdownTable = useBreakdownTable(year, budgets, allBudgets);

  // All the logic required by the ExpenseMetrics
  const expensesMetrics = useExpenseMetrics(year);

  // All the logic for the Reserve Chart
  const reserveChart = useReservesWaterfallChart(codePath, budgets, allBudgets, year);

  // All the logic required by the Expense Reports
  const expenseTrendFinances = useExpenseReports(codePath);

  const seo: SEOData = useMemo(() => {
    // 1st level or deeper level
    let seoTitle = `Sky Fusion - ${levelNumber === 1 ? 'Sky Ecosystem' : title} Finances`;
    let description = `Learn about ${
      levelNumber === 1 ? 'Sky Ecosystem' : title
    }'s Finances through aggregated views: budget utilization, expenses, operational reserves, and breakdown charts.`;

    if (codePath.startsWith('atlas/legacy/core-units/')) {
      // it is a core unit
      seoTitle = `Sky Fusion - ${title} Finances`;
      description = `Learn about ${title}'s Finances through aggregated views: from budget utilization, and reserves, to financial breakdown.`;
    } else if (codePath === 'atlas/immutable/aligned-delegates') {
      // it is an aligned delegates
      seoTitle = 'Sky Fusion - Aligned Delegates Finances';
      description =
        "Learn about Aligned Delegates's Finances through aggregated views: from budget utilization, expenses, operational reserves, and breakdown charts.";
    } else if (codePath === 'atlas/scopes/PRO/KPRS') {
      // it is a keeper
      seoTitle = 'Sky Fusion - Keepers Finances';
      description =
        "Learn about Keeper's Finances through aggregated views: from budget utilization, expenses, operational reserves, and breakdown charts.";
    } else if (codePath === 'atlas/legacy/spfs') {
      // it is a spfs
      seoTitle = 'Sky Fusion - Special Purpose Funds Finances';
      description =
        "Learn about Special Purpose Funds's Finances through aggregated views: from budget utilization, expenses, operational reserves, and breakdown charts.";
    }

    return {
      title: seoTitle,
      description,
    };
  }, [codePath, levelNumber, title]);

  return {
    year,
    levelNumber,
    icon,
    title,
    description,
    breakdownItems,
    handleChangeYears,
    cardOverViewSectionData,
    router,
    cardsNavigationInformation,
    breakdownChartSectionData,
    breakdownTable,
    expensesMetrics,
    expenseReportSection: expenseTrendFinances,
    reserveChart,
    code,
    isMobile,
    seo,
  };
};
