import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { siteRoutes } from '@/config/routes';
import type { SnapshotLimitPeriods } from '@/core/hooks/useBudgetStatementPager';
import { useUrlAnchor } from '@/core/hooks/useUrlAnchor';
import { ResourceType } from '@/core/models/interfaces/types';
import { AllowedOwnerType } from './types';
import { allowedOwnerTypeToResourceType } from './utils';

const useBudgetStatementView = (snapshotLimitPeriods: SnapshotLimitPeriods | undefined) => {
  const router = useRouter();
  const viewMonthStr = router.query.viewMonth;
  const ownerTypeQuery = router.query.ownerType as AllowedOwnerType;
  const [snapshotCreated, setSnapshotCreated] = useState<DateTime | undefined>();
  const [currentMonth, setCurrentMonth] = useState(DateTime.utc());
  const anchor = useUrlAnchor();

  const ownerType = useMemo(() => allowedOwnerTypeToResourceType(ownerTypeQuery), [ownerTypeQuery]);

  useEffect(() => {
    // initialize the currentMonth from the url if it is present due a refresh or direct access
    const snapshotLimit = snapshotLimitPeriods?.latest?.startOf('month');
    const actualMonth = DateTime.utc().startOf('month');

    const mostRecentMonth = snapshotLimit ?? actualMonth;

    if (viewMonthStr) {
      const month = DateTime.fromFormat(viewMonthStr as string, 'LLLyyyy', { zone: 'utc' });

      if (month && month.isValid && month <= mostRecentMonth) {
        setCurrentMonth(month);
      } else {
        setCurrentMonth(mostRecentMonth);
      }
    } else {
      setCurrentMonth(snapshotLimit ?? actualMonth);
    }
  }, [router.route, router.query, viewMonthStr, snapshotLimitPeriods]);

  const replaceViewMonthRoute = useCallback(
    (viewMonth: string) => {
      router.replace(
        {
          hash: anchor,
          query: {
            ...router.query,
            viewMonth,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [anchor, router]
  );

  const { teamInfo, breadcrumbItems } = useMemo(() => {
    // map the AllowedOwnerType to required data to show in the UI
    switch (ownerTypeQuery) {
      case AllowedOwnerType.KEEPERS:
        return {
          teamInfo: {
            type: ResourceType.Keepers,
            code: 'KEEPERS',
            name: 'Keepers',
            sentenceDescription:
              'MakerDAO Ecosystem Actors Keepers page provides a comprehensive overview of Keepers on-chain activity with monthly account snapshot.',
            socialMediaChannels: [
              {
                forumTag: 'https://forum.makerdao.com/t/poll-notice-amend-keeper-networks/20757',
              },
            ],
            image: '/assets/img/mk-logo.png',
          },
          breadcrumbItems: [
            {
              label: 'Finances',
              href: siteRoutes.finances(),
            },
            {
              label: 'Scope Framework Budget',
              href: siteRoutes.finances('scopes'),
            },
            {
              label: 'Protocol Scope',
              href: siteRoutes.finances('scopes/PRO'),
            },
            {
              label: 'Keepers',
              href: siteRoutes.budgetStatements(ownerTypeQuery),
            },
          ],
        };
      case AllowedOwnerType.SPFS:
        return {
          teamInfo: {
            type: ResourceType.SpecialPurposeFund,
            code: 'SFPs',
            name: 'Special Purpose Funds',
            sentenceDescription:
              'MakerDAO Ecosystem Actors Special Purpose Funds page provides a comprehensive overview of Special Purpose Funds on-chain activity with monthly account snapshot.',
            socialMediaChannels: [{}],
            image: '/assets/img/mk-logo.png',
          },
          breadcrumbItems: [
            {
              label: 'Finances',
              href: siteRoutes.finances(),
            },
            {
              label: 'MakerDAO Legacy Budget',
              href: siteRoutes.finances('legacy'),
            },
            {
              label: 'Special Purpose Funds',
              href: siteRoutes.budgetStatements(ownerTypeQuery),
            },
          ],
        };
      case AllowedOwnerType.ALIGNED_DELEGATES:
        return {
          teamInfo: {
            type: ResourceType.AlignedDelegates,
            code: 'DEL',
            name: 'Aligned Delegates',
            sentenceDescription:
              'MakerDAO Ecosystem Actors Aligned Delegates page provides a comprehensive overview of Aligned Delegates financial activity through monthly budget statements.',
            socialMediaChannels: [
              {
                forumTag: 'https://forum.makerdao.com/t/april-2024-aligned-delegate-compensation/24272',
              },
            ],
            image: '/assets/img/mk-logo.png',
          },
          breadcrumbItems: [
            {
              label: 'Finances',
              href: siteRoutes.finances(),
            },
            {
              label: 'Atlas Immutable Budget',
              href: siteRoutes.finances('immutable'),
            },
            {
              label: 'Aligned Delegates',
              href: siteRoutes.budgetStatements(ownerTypeQuery),
            },
          ],
        };
    }
  }, [ownerTypeQuery]);

  // pager
  const hasPreviousMonth = useCallback(() => {
    const snapshotLimit = snapshotLimitPeriods?.earliest;

    return !!snapshotLimit && currentMonth.startOf('month') > snapshotLimit?.startOf('month');
  }, [currentMonth, snapshotLimitPeriods?.earliest]);

  const handlePreviousMonth = useCallback(() => {
    if (hasPreviousMonth()) {
      const month = currentMonth.minus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
  }, [currentMonth, hasPreviousMonth, replaceViewMonthRoute]);

  const hasNextMonth = useCallback(() => {
    const snapshotLimit = snapshotLimitPeriods?.latest;
    const actualMonth = DateTime.utc().startOf('month');
    return (
      currentMonth.startOf('month') < actualMonth &&
      !!snapshotLimit &&
      currentMonth.startOf('month') < snapshotLimit?.startOf('month')
    );
  }, [currentMonth, snapshotLimitPeriods?.latest]);

  const handleNextMonth = useCallback(() => {
    if (hasNextMonth()) {
      const month = currentMonth.plus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
  }, [currentMonth, hasNextMonth, replaceViewMonthRoute]);

  return {
    ownerTypeQuery,
    ownerType,
    teamInfo,
    breadcrumbItems,
    snapshotCreated,
    setSnapshotCreated,
    currentMonth,
    hasPreviousMonth,
    hasNextMonth,
    handlePreviousMonth,
    handleNextMonth,
  };
};

export default useBudgetStatementView;
