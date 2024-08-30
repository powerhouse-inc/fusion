import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { ENUM_FOR_STORIES, getHeadersExpenseReport } from '../../utils/utils';
import HeaderDelegateExpense from './HeaderDelegateExpense';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof HeaderDelegateExpense> = {
  title: 'Fusion/Views/Finances/HeaderDelegateExpense',
  component: HeaderDelegateExpense,
  parameters: {
    chromatic: {
      viewports: [1024, 1280, 1440],
    },
  },
};

export default meta;

const variantsArgs = [
  {
    columns: getHeadersExpenseReport(ENUM_FOR_STORIES, 'Actuals', false),
  },
  {
    columns: getHeadersExpenseReport(ENUM_FOR_STORIES, 'Actuals', true),
  },
];

const [[HeaderDelegate, HeaderDelegateDark], [HeaderDelegate1024, HeaderDelegate1024Dark]] = createThemeModeVariants(
  HeaderDelegateExpense,
  variantsArgs
);

export { HeaderDelegate, HeaderDelegateDark, HeaderDelegate1024, HeaderDelegate1024Dark };

HeaderDelegate.parameters = {
  chromatic: {
    viewports: [1280, 1440],
  },
  figma: {
    component: {
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-5135&m=dev',
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
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=8660-57194&m=dev',
        options: {
          style: {
            left: -14,
            top: -11,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

HeaderDelegate1024.parameters = {
  chromatic: {
    viewports: [1024],
  },
  figma: {
    component: {
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-7714&m=dev',
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
    },
  },
};

HeaderDelegateDark.parameters = {};
HeaderDelegate1024Dark.parameters = {};
