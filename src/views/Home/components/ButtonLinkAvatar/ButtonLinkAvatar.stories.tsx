import { ThemeProvider } from '@emotion/react';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import lightTheme from '@ses/styles/theme/themes';
import ButtonLinkAvatar from './ButtonLinkAvatar';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof ButtonLinkAvatar> = {
  title: 'fusion/components/ButtonLinkAvatar',
  component: ButtonLinkAvatar,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1440],
    },
    date: new Date('2023-07-14T09:08:34.123'),
  },
};
export default meta;

const variantsArgs = [
  {
    href: '#',
    img: 'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
    title: 'Powerhouse Inc.',
    code: 'PH',
  },
];

const [[DefaultMode, DefaultDarkMode]] = createThemeModeVariants(ButtonLinkAvatar, variantsArgs);

export { DefaultMode, DefaultDarkMode };

DefaultMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6053:69905&t=tVyUv18uHqI8qqdN-4',
        options: {
          style: {
            top: 0,
            left: 0,
          },
          componentStyle: {
            width: 295,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7682:36698&t=tVyUv18uHqI8qqdN-4',
        options: {
          style: {
            top: 0,
            left: 0,
          },
          componentStyle: {
            width: 324,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7682:35408&t=tVyUv18uHqI8qqdN-4',
        options: {
          style: {
            top: 0,
            left: 0,
          },
          componentStyle: {
            width: 214,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7682:34852&t=tVyUv18uHqI8qqdN-4',
        options: {
          style: {
            top: 0,
            left: 0,
          },
          componentStyle: {
            width: 220.5,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7682:34401&t=tVyUv18uHqI8qqdN-4',
        options: {
          style: {
            top: 0,
            left: 0,
          },
          componentStyle: {
            width: 214,
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
    <ButtonLinkAvatar
      href="#"
      img="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.pn"
      title="Powerhouse Inc."
      code="PH"
    />
  </ThemeProvider>
);
HoverStateLight.parameters = {
  pseudo: {
    hover: true,
  },
};
