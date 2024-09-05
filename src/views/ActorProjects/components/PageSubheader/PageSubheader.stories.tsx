import { useMediaQuery } from '@mui/material';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import lightTheme from '@ses/styles/theme/themes';
import type { Filter, SelectOption } from '@/components/FiltersBundle/types';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import { DeliverableBuilder } from '@/core/businessLogic/builders/actors/deliverableBuilder';
import { ProjectBuilder } from '@/core/businessLogic/builders/actors/projectBuilder';
import { DeliverableStatus } from '@/core/models/interfaces/deliverables';
import { OwnerType, ProjectStatus } from '@/core/models/interfaces/projects';
import type { DeliverableSetStatus } from '@/core/models/interfaces/roadmaps';
import type { TeamStatus } from '@/core/models/interfaces/types';
import CustomItemAll from '@/views/EcosystemActorsIndex/components/ActorCustomItem/CustomItemAll';
import ProjectStatusChipFilter from '../ProjectFilters/ProjectStatusChipFilter';
import PageSubheader from './PageSubheader';
import type { Meta } from '@storybook/react';

const projectsData = [
  new ProjectBuilder()
    .withId('1')
    .withCode('PEA')
    .withTitle('Protocol Expense Accounting')
    .withOwner({
      ref: OwnerType.EcosystemActor,
      id: '2',
      imgUrl: 'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/PHOENIX/PHOENIX_logo.png',
      name: 'Phoenix Lab',
      code: 'PHOENIX',
    })
    .withImgUrl('https://picsum.photos/450/260')
    .withAbstract(
      "Protocol Expense Accounting aims to provide a comprehensive, detailed, and up-to-date view of the Maker Protocol's operational expenses. This information can help Maker Protocol stakeholders, including MKR holders and contributors, understand how MakerDAO spends funds."
    )
    .withStatus(ProjectStatus.INPROGRESS)
    .withProgress(0.5)
    .addDeliverable(
      new DeliverableBuilder()
        .withId('6')
        .withTitle('PEA-01 On-chain Data Reconciliation')
        .withDescription(
          "On-Chain Data Reconciliation will help ensure that all data related to Maker Protocol's expenses are accurate and up-to-date. This component will include a thorough analysis of all On-Chain data related to expenses, which will help to identify any discrepancies."
        )
        .withOwnerData(
          '1',
          'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
          'Powerhouse',
          'POWERHOUSE'
        )
        .withStatus(DeliverableStatus.DELIVERED)
        .addKeyResult('1', 'Business Analysis', 'https://makerdao.com')
        .addKeyResult('2', 'Wireframes', 'https://makerdao.com')
        .addKeyResult('3', 'Dashboard - Staging ', 'https://makerdao.com')
        .addKeyResult('4', 'Dashboard - Production ', 'https://makerdao.com')
        .addKeyResult('5', 'API Playground - Production', 'https://makerdao.com')
        .addKeyResult('6', 'API Playground - Staging', 'https://makerdao.com')
        .addKeyResult('7', 'Extra 1', 'https://makerdao.com')
        .addKeyResult('8', 'Extra 2', 'https://makerdao.com')
        .build()
    )
    .addDeliverable(
      new DeliverableBuilder()
        .withId('5')
        .withTitle('PEA-02 Delegates Transparency')
        .withDescription('Comprehensive overview of Delegates costs and changes over time.')
        .withOwnerData(
          '2',
          'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/PHOENIX/PHOENIX_logo.png',
          'Phoenix Lab',
          'PHOENIX'
        )
        .withStatus(DeliverableStatus.IN_PROGRESS)
        .withProgress({
          __typename: 'Percentage',
          value: 0.73,
        })
        .addKeyResult('1', 'Business Analysis', 'https://makerdao.com')
        .addKeyResult('2', 'Wireframes', 'https://makerdao.com')
        .addKeyResult('3', 'Dashboard - Staging ', 'https://makerdao.com')
        .addKeyResult('4', 'Dashboard - Production ', 'https://makerdao.com')
        .build()
    )
    .addDeliverable(
      new DeliverableBuilder()
        .withId('1')
        .withTitle('PEA-02 Delegates Transparency')
        .withOwnerData(
          '3',
          'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/DEWIZ/DEWIZ_logo.png',
          'Dewiz',
          'DEWIZ'
        )
        .withStatus(DeliverableStatus.TODO)
        .build()
    )
    .addDeliverable(
      new DeliverableBuilder()
        .withId('2')
        .withTitle('PEA-02 Delegates Transparency')
        .withOwnerData(
          '2',
          'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/PHOENIX/PHOENIX_logo.png',
          'Phoenix Lab',
          'PHOENIX'
        )
        .withStatus(DeliverableStatus.IN_PROGRESS)
        .withProgress({
          __typename: 'StoryPoints',
          total: 5,
          completed: 3,
        })
        .addKeyResult('1', 'Business Analysis', 'https://makerdao.com')
        .addKeyResult('2', 'API Playground - Production', 'https://makerdao.com')
        .addKeyResult('3', 'Dashboard - Production', 'https://makerdao.com')
        .addKeyResult('4', 'Dashboard - Staging ', 'https://makerdao.com')
        .addKeyResult('5', 'Dashboard - Staging ', 'https://makerdao.com')
        .build()
    )
    .addDeliverable(
      new DeliverableBuilder()
        .withId('3')
        .withTitle('PEA-03 SPF Finances')
        .withOwnerData(
          '4',
          'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/BA-LABS/BA_LABS_logo.png',
          'BA Labs',
          'BA-LABS'
        )
        .withStatus(DeliverableStatus.DELIVERED)
        .build()
    )
    .addDeliverable(
      new DeliverableBuilder()
        .withId('4')
        .withTitle('PEA-03 SPF Finances')
        .withOwnerData(
          '4',
          'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/BA-LABS/BA_LABS_logo.png',
          'BA Labs',
          'BA-LABS'
        )
        .withStatus(DeliverableStatus.DELIVERED)
        .build()
    )
    .addDeliverable(
      new DeliverableBuilder()
        .withId('5')
        .withTitle('PEA-03 SPF Finances')
        .withOwnerData(
          '4',
          'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/BA-LABS/BA_LABS_logo.png',
          'BA Labs',
          'BA-LABS'
        )
        .withStatus(DeliverableStatus.DELIVERED)
        .build()
    )
    .build(),
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
  title: 'Fusion/Views/Projects',
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
