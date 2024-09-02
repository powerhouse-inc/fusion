import { useMediaQuery } from '@mui/material';
import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import { SortEnum } from '@ses/core/enums/sortEnum';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import request from 'graphql-request';
import { useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import useSWRInfinite from 'swr/infinite';
import type { Sort, Option } from '@/components/SortsBundle/types';
import { getExpenseReportsQuery, getExpenseReportsStatusesQuery } from '@/views/Finances/api/queries';
import { getHeadersExpenseReport } from '@/views/Finances/utils/utils';
import type { Theme } from '@mui/material';
import type { AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';

export const useExpenseReports = (budgetPath: string) => {
  // metric filter:
  const [selectedMetric, setSelectedMetric] = useState<AnalyticMetric>('Actuals');
  const onMetricChange = (value: AnalyticMetric) => setSelectedMetric(value);

  // status filter
  const [selectedStatuses, setSelectedStatuses] = useState<BudgetStatus[]>([]);
  const onStatusSelectChange = (statuses: BudgetStatus[]) => setSelectedStatuses(statuses);

  const handleResetFilter = () => {
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

      return res.budgetStatements;
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
          label: 'Draft',
          value: BudgetStatus.Draft,
          count: 0,
        },
        {
          label: 'Review',
          value: BudgetStatus.Review,
          count: 0,
        },
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
