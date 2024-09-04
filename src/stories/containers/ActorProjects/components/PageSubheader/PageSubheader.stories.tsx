import { useMediaQuery } from '@mui/material';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import lightTheme from '@ses/styles/theme/themes';
import type { Filter, SelectOption } from '@/components/FiltersBundle/types';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import { ProjectStatus } from '@/core/models/interfaces/projects';
import type { DeliverableSetStatus } from '@/core/models/interfaces/roadmaps';
import type { TeamStatus } from '@/core/models/interfaces/types';
import CustomItemAll from '@/views/EcosystemActorsIndex/components/ActorCustomItem/CustomItemAll';
import ProjectStatusChipFilter from '../ProjectFilters/ProjectStatusChipFilter';
import PageSubheader from './PageSubheader';
import type { Meta } from '@storybook/react';

const projectsData = [
  {
    __typename: 'Project',
    abstract: "Track Maker protocol's operational financial data.",
    budgetType: 'CAPEX',
    code: 'PEA',
    deliverables: Array(10).fill({}),
    description:
      'Design and develop dashboard, the API and budget tool to capture and present all operational expenses and income of the Maker Protocol.',
    id: 'qz6r0modgp',
    imgUrl: null,
    owner: {
      ref: 'makerdao/ecosystem-actor',
      id: 't3MKA406',
      imgUrl: null,
      name: 'Powerhouse',
      code: 'PH',
    },
    progress: {
      __typename: 'Percentage',
      value: 0.7,
    },
    status: 'IN_PROGRESS',
    title: 'Protocol Expense Accounting',
  },
  {
    __typename: 'Project',
    abstract: 'Connect Editor prototype for MakerDAO RWA Portfolio Reporting.',
    budgetType: 'CAPEX',
    code: 'RWA',
    deliverables: Array(8).fill({}),
    description:
      'Development of the 1st Connect Editor prototype - Real World Asset Portfolio Reporting for MakerDAO. Demo as part of the reveal of th…',
    id: 'yyivbb1duf',
    imgUrl: null,
    owner: {
      ref: 'makerdao/ecosystem-actor',
      id: 't3MKA406',
      imgUrl: null,
      name: 'Powerhouse',
      code: 'PH',
    },
    progress: {
      __typename: 'Percentage',
      value: 1,
    },
    status: 'IN_PROGRESS',
    title: 'RWA Portfolio Reporting',
  },
  {
    __typename: 'Project',
    abstract: 'Core Powerhouse product and architecture development work.',
    budgetType: 'CAPEX',
    code: 'POC',
    deliverables: Array(10).fill({}),
    description:
      'Core development work on Powerhouse products and architecture infrastructure that supports the technical integration demos in the MakerDA…',
    id: '778zfhxl5s',
    imgUrl: null,
    owner: {
      ref: 'makerdao/ecosystem-actor',
      id: 't3MKA406',
      imgUrl: null,
      name: 'Powerhouse',
      code: 'PH',
    },
    progress: {
      __typename: 'Percentage',
      value: 0.6,
    },
    status: 'IN_PROGRESS',
    title: 'Powerhouse Products POC',
  },
  {
    __typename: 'Project',
    abstract: 'Atlas Book Prototype for MakerDAO.',
    budgetType: 'CAPEX',
    code: 'ATLAS',
    deliverables: Array(3).fill({}),
    description:
      'Build a Atlas Book Prototype for MakerDAO - a single document editor designed to handle Atlas JSON data efficiently.',
    id: 'r2z83m0hyf',
    imgUrl: null,
    owner: {
      ref: 'makerdao/ecosystem-actor',
      id: 't3MKA406',
      imgUrl: null,
      name: 'Powerhouse',
      code: 'PH',
    },
    progress: {
      __typename: 'Percentage',
      value: 0.2,
    },
    status: 'IN_PROGRESS',
    title: 'Atlas Book Prototype',
  },
  {
    __typename: 'Project',
    abstract: 'Comments for powerhouse alpha version release.',
    budgetType: 'CAPEX',
    code: 'PRC',
    deliverables: Array(7).fill({}),
    description:
      'Communication efforts to support the Powerhouse alpha version release. Marketing, BD and Community outreach.',
    id: 'yk6djbdvxd',
    imgUrl: null,
    owner: {
      ref: 'makerdao/ecosystem-actor',
      id: 't3MKA406',
      imgUrl: null,
      name: 'Powerhouse',
      code: 'PH',
    },
    progress: {
      __typename: 'Percentage',
      value: 0.5,
    },
    status: 'IN_PROGRESS',
    title: 'Powerhouse Release Comments',
  },
  {
    __typename: 'Project',
    abstract: 'Launch of the Powerhouse Operational Hub',
    budgetType: 'CAPEX',
    code: 'PLS',
    deliverables: Array(5).fill({}),
    description:
      'Model and implement a reproducible entity structure that\\ provides legal/operational infrastructure and facilitates decentralize…',
    id: '738zahxl7s',
    imgUrl: null,
    owner: {
      ref: 'makerdao/ecosystem-actor',
      id: 't3MKA406',
      imgUrl: null,
      name: 'Powerhouse',
      code: 'PH',
    },
    progress: {
      __typename: 'Percentage',
      value: 0.7,
    },
    status: 'IN_PROGRESS',
    title: 'Powerhouse Legal Structuring',
  },
];

const statuses = [
  {
    value: ProjectStatus.TODO,
    label: 'To Do',
    extra: {
      count: `${projectsData.filter((project) => project.status === ProjectStatus.TODO).length}`,
    },
  },
  {
    value: ProjectStatus.INPROGRESS,
    label: 'In Progress',
    extra: {
      count: `${projectsData.filter((project) => project.status === ProjectStatus.INPROGRESS).length}`,
    },
  },
  {
    value: ProjectStatus.FINISHED,
    label: 'Delivered',
    extra: {
      count: `${projectsData.filter((project) => project.status === ProjectStatus.FINISHED).length}`,
    },
  },
] as SelectOption[];

const filters: Filter[] = [
  {
    type: 'select',
    id: 'status',
    label: 'Status',
    selected: [],
    multiple: true,
    onChange: () => null,
    options: statuses,

    customOptionsRender: (option: SelectOption, isActive: boolean) => (
      <ProjectStatusChipFilter
        status={option.value as DeliverableSetStatus}
        count={option.extra?.count}
        isActive={isActive}
      />
    ),
    withAll: true,
    customOptionsRenderAll: (isActive: boolean) => (
      <CustomItemAll isActive={isActive} total={projectsData.length || 0}>
        <StatusChip status={'All' as TeamStatus} />
      </CustomItemAll>
    ),

    widthStyles: {
      width: 'fit-content',
      menuWidth: 350,
    },
  },
];
const meta: Meta<typeof PageSubheader> = {
  title: 'Components/Actor/ProjectsPageSubheader',
  component: PageSubheader,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    isFilterCollapsedOnMobile: true,
    statuses: [],
    activeStatuses: [],
    searchQuery: '',
    isMobile: false,

    searchText: '',
    filters,

    searchFilters: () => null,
    canReset: false,
    onReset: () => null,
  },
];
const [[LightMode, DarkMode]] = createThemeModeVariants((props) => {
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  return <PageSubheader {...props} isMobile={isMobile} />;
}, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=26861:199589',
        options: {
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=26315:267176',
        options: {
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=26314:262204',
        options: {
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=26314:256298',
        options: {
          componentStyle: {
            width: 1184,
          },
        },
      },
    },
  },
};
