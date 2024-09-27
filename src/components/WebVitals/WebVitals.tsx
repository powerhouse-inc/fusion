'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { CURRENT_ENVIRONMENT } from '@/config/endpoints';

interface Metric {
  id: string;
  name: string;
  value: number;
  delta: number;
  entries: unknown[];
  navigationType: string;
  rating: string;
}

const printWebVitalsToConsole = (metric: Metric) => {
  let fullName = '';
  switch (metric.name) {
    case 'FCP':
      fullName = 'First Contentful Paint';
      break;
    case 'LCP':
      fullName = 'Largest Contentful Paint';
      break;
    case 'TTFB':
      fullName = 'Time to First Byte';
      break;
    case 'FID':
      fullName = 'First Input Delay';
      break;
    case 'CLS':
      fullName = 'Cumulative Layout Shift';
      break;
  }

  console.table({
    fullName,
    ...metric,
  });
};

const WebVitals = () => {
  useReportWebVitals((metric) => {
    if (CURRENT_ENVIRONMENT === 'development') {
      // we only want to print the web vitals in development environments
      printWebVitalsToConsole(metric);
    }
  });

  return null;
};

export { WebVitals };
