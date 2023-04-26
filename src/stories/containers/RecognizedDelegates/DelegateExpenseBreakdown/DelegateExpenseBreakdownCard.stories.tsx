import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import DelegateExpenseBreakdownCard from '../components/DelegateExpenseBreakdownCard';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Delegate/DelegateExpenseBreakdownCard',
  component: DelegateExpenseBreakdownCard,
  parameters: {
    chromatic: {
      viewports: [375],
    },
  },
} as ComponentMeta<typeof DelegateExpenseBreakdownCard>;
const variantsArgs = [
  {
    delegateCard: {
      imageUrl: 'https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg',
      walletName: 'Flip Flop Flap Delegate LLC',
      links: [
        {
          linkType: LinkTypeEnum.Forum,
          href: '#',
        },
        {
          linkType: LinkTypeEnum.Twitter,
          href: '#',
        },

        {
          linkType: LinkTypeEnum.Github,
          href: '#',
        },

        {
          linkType: LinkTypeEnum.LinkedIn,
          href: '#',
        },
        {
          linkType: LinkTypeEnum.Youtube,
          href: '#',
        },
      ],
      address: '0x86914...2e02',
      numberDai: 2325,
    },
    totalDai: 232325,
  },
];

export const [[BreakdownCard, BreakdownCardDark]] = createThemeModeVariants(DelegateExpenseBreakdownCard, variantsArgs);

BreakdownCard.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16759:208199&t=SXR1v9cUgs1wOSb8-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {},
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:201374&t=rZFX885hWtT01PVt-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 770,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=17435:201047&t=rZFX885hWtT01PVt-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1130,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=17435:200367&t=rZFX885hWtT01PVt-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=17435:199371&t=rZFX885hWtT01PVt-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

BreakdownCardDark.parameters = {};
