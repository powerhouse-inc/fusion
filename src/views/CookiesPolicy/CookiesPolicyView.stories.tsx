import { featureFlags } from 'feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '@/config/endpoints';
import { FeatureFlagsProvider } from '@/core/context/FeatureFlagsProvider';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import AppLayout from '@/stories/containers/AppLayout/AppLayout';
import CookiesPolicyView from './CookiesPolicyView';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CookiesPolicyView> = {
  title: 'Fusion/Pages/CookiesPolicy',
  component: CookiesPolicyView,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <CookiesPolicyView {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs,
  false
);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7367-70475&m=dev',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: -16,
            left: -16,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7367-69921&m=dev',
        options: {
          componentStyle: {
            width: 768,
          },
          style: {
            top: -16,
            left: -16,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7367-69476&m=dev',
        options: {
          componentStyle: {
            width: 1024,
          },
          style: {
            top: -16,
            left: -16,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7367-69070&m=dev',
        options: {
          componentStyle: {
            width: 1280,
          },
          style: {
            top: -16,
            left: -16,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7307-63556&m=dev',
        options: {
          componentStyle: {
            width: 1440,
          },
          style: {
            top: -16,
            left: -16,
          },
        },
      },
    },
  } as FigmaParams,
};
