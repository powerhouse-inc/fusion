import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { buildExpenseMetricsLineChartSeries } from '@/views/Finances/utils/utils';
import ExpenseMetrics from './ExpenseMetricsFinances';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ExpenseMetrics> = {
  title: 'Fusion/Views/Finances/Section/ExpenseMetrics',
  component: ExpenseMetrics,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
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
const getFiltersConfig = () => [
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
  {
    type: 'cumulative',
    id: 'cumulative',
    label: 'Cumulative',
    cumulativeType: 'relative',
    isCumulative: false,
    handleChangeCumulativeType: () => null,
    handleToggleCumulative: () => null,
  },
];
const args = [
  {
    title: 'Sky Expense Metrics',
    year: 2024,
    series: buildExpenseMetricsLineChartSeries(chartData, [], true, 'monthly'),
    selectedGranularity: 'monthly',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleGranularityChange: (value: string) => null,

    isCumulative: false,
    cumulativeType: 'relative',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleToggleSeries: (series: string) => null,

    filters: getFiltersConfig(),
    canReset: false,
    onReset: () => null,
  },
  {
    title: 'Sky Expense Metrics',
    year: 2023,
    series: buildExpenseMetricsLineChartSeries(chartData, [], false, 'monthly'),
    selectedGranularity: 'monthly',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleGranularityChange: (value: string) => null,
    isCumulative: false,
    cumulativeType: 'relative',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleToggleSeries: (series: string) => null,

    filters: getFiltersConfig(),
    canReset: false,
    onReset: () => null,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(ExpenseMetrics, args, false);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-13099&m=dev',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-11043&m=dev',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-6822&m=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=8660-46831&m=dev',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=8942-102294&m=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
    },
  },
};
