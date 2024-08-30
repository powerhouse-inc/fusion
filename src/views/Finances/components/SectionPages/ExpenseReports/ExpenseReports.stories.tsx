import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { ENUM_FOR_STORIES, getHeadersExpenseReport, mockDataApiTeam } from '@/views/Finances/utils/utils';
import ExpenseReports from './ExpenseReports';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ExpenseReports> = {
  title: 'Fusion/Views/Finances/Section/Expense Reports Finances',
  component: ExpenseReports,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
    },
    date: new Date('2023-09-18T12:23:00Z'),
  },
};

export default meta;

const expenseReportResponse = {
  isLoading: false,
  error: undefined,
  data: [mockDataApiTeam.filter((item) => item.budgetStatements.length >= 1).map((item) => item.budgetStatements[0])],
};

const args = [
  {
    year: '2024',
    columns: getHeadersExpenseReport(ENUM_FOR_STORIES, 'Actuals', false),
    sortClick: () => null,
    selectedMetric: 'Actuals',
    expenseReportResponse,
    hasExpenseReport: true,
    sorts: [],
    canReset: true,
    onReset: () => null,
  },
  {
    year: '2023',
    columns: getHeadersExpenseReport(ENUM_FOR_STORIES, 'Actuals', true),
    sortClick: () => null,
    selectedMetric: 'Actuals',
    expenseReportResponse,
    hasExpenseReport: true,
    sorts: [],
    canReset: false,
    onReset: () => null,
  },
];

const [[LightMode, DarkMode], [Desk1024LightMode, Desk1024DarkMode]] = createThemeModeVariants(ExpenseReports, args);

export { LightMode, DarkMode, Desk1024LightMode, Desk1024DarkMode };

LightMode.parameters = {
  chromatic: {
    viewports: [375, 768, 1280, 1440],
  },
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-13776&m=dev',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-11821&m=dev',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -1,
            left: -12,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-5111&m=dev',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=8-11437&m=dev',
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
    },
  },
};

Desk1024LightMode.parameters = {
  chromatic: {
    viewports: [1024],
  },
  figma: {
    component: {
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-7690&m=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -1,
            left: -2,
          },
        },
      },
    },
  },
};

DarkMode.parameters = {};
Desk1024DarkMode.parameters = {};
