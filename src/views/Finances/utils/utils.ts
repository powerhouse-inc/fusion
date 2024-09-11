import { SortEnum } from '@ses/core/enums/sortEnum';
import { BudgetStatus, ResourceType, TeamStatus } from '@ses/core/models/interfaces/types';
import lightTheme from '@ses/styles/theme/themes';
import { DateTime } from 'luxon';
import { fetchAnalytics } from '@/views/Finances/api/queries';
import type { DelegateExpenseTableHeader, LineChartSeriesData, MetricValues, MomentDataItem } from './types';
import type { ValuesDataWithBorder } from '@ses/core/models/dto/chartDTO';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type {
  ValueAndUnit,
  BudgetMetric,
  Analytic,
  BreakdownBudgetAnalytic,
  AnalyticGranularity,
  AnalyticMetric,
} from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';

export const mockDataApiTeam: MomentDataItem[] = [
  {
    id: '34',
    code: 'SES-001',
    shortCode: 'SES',
    budgetPath: 'atlas/legacy/core-units/SES-001/',
    name: 'Sustainable Ecosystem Scaling',
    status: TeamStatus.Accepted,
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-01T09:08:34.123'),
    reportMonth: DateTime.fromISO('2023-03-01T09:08:34.123'),
    totalActuals: 2048873,
    lastActivity: {
      id: '343',
      created_at: '2023-08-30T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.CoreUnit,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [
      {
        id: '234',
        owner: {
          id: '34',
          icon: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png',
          name: 'Sustainable Ecosystem Scaling',
          shortCode: 'SES',
        },
        status: BudgetStatus.Draft,
        ownerType: '',
        month: '2023-09-01',
        ownerCode: 'ses',
        mkrProgramLength: 34,
        publicationUrl: '3432',
        activityFeed: [],
        auditReport: [],
        budgetStatementFTEs: [],
        budgetStatementMKRVest: [],
        budgetStatementWallet: [],
        comments: [],
        actualExpenses: 865423,
        forecastExpenses: 0,
        paymentsOnChain: 0,
        netProtocolOutflow: 0,
      },
    ],
    cuMip: null,
  },
  {
    id: '45',
    code: 'RISK-01',
    shortCode: 'RISK',
    budgetPath: 'atlas/legacy/core-units/RISK-01',
    name: 'RISK-01',
    status: TeamStatus.Accepted,
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/risk-001/RISK_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-01T09:08:34.123'),
    reportMonth: DateTime.fromISO('2023-09-01T09:08:34.123'),
    totalActuals: 2048873,
    lastActivity: {
      id: '343',
      created_at: '2023-09-01T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.CoreUnit,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [
      {
        id: '234',
        owner: {
          id: '34',
          icon: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png',
          name: 'Sustainable Ecosystem Scaling',
          shortCode: 'SES',
        },
        status: BudgetStatus.Draft,
        ownerType: '',
        month: '2023-05-01',
        ownerCode: 'ses',
        mkrProgramLength: 34,
        publicationUrl: '3432',
        activityFeed: [{ created_at: '2023-09-01T09:08:34.123' } as ChangeTrackingEvent],
        auditReport: [],
        budgetStatementFTEs: [],
        budgetStatementMKRVest: [],
        budgetStatementWallet: [],
        comments: [],
        actualExpenses: 1125789,
        forecastExpenses: 0,
        paymentsOnChain: 0,
        netProtocolOutflow: 0,
      },
    ],
    cuMip: null,
  },
  {
    id: '34',
    code: 'GOV-001',
    shortCode: 'GV',
    budgetPath: 'atlas/legacy/core-units/GOV-001/',
    name: 'Governance Alpha',
    status: TeamStatus.Accepted,
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/pe-001/pe_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-22T09:08:34.123'),
    reportMonth: DateTime.fromISO('2014-01-25T09:08:34.123'),
    totalActuals: 2048873,
    lastActivity: {
      id: '343',
      created_at: '2023-09-01T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.EcosystemActor,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [
      {
        id: '234',
        owner: {
          id: '34',
          icon: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png',
          name: 'Sustainable Ecosystem Scaling',
          shortCode: 'SES',
        },
        status: BudgetStatus.Final,
        ownerType: '',
        month: '2024-04-01',
        ownerCode: 'ses',
        mkrProgramLength: 34,
        publicationUrl: '3432',
        activityFeed: [],
        auditReport: [],
        budgetStatementFTEs: [],
        budgetStatementMKRVest: [],
        budgetStatementWallet: [],
        comments: [],
        actualExpenses: 256365,
        forecastExpenses: 0,
        paymentsOnChain: 0,
        netProtocolOutflow: 0,
      },
    ],
    cuMip: null,
  },
  {
    id: '34',
    code: 'RWF-001',
    shortCode: 'RWF',
    budgetPath: 'atlas/legacy/core-units/RWF-001/',
    name: 'Real-World Finance',
    status: TeamStatus.Accepted,
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/rwf-001/RWF_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-12T09:08:34.123'),
    reportMonth: DateTime.fromISO('2013-03-25T09:08:34.123'),
    totalActuals: 456347,
    lastActivity: {
      id: '343',
      created_at: '2023-09-01T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.CoreUnit,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [],
    cuMip: null,
  },
  {
    id: '34',
    code: 'GRO-001',
    shortCode: 'GRO',
    budgetPath: 'atlas/legacy/core-units/GRO-001/',
    name: 'Growth',
    status: TeamStatus.Accepted,
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/gro-001/gro_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-02T09:08:34.123'),
    reportMonth: DateTime.fromISO('2012-04-25T09:08:34.123'),
    totalActuals: 244567,
    lastActivity: {
      id: '343',
      created_at: '2023-09-01T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.CoreUnit,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [],
    cuMip: null,
  },
  {
    id: '34',
    code: 'GRO-001',
    shortCode: 'GRO',
    budgetPath: 'atlas/legacy/core-units/GRO-001/',
    name: 'Growth',
    status: TeamStatus.Accepted,
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/gro-001/gro_logo.png',
    category: [],
    sentenceDescription: '',
    paragraphDescription: '',
    paragraphImage: '',
    lastModified: DateTime.fromISO('2023-09-02T09:08:34.123'),
    reportMonth: DateTime.fromISO('2012-04-25T09:08:34.123'),
    totalActuals: 244567,
    lastActivity: {
      id: '343',
      created_at: '2023-09-01T09:08:34.123',
      event: 'event',
      params: {},
      description: '',
    },
    legacyBudgetStatementUrl: '',
    budgetId: '',
    type: ResourceType.CoreUnit,
    auditors: [],
    socialMediaChannels: [],
    contributorCommitment: [],
    cuGithubContribution: [],
    updates: [],
    scopes: [],
    budgetStatements: [],
    cuMip: null,
  },
];

export const getLastActivityDate = (budget: BudgetStatement) => {
  if (budget.activityFeed?.length) {
    return DateTime.fromISO(budget.activityFeed?.[0]?.created_at);
  }

  return undefined;
};

export const getHeadersExpenseReport = (
  headersSort: SortEnum[],
  selectedMetric: AnalyticMetric,
  isSmallDesk: boolean
): DelegateExpenseTableHeader[] => [
  {
    header: 'Contributors',
    styles: {
      boxSizing: 'border-box',
      minWidth: 310,
      paddingLeft: 16,
    },
    sortReverse: true,
    sort: headersSort[0],
  },
  {
    header: isSmallDesk ? 'R. Month' : 'Reporting Month',
    styles: {
      width: 130,
      marginLeft: -24,

      [lightTheme.breakpoints.up('desktop_1280')]: {
        width: 154,
        marginLeft: -28,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: -106,
      },
    },
    sortReverse: true,
    sort: headersSort[1],
  },
  {
    header:
      selectedMetric === 'ProtocolNetOutflow'
        ? isSmallDesk
          ? 'Prtcol Outflow'
          : 'Protocol Outflow'
        : selectedMetric === 'PaymentsOnChain'
        ? 'Net On-Chain'
        : selectedMetric,
    sort: headersSort[2],
    styles: {
      width: 130,
      marginLeft: -28,

      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: -52,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: -94,
      },
    },
    sortReverse: true,
  },
  {
    header: 'Status',
    sort: headersSort[3],
    styles: {
      width: 100,
      marginLeft: -20,

      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: -22,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: -80,
        paddingLeft: 10,
      },
    },
    sortReverse: true,
  },
  {
    header: 'Last Modified',
    sort: headersSort[4],
    styles: {
      width: 130,

      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: 30,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: 0,
        marginRight: -80,
        justifyContent: 'center',
      },
    },
    sortReverse: true,
  },
  {
    header: '',
    sort: SortEnum.Disabled,
    styles: {
      width: 111,

      [lightTheme.breakpoints.up('desktop_1280')]: {
        marginLeft: 0,
        width: 110,
      },
      [lightTheme.breakpoints.up('desktop_1440')]: {
        marginLeft: 0,
        justifyContent: 'center',
      },
    },
    sortReverse: true,
  },
];

