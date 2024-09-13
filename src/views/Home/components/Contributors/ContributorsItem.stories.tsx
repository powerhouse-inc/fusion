import { ThemeProvider } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import { EcosystemActorBuilder } from '@/core/businessLogic/builders/actors/actorsBuilder';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import { TeamRole } from '@/core/enums/teamRole';
import type { SocialMediaChannels } from '@/core/models/interfaces/socialMedia';
import { ResourceType, TeamStatus } from '@/core/models/interfaces/types';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import ContributorsItem from './ContributorsItem';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof ContributorsItem> = {
  title: 'Fusion/Components/ContributorsItem',
  component: ContributorsItem,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1440],
    },
    date: new Date('2023-07-14T09:08:34.123'),
  },
};
export default meta;

const variantsArgs = [
  {
    contributor: new EcosystemActorBuilder()
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
    sizeScope: 'medium',
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
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          width: 138,
        },
      },
    },
  },
];

const [[Actors, ActorsDark]] = createThemeModeVariants(
  (props) => (
    <ThemeProvider theme={lightTheme}>
      <ContributorsItem {...props} />
    </ThemeProvider>
  ),

  variantsArgs
);
export { Actors, ActorsDark };

Actors.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6053:69021&t=J2tLDXcHQokjam0n-4',
        options: {
          style: {
            left: -13,
            top: -12,
          },
          componentStyle: {
            width: 327,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6053:67915&t=J2tLDXcHQokjam0n-4',
        options: {
          style: {
            left: -12,
            top: -12,
          },
          componentStyle: {
            width: 688,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6053:64622&t=CR605NOg7xFoQuix-4',
        options: {
          style: {
            left: -14,
            top: -10,
          },
          componentStyle: {
            width: 944,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6053:63136&t=CR605NOg7xFoQuix-4',
        options: {
          style: {
            left: -14,
            top: -10,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5932:86519&t=J2tLDXcHQokjam0n-4',
        options: {
          style: {
            left: -14,
            top: -8,
          },
          componentStyle: {
            width: 1296,
          },
        },
      },
    },
  },
};
