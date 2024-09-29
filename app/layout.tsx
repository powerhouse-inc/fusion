import { GoogleAnalytics } from '@next/third-parties/google';
import { cookies } from 'next/headers';
import type { CookiesInterface } from '@/core/utils/typesHelpers';
import FusionProviders from '@/providers/FusionProviders';
import { ContainerNotification } from '@/stories/components/Notification/Notification';
import AppLayout from '@/stories/containers/AppLayout/AppLayout';
import type { Metadata } from 'next';

import '../styles/globals.scss';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const metadata: Metadata = {
  title: 'Sky Fusion Dashboard',
  description:
    "Sky Fusion Dashboard offers key data insights into the Sky Ecosystem's finances, governance, contributors, and roadmaps.",
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const cookieStore = cookies();

  let cookiesObject: CookiesInterface = {
    allowsThemeTracking: false,
    allowsTimestampTracking: false,
    allowsAnalyticsTracking: false,
    themeModeCookie: 'dark',
  };

  if (cookieStore) {
    cookiesObject = {
      allowsThemeTracking: Boolean(cookieStore.get('themeTracking')?.value),
      allowsTimestampTracking: Boolean(cookieStore.get('timestampTracking')?.value),
      allowsAnalyticsTracking: Boolean(cookieStore.get('analyticsTracking')?.value),
      themeModeCookie: cookieStore.get('themeModeCookie')?.value || 'dark',
    };
  }

  const isLight = cookiesObject?.allowsThemeTracking ? cookiesObject.themeModeCookie === 'light' : false;

  return (
    <html lang="en">
      <body>
        <main>
          {/* TODO: enable web vitals */}
          {/* {getCurrentFeatureFlags().FEATURE_WEB_VITALS && <WebVitals />} */}
          <FusionProviders isLight={isLight} cookiesObject={cookiesObject}>
            <AppLayout>
              {children}
              <ContainerNotification limit={3} />
            </AppLayout>
          </FusionProviders>
        </main>
      </body>

      {/* TODO: disable analytics if the cookie is not set */}
      {GA_TRACKING_ID && <GoogleAnalytics gaId={GA_TRACKING_ID} />}
    </html>
  );
};

export default RootLayout;