export const ENUM_FOR_STORIES: SortEnum[] = [
  SortEnum.Asc,
  SortEnum.Neutral,
  SortEnum.Neutral,
  SortEnum.Neutral,
  SortEnum.Neutral,
];

export const generateColorPalette = (index: number, numColors: number, existingColors: string[] = []) => {
  const baseHue = (index * (360 / numColors)) % 360;
  const colors = [];

  for (let i = 0; i < numColors; i++) {
    const hue = (baseHue + i * (360 / numColors)) % 360;
    const color = `hsl(${hue}, 70%, 50%)`;
    colors.push(color);
  }

  return [...existingColors, ...colors];
};

// Colors for the first level in Finances Charts OverView
export const existingColors: string[] = ['#F99374', '#447AFB', '#2DC1B1'];
export const existingColorsDark: string[] = ['#F77249', '#447AFB', '#1AAB9B'];

export const getYearsRange = () => {
  const year = DateTime.utc().year;
  const yearsRange = Array(1 + year - 2021)
    .fill('')
    .map((_, i) => (year - i).toString());
  return yearsRange;
};

const setMetric = (value: number, unit: string) =>
  ({
    value,
    unit,
  } as ValueAndUnit);

export const newBudgetMetric = () =>
  ({
    actuals: setMetric(0, ''),
    budget: setMetric(0, ''),
    forecast: setMetric(0, ''),
    paymentsOnChain: setMetric(0, ''),
    paymentsOffChainIncluded: setMetric(0, ''),
  } as BudgetMetric);

