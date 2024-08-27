import { useMediaQuery } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import type { Theme } from '@mui/material';

export default function useSortsBundle() {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  const triggerRef = useRef<HTMLDivElement | null>(null);

  const [areSortsOpen, setAreSortsOpen] = useState(false);
  const handleToggleOpenSorts = () => {
    setAreSortsOpen((prev) => !prev);
  };

  const currentBreakpoint = useMemo(() => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  }, [isMobile, isTablet]);

  return {
    resolution: {
      isMobile,
      isTablet,
    },
    triggerRef,
    areSortsOpen,
    handleToggleOpenSorts,
    currentBreakpoint,
  };
}
