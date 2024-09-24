import { useMediaQuery } from '@mui/material';
import { useMemo, useRef, useState } from 'react';

import type { FiltersBundleOptions } from './types';
import type { Theme } from '@mui/material';
import type { breakpoints } from '@ses/styles/theme/themes';

interface Props {
  filters: FiltersBundleOptions['filters'];
  order: FiltersBundleOptions['order'];
  asPopover: FiltersBundleOptions['asPopover'];
}

export const breakpointsOrder: (keyof typeof breakpoints)[] = [
  'mobile_375',
  'tablet_768',
  'desktop_1024',
  'desktop_1280',
  'desktop_1440',
  'desktop_1920',
];

export default function useFiltersBundle({ filters, order, asPopover }: Props) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'), { defaultMatches: true });
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesktop1440 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1440', 'desktop_1920'));
  const isDesktop1920 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1920'));

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const handleToggleOpenFilters = () => {
    if (areFiltersOpen) {
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 300);
    } else {
      document.documentElement.style.scrollBehavior = 'auto';
    }
    setAreFiltersOpen((prev) => !prev);
  };

  const currentBreakpoint = useMemo(() => {
    if (isMobile) return 'mobile_375';
    if (isTablet) return 'tablet_768';
    if (isDesktop1024) return 'desktop_1024';
    if (isDesktop1280) return 'desktop_1280';
    if (isDesktop1440) return 'desktop_1440';
    if (isDesktop1920) return 'desktop_1920';
  }, [isDesktop1024, isDesktop1280, isDesktop1440, isDesktop1920, isMobile, isTablet]);

  const orderedFilters = useMemo(() => {
    if (order && currentBreakpoint) {
      const bpIndex = breakpointsOrder.indexOf(currentBreakpoint);
      for (let i = bpIndex; i >= 0; i--) {
        const bp = breakpointsOrder[i];
        if (order[bp]) {
          return filters.slice().sort((a, b) => {
            const orderA = order[bp]?.indexOf(a.id) ?? filters.length;
            const orderB = order[bp]?.indexOf(b.id) ?? filters.length;
            return orderA - orderB;
          });
        }
      }
    }
    return filters;
  }, [filters, order, currentBreakpoint]);

  const showPopover =
    asPopover?.includes(currentBreakpoint as keyof typeof breakpoints) ||
    (asPopover?.includes('desktop') && (isDesktop1024 || isDesktop1280 || isDesktop1440 || isDesktop1920));

  return {
    resolution: {
      isMobile,
      isTablet,
    },
    triggerRef,
    areFiltersOpen,
    handleToggleOpenFilters,
    orderedFilters,
    showPopover,
  };
}