// Create a Budget metric empty for the chart with the correct granularity
export const getArrayAnalytic = (granularity: AnalyticGranularity): BudgetMetric[] => {
  const createBudgetMetric = () => ({
    actuals: {
      value: 0,
      unit: 'DAI',
    },
    budget: {
      value: 0,
      unit: 'DAI',
    },
    forecast: {
      value: 0,
      unit: 'DAI',
    },
    paymentsOnChain: {
      value: 0,
      unit: 'DAI',
    },
    paymentsOffChainIncluded: {
      value: 0,
      unit: 'DAI',
    },
    protocolNetOutflow: {
      value: 0,
      unit: 'DAI',
    },
  });

  let arrayLength;
  switch (granularity) {
    case 'monthly':
      arrayLength = 12;
      break;
    case 'quarterly':
      arrayLength = 4;
      break;
    case 'annual':
      arrayLength = 1;
      break;
    case 'semiAnnual':
      arrayLength = 2;
      break;
    default:
      arrayLength = 4;
  }

  return Array.from({ length: arrayLength }, createBudgetMetric);
};

const getBreakdownAnalytics = (
  analytics: Analytic,
  budgets: Budget[],
  granularity: AnalyticGranularity
): BreakdownBudgetAnalytic => {
  const budgetsAnalytics: BreakdownBudgetAnalytic = {};

  if (Array.isArray(analytics?.series) && analytics.series.length > 0) {
    // add all the data to budget analytics
    analytics.series.forEach((item, index) => {
      item.rows.forEach((row) => {
        const codePath = row.dimensions[0].path;
        if (!Object.hasOwn(budgetsAnalytics, codePath)) {
          // set empty values for the current code path
          budgetsAnalytics[codePath] = getArrayAnalytic(granularity);
        }

        const budgetMetric = budgetsAnalytics[codePath][index] ?? newBudgetMetric();

        switch (row.metric) {
          case 'Actuals':
            budgetMetric.actuals = setMetric(row.value, row.unit);
            break;
          case 'Forecast':
            budgetMetric.forecast = setMetric(row.value, row.unit);
            break;
          case 'Budget':
            budgetMetric.budget = setMetric(row.value, row.unit);
            break;
          case 'PaymentsOnChain':
            budgetMetric.paymentsOnChain = setMetric(row.value, row.unit);
            break;
          case 'ProtocolNetOutflow':
            budgetMetric.protocolNetOutflow = setMetric(row.value, row.unit);
            break;
        }

        budgetsAnalytics[codePath][index] = budgetMetric;
      });
    });
  }

  // check if there are budgets that are not in the analytics
  // in that case we need to add them with empty values
  budgets.forEach((budget) => {
    if (!Object.hasOwn(budgetsAnalytics, budget.codePath)) {
      budgetsAnalytics[budget.codePath] = getArrayAnalytic(granularity);
    }
  });

  return budgetsAnalytics;
};

