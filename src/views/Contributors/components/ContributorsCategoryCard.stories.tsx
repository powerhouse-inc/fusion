import { EcosystemActorBuilder } from '@ses/core/businessLogic/builders/actors/actorsBuilder';
import { ResourceType, TeamStatus } from '@ses/core/models/interfaces/types';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { featureFlags } from 'feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '@/config/endpoints';
import { FeatureFlagsProvider } from '@/core/context/FeatureFlagsProvider';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import { TeamRole } from '@/core/enums/teamRole';
import ContributorsCategoryCard from './ContributorsCategoryCard';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ContributorsCategoryCard> = {
  title: 'Fusion/Views/Contributors/ContributorsCategoryCard',
  component: ContributorsCategoryCard,
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
    title: 'Ecosystem Actors',
    totalContributors: 24,
    type: 'Contributors',
    description:
      "Ecosystem Actors undertake key projects like feature development and marketing under guidelines that promote the Sky Ecosystem's growth. They facilitate vital operational activities, ensuring alignment with ecosystem goals.",
    teams: [
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PWR-001')
        .withShortCode('PH')
        .withName('Powerhouse Inc')
        .withStatus(TeamStatus.Rejected)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png')
        .withLastActivity({
          created_at: '2023-07-01T09:08:34.123',
          description: '',
          event: '',
          params: {},
          id: '45',
        })
        .addCategory(TeamRole.ScopeFacilitator)
        .addScope({
          id: '1',
          code: 'PRO',
          name: TeamScopeEnum.ProtocolScope,
        })
        .addScope({
          id: '3',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .addScope({
          id: '3',
          code: 'GOV',
          name: TeamScopeEnum.GovernanceScope,
        })
        .addScope({
          id: '3',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
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
        .withId('23')
        .withCode('DWZ')
        .withShortCode('DWZ')
        .withName('Deviz')
        .withStatus(TeamStatus.Rejected)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/DEWIZ/DEWIZ_logo.png')
        .addCategory(TeamRole.ScopeFacilitator)
        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
        })
        .addScope({
          id: '3',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials({
          twitter: '#',
          github: '#',
          discord: '#',
        } as SocialMediaChannels)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('BAL-01')
        .withShortCode('BAL')
        .withName('BA Labs')
        .withStatus(TeamStatus.Rejected)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/BA-LABS/BA_LABS_logo.png')
        .addCategory(TeamRole.ScopeFacilitator)
        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
        })
        .addScope({
          id: '3',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials({
          twitter: '#',
          github: '#',
          discord: '#',
        } as SocialMediaChannels)
        .build(),
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('CER-001')
        .withShortCode('CER')
        .withName('Certora')
        .withStatus(TeamStatus.Rejected)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/DEVPOOL/DEVPOOL_logo.png')
        .addCategory(TeamRole.ScopeFacilitator)
        .addScope({
          id: '1',
          code: 'SUP',
          name: TeamScopeEnum.SupportScope,
        })
        .addScope({
          id: '3',
          code: 'ACC',
          name: TeamScopeEnum.AccessibilityScope,
        })
        .withSocials({
          twitter: '#',
          github: '#',
          discord: '#',
        } as SocialMediaChannels)
        .build(),
    ],
  },
];

const [[ContributorsCard, ContributorsCardDark]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <ContributorsCategoryCard {...props} />
    </FeatureFlagsProvider>
  ),
  variantsArgs
);
export { ContributorsCard, ContributorsCardDark };

ContributorsCard.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10522:23165&t=ODh4H7gSKiEYBIt0-4',
        options: {
          style: {
            left: -3,
            top: -3,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10522:14618&t=ODh4H7gSKiEYBIt0-4',
        options: {
          style: {
            left: -3,
            top: -3,
          },
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10493:91943&m=dev',
        options: {
          style: {
            left: -3,
            top: -3,
          },
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10493:91415&t=ODh4H7gSKiEYBIt0-4',
        options: {
          style: {
            left: -3,
            top: -3,
          },
          componentStyle: {
            width: 1200,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=10493:90367&t=ODh4H7gSKiEYBIt0-4',
        options: {
          style: {
            left: -3,
            top: -3,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

ContributorsCardDark.parameters = {};
