import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { financesDataMocked } from '../../staticData';
import FinancesLineChartCard from './FinancesLineChartCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof FinancesLineChartCard> = {
  title: 'Fusion/Views/Home/FinancesLineChartCard',
  component: FinancesLineChartCard,
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
    financesData: financesDataMocked,
    years: ['2021', '2022', '2023', '2024'],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(FinancesLineChartCard, variantsArgs);

export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-32011&m=dev',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -16,
            left: -14,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-29764&m=dev',
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
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-27017&m=dev',
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
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-24134&m=dev',
        options: {
          componentStyle: {
            width: 687,
          },
          style: {
            top: -13,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-14137&m=dev',
        options: {
          componentStyle: {
            width: 752,
          },
          style: {
            top: -13,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};
