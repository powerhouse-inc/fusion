import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CardsNavigation from './CardsNavigation';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CardsNavigation> = {
  title: 'Fusion/Views/Finances/Section/CardsNavigation',
  component: CardsNavigation,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
      delay: 1000,
    },
  },
};
export default meta;

const args = [
  {
    cardsNavigationInformation: [
      {
        image:
          'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_atlas_budgets.svg',
        title: 'Endgame Atlas Budgets',
        description: 'Finances of the core governance constructs described in the Maker Atlas.',
        href: '#',
        totalDai: 12345,
        color: '#F99374',
        code: 'atlas/immutable',
      },
      {
        image:
          'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
        title: 'Endgame Scope Budgets',
        description: 'Detailed budgets of the practical DAO activities within Endgame.',
        href: '#',
        totalDai: 12345,
        color: '#447AFB',
        code: 'atlas/immutable',
      },
      {
        image:
          'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
        title: 'MakerDAO Legacy Budgets',
        description: 'Historical records of MakerDAO expenses, prior to Endgame',
        href: '#',
        totalDai: 12345,
        color: '#2DC1B1',
        code: 'atlas/immutable',
      },
    ],
    levelNumber: 1,
  },
];
const [[LightMode, DarkMode]] = createThemeModeVariants(CardsNavigation, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  chromatic: {
    viewports: [768, 1024, 1280, 1440],
  },
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:331292&mode=dev',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:329647&mode=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },

      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:334316&mode=dev',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:335845&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:332761&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
