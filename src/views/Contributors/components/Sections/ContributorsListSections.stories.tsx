import { ThemeProvider } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import BulletIcon from '@/components/FancyTabs/BulletIcon';
import type { FancyTabItem } from '@/components/FancyTabs/FancyTabs';
import { EcosystemActorBuilder } from '@/core/businessLogic/builders/actors/actorsBuilder';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import { TeamRole } from '@/core/enums/teamRole';
import type { SocialMediaChannels } from '@/core/models/interfaces/socialMedia';
import { ResourceType, TeamStatus } from '@/core/models/interfaces/types';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import ContributorsListSections from './ContributorsListSections';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof ContributorsListSections> = {
  title: 'Fusion/Views/Contributors/ContributorsListSections',
  component: ContributorsListSections,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1440],
    },
    date: new Date('2023-07-14T09:08:34.123'),
  },
};
export default meta;

const teamDetailsTabs = [
  {
    id: '1',
    title: 'All',
  },
  {
    id: '2',
    title: 'Ecosystem Actors',
    icon: <BulletIcon color={lightTheme.palette.isLight ? 'blue' : 'blueDark'} />,
  },
  {
    id: '3',
    title: 'Core Units',
    icon: <BulletIcon color={lightTheme.palette.isLight ? 'gray' : 'charcoalDark'} />,
  },
];

