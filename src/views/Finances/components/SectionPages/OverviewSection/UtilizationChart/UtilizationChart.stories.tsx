import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import { generateColorPalette } from '@/views/Finances/utils/utils';
import UtilizationChart from './UtilizationChart';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof UtilizationChart> = {
  title: 'Fusion/Views/Finances/Section/Main/Utilization Chart',
  component: UtilizationChart,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
      delay: 5000,
    },
  },
};
export default meta;

const colors = generateColorPalette(16, 16);
const data = [
  {
    name: 'Endgame Atlas Budgets',
    value: 1790155,
    color: colors[0],
  },
  {
    name: 'Endgame Scope Budgets',
    value: 12000000,
    color: colors[1],
  },
  {
    name: 'MakerDAO Legacy Budgets',
    value: 9000000,
    color: colors[2],
  },
  {
    name: 'Lorem ipsum',
    value: 5000000,
    color: colors[3],
  },
  {
    name: 'Dolor sit amet',
    value: 4000000,
    color: colors[4],
  },
  {
    name: 'Consectetur adipiscing elit',
    value: 3000000,
    color: colors[5],
  },
  {
    name: 'Sed do',
    value: 2000000,
    color: colors[6],
  },
  {
    name: 'Sit amet',
    value: 1000000,
    color: colors[7],
  },
  {
    name: 'Consectetur adipiscing elit',
    value: 500000,
    color: colors[8],
  },
  {
    name: 'Sed do',
    value: 400000,
    color: colors[9],
  },
  {
    name: 'Lorem amet',
    value: 300000,
    color: colors[10],
  },
  {
    name: 'Dolor sit amet',
    value: 200000,
    color: colors[11],
  },
  {
    name: 'Consectetur adipiscing elit',
    value: 100000,
    color: colors[12],
  },
  {
    name: 'Sed do',
    value: 50000,
    color: colors[13],
  },
  {
    name: 'Sit amet',
    value: 40000,
    color: colors[14],
  },
  {
    name: 'Consectetur adipiscing elit',
    value: 30000,
    color: colors[15],
  },
];
const getPercentage = (index: number, amountOfItems: number) =>
  (data[index].value / data.slice(0, amountOfItems).reduce((acc, item) => acc + item.value, 0)) * 100;

const BaseCommonMetrics = {
  budget: {
    value: 1790155,
    unit: 'DAI',
  },
  actuals: {
    value: 9120,
    unit: 'DAI',
  },
  forecast: {
    value: 4436,
    unit: 'DAI',
  },
  paymentsOnChain: {
    value: 0,
    unit: 'DAI',
  },
  protocolNetOutflow: {
    value: 1790155,
    unit: 'DAI',
  },
  paymentsOffChainIncluded: {
    value: 1790155,
    unit: 'DAI',
  },
  name: '',
};
const ParamsBase = {
  selectedMetric: 'Budget',
  handleMetricChange: () => null,

  seriesData: [
    {
      name: 'Endgame Atlas Budgets',
      value: 1790155,
      percent: 82,
      metrics: BaseCommonMetrics,
      color: '#F99374',
    },
    {
      name: 'Endgame Scope Budgets',
      value: 12000000,
      percent: 12,
      metrics: BaseCommonMetrics,
      color: '#447AFB',
    },
    {
      name: 'MakerDAO Legacy Budgets',
      value: 9000000,
      percent: 8,
      metrics: BaseCommonMetrics,
      color: '#2DC1B1',
    },
  ] as DoughnutSeries[],
};

const args = [
  // default 3 items
  {
    ...ParamsBase,
    seriesData: data.slice(0, 3).map((item, index) => ({
      ...item,
      percent: getPercentage(index, 3),
      metrics: BaseCommonMetrics,
    })),
  },
  // 5 items for two columns without swiper
  {
    ...ParamsBase,
    seriesData: data.slice(0, 5).map((item, index) => ({
      ...item,
      percent: getPercentage(index, 5),
      metrics: BaseCommonMetrics,
    })),
  },
];
const [[DefaultLightMode, DefaultDarkMode], [With5ItemsLightMode, With5ItemsDarkMode]] = createThemeModeVariants(
  UtilizationChart,
  args
);

export { DefaultLightMode, DefaultDarkMode, With5ItemsLightMode, With5ItemsDarkMode };

DefaultLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-12878',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -15,
            left: -14,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-10805',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -15,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-6584',
        options: {
          componentStyle: {
            width: 632,
          },
          style: {
            top: -15,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-4008',
        options: {
          componentStyle: {
            width: 789,
          },
          style: {
            top: -15,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=8-10351',
        options: {
          componentStyle: {
            width: 864,
          },
          style: {
            top: -15,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};
