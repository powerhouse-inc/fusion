import { styled, useMediaQuery } from '@mui/material';
import { getFusionExpenseReportStatusColor } from '@ses/core/utils/colors';
import { useMemo } from 'react';
import FiltersBundle from '@/components/FiltersBundle/FiltersBundle';
import type { Filter, ResetFilter } from '@/components/FiltersBundle/types';
import SortsBundle from '@/components/SortsBundle/SortsBundle';
import type { Sort } from '@/components/SortsBundle/types';
import type { Theme } from '@mui/material';
import type { AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { BudgetStatus } from '@ses/core/models/interfaces/types';
import type { FC } from 'react';

export interface ExpenseReportsFiltersProps {
  selectedMetric: AnalyticMetric;
  onMetricChange: (value: AnalyticMetric) => void;
  selectedStatuses: BudgetStatus[];
  onStatusSelectChange: (value: BudgetStatus[]) => void;
  statusesItems: {
    label: string;
    value: BudgetStatus;
    count: number;
  }[];
  handleResetFilter: () => void;
  isDisabled?: boolean;
  sorts: Sort[];
  canReset: boolean;
  onReset: () => void;
}

const ExpenseReportsFilters: FC<ExpenseReportsFiltersProps> = ({
  selectedMetric,
  onMetricChange,
  selectedStatuses,
  onStatusSelectChange,
  statusesItems,
  handleResetFilter,
  isDisabled = true,
  sorts,
  canReset,
  onReset,
}) => {
  const isSmallDesk = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
  const metricItems = useMemo(
    () => [
      {
        label: 'Forecast',
        value: 'Forecast',
      },
      {
        label: 'Protocol Outflow',
        value: 'ProtocolNetOutflow',
      },
      {
        label: 'Net On-Chain',
        value: 'PaymentsOnChain',
      },
      {
        label: 'Actuals',
        value: 'Actuals',
      },
    ],
    []
  );
  const statusOptions = statusesItems.map((status) => ({
    label: status.label,
    value: status.value,
  }));
  const filters: Filter[] = [
    {
      type: 'select',
      id: 'expense-reports-metrics-filter',
      label: 'Metrics',
      options: metricItems,
      selected: selectedMetric,
      onChange: (value) => onMetricChange(value as AnalyticMetric),
      widthStyles: {
        width: 'fit-content',
        menuWidth: 220,
        maxWidth: isSmallDesk ? 130 : 184,
      },
    },
    {
      type: 'select',
      id: 'expense-reports-status-filter',
      label: 'Status',
      options: statusOptions,
      selected: selectedStatuses,
      multiple: true,
      onChange: (values) => onStatusSelectChange(values as BudgetStatus[]),
      customOptionsRender: (option) => (
        <FilterChip status={option.value as BudgetStatus} text={option.label as string} />
      ),
      widthStyles: {
        width: 'fit-content',
        menuWidth: 220,
        maxWidth: 130,
      },
      withAll: true,
      customOptionsRenderAll: () => <AllStatusText>All Status</AllStatusText>,
    },
  ];
  const resetFilters: ResetFilter = {
    canReset: !isDisabled,
    onReset: handleResetFilter,
  };

  return (
    <FilterContainer>
      <FiltersBundle filters={filters} resetFilters={resetFilters} asPopover={[]} snapPoints={[525, 455, 225, 0]} />
      {isSmallDesk && (
        <SortsBundle
          sorts={sorts}
          resetSorts={{
            canReset,
            onReset,
          }}
          snapPoints={[350, 280, 180, 0]}
        />
      )}
    </FilterContainer>
  );
};

export default ExpenseReportsFilters;

export const FilterChip: FC<{ status: BudgetStatus; text: string }> = ({ status, text }) => {
  const variantColor = useMemo(() => getFusionExpenseReportStatusColor(status), [status]);

  return <ExpenseReportStatusStyled variantColorSet={variantColor}>{text}</ExpenseReportStatusStyled>;
};

const FilterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 16,
  marginLeft: 'auto',
  marginRight: 8,
  zIndex: 5,

  [theme.breakpoints.up('desktop_1024')]: {
    marginRight: 0,
  },
}));

const AllStatusText = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const ExpenseReportStatusStyled = styled('div')<{ variantColorSet: { [key: string]: string } }>(
  ({ variantColorSet, theme }) => ({
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: '14px',
    borderRadius: 6,
    padding: '1px 16px',
    lineHeight: '22px',
    color: theme.palette.isLight ? variantColorSet.color : variantColorSet.darkColor,
    backgroundColor: theme.palette.isLight ? variantColorSet.background : variantColorSet.darkBackground,
  })
);
