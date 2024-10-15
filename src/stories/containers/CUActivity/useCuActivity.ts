import lightTheme from '@ses/styles/theme/themes';
import { useState } from 'react';
import { useThemeContext } from '@/core/context/ThemeContext';
import { SortEnum } from '@/core/enums/sortEnum';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import { useBreadcrumbCoreUnitPager } from '@/views/CoreUnitAbout/hooks';
import type { ActivityTableHeader } from '@ses/components/CUActivityTable/ActivityTable';

export const useCuActivity = (coreUnit: CoreUnit, coreUnits: CoreUnit[]) => {
  const { isLight } = useThemeContext();
  const [columns, setColumns] = useState<ActivityTableHeader[]>([
    {
      header: 'Timestamp',
      styles: {
        [lightTheme.breakpoints.up('tablet_768')]: {
          width: 262,
          paddingLeft: 32,
          paddingRight: 14,
        },
        [lightTheme.breakpoints.up('desktop_1024')]: {
          width: 339,
          paddingLeft: 64,
          paddingRight: 14,
        },
      },
      sort: SortEnum.Desc,
    },
    {
      header: 'Details',
      sort: SortEnum.Disabled,
    },
  ]);

  const onSortClick = (i: number) => {
    const temp = [...columns];
    temp[i].sort = temp[i].sort === SortEnum.Asc ? SortEnum.Desc : SortEnum.Asc;
    setColumns(temp);
  };

  const pager = useBreadcrumbCoreUnitPager(coreUnit, coreUnits);

  return {
    isLight,
    columns,
    onSortClick,
    pager,
  };
};
