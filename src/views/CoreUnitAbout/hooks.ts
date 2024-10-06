import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import { getArrayParam } from '@/core/utils/filters';
import { buildQueryString } from '@/core/utils/urls';

export const useBreadcrumbCoreUnitPager = (coreUnit: CoreUnit, coreUnits: CoreUnit[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', searchParams), [searchParams]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', searchParams), [searchParams]);

  const filteredData = useMemo(
    // apply filters coming from the index page to the pagination
    () =>
      coreUnits.filter((cu) => {
        if (filteredCategories.length > 0 && !cu.category?.some((category) => filteredCategories.includes(category))) {
          return false;
        }
        if (filteredStatuses.length > 0 && !filteredStatuses.includes(cu.status)) {
          return false;
        }
        if (
          !!searchParams?.get('searchText') &&
          !cu.name.toLowerCase().includes((searchParams?.get('searchText') as string).toLowerCase())
        ) {
          return false;
        }

        return true;
      }),
    [coreUnits, filteredCategories, filteredStatuses, searchParams]
  );

  const currentPage = filteredData.findIndex((item) => item.shortCode === coreUnit.shortCode) + 1;
  const totalPages = filteredData.length;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const changeTeam = useCallback(
    (direction: -1 | 1) => () => {
      const index = filteredData?.findIndex((item) => item.shortCode === coreUnit.shortCode);
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < filteredData?.length) {
        const queryStrings = buildQueryString({
          ...searchParams,
          filteredCategories,
          code: null, // override the Actors code to avoid add it to the query string
        });

        router.push(`${pathname?.replace('[code]', filteredData[newIndex].shortCode)}${queryStrings}`);
      }
    },
    [coreUnit.shortCode, filteredCategories, filteredData, router, searchParams, pathname]
  );

  return {
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    onNext: changeTeam(1),
    onPrevious: changeTeam(-1),
  };
};
