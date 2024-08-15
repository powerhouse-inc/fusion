import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { buildExpenseMetricsLineChartSeries } from '@/views/Finances/utils/utils';
import MakerDAOExpenseMetrics from './MakerDAOExpenseMetrics';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof MakerDAOExpenseMetrics> = {
  title: 'Fusion/Views/Finances/MakerDAOExpenseMetrics',
  component: MakerDAOExpenseMetrics,

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

const args = [
  {
    title: 'Sky Expense Metrics',
    year: 2024,
    series: buildExpenseMetricsLineChartSeries(chartData, [], true, 'monthly'),
    selectedGranularity: 'monthly',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleGranularityChange: (value: string) => null,
  },
  {
    title: 'Sky Expense Metrics',
    year: 2023,
    series: buildExpenseMetricsLineChartSeries(chartData, [], false, 'monthly'),
    selectedGranularity: 'monthly',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleGranularityChange: (value: string) => null,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(MakerDAOExpenseMetrics, args, false);
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
            top: 0,
            left: 0,
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
            top: 0,
            left: 0,
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
            top: 0,
            left: 0,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-4246&m=dev',
        options: {
          componentStyle: {
            width: 584,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=8-10584&m=dev',
        options: {
          componentStyle: {
            width: 640,
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
