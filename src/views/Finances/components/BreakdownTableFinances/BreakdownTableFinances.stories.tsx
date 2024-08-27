import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BreakdownTableFinances from './BreakdownTableFinances';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof BreakdownTableFinances> = {
  title: 'Fusion/Views/Finances/Section/BreakdownTableFinances',
  component: BreakdownTableFinances,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const args = [
  {
    year: '2024',
    filters: [
      {
        id: '1',
        type: 'select',
        options: ['Budget', 'Forecast', 'Net Protocol Outflow', 'Net Expenses On-Chain', 'Actuals'].map((filter) => ({
          label: filter,
          value: filter,
        })),
        label: 'Metrics',
        selected: ['Budget'],
        multiple: true,
        onChange: () => null,
        widthStyles: {
          width: 140,
          menuWidth: 220,
        },
      },
      {
        id: '2',
        type: 'select',
        options: ['Monthly', 'Quarterly', 'Annualy'].map((filter) => ({
          label: filter,
          value: filter,
        })),
        label: 'Period',
        selected: 'Monthly',
        onChange: () => null,
        widthStyles: {
          width: 140,
          menuWidth: 220,
        },
      },
    ],
    resetFilters: {
      canReset: false,
      onReset: () => null,
    },
  },
];
const [[LightMode, DarkMode]] = createThemeModeVariants(BreakdownTableFinances, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22820:192777&mode=design&t=NJ7Cakxx5a5IPq73-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: 1,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22977:247213&mode=dev',
        options: {
          componentStyle: {
            width: 770,
          },
          style: {
            top: -1,

            left: -1,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22944:241186&mode=dev',
        options: {
          componentStyle: {
            width: 1130,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:213863&mode=dev',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:200125&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:204425&mode=dev',
        options: {
          componentStyle: {
            width: 1792,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
    },
  } as FigmaParams,
};