export const getBudgetsAnalytics = async (
  granularity: AnalyticGranularity,
  year: string,
  select: string,
  lod: number,
  budgets: Budget[]
) => {
  const analytics = await fetchAnalytics(granularity, year, select, lod);

  return getBreakdownAnalytics(analytics, budgets, granularity);
};

export const colors: string[] = ['#F99374', '#447AFB', '#2DC1B1'];
export const colorsDark: string[] = ['#F77249', '#447AFB', '#1AAB9B'];

export const getMonthlyBarChartLabels = (isMobile: boolean, isWaterfall = false, useShortLabels = false): string[] => {
  const fullLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const shortLabels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  // Select the label set based on the options provided.
  const labels = useShortLabels || isMobile ? shortLabels : fullLabels;

  if (isWaterfall) {
    const startLabel = isMobile ? 'S' : 'START';
    const endLabel = isMobile ? 'F' : 'FINISH';
    return [startLabel, ...labels, endLabel].filter(Boolean);
  }

  return labels;
};

export const barChartAxisLabelsQuarterly = (isMobile: boolean, isWaterfall = false) => {
  const defaultArray = ['Q’1', 'Q’2', 'Q’3', 'Q’4'];

  if (isWaterfall) {
    const start = isMobile ? '' : 'START';
    const finish = isMobile ? '' : 'FINISH';
    defaultArray.unshift(start);
    defaultArray.push(finish);
  }

  return defaultArray;
};

const barChartAxisLabelsAnnually = (isMobile: boolean, isWaterfall: boolean) => {
  const defaultArray = ['Year'];
  if (isWaterfall) {
    const start = isMobile ? '' : 'START';
    const finish = isMobile ? '' : 'FINISH';
    defaultArray.unshift(start);
    defaultArray.push(finish);
  }
  return defaultArray;
};

export const getChartAxisLabelByGranularity = (
  granularity: AnalyticGranularity,
  isMobile: boolean,
  isWaterfall = false,
  useShortLabels = false
) => {
  switch (granularity) {
    case 'monthly':
      return getMonthlyBarChartLabels(isMobile, isWaterfall, useShortLabels);
    case 'quarterly':
      return barChartAxisLabelsQuarterly(isMobile, isWaterfall);
    case 'annual':
      return barChartAxisLabelsAnnually(isMobile, isWaterfall);
    default:
      barChartAxisLabelsQuarterly(isMobile, isWaterfall);
  }
};
export const formatterBreakdownChart = (
  granularity: AnalyticGranularity,
  isMobile: boolean,
  year: string,
  value: string,
  isLessMobile: boolean
) => {
  switch (granularity) {
    case 'monthly':
      if (isMobile || isLessMobile) return value;
      return value;
    case 'quarterly':
      return value;
    case 'annual':
      return year;
    default:
      return value;
  }
};

