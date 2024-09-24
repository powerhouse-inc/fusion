import { featureFlags } from 'feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '@/config/endpoints';
import { BudgetStatementBuilder } from '@/core/businessLogic/builders/budgetStatementBuilder';
import { RecognizedDelegatesBuilder } from '@/core/businessLogic/builders/delegatesBuilder';
import { FeatureFlagsProvider } from '@/core/context/FeatureFlagsProvider';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import AppLayout from '@/stories/containers/AppLayout/AppLayout';
import RecognizedDelegatesBudgetStatementView from './RecognizedDelegatesBudgetStatementView';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof RecognizedDelegatesBudgetStatementView> = {
  title: 'Fusion/Pages/Recognized Delegates Budget Statement',
  component: RecognizedDelegatesBudgetStatementView,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
    date: '2023-02-23T04:02:02Z',
  },
};
export default meta;

const variantsArgs = [
  {
    delegates: new RecognizedDelegatesBuilder()
      .addBudgetStatement(new BudgetStatementBuilder().withMonth('2023-02').build())
      .build(),
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>
      <AppLayout>
        <RecognizedDelegatesBudgetStatementView {...props} />
      </AppLayout>
    </FeatureFlagsProvider>
  ),
  variantsArgs,
  false
);

export { LightMode, DarkMode };

const optionStyles = {
  style: {
    top: -16,
    left: -16,
  },
};

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: '',
        options: {
          componentStyle: {
            width: 375,
          },
          ...optionStyles,
        },
      },
      768: {
        component: '',
        options: {
          componentStyle: {
            width: 768,
          },
          ...optionStyles,
        },
      },
      1024: {
        component: '',
        options: {
          componentStyle: {
            width: 1024,
          },
          ...optionStyles,
        },
      },
      1280: {
        component: '',
        options: {
          componentStyle: {
            width: 1280,
          },
          ...optionStyles,
        },
      },
      1440: {
        component: '',
        options: {
          componentStyle: {
            width: 1440,
          },
          ...optionStyles,
        },
      },
    },
  } as FigmaParams,
};
