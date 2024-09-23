import React from 'react';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';

// disable useLayoutEffect SSR warnings to avoid log spamming the console
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect;

export type NextPageWithLayout = NextPage<{ protected?: boolean }> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

function MyApp() {
  return <div>Redirecting...</div>;
}

export default MyApp;
