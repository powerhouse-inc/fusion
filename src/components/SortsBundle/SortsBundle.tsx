import SortMobile from './SortMobile';
import SortTablet from './SortTablet';
import { defaultTriggerRenderer } from './defaults/Renderers';
import useSortsBundle from './useSortsBundle';
import type { SortsBundleOptions } from './types';
import type { FC } from 'react';

const SortsBundle: FC<SortsBundleOptions> = ({ renderTrigger, resetSorts, sorts, snapPoints, initialSnap = 0 }) => {
  const { resolution, triggerRef, areSortsOpen, handleToggleOpenSorts } = useSortsBundle();
  const triggerButton = (renderTrigger ?? defaultTriggerRenderer)(handleToggleOpenSorts, triggerRef);

  if (resolution.isMobile) {
    return (
      <>
        {triggerButton}
        <SortMobile
          isOpen={areSortsOpen}
          handleClose={handleToggleOpenSorts}
          sorts={sorts}
          resetSorts={resetSorts}
          snapPoints={snapPoints}
          initialSnap={initialSnap}
        />
      </>
    );
  }

  if (resolution.isTablet) {
    return (
      <>
        {triggerButton}
        <SortTablet
          isOpen={areSortsOpen}
          handleClose={handleToggleOpenSorts}
          sorts={sorts}
          resetSorts={resetSorts}
          anchorEl={triggerRef}
        />
      </>
    );
  }

  return null; // Add desktop support here if needed
};

export default SortsBundle;
