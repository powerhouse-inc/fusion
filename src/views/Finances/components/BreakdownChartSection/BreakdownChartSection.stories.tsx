import { BreakdownBudgetAnalyticBuilder } from '@ses/core/businessLogic/builders/analyticBuilder';
import { BudgetBuilder } from '@ses/core/businessLogic/builders/budgetBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { AnalyticMetric } from '@/core/models/interfaces/analytic';
import type { SelectItem } from '@/stories/components/SingleItemSelect/SingleItemSelect';
import BreakdownChartSection from './BreakdownChartSection';
import type { Meta } from '@storybook/react';

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
    labelWhenSelected: 'Protocol Outflow',
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

const smallNumbersItems = {
  isLoading: false,
  year: '2023',
  selectedMetric: 'monthly',
  onMetricChange: () => null,
  selectedGranularity: 'monthly',
  onGranularityChange: () => null,
  isDisabled: false,
  handleResetFilter: () => null,
  filters: [
    {
      type: 'select',
      id: 'Metrics',
      label: 'Metrics',
      selected: 'Budget',
      multiple: false,
      onChange: () => null,
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
      selected: 'monthly',
      multiple: false,
      onChange: () => null,
      options: granularityItems,
      withAll: false,
      widthStyles: {
        width: 'fit-content',
        menuWidth: 350,
      },
    },
  ],
  budgets: [
    new BudgetBuilder()
      .withCode('id')
      .withName('Atlas Budgets')
      .withCodePath('atlas/legacy')
      .withDescription('some')
      .withId('23')
      .withIdPath('atlas/legooacy')
      .withImage('')
      .withParentId('34')
      .build(),
  ],
  budgetsAnalyticsMonthly: {
    'atlas/legacy': [
      new BreakdownBudgetAnalyticBuilder()
        .withCategory('atlas/legacy', [
          {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
            protocolNetOutflow: {
              value: 600,
              unit: 'DAI',
            },
          },
        ])
        .build(),
      new BreakdownBudgetAnalyticBuilder()
        .withCategory('atlas/legacy', [
          {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
            protocolNetOutflow: {
              value: 600,
              unit: 'DAI',
            },
          },
        ])
        .build(),
      new BreakdownBudgetAnalyticBuilder()
        .withCategory('atlas/legacy', [
          {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
            protocolNetOutflow: {
              value: 600,
              unit: 'DAI',
            },
          },
        ])
        .build(),
      new BreakdownBudgetAnalyticBuilder()
        .withCategory('atlas/legacy', [
          {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
            protocolNetOutflow: {
              value: 600,
              unit: 'DAI',
            },
          },
        ])
        .build(),
      new BreakdownBudgetAnalyticBuilder()
        .withCategory('atlas/legacy', [
          {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
            protocolNetOutflow: {
              value: 600,
              unit: 'DAI',
            },
          },
        ])
        .build(),
      new BreakdownBudgetAnalyticBuilder()
        .withCategory('atlas/legacy', [
          {
            actuals: {
              unit: 'DAI',
              value: 456,
            },
            budget: {
              unit: 'DAI',
              value: 456,
            },
            forecast: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOffChainIncluded: {
              unit: 'DAI',
              value: 456,
            },
            paymentsOnChain: {
              unit: 'DAI',
              value: 456,
            },
            protocolNetOutflow: {
              value: 600,
              unit: 'DAI',
            },
          },
        ])
        .build(),
    ],
  },
  budgetsAnalyticsQuarterly: {},
  series: [
    {
      name: 'Endgame Atlas ',
      data: [
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 3432,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 2324565,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4546,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
      ],
      type: 'bar',
      stack: 'x',
      showBackground: false,
      itemStyle: { color: '#F99374' },
      isVisible: true,
    },
    {
      name: 'Endgame Scopes',
      data: [
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
      ],
      type: 'bar',
      stack: 'x',
      showBackground: false,
      itemStyle: { color: '#447AFB' },
      isVisible: true,
    },
    {
      name: 'MakerDAO Legacy',
      data: [
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
        {
          itemStyle: { borderRadius: [0, 0, 0, 0] },
          value: 4123213,
        },
      ],
      type: 'bar',
      stack: 'x',
      showBackground: false,
      itemStyle: { color: '#2DC1B1' },
      isVisible: true,
    },
  ],
};

const meta: Meta<typeof BreakdownChartSection> = {
  title: 'Fusion/Views/Finances/Section/BreakdownChartSection',
  component: BreakdownChartSection,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
      delay: 5000,
    },
  },
};
export default meta;

const args = [
  {
    ...smallNumbersItems,
  },
  {
    ...smallNumbersItems,
    showScrollAndToggle: true,
    isChecked: true,
    handleToggleSeries: () => null,
    handleChangeSwitch: () => null,
    series: [
      {
        ...smallNumbersItems.series[0],
        name: 'Endgame Atlas2 ',
      },
      {
        ...smallNumbersItems.series[1],
        name: 'Endgame Scopes2',
      },
      {
        ...smallNumbersItems.series[2],
        name: 'MakerDAO Legacy2',
      },
      {
        ...smallNumbersItems.series[0],
        name: 'Endgame Atlas3',
      },
      {
        ...smallNumbersItems.series[1],
        name: 'Endgame Scopes3',
      },
      {
        ...smallNumbersItems.series[2],
        name: 'MakerDAO Legacy3',
      },
      {
        ...smallNumbersItems.series[0],
        name: 'Endgame Atlas4',
      },
      {
        ...smallNumbersItems.series[1],
        name: 'Endgame Scopes4',
      },
      {
        ...smallNumbersItems.series[2],
        name: 'MakerDAO Legacy4',
      },
    ],
  },
];

const [[LightMode, DarkMode], [ManyItems, ManyItemsDark]] = createThemeModeVariants(BreakdownChartSection, args);
export { LightMode, DarkMode, ManyItems, ManyItemsDark };

LightMode.parameters = {
  figma: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
      delay: 5000,
    },
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16:12963&t=vRPm1L2jptP12l29-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 30,
            left: -14,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16:10909&t=vRPm1L2jptP12l29-4',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 30,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16:6688&m=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 30,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16:4112&m=dev',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: 52,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=8:10454&m=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 52,
            left: -14,
          },
        },
      },
    },
  },
};

ManyItems.parameters = {
  chromatic: {
    viewports: [1280],
    pauseAnimationAtEnd: true,
    delay: 5000,
  },
  figma: {
    component: {
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16:1620&m=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 52,
            left: -14,
          },
        },
      },
    },
  },
};
ManyItemsDark.parameters = {};
