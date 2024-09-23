import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { EcosystemActorBuilder } from '@/core/businessLogic/builders/actors/actorsBuilder';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import { TeamRole } from '@/core/enums/teamRole';
import type { SocialMediaChannels } from '@/core/models/interfaces/socialMedia';
import { ResourceType, TeamStatus } from '@/core/models/interfaces/types';
import AppLayout from '../../stories/containers/AppLayout/AppLayout';
import ContributorsView from './ContributorsView';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ContributorsView> = {
  title: 'Fusion/Pages/Contributors',
  component: ContributorsView,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

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
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <ContributorsView {...props} />
    </AppLayout>
  ),
  variantsArgs
);
export { LightMode, DarkMode };