export const formatterWaterfallChart = (
  granularity: AnalyticGranularity,
  isMobile: boolean,
  isTable: boolean,
  year: string,
  value: string,
  index: number
) => {
  if (isMobile) {
    switch (granularity) {
      case 'monthly':
        if (index === 0 || index === 13) {
          return `{mobileStyle|${value}}`;
        }
        return `${value}`;
      case 'quarterly':
        if (index === 0 || index === 5) {
          return '';
        }
        return `{month|${value}}\n{year|${year}}`;
      case 'annual':
        if (index === 0 || index === 2) {
          return '';
        }
        return `{month|${year}}`;

      default:
        return `{start|${value}}`;
    }
  }

  if (isTable) {
    switch (granularity) {
      case 'monthly':
        if (index === 0 || index === 13) {
          return `{start|${value}}\n{startYear|${index === 13 ? Number(year) + 1 : year}}`;
        }

        return `${value.slice(0, 1)}’{value|${year.slice(2, 4)}}`;
      case 'quarterly':
        if (index === 0 || index === 5) {
          return '';
        }
        return `{month|${value}}\n{year|${year}}`;
      case 'annual':
        if (index === 0 || index === 2) {
          return '';
        }
        return `{month|${year}}`;
      default:
        return `{start|${value}}`;
    }
  }

  switch (granularity) {
    case 'monthly':
      if (index === 0 || index === 13) {
        return `{start|${value}}\n{startYear|${index === 13 ? Number(year) + 1 : year}}`;
      }
      return `{month|${value}}\n{year|${year}}`;
    case 'quarterly':
      if (index === 0 || index === 5) {
        return `{start|${value}}\n{startYear|${index === 5 ? Number(year) + 1 : year}}`;
      }
      return `{month|${value}}\n{year|${year}}`;
    case 'annual':
      if (index === 0 || index === 2) {
        return `{start|${value}}\n{startYear|${index === 2 ? Number(year) + 1 : year}}`;
      }
      return `{month|${value}}\n{year|${year}}`;
    default:
      return `{month|${value}}\n{year|${year}}`;
  }
};
export const getCorrectMetric = (budgetMetric: BudgetMetric, selectedMetric: AnalyticMetric): ValuesDataWithBorder => {
  let metricKey: keyof BudgetMetric;
  switch (selectedMetric) {
    case 'Budget':
      metricKey = 'budget';
      break;
    case 'Actuals':
      metricKey = 'actuals';
      break;
    case 'Forecast':
      metricKey = 'forecast';
      break;
    case 'PaymentsOnChain':
      metricKey = 'paymentsOnChain';
      break;
    case 'ProtocolNetOutflow':
      metricKey = 'protocolNetOutflow';
      break;
    default:
      throw new Error('Unsupported Metric');
  }

  return {
    value: budgetMetric[metricKey]?.value || 0,
    itemStyle: {
      borderRadius: [0, 0, 0, 0],
    },
  };
};

export const buildExpenseMetricsLineChartSeries = (
  data: {
    budget: number[];
    forecast: number[];
    actuals: number[];
    onChain: number[];
    protocolNetOutflow: number[];
  },
  inactiveSeries: string[],
  isLight: boolean,
  granularity: AnalyticGranularity
) => {
  const disabled = {
    Budget: inactiveSeries.includes('Budget'),
    Forecast: inactiveSeries.includes('Forecast'),
    'Net Protocol Outflow': inactiveSeries.includes('Net Protocol Outflow'),
    'Net Expenses On-Chain': inactiveSeries.includes('Net Expenses On-Chain'),
    Actuals: inactiveSeries.includes('Actuals'),
  };

  // there's not available types for this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const render = (params: any, api: any) => {
    const coord1 = api.coord([api.value(0, params.dataIndexInside), api.value(1, params.dataIndexInside)]);

    return {
      type: 'group',
      children: [
        {
          type: 'line',
          shape: {
            x1: params.coordSys.x,
            y1: coord1[1],
            x2: params.coordSys.x + params.coordSys.width,
            y2: coord1[1],
          },
          style: {
            stroke: api.visual('color'),
            lineWidth: 2,
          },
        },
        {
          type: 'circle',
          transition: 'shape',
          shape: {
            cx: coord1[0],
            cy: coord1[1],
            r: 2,
          },
          style: {
            stroke: api.visual('color'),
            fill: 'white',
            lineWidth: 2,
          },
        },
      ],
    };
  };

  return [
    {
      name: 'Budget',
      data: disabled.Budget ? [] : data?.budget,
      type: granularity === 'annual' ? 'custom' : 'line',
      itemStyle: {
        color: disabled.Budget ? '#ccc' : isLight ? '#F99374' : '#F77249',
      },
      isVisible: !disabled.Budget,
      renderItem: render,
    },
    {
      name: 'Forecast',
      data: disabled.Forecast ? [] : data?.forecast,
      type: granularity === 'annual' ? 'custom' : 'line',
      itemStyle: {
        color: disabled.Forecast ? '#ccc' : isLight ? '#447AFB' : '#447AFB',
      },
      isVisible: !disabled.Forecast,
      renderItem: render,
    },
    {
      name: 'Net Protocol Outflow',
      data: disabled['Net Protocol Outflow'] ? [] : data?.protocolNetOutflow,
      type: granularity === 'annual' ? 'custom' : 'line',
      itemStyle: {
        color: disabled['Net Protocol Outflow'] ? '#ccc' : isLight ? '#7C6B95' : '#6C40AA',
      },
      isVisible: !disabled['Net Protocol Outflow'],
      renderItem: render,
    },
    {
      name: 'Net Expenses On-Chain',
      data: disabled['Net Expenses On-Chain'] ? [] : data?.onChain,
      type: granularity === 'annual' ? 'custom' : 'line',
      itemStyle: {
        color: disabled['Net Expenses On-Chain'] ? '#ccc' : isLight ? '#FBCC5F' : '#FDC134',
      },
      isVisible: !disabled['Net Expenses On-Chain'],
      renderItem: render,
    },
    {
      name: 'Actuals',
      data: disabled.Actuals ? [] : data?.actuals,
      type: granularity === 'annual' ? 'custom' : 'line',
      itemStyle: {
        color: disabled.Actuals ? '#ccc' : isLight ? '#2DC1B1' : '#1AAB9B',
      },
      isVisible: !disabled.Actuals,
      renderItem: render,
    },
  ] as LineChartSeriesData[];
};

