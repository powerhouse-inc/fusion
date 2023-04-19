import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import InlineUser from './InlineUser';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTransparencyReport/InlineUser',
  component: InlineUser,
  argTypes: {
    username: {
      defaultValue: 'Username',
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof InlineUser>;

export const [[Light, Dark]] = createThemeModeVariants(InlineUser);