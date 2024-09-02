import FilterDesktop from './FilterDesktop';
import FilterMobile from './FilterMobile';
import FilterTablet from './FilterTablet';
import { defaultTriggerRenderer } from './defaults/Renderers';
import useFiltersBundle from './useFiltersBundle';
import type { FiltersBundleOptions } from './types';
import type { FC } from 'react';

const FiltersBundle: FC<FiltersBundleOptions> = ({
  renderTrigger,
  searchFilter,
  resetFilters,
  filters,
  order = {},
  snapPoints,
  initialSnap = 0,
  asPopover = ['tablet_768'],
  heightForScroll = false,
}) => {
  const { orderedFilters, resolution, triggerRef, areFiltersOpen, handleToggleOpenFilters, showPopover } =
    useFiltersBundle({
      filters,
      order,
      asPopover,
    });
  const triggerButton = (renderTrigger ?? defaultTriggerRenderer)(handleToggleOpenFilters, triggerRef);

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

  if (showPopover) {
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
          heightForScroll={heightForScroll}
        />
      </>
    );
  }

  return <FilterDesktop filters={orderedFilters} searchFilter={searchFilter} resetFilters={resetFilters} />;
};

export default FiltersBundle;
