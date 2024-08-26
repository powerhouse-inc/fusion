import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Container from '@/components/Container/Container';
import CardsNavigation from './CardsNavigation';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CardsNavigation> = {
  title: 'Fusion/Views/Finances/Section/Main/CardsNavigation',
  component: CardsNavigation,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
      delay: 1000,
    },
  },
};
export default meta;

const cardInfoData = [
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
  {
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
    title: 'Lorem Ipsum',
    description: 'Historical records of MakerDAO expenses, prior to Endgame',
    href: '#',
    totalDai: 12345,
    color: '#2DC1B1',
    code: 'atlas/lorem',
  },
  {
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
    title: 'Dolor Sit Amet',
    description: 'Historical records of MakerDAO expenses, prior to Endgame',
    href: '#',
    totalDai: 12345,
    color: '#2DC1B1',
    code: 'atlas/sit',
  },
  {
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
    title: 'Dolor Sit Amet',
    description: 'Historical records of MakerDAO expenses, prior to Endgame',
    href: '#',
    totalDai: 12345,
    color: '#2DC1B1',
    code: 'atlas/sit',
  },
  {
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
    title: 'Dolor Sit Amet',
    description: 'Historical records of MakerDAO expenses, prior to Endgame',
    href: '#',
    totalDai: 12345,
    color: '#2DC1B1',
    code: 'atlas/sit',
  },
  {
    image:
      'https://raw.githubusercontent.com/makerdao-ses/makerdao-ses.github.io/16f73df6917a57915cd07e79f7a42e55293b8225/ecosystem-dashboard/budgets/endgame_scope_budgets.svg',
    title: 'Dolor Sit Amet',
    description: 'Historical records of MakerDAO expenses, prior to Endgame',
    href: '#',
    totalDai: 12345,
    color: '#2DC1B1',
    code: 'atlas/sit',
  },
];
const args = [
  {
    cardsNavigationInformation: cardInfoData.slice(0, 2),
  },
  {
    cardsNavigationInformation: cardInfoData.slice(0, 3),
  },
  {
    cardsNavigationInformation: cardInfoData.slice(0, 5),
  },
  {
    cardsNavigationInformation: cardInfoData,
  },
];
const [
  [WithTwoCardLightMode, WithTwoCardDarkMode],
  [WithThreeCardsLightMode, WithThreeCardsDarkMode],
  [WithFiveCardsLightMode, WithFiveCardsDarkMode],
  [WithEightCardsLightMode, WithEightCardsDarkMode],
] = createThemeModeVariants(
  (args) => (
    <Container>
      <CardsNavigation {...args} />
    </Container>
  ),
  args,
  false
);

export {
  WithTwoCardLightMode,
  WithTwoCardDarkMode,
  WithThreeCardsLightMode,
  WithThreeCardsDarkMode,
  WithFiveCardsLightMode,
  WithFiveCardsDarkMode,
  WithEightCardsLightMode,
  WithEightCardsDarkMode,
};

WithThreeCardsLightMode.parameters = {
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
