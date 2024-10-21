import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import Card from './Card';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Card> = {
  title: 'Fusion/Components/Card',
  component: Card,
  parameters: {
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
  },
  argTypes: {
    children: {
      type: 'string',
      defaultValue: 'example',
    },
  },
};
export default meta;

const variantsArgs = [
  {
    children: <div style={{ padding: 8 }}>Some text for example</div>,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(Card, variantsArgs);
export { LightMode, DarkMode };
