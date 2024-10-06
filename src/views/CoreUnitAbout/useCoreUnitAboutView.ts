import sortBy from 'lodash/sortBy';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import { getRelateMipObjectFromCoreUnit } from '@/core/businessLogic/coreUnitAbout';
import { TeamStatus } from '@/core/models/interfaces/types';
import { getArrayParam, getStringParam } from '@/core/utils/filters';
import { buildQueryString } from '@/core/utils/urls';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { CuMip } from '@ses/core/models/interfaces/cuMip';

interface Props {
  cuAbout: CoreUnit;
  code: string;
  setShowThreeMIPs: (value: boolean) => void;
  showThreeMIPs: boolean;
}

export const useCoreUnitAboutView = ({ cuAbout, code, setShowThreeMIPs, showThreeMIPs }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', searchParams), [searchParams]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', searchParams), [searchParams]);
  const searchText = useMemo(
    () => getStringParam('searchText', Object.fromEntries((searchParams ?? new Set()).entries())),
    [searchParams]
  );

  const onClickLessMips = () => {
    setShowThreeMIPs(!showThreeMIPs);
  };
  const relateMipsOrder = useMemo(() => {
    const buildNewArray = cuAbout.cuMip.map((mip: CuMip) => getRelateMipObjectFromCoreUnit(mip));
    const order = sortBy(buildNewArray, ['orderBy', 'dateMip']).reverse();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countNumberAccepted = order.filter((mip: any) => mip.mipStatus === TeamStatus.Accepted);
    const resultArrayThreeElements = showThreeMIPs ? order.slice(0, countNumberAccepted.length) : order;
    return resultArrayThreeElements;
  }, [cuAbout.cuMip, showThreeMIPs]);

  const hasMipsNotAccepted = useMemo(() => {
    const buildNewArray = cuAbout.cuMip.map((mip: CuMip) => getRelateMipObjectFromCoreUnit(mip));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return buildNewArray.some((mip: any) => mip.mipStatus !== TeamStatus.Accepted);
  }, [cuAbout.cuMip]);

  const queryStrings = useMemo(
    () =>
      buildQueryString({
        filteredStatuses,
        filteredCategories,
        searchText,
      }),
    [filteredCategories, filteredStatuses, searchText]
  );

  const onClickFinances = useCallback(() => {
    router.push(`/core-unit/${code}/finances/reports${queryStrings}`);
  }, [router, code, queryStrings]);

  const onClickActivity = useCallback(() => {
    router.push(`/core-unit/${code}/activity-feed${queryStrings}`);
  }, [router, code, queryStrings]);

  return {
    onClickLessMips,
    relateMipsOrder,
    hasMipsNotAccepted,
    onClickFinances,
    showThreeMIPs,
    setShowThreeMIPs,
    onClickActivity,
    queryStrings,
  };
};