const variantsArgs = [
  {
    teams: [
      new EcosystemActorBuilder()
        .withId('55')
        .withCode('DEW-001')
        .withShortCode('DE')
        .withName('Dewiz')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/DEWIZ/DEWIZ_logo.png')
        .withLastActivity({
          created_at: '2024-05-13T00:00:00.000Z',
          description: 'An expense report was auto-generated for EcosystemActor DEW-001 for September 2024',
          event: '',
          params: {},
          id: '45',
        })
        .addCategory(TeamRole.ActiveEcosystemActor)
        .addScope({
          id: '1',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
          forumTag: '#',
          github: '#',
          discord: '#',
          website: '#',
          linkedIn: '#',
        } as SocialMediaChannels)
        .build(),

      new EcosystemActorBuilder()
        .withId('56')
        .withCode('PW-002')
        .withShortCode('PO')
        .withName('Powerhouse Inc.')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png')
        .withLastActivity({
          created_at: '2024-05-13T00:00:00.000Z',
          description: 'An expense report was auto-generated for EcosystemActor DEV-002 for September 2024',
          event: '',
          params: {},
          id: '46',
        })
        .addCategory(TeamRole.ScopeFacilitator)

        .addScope({
          id: '2',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
          forumTag: '#',
          github: '#',
          discord: '#',
          website: '#',
          linkedIn: '#',
        } as SocialMediaChannels)
        .build(),
      new EcosystemActorBuilder()
        .withId('73')
        .withCode('Development & UX')
        .withShortCode('UX')
        .withName('Development & UX')
        .withStatus(TeamStatus.Obsolete)
        .withType(ResourceType.CoreUnit)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/dux-001/dux_logo.png')
        .withLastActivity({
          created_at: '2024-05-13T00:00:00.000Z',
          description: 'An expense report was auto-generated for EcosystemActor DEC-003 for September 2024',
          event: '',
          params: {},
          id: '47',
        })
        .addCategory('Operational')
        .addCategory('Technical')
        .addScope({
          id: '3',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
          forumTag: '#',
          github: '#',
          discord: '#',
          website: '#',
          linkedIn: '#',
        } as SocialMediaChannels)
        .build(),
      new EcosystemActorBuilder()
        .withId('55')
        .withCode('DEW-001')
        .withShortCode('DE')
        .withName('Dewiz')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/DEWIZ/DEWIZ_logo.png')
        .withLastActivity({
          created_at: '2024-05-13T00:00:00.000Z',
          description: 'An expense report was auto-generated for EcosystemActor DEW-001 for September 2024',
          event: '',
          params: {},
          id: '45',
        })
        .addCategory(TeamRole.ActiveEcosystemActor)
        .addScope({
          id: '1',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
          forumTag: '#',
          github: '#',
          discord: '#',
          website: '#',
          linkedIn: '#',
        } as SocialMediaChannels)
        .build(),
      new EcosystemActorBuilder()
        .withId('573')
        .withCode('Development & UX')
        .withShortCode('UX')
        .withName('Development & UX')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.CoreUnit)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/dux-001/dux_logo.png')
        .withLastActivity({
          created_at: '2024-05-13T00:00:00.000Z',
          description: 'An expense report was auto-generated for EcosystemActor DEC-003 for September 2024',
          event: '',
          params: {},
          id: '47',
        })
        .addCategory('ScopeFacilitator')
        .addCategory('Operational')
        .addScope({
          id: '3',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
          forumTag: '#',
          github: '#',
          discord: '#',
          website: '#',
          linkedIn: '#',
        } as SocialMediaChannels)
        .build(),
      new EcosystemActorBuilder()
        .withId('57')
        .withCode('DEC-003')
        .withShortCode('DECO')
        .withName('Deco Protocol')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.CoreUnit)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/deco-001/DECO_logo.png')
        .withLastActivity({
          created_at: '2024-05-13T00:00:00.000Z',
          description: 'An expense report was auto-generated for EcosystemActor DEC-003 for September 2024',
          event: '',
          params: {},
          id: '47',
        })
        .addCategory('Business')
        .addCategory('Support')
        .addScope({
          id: '3',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
          forumTag: '#',
          github: '#',
          discord: '#',
          website: '#',
          linkedIn: '#',
        } as SocialMediaChannels)
        .build(),
      new EcosystemActorBuilder()
        .withId('55')
        .withCode('DEW-001')
        .withShortCode('DE')
        .withName('Dewiz')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/DEWIZ/DEWIZ_logo.png')
        .withLastActivity({
          created_at: '2024-05-13T00:00:00.000Z',
          description: 'An expense report was auto-generated for EcosystemActor DEW-001 for September 2024',
          event: '',
          params: {},
          id: '45',
        })
        .addCategory(TeamRole.ActiveEcosystemActor)
        .addScope({
          id: '1',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
          forumTag: '#',
          github: '#',
          discord: '#',
          website: '#',
          linkedIn: '#',
        } as SocialMediaChannels)
        .build(),
      new EcosystemActorBuilder()
        .withId('58')
        .withCode('POW-004')
        .withShortCode('PW')
        .withName('Powerhouse Inc.')
        .withStatus(TeamStatus.Accepted)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png')
        .withLastActivity({
          created_at: '2024-05-13T00:00:00.000Z',
          description: 'An expense report was auto-generated for EcosystemActor POW-004 for September 2024',
          event: '',
          params: {},
          id: '48',
        })
        .addCategory(TeamRole.ActiveEcosystemActor)
        .addScope({
          id: '4',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
          forumTag: '#',
          github: '#',
          discord: '#',
          website: '#',
          linkedIn: '#',
        } as SocialMediaChannels)
        .build(),
    ],

    sizeScope: 'medium',

    tabs: teamDetailsTabs as FancyTabItem[],
    activeTab: 'All',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onTabChange: (tab: string) => null,
    subTitle: 'All Maker contributors',
    textDefault: true,
    hasDefaultColors: true,
    customStyles: {
      profile: {
        [lightTheme.breakpoints.up('desktop_1024')]: {
          width: 245,
          '& .profile-name': {
            width: 180,
          },
        },
        [lightTheme.breakpoints.up('desktop_1280')]: {
          width: 250,
          '& .profile-name': {
            width: 180,
          },
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          width: 248,
          '& .profile-name': {
            width: 180,
          },
        },
      },
      scopes: {
        [lightTheme.breakpoints.up('desktop_1024')]: {
          display: 'flex',
          width: 163,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          display: 'flex',
          width: 145,
        },
      },
      role: {
        [lightTheme.breakpoints.up('desktop_1024')]: {
          display: 'flex',
          width: 180,
          justifyContent: 'center',
          '& div > div': {
            fontSize: 14,
            lineHeight: '22px',
          },
        },
      },
      category: {
        [lightTheme.breakpoints.up('desktop_1024')]: {
          display: 'flex',
          flexDirection: 'column',
          minWidth: 168,
        },
      },
      lastModified: {
        justifyContent: 'center',
        [lightTheme.breakpoints.up('desktop_1280')]: {
          minWidth: 138,
          justifyContent: 'end',
          padding: '0px 16px',
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          minWidth: 138,
          '& > div': {
            padding: '0px',
          },
        },
      },
    },
  },
];

const [[SectionActors, SectionActorsDark]] = createThemeModeVariants(
  (props) => (
    <ThemeProvider theme={lightTheme}>
      <ContributorsListSections {...props} />
    </ThemeProvider>
  ),

  variantsArgs
);
export { SectionActors, SectionActorsDark };

SectionActors.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6053:69003&t=7U7yWPJMS4SWeYUN-4',
        options: {
          style: {
            left: -13,
            top: -12,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6053:67898&t=7U7yWPJMS4SWeYUN-4',
        options: {
          style: {
            left: -14,
            top: -12,
          },
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6053:64605&t=7U7yWPJMS4SWeYUN-4',
        options: {
          style: {
            left: -14,
            top: -12,
          },
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6053:63119&t=7U7yWPJMS4SWeYUN-4',
        options: {
          style: {
            left: -14,
            top: -12,
          },
          componentStyle: {
            width: 1200,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5932:86502&t=7U7yWPJMS4SWeYUN-4',
        options: {
          style: {
            left: -14,
            top: -12,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};
