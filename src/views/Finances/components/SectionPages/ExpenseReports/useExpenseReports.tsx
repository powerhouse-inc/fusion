import { useMediaQuery } from '@mui/material';
import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import { SortEnum } from '@ses/core/enums/sortEnum';
import { BudgetStatus, ResourceType } from '@ses/core/models/interfaces/types';
import request from 'graphql-request';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import useSWRInfinite from 'swr/infinite';
import { accountsSnapshotQuery } from '@/components/AccountsSnapshot/api/queries';
import type { Sort, Option } from '@/components/SortsBundle/types';
import useRestorationFromUrlState from '@/core/hooks/useRestorationFromUrlState';
import type { Snapshots } from '@/core/models/dto/snapshotAccountDTO';
import { getExpenseReportsQuery, getExpenseReportsStatusesQuery } from '@/views/Finances/api/queries';
import { FinancesSectionId } from '@/views/Finances/types';
import { getHeadersExpenseReport } from '@/views/Finances/utils/utils';
import type { Theme } from '@mui/material';
import type { AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';

export const useExpenseReports = (budgetPath: string) => {
  // metric filter:
  const [selectedMetric, setSelectedMetric] = useState<AnalyticMetric>('Actuals');

  // status filter
  const [selectedStatuses, setSelectedStatuses] = useState<BudgetStatus[]>([]);

  const { handleCurrentSectionStateUpdate } = useRestorationFromUrlState(
    FinancesSectionId.BUDGET_STATEMENTS,
    (state) => {
      if (state?.metric && state.metric.length > 0) {
        setSelectedMetric(state.metric[0] as AnalyticMetric);
      }
      if (state?.statuses && state.statuses.length > 0) {
        setSelectedStatuses(state.statuses as BudgetStatus[]);
      }
    }
  );

  const onMetricChange = (value: AnalyticMetric) => {
    handleCurrentSectionStateUpdate({ metric: value });
    setSelectedMetric(value);
  };
  const onStatusSelectChange = (statuses: BudgetStatus[]) => {
    handleCurrentSectionStateUpdate({ statuses });
    setSelectedStatuses(statuses);
  };

  const handleResetFilter = () => {
    handleCurrentSectionStateUpdate({
      metric: 'Actuals',
      statuses: [],
    });
    setSelectedMetric('Actuals');
    setSelectedStatuses([]);
  };

  // column sorting
  const [selectedOption, setSelectedOption] = useState<Option>({
    variant: 'radio',
    value: 4,
    order: 'Desc',
    label: 'Newest First',
  });
  const [sortColumn, setSortColumn] = useState<number>(4);
  const [headersSort, setHeadersSort] = useState<SortEnum[]>([
    SortEnum.Disabled,
    SortEnum.Neutral,
    SortEnum.Disabled,
    SortEnum.Disabled,
    SortEnum.Desc,
  ]);

  const onSortClick = (index: number, order?: 'Desc' | 'Asc') => {
    const sortNeutralState = headersExpenseReport.map((header) =>
      header.sort ? SortEnum.Neutral : SortEnum.Disabled
    ) as SortEnum[];

    if (order !== undefined) {
      sortNeutralState[index] = order === 'Desc' ? SortEnum.Desc : SortEnum.Asc;
    } else {
      if (headersSort[index] === SortEnum.Neutral) {
        if (headersExpenseReport[index].sortReverse) {
          sortNeutralState[index] = SortEnum.Desc;
        } else {
          sortNeutralState[index] = SortEnum.Asc;
        }
      } else {
        sortNeutralState[index] = headersSort[index] === SortEnum.Asc ? SortEnum.Desc : SortEnum.Asc;
      }
      const nextOption = expenseReportSortItems.find(
        (item) => item.value === index && item.order === SortEnum[sortNeutralState[index]]
      );
      nextOption !== undefined && setSelectedOption({ ...nextOption });
    }
    setHeadersSort(sortNeutralState);
    setSortColumn(index);
  };

  const isSmallDesk = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  // column headers used for the UI table
  const headersExpenseReport = getHeadersExpenseReport(headersSort, selectedMetric, isSmallDesk);

  // fetch the data paginated
  const expenseReportResponse = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null; // reached the end

      return getExpenseReportsQuery({
        page: pageIndex + 1,
        budgetPath,
        status:
          selectedStatuses.length > 0
            ? selectedStatuses
            : [BudgetStatus.Draft, BudgetStatus.Review, BudgetStatus.Final, BudgetStatus.Escalated],
        sortByMonth:
          sortColumn === 1
            ? headersSort[1] === SortEnum.Asc
              ? 'asc'
              : headersSort[1] === SortEnum.Desc
              ? 'desc'
              : null
            : null,
        sortByLastModified:
          sortColumn === 4
            ? headersSort[4] === SortEnum.Asc
              ? 'asc'
              : headersSort[4] === SortEnum.Desc
              ? 'desc'
              : null
            : null,
      });
    },
    async (args) => {
      const res = await request<{
        budgetStatements: BudgetStatement[];
      }>(GRAPHQL_ENDPOINT, args.query, args.options);

      // override draft status if the budget statement is empty and it has snapshot data
      const budgetStatements = await Promise.all(
        res.budgetStatements.map(async (budgetStatement) => {
          // if the budget statement is a delegate, aligned delegate, keeper or special purpose fund
          // and it has no wallet or its value are "empty" then maybe we need to override the status to auto generated
          const shouldPotentiallyOverrideStatus =
            [
              ResourceType.Delegates,
              ResourceType.AlignedDelegates,
              ResourceType.Keepers,
              ResourceType.SpecialPurposeFund,
            ].includes(budgetStatement.ownerType as ResourceType) &&
            budgetStatement.status === BudgetStatus.Draft &&
            budgetStatement.budgetStatementWallet?.length === 0 &&
            !budgetStatement.actualExpenses &&
            !budgetStatement.forecastExpenses &&
            !budgetStatement.paymentsOnChain &&
            !budgetStatement.netProtocolOutflow;

          if (shouldPotentiallyOverrideStatus) {
            // if the snapshot data is not empty then we need to override the status to auto generated
            const getSnapshotData = async (ownerType: ResourceType, month: string) => {
              const { query, filter } = accountsSnapshotQuery({
                ownerType,
                ownerId: budgetStatement.owner.id,
                period: DateTime.fromFormat(month, 'yyyy-MM-dd').toFormat('yyyy/MM'),
              });

              try {
                const snapshotResponse = await request<{ snapshots: Snapshots[] }>(GRAPHQL_ENDPOINT, query, filter);

                return snapshotResponse.snapshots[0];
              } catch (error) {
                console.error('Error fetching snapshot data:', error);
                return null;
              }
            };

            const snapshotData = await getSnapshotData(
              budgetStatement.ownerType as ResourceType,
              budgetStatement.month
            );

            budgetStatement.status = snapshotData ? BudgetStatus.AutoGenerated : undefined;
          }

          return budgetStatement;
        })
      );

      return budgetStatements;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateAll: false,
      revalidateFirstPage: false,
    }
  );

  const hasExpenseReports = expenseReportResponse.isLoading
    ? true
    : (expenseReportResponse.data ?? []).map((page) => page.length).reduce((acc, curr) => acc + curr, 0) > 0;

  const statusesResponse = useSWRImmutable(['statuses', budgetPath], async () =>
    getExpenseReportsStatusesQuery(budgetPath)
  );

  // status items used in the status multiselect filter
  const statusesItems = useMemo(() => {
    const responseData = statusesResponse.data ? statusesResponse.data : [];

    return responseData.reduce(
      (acc, curr) => {
        if (curr.status === BudgetStatus.Draft) {
          acc[0].count += 1;
        } else if (curr.status === BudgetStatus.Review) {
          acc[1].count += 1;
        } else if (curr.status === BudgetStatus.Final) {
          acc[2].count += 1;
        } else if (curr.status === BudgetStatus.Escalated) {
          acc[3].count += 1;
        }

        return acc;
      },
      [
        {
          label: 'Final',
          value: BudgetStatus.Final,
          count: 0,
        },
        {
          label: 'Escalated',
          value: BudgetStatus.Escalated,
          count: 0,
        },
        {
          label: 'Review',
          value: BudgetStatus.Review,
          count: 0,
        },
        {
          label: 'Draft',
          value: BudgetStatus.Draft,
          count: 0,
        },
      ]
    );
  }, [statusesResponse.data]);

  const isDisabled = selectedMetric === 'Actuals' && selectedStatuses.length === 0;

  const expenseReportSortItems: Option[] = [
    {
      variant: 'title',
      label: 'Reporting Month',
    },
    {
      variant: 'radio',
      value: 1,
      order: 'Desc',
      label: 'Newest First',
    },
    {
      variant: 'radio',
      value: 1,
      order: 'Asc',
      label: 'Oldest First',
    },
    {
      variant: 'title',
      label: 'Last Modified',
    },
    {
      variant: 'radio',
      value: 4,
      order: 'Desc',
      label: 'Newest First',
    },
    {
      variant: 'radio',
      value: 4,
      order: 'Asc',
      label: 'Oldest First',
    },
  ];

  const sorts: Sort[] = [
    {
      type: 'column',
      id: 'expenseReportSort',
      label: '',
      options: expenseReportSortItems,
      onOptionChange: (option: Option) => {
        setSelectedOption({ ...option });
        option.value !== undefined && option.order !== undefined && onSortClick(Number(option.value), option.order);
      },
      selectedOption,
    },
  ];

  const canReset = selectedOption.value !== 4 || (selectedOption.value === 4 && selectedOption.order !== 'Desc');

  const onReset = () => {
    setSelectedOption({
      variant: 'radio',
      value: 4,
      order: 'Desc',
      label: 'Newest First',
    });
    setHeadersSort([SortEnum.Disabled, SortEnum.Neutral, SortEnum.Disabled, SortEnum.Disabled, SortEnum.Desc]);
    setSortColumn(4);
  };

  return {
    selectedMetric,
    onMetricChange,
    selectedStatuses,
    onStatusSelectChange,
    statusesItems,
    handleResetFilter,
    headersExpenseReport,
    onSortClick,
    expenseReportResponse,
    hasExpenseReports,
    isDisabled,
    sorts,
    canReset,
    onReset,
  };
};
