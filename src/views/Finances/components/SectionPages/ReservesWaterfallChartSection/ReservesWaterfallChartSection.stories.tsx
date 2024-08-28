import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ReservesWaterfallChartSection from './ReservesWaterfallChartSection';
import { builderWaterfallSeries } from './utils';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ReservesWaterfallChartSection> = {
  title: 'Fusion/Views/Finances/Section/ReservesWaterfallChartSection',
  component: ReservesWaterfallChartSection,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const data = [1200, 2251, 1243, 1208, 1254, 1325, 2138, 2186, -1921, -1311, -234, 2500, 27121];

const args = [
  {
    selectedGranularity: 'monthly',
    title: 'MakerDAO F. Reserves',
    legends: [
      {
        title: 'Reserves Balance',
        color: '#83A7FF',
      },
      {
        title: 'Outflow',
        color: '#CB3A0D',
      },
      {
        title: 'Inflow',
        color: '#2DC1B1',
      },
    ],
    year: '2023',
    activeItems: [],
    handleSelectChangeItem: () => null,
    handleGranularityChange: () => null,
    handleResetFilter: () => null,
    items: [],
    popupContainerHeight: 120,
    isDisabled: true,
    series: builderWaterfallSeries(data, true, false, false, true),
    filters: [],
    canReset: true,
    onReset: () => null,
  },
  {
    selectedGranularity: 'monthly',
    title: 'Reserves Chart',
    legends: [
      {
        title: 'Reserves Balance',
        color: '#83A7FF',
      },
      {
        title: 'Outflow',
        color: '#CB3A0D',
      },
      {
        title: 'Inflow',
        color: '#2DC1B1',
      },
    ],
    year: '2023',
    series: builderWaterfallSeries(data, false, true, false, true),
    activeItems: [],
    handleSelectChangeItem: () => null,
    handleGranularityChange: () => null,
    handleResetFilter: () => null,
    items: [],
    popupContainerHeight: 120,
    isDisabled: true,
    filters: [],
    canReset: true,
    onReset: () => null,
  },
  {
    selectedGranularity: 'monthly',
    title: 'MakerDAO Finances Reserves',
    legends: [
      {
        title: 'Reserves Balance',
        color: '#83A7FF',
      },
      {
        title: 'Outflow',
        color: '#CB3A0D',
      },
      {
        title: 'Inflow',
        color: '#2DC1B1',
      },
    ],
    year: '2023',
    series: builderWaterfallSeries(data, false, false, true, true),
    activeItems: [],
    handleSelectChangeItem: () => null,
    handleGranularityChange: () => null,
    handleResetFilter: () => null,
    items: [],
    popupContainerHeight: 120,
    isDisabled: true,
    filters: [],
    canReset: true,
    onReset: () => null,
  },
  {
    selectedGranularity: 'monthly',
    title: 'MakerDAO Finances Reserves',
    legends: [
      {
        title: 'Reserves Balance',
        color: '#83A7FF',
      },
      {
        title: 'Outflow',
        color: '#CB3A0D',
      },
      {
        title: 'Inflow',
        color: '#2DC1B1',
      },
    ],
    year: '2023',
    series: builderWaterfallSeries(data, false, false, true, true),
    activeItems: [],
    handleSelectChangeItem: () => null,
    handleGranularityChange: () => null,
    handleResetFilter: () => null,
    items: [],
    popupContainerHeight: 120,
    isDisabled: true,
    filters: [],
    canReset: true,
    onReset: () => null,
  },
];

const [
  [LightModeMobile, DarkModeMobile],
  [LightModeTable, DarkModeTable],
  [LightModeDesk1024, DarkModeDesk1024],
  [LightModeDesk, DarkModeDesk],
] = createThemeModeVariants(ReservesWaterfallChartSection, args, false);
export {
  LightModeMobile,
  DarkModeMobile,
  LightModeTable,
  DarkModeTable,
  LightModeDesk1024,
  DarkModeDesk1024,
  LightModeDesk,
  DarkModeDesk,
};

LightModeMobile.parameters = {
  chromatic: {
    viewports: [375],
  },
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:338004&mode=dev',
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
  },
};
DarkModeMobile.parameters = {};

LightModeTable.parameters = {
  chromatic: {
    viewports: [768],
  },

  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:331963&mode=dev',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 0,
            left: -244,
          },
        },
      },
    },
  },
};

DarkModeTable.parameters = {};

LightModeDesk1024.parameters = {
  chromatic: {
    viewports: [1024],
  },

  figma: {
    component: {
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16:7119&m=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 0,
            left: -116,
          },
        },
      },
    },
  },
};
DarkModeDesk1024.parameters = {};

LightModeDesk.parameters = {
  chromatic: {
    viewports: [1024, 10280, 1440],
  },

  figma: {
    component: {
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16:7119&m=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 0,
            left: -116,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=16-4540&t=ZAfNaMFDnhe4qiqB-4',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: 0,
            left: -6,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2226:57338&t=ZAfNaMFDnhe4qiqB-4',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 0,
            left: -2,
          },
        },
      },
    },
  },
};
DarkModeDesk.parameters = {};
