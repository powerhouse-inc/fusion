import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { buildExpenseMetricsLineChartSeries } from '@/views/Finances/utils/utils';
import ExpenseMetricsSection from './ExpenseMetricsSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ExpenseMetricsSection> = {
  title: 'Fusion/Views/Finances/Section/ExpenseMetrics',
  component: ExpenseMetricsSection,

  parameters: {
    chromatic: {
      viewports: [1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const chartData = {
  budget: [123434, 123434, 123434, 123434, 100000, 250000, 900000, 1250000, 0, 1400000, 1400000, 1500000],
  forecast: [123434, 123434, 123434, 123434, 100000, 250000, 900000, 1250000, 0, 1400000, 1400000, 1500000],
  actuals: [123434, 123434, 123434, 123434, 100000, 250000, 900000, 1250000, 0, 1400000, 1400000, 1500000],
  onChain: [123434, 123434, 123434, 123434, 100000, 250000, 900000, 1250000, 0, 1400000, 1400000, 1500000],
  protocolNetOutflow: [123434, 123434, 123434, 123434, 100000, 250000, 900000, 1250000, 0, 1400000, 1400000, 1500000],
};

const args = [
  {
    expenseMetrics: {
      title: 'Sky Expense Metrics',
      year: 2024,
      series: buildExpenseMetricsLineChartSeries(chartData, [], true, 'monthly'),
      selectedGranularity: 'monthly',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleGranularityChange: (value: string) => null,
    },
  },
  {
    expenseMetrics: {
      title: 'Sky Expense Metrics',
      year: 2023,
      series: buildExpenseMetricsLineChartSeries(chartData, [], false, 'monthly'),
      selectedGranularity: 'monthly',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleGranularityChange: (value: string) => null,
    },
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(ExpenseMetricsSection, args, false);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-4245&m=dev',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=8-10583&m=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
    },
  },
};