export const filterActiveMetrics = (activeMetrics: string[], headerTable: MetricValues[]) =>
  headerTable.map((header) => {
    const filteredMetrics: Partial<MetricValues> = {};

    activeMetrics.forEach((metric) => {
      const matchKey = getKeyMetric(metric);
      if (matchKey in header) {
        filteredMetrics[matchKey as keyof MetricValues] = header[matchKey as keyof MetricValues];
      }
    });

    return filteredMetrics;
  });

export const getShortNameForMetric = (metric: string): string => {
  if (metric === 'Net Expenses On-Chain') {
    return 'On-Chain';
  }
  if (metric === 'Net Expenses Off-chain') {
    return 'Off-chain';
  }
  if (metric === 'Net Protocol Outflow') {
    // shorten name
    // eslint-disable-next-line spellcheck/spell-checker
    return 'Prtcol Outfl';
  }
  return metric;
};

export const formatBudgetName = (name: string) => {
  const newName = name ? name.replace(/^End-game\s*/i, '') : 'No-Name';

  switch (newName) {
    case 'Atlas Immutable':
      return 'Atlas Immutable Budget';
    case 'Alignment Scope Budgets':
      return 'Scope Frameworks Budget';
    case 'MakerDAO Legacy Budgets':
      return 'MakerDAO Legacy Budget';
    default:
      return newName;
  }
};

export const transformPathToName = (path: string) => {
  if (!path) return '';
  const transformedPath = path.replaceAll('/*', '');
  const segments = transformedPath.split('/');

  if (segments.length === 0) {
    return '';
  }

  return segments[segments.length - 1] || '';
};

export const getKeyMetric = (metric: string) => {
  if (metric === 'Net Expenses On-Chain') {
    return 'PaymentsOnChain';
  }
  if (metric === 'Net Expenses Off-chain') {
    return 'PaymentsOffChainIncluded';
  }
  if (metric === 'Net Protocol Outflow') {
    return 'ProtocolNetOutflow';
  }
  return metric;
};

// TODO: remove this after refactoring breakdown chart
export const getKeyMetricBreakDownChart = (metric: string): AnalyticMetric => {
  switch (metric) {
    case 'Net Expenses On-Chain':
      return 'PaymentsOnChain';
    case 'Net Protocol Outflow':
      return 'ProtocolNetOutflow';
    case 'Budget':
      return 'Budget';
    case 'Forecast':
      return 'Forecast';
    case 'Actuals':
      return 'Actuals';
    default:
      return 'Budget';
  }
};
export const hasSubLevels = (codePath: string, budgets: Budget[]) => {
  const normalizedCodePath = codePath.endsWith('/') ? codePath : `${codePath}/`;
  return budgets?.some((item) => {
    const normalizedItemCodePath = item.codePath.endsWith('/') ? item.codePath : `${item.codePath}/`;
    return (
      normalizedItemCodePath.startsWith(normalizedCodePath) && normalizedItemCodePath.length > normalizedCodePath.length
    );
  });
};

export const removeBudgetWord = (name: string) => {
  const wordToRemove = /Budget\s*$/i;

  return name.replace(wordToRemove, '');
};

export const getMonthAbbreviationToolTip = (month: number) => {
  const monthKeys = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const key = monthKeys[month];
  return key;
};
