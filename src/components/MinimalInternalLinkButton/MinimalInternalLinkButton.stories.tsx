import { ThemeProvider } from '@emotion/react';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import lightTheme, { darkTheme } from '@ses/styles/theme/themes';

import MinimalInternalLinkButton from './MinimalInternalLinkButton';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof MinimalInternalLinkButton> = {
  title: 'fusion/components/MinimalInternalLinkButton/MinimalInternalLinkButton',
  tags: ['autodocs'],
  parameters: {
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    href: '#',
    label: 'Details',
  },
];

const [[DefaultMode, DefaultDarkMode]] = createThemeModeVariants(MinimalInternalLinkButton, variantsArgs);

export { DefaultMode, DefaultDarkMode };

DefaultMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10493:91467&t=nmOKCik1RzYMQFRW-4',
        options: {
          componentStyle: {
            width: 343,
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
DefaultDarkMode.parameters = {};

// Hover state light
export const HoverStateLight = () => (
  <ThemeProvider theme={lightTheme}>
    <MinimalInternalLinkButton label="Details" href="#" />
  </ThemeProvider>
);
HoverStateLight.parameters = {
  pseudo: {
    hover: true,
  },
};

// Hover state dark
export const HoverStateDark = () => (
  <ThemeProvider theme={darkTheme}>
    <MinimalInternalLinkButton label="Details" href="#" />
  </ThemeProvider>
);
HoverStateDark.parameters = {
  pseudo: {
    hover: true,
  },
};
