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
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10522:23184&m=dev',
        options: {
          style: {
            top: 0,
            left: 0,
          },
          componentStyle: {
            width: 311,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10522:14637&m=dev',
        options: {
          style: {
            top: 0,
            left: 0,
          },
          componentStyle: {
            width: 255,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10493:91962&m=dev',
        options: {
          style: {
            top: 0,
            left: 0,
          },
          componentStyle: {
            width: 220,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10493:91434&m=dev',
        options: {
          style: {
            top: 0,
            left: 0,
          },
          componentStyle: {
            width: 244,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10493:90386&m=dev',
        options: {
          style: {
            top: 0,
            left: 0,
          },
          componentStyle: {
            width: 244,
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
