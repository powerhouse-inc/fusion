import { BreakdownBudgetAnalyticBuilder } from '@ses/core/businessLogic/builders/analyticBuilder';
import { BudgetBuilder } from '@ses/core/businessLogic/builders/budgetBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BreakdownChartSection from './BreakdownChartSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof BreakdownChartSection> = {
  title: 'Fusion/Views/Finances/Section/BreakdownChartSection',
  component: BreakdownChartSection,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
      delay: 5000,
    },
  },
};
export default meta;
const args = [
  {
    isLoading: false,
    year: '2023',
    selectedMetric: 'monthly',
    onMetricChange: () => null,
    selectedGranularity: 'monthly',
    onGranularityChange: () => null,
    isDisabled: false,
    handleResetFilter: () => null,
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
          4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213,
        ],
        type: 'bar',
        stack: 'x',

        showBackground: false,
        itemStyle: {
          color: '#F99374',
        },
        isVisible: true,
      },
      {
        name: 'Endgame Scopes',
        data: [
          4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213,
        ],
        type: 'bar',
        stack: 'x',

        showBackground: false,
        itemStyle: {
          color: '#447AFB',
        },
        isVisible: true,
      },
      {
        name: 'MakerDAO Legacy',
        data: [
          4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213, 4123213,
        ],
        type: 'bar',
        stack: 'x',

        showBackground: false,
        itemStyle: {
          color: '#2DC1B1',
        },
        isVisible: true,
      },
    ],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(BreakdownChartSection, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16:12963&m=dev',
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
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16:10909&m=dev',
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
