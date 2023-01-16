import { withFigmaComparator } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CustomBarChart } from './custom-bar-chart';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/CustomBarChart',
  component: CustomBarChart,
} as ComponentMeta<typeof CustomBarChart>;

const args = [
  {
    items: [{ value: 85 }, { value: 50 }, { value: 130 }],
    maxValues: [90, 90, 90],
    months: ['October', 'November', 'December'],
  },
  {
    items: [{ value: 0 }, { value: 0 }, { value: 0 }],
    maxValues: [0, 0, 0],
    months: ['October', 'November', 'December'],
  },
];

export const [[LightMode, DarkMode], [WithoutValue, WithoutValueDarkMode]] = createThemeModeVariants(
  CustomBarChart,
  args
);

LightMode.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2104%3A10084&t=MOBBpTiml2e9jNRV-4',
    {
      styles: {
        top: 23,
        left: 28,
      },
    }
  ),
];

WithoutValue.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2344%3A12537&t=ChdSGZJYLzrZEDgC-4',
    {
      styles: {
        top: 23,
        left: 28,
      },
    }
  ),
];
