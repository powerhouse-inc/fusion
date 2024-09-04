import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { getLastUpdateForBudgetStatement } from '@ses/core/businessLogic/coreUnits';
import { useAuthContext } from '@ses/core/context/AuthContext';
import { useCookiesContextTracking } from '@ses/core/context/CookiesContext';
import useBudgetStatementComments from '@ses/core/hooks/useBudgetStatementComments';
import useBudgetStatementPager from '@ses/core/hooks/useBudgetStatementPager';
import { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import { budgetStatementCommentsCollectionId } from '@ses/core/utils/collectionsIds';
import { LastVisitHandler } from '@ses/core/utils/lastVisitHandler';
import lightTheme from '@ses/styles/theme/themes';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType } from '@/core/models/interfaces/types';
import CommentsTab from '../../components/Tabs/CommentsTab/CommentsTab';
import type { TableItems } from '../CoreUnitBudgetStatement/CoreUnitBudgetStatementView';
import type { DelegatesDto } from '@ses/core/models/dto/delegatesDTO';

export enum DELEGATES_REPORT_IDS_ENUM {
  ACTUALS = 'actuals',
  FORECAST = 'forecast',
  COMMENTS = 'comments',
}

const itemsBreadcrumb = [
  {
    label: 'Contributors',
    href: siteRoutes.contributors,
  },
  {
    label: 'Recognized Delegates',
    href: siteRoutes.recognizedDelegate,
  },
];

const useRecognizedDelegatesReport = (delegates: DelegatesDto) => {
  const [selectedTab, setSelectedTab] = useState<DELEGATES_REPORT_IDS_ENUM>(DELEGATES_REPORT_IDS_ENUM.ACTUALS);
  const [lastVisitHandler, setLastVisitHandler] = useState<LastVisitHandler>();
  const { permissionManager } = useAuthContext();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const allBudgetStatement = delegates?.budgetStatements || [];

  const onPrevious = useCallback(() => {
    if (isTimestampTrackingAccepted && selectedTab === DELEGATES_REPORT_IDS_ENUM.COMMENTS) {
      lastVisitHandler?.visit(); // mark the current budget statement as visited before leave
    }
  }, [isTimestampTrackingAccepted, lastVisitHandler, selectedTab]);

  const onNext = useCallback(() => {
    if (isTimestampTrackingAccepted && selectedTab === DELEGATES_REPORT_IDS_ENUM.COMMENTS) {
      lastVisitHandler?.visit(); // mark the current budget statement as visited before leave
    }
  }, [isTimestampTrackingAccepted, lastVisitHandler, selectedTab]);

  const { currentMonth, currentBudgetStatement, handleNextMonth, handlePreviousMonth, hasNextMonth, hasPreviousMonth } =
    useBudgetStatementPager(delegates, {
      onNext,
      onPrevious,
    });

  useEffect(() => {
    // update lastVisitHandler for the current budgetStatement
    if (currentBudgetStatement) {
      setLastVisitHandler(
        new LastVisitHandler(budgetStatementCommentsCollectionId(currentBudgetStatement.id), permissionManager)
      );
    }
  }, [currentBudgetStatement, permissionManager]);

  const lastUpdateForBudgetStatement = useMemo(
    () => getLastUpdateForBudgetStatement(delegates, currentBudgetStatement?.id ?? '0'),
    [currentBudgetStatement, delegates]
  );

  const [showExpenseReportStatusCTA, setShowExpenseReportStatusCTA] = useState<boolean>(false);
  useEffect(() => {
    switch (currentBudgetStatement?.status) {
      case BudgetStatus.Draft:
        setShowExpenseReportStatusCTA(permissionManager.delegates.canComment());
        break;
      default:
        setShowExpenseReportStatusCTA(false);
    }
  }, [currentBudgetStatement, permissionManager]);

  const { comments, numbersComments, commentsLastVisitState, updateHasNewComments } = useBudgetStatementComments(
    currentBudgetStatement,
    lastVisitHandler,
    selectedTab === DELEGATES_REPORT_IDS_ENUM.COMMENTS
  );

  const tabItems: TableItems[] = [
    {
      item: 'Actuals',
      id: DELEGATES_REPORT_IDS_ENUM.ACTUALS,
    },
    {
      item: 'Forecast',
      id: DELEGATES_REPORT_IDS_ENUM.FORECAST,
    },
    {
      item: (
        <CommentsTab
          hasNewComments={!commentsLastVisitState.isFetching && commentsLastVisitState.hasNewComments}
          numbersComments={numbersComments}
        />
      ),
      id: DELEGATES_REPORT_IDS_ENUM.COMMENTS,
    },
  ];

  const onTabChange = useCallback(
    (current?: string, previous?: string) => {
      setSelectedTab(current as DELEGATES_REPORT_IDS_ENUM);

      if (isTimestampTrackingAccepted && previous === DELEGATES_REPORT_IDS_ENUM.COMMENTS) {
        // changing from "comments tab" to any other tab should mark the budget statement as visited
        const visit = async () => {
          const lastVisit = (await lastVisitHandler?.visit()) || DateTime.now().toMillis();
          await updateHasNewComments(DateTime.fromMillis(lastVisit));
        };
        visit();
      }
    },
    [isTimestampTrackingAccepted, lastVisitHandler, updateHasNewComments]
  );

  const delegateTeam = useMemo(
    () =>
      ({
        shortCode: 'DEL',
        name: 'Recognized Delegates',
        type: ResourceType.Delegates,
        image: '/assets/img/mk-logo.png',
        socialMediaChannels: [
          {
            website: 'https://vote.makerdao.com/delegates',
            forumTag: 'https://forum.makerdao.com/c/governance/delegates/43',
            discord: 'https://discord.com/invite/uZxdmZcS',
            youtube: 'https://www.youtube.com/@MakerDAO/videos',
          },
        ],
      } as Team),
    []
  );

  return {
    itemsBreadcrumb,
    isMobile,
    tabItems,
    showExpenseReportStatusCTA,
    lastUpdateForBudgetStatement,
    lastVisitHandler,
    currentMonth,
    currentBudgetStatement,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    allBudgetStatement,
    comments,
    selectedTab,
    onTabChange,
    delegateTeam,
  };
};

export default useRecognizedDelegatesReport;
