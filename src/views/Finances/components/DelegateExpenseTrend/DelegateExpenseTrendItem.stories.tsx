import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { mockDataApiTeam } from '../../utils/utils';
import DelegateExpenseTrendItem from './DelegateExpenseTrendItem';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof DelegateExpenseTrendItem> = {
  title: 'Fusion/Views/Finances/DelegateExpenseTrendItem',
  component: DelegateExpenseTrendItem,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
    },
    date: new Date('2023-09-24T09:08:34.123'),
  },
};

export default meta;

const variantsArgs = [
  {
    selectedMetric: 'Actuals',
    budget: mockDataApiTeam[0].budgetStatements[0],
  },
  {
    selectedMetric: 'Actuals',
    budget: mockDataApiTeam[0].budgetStatements[0],
  },
];

const [[DelegateExpense, DelegateExpenseDark]] = createThemeModeVariants(DelegateExpenseTrendItem, variantsArgs);

export { DelegateExpense, DelegateExpenseDark };

DelegateExpense.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-13799&m=dev',
        options: {
          style: {
            left: -4,
            top: -1,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-11846&m=dev',
        options: {
          style: {
            left: -4,
            top: -2,
          },
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-7727&m=dev',
        options: {
          style: {
            left: -14,
            top: -11,
          },
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-5148&m=dev',
        options: {
          style: {
            left: -14,
            top: -11,
          },
          componentStyle: {
            width: 1200,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=8660-57207&m=dev',
        options: {
          style: {
            left: -14,
            top: -10,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

DelegateExpenseDark.parameters = {};
