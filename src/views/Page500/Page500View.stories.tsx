import { featureFlags } from 'feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '@/config/endpoints';
import { FeatureFlagsProvider } from '@/core/context/FeatureFlagsProvider';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import AppLayout from '@/stories/containers/AppLayout/AppLayout';
import Page500View from './Page500View';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof Page500View> = {
  title: 'Fusion/Pages/Page500',
  component: Page500View,
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
        <Page500View {...props} />
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
        component: '',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      768: {
        component: '',
        options: {
          componentStyle: {
            width: 768,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1024: {
        component: '',
        options: {
          componentStyle: {
            width: 1024,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1280: {
        component: '',
        options: {
          componentStyle: {
            width: 1280,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1440: {
        component: '',
        options: {
          componentStyle: {
            width: 1440,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
    },
  } as FigmaParams,
};
