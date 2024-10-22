import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import HeaderCard from './HeaderCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof HeaderCard> = {
  title: 'Fusion/Views/Home/HeaderCard',
  component: HeaderCard,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(HeaderCard, variantsArgs);

export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=157-9174&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6-37868&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6-35708&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6-33261&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=4864-10680&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
    },
  } as FigmaParams,
};
