import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import BreakdownTable from './BreakdownTable';
import type { Meta } from '@storybook/react';

export default {
  title: 'Fusion/Views/Finances/Section/Main/BreakdownTable',
  component: BreakdownTable,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
    },
  },
} as Meta<typeof BreakdownTable>;

const loadingArgs = [
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
        options: ['Annually', 'Quarterly'].map((filter) => ({
          label: filter,
          value: filter,
        })),
        label: 'Period',
        selected: 'Quarterly',
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
    isLoading: true,
  },
];

const [[LoadingLightMode, LoadingDarkMode]] = createThemeModeVariants(BreakdownTable, loadingArgs, false);

export { LoadingLightMode, LoadingDarkMode };
