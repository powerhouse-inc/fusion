import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';
import { CuTableColumnLinks } from './cu-table-column-links';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnLinks',
  component: CuTableColumnLinks,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CuTableColumnLinks>;

const variantsArgs = [
  {
    links: [
      {
        linkType: LinkTypeEnum.WWW,
        href: '#',
      },
      {
        linkType: LinkTypeEnum.Forum,
        href: '#',
      },
      {
        linkType: LinkTypeEnum.Discord,
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
        linkType: LinkTypeEnum.Youtube,
        href: '#',
      },
      {
        linkType: LinkTypeEnum.LinkedIn,
        href: '#',
      },
    ],
  },
];

export const [[Links, LinksDark]] = createThemeModeVariants(CuTableColumnLinks, variantsArgs);

Links.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8853%3A101218&t=8qeht4ZmJlXvVXrb-4',
    options: {
      style: {
        top: -12,
        left: 960,
      },
    },
  },
};
LinksDark.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8853%3A101218&t=8qeht4ZmJlXvVXrb-4',
    options: {
      style: {
        top: -12,
        left: 960,
      },
    },
  },
};
