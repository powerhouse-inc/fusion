import { DeliverableBuilder } from '@ses/core/businessLogic/builders/actors/deliverableBuilder';
import { ProjectBuilder } from '@ses/core/businessLogic/builders/actors/projectBuilder';
import { OwnerType } from '@ses/core/models/interfaces/projects';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { DeliverableStatus } from '@/core/models/interfaces/deliverables';
import { ProgressStatus } from '@/core/models/interfaces/types';
import ProjectCard from './ProjectCard';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ProjectCard> = {
  title: 'Fusion/Components/Actor/Project Card',
  component: ProjectCard,
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
    project: new ProjectBuilder()
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
      .withImgUrl('https://picsum.photos/id/7/450/260')
      .withAbstract(
        "Protocol Expense Accounting aims to provide a comprehensive, detailed, and up-to-date view of the Maker Protocol's operational expenses. This information can help Maker Protocol stakeholders, including MKR holders and contributors, understand how MakerDAO spends funds."
      )
      .withStatus(ProgressStatus.IN_PROGRESS)
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
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(ProjectCard, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28280:318265',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28194:143103',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28194:145018',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28194:133324',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28194:147165',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};
