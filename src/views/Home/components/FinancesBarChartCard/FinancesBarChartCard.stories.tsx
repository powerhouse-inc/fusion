import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import FinancesBarChartCard from './FinancesBarChartCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof FinancesBarChartCard> = {
  title: 'Fusion/Views/Home/FinancesBarChartCard',
  component: FinancesBarChartCard,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [
  {
    revenueAndSpendingData: {
      2021: {
        fees: 50000,
        liquidationIncome: 120000,
        psm: 30000,
        daiSpent: 70000,
        mkrVesting: 20000,
        dsr: 10000,
        annualProfit: 100000,
      },
      2022: {
        fees: 60000,
        liquidationIncome: 140000,
        psm: 35000,
        daiSpent: 80000,
        mkrVesting: 25000,
        dsr: 15000,
        annualProfit: 115000,
      },
      2023: {
        fees: 70000,
        liquidationIncome: 160000,
        psm: 40000,
        daiSpent: 90000,
        mkrVesting: 30000,
        dsr: 20000,
        annualProfit: 130000,
      },
      2024: {
        fees: 80000,
        liquidationIncome: 180000,
        psm: 45000,
        daiSpent: 100000,
        mkrVesting: 35000,
        dsr: 25000,
        annualProfit: 145000,
      },
    },
    years: ['2021', '2022', '2023', '2024'],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(FinancesBarChartCard, variantsArgs);

export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-31844&m=dev',
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
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-29642&m=dev',
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
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-26895&m=dev',
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
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10198-41064&m=dev',
        options: {
          componentStyle: {
            width: 481,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-13970&m=dev',
        options: {
          componentStyle: {
            width: 528,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};
