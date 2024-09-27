'use client';

import { featureFlags } from 'feature-flags/feature-flags';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { CURRENT_ENVIRONMENT } from '@/config/endpoints';
import { AuthContextProvider } from '@/core/context/AuthContext';
import { CookiesProviderTracking } from '@/core/context/CookiesContext';
import { FeatureFlagsProvider } from '@/core/context/FeatureFlagsProvider';
import { ThemeProvider } from '@/core/context/ThemeContext';
import { store } from '@/core/store/store';
import type { CookiesInterface } from '@/core/utils/typesHelpers';

interface FusionProvidersProps extends React.PropsWithChildren {
  cookiesObject: CookiesInterface;
  isLight: boolean;
}
const FusionProviders: React.FC<FusionProvidersProps> = ({ children, cookiesObject, isLight }) => (
  <CookiesProvider>
    <Provider store={store}>
      <CookiesProviderTracking cookiesObject={cookiesObject}>
        <AuthContextProvider>
          <ThemeProvider isLightApp={isLight}>
            <FeatureFlagsProvider enabledFeatures={featureFlags[CURRENT_ENVIRONMENT]}>{children}</FeatureFlagsProvider>
          </ThemeProvider>
        </AuthContextProvider>
      </CookiesProviderTracking>
    </Provider>
  </CookiesProvider>
);

export default FusionProviders;
