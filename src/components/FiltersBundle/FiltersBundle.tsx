import FilterDesktop from './FilterDesktop';
import FilterMobile from './FilterMobile';
import FilterTablet from './FilterTablet';
import { defaultTriggerRenderer } from './defaults/Renderers';
import useFiltersBundle from './useFiltersBundle';
import type { FiltersBundleOptions } from './types';
import type { breakpoints } from '@ses/styles/theme/themes';
import type { FC } from 'react';

const FiltersBundle: FC<FiltersBundleOptions> = ({
  renderTrigger,
  searchFilter,
  resetFilters,
  filters,
  order = {},
  snapPoints,
  initialSnap = 0,
  asPopover,
}) => {
  const { orderedFilters, resolution, triggerRef, areFiltersOpen, handleToggleOpenFilters, currentBreakpoint } =
    useFiltersBundle({
      filters,
      order,
    });

  const triggerButton = (renderTrigger ?? defaultTriggerRenderer)(handleToggleOpenFilters, triggerRef);
  const showPopover = asPopover?.includes(currentBreakpoint as keyof typeof breakpoints);
  if (resolution.isMobile) {
    return (
      <>
        {triggerButton}
        <FilterMobile
          isOpen={areFiltersOpen}
          handleClose={handleToggleOpenFilters}
          filters={orderedFilters}
          searchFilter={searchFilter}
          resetFilters={resetFilters}
          snapPoints={snapPoints}
          initialSnap={initialSnap}
        />
      </>
    );
  }

  if (resolution.isTablet || showPopover) {
    return (
      <>
        {triggerButton}
        <FilterTablet
          isOpen={areFiltersOpen}
          handleClose={handleToggleOpenFilters}
          filters={orderedFilters}
          searchFilter={searchFilter}
          resetFilters={resetFilters}
          anchorEl={triggerRef}
        />
      </>
    );
  }

  return <FilterDesktop filters={orderedFilters} searchFilter={searchFilter} resetFilters={resetFilters} />;
};

export default FiltersBundle;
