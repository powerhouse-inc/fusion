import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import CookiesPolicyBanner from './CookiesPolicyBanner';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CookiesPolicyBanner> = {
  title: 'Fusion/Components/CookiesPolicyBanner',
  component: CookiesPolicyBanner,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [
  {
    functionalCheckbox: true,
    analyticsCheckbox: false,
    setFunctionalCheckbox: () => null,
    setAnalyticsCheckbox: () => null,
    handleAcceptCookies: () => null,
    handleRejectCookies: () => null,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(CookiesPolicyBanner, variantsArgs, false);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7367-70431&m=dev',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: -35,
            left: -30,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10966-10272&m=dev',
        options: {
          componentStyle: {
            width: 768,
          },
          style: {
            top: -35,
            left: -30,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10966-10246&m=dev',
        options: {
          componentStyle: {
            width: 1024,
          },
          style: {
            top: -35,
            left: -30,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7367-69030&m=dev',
        options: {
          componentStyle: {
            width: 1280,
          },
          style: {
            top: -35,
            left: -30,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7307-62870&m=dev',
        options: {
          componentStyle: {
            width: 1440,
          },
          style: {
            top: -35,
            left: -30,
          },
        },
      },
    },
  } as FigmaParams,
};
