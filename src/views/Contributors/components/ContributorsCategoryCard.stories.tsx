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
    title: 'Ecosystem Actor',
    totalContributors: 24,
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
      new EcosystemActorBuilder()
        .withId('23')
        .withCode('PH-001')
        .withShortCode('PH')
        .withName('Phoenix Labs')
        .withStatus(TeamStatus.Rejected)
        .withType(ResourceType.EcosystemActor)
        .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png')
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
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6053:68849&m=dev',
        options: {
          style: {
            left: 0,
            top: 1,
          },
          componentStyle: {
            width: 327,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7682:36682&m=dev',
        options: {
          style: {
            left: 0,
            top: 0,
          },
          componentStyle: {
            width: 688,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7682:35392&m=dev',
        options: {
          style: {
            left: 0,
            top: 0,
          },
          componentStyle: {
            width: 944,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=7682:34836&m=dev',
        options: {
          style: {
            left: 0,
            top: 0,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5932:84525&m=dev',
        options: {
          style: {
            left: 0,
            top: 0,
          },
          componentStyle: {
            width: 1296,
          },
        },
      },
    },
  },
};

ContributorsCardDark.parameters = {};
