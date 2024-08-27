import { styled, useMediaQuery } from '@mui/material';
import { CustomMultiSelect } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import ResetButton from '@ses/components/ResetButton/ResetButton';
import SingleItemSelect from '@ses/components/SingleItemSelect/SingleItemSelect';
import { BudgetStatus } from '@ses/core/models/interfaces/types';
import { getExpenseReportStatusColor } from '@ses/core/utils/colors';
import { useMemo } from 'react';
import SortsBundle from '@/components/SortsBundle/SortsBundle';
import type { Sort } from '@/components/SortsBundle/types';
import type { Theme } from '@mui/material';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { SelectItem } from '@ses/components/SingleItemSelect/SingleItemSelect';
import type { AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { FC } from 'react';

export interface ExpenseReportsFiltersProps {
  selectedMetric: AnalyticMetric;
  onMetricChange: (value: AnalyticMetric) => void;
  selectedStatuses: BudgetStatus[];
  onStatusSelectChange: (value: BudgetStatus[]) => void;
  statusesItems: MultiSelectItem[];
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
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const metricItems: SelectItem<AnalyticMetric>[] = useMemo(
    () => [
      {
        label: 'Forecast',
        value: 'Forecast',
      },
      {
        label: 'Net Protocol Outflow',
        value: 'ProtocolNetOutflow',
        labelWhenSelected: 'Protocol Outflow',
      },
      {
        label: 'Net Expenses On-Chain',
        value: 'PaymentsOnChain',
        labelWhenSelected: 'Net On-Chain',
      },
      {
        label: 'Actuals',
        value: 'Actuals',
      },
    ],
    []
  );

  return (
    <FilterContainer>
      {isMobile && <div>Filter</div>}
      {!isMobile && (
        <>
          <Reset>
            <ResetButton
              onClick={handleResetFilter}
              disabled={isDisabled}
              hasIcon={false}
              label="Reset filters"
              legacyBreakpoints={false}
            />
          </Reset>

          <SelectContainer>
            <SingleItemSelect
              isMobile={isMobile || isTablet} // Mobile behavior also in Tablet
              useSelectedAsLabel
              selected={selectedMetric}
              onChange={(value: string) => onMetricChange(value as AnalyticMetric)}
              items={metricItems}
              PopperProps={{
                placement: 'bottom-end',
              }}
            />

            <CustomMultiSelectStyled
              positionRight={true}
              label="Status"
              activeItems={selectedStatuses}
              items={statusesItems}
              width={120}
              onChange={(items: string[]) => onStatusSelectChange(items as BudgetStatus[])}
              withAll={true}
              popupContainerWidth={256}
              listItemWidth={224}
              customAll={{
                content: <FilterChip text="All" />,
                id: 'all',
                params: { isAll: true },
                count: statusesItems?.reduce((acc, curr) => acc + curr.count, 0),
              }}
              popupContainerHeight={220}
            />
          </SelectContainer>
        </>
      )}
      {(isMobile || isTablet) && (
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

export const FilterChip: FC<{ status?: BudgetStatus; text?: string }> = ({ status = BudgetStatus.Draft, text }) => {
  const variantColor = useMemo(() => getExpenseReportStatusColor(status), [status]);

  return <ExpenseReportStatusStyled variantColorSet={variantColor}>{text ?? status}</ExpenseReportStatusStyled>;
};

const ExpenseReportStatusStyled = styled('div')<{ variantColorSet: { [key: string]: string } }>(
  ({ variantColorSet, theme }) => ({
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
    fontSize: '11px',
    borderRadius: '12px',
    padding: '4px 8px',
    height: '22px',
    width: 'fit-content',
    lineHeight: '13px',
    border: `1px solid ${theme.palette.isLight ? variantColorSet.color : variantColorSet.darkColor}`,
    background: theme.palette.isLight ? variantColorSet.background : variantColorSet.darkBackground,
    color: theme.palette.isLight ? variantColorSet.color : variantColorSet.darkColor,
  })
);

const FilterContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 16,
  marginLeft: 'auto',
  marginRight: 8,
  zIndex: 5,
}));

const Reset = styled('div')(({ theme }) => ({
  gridArea: 'reset',
  display: 'none',
  justifyContent: 'flex-end',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
}));

const SelectContainer = styled('div')(() => ({
  display: 'flex',
  gap: 16,
}));

const CustomMultiSelectStyled = styled(CustomMultiSelect)(() => ({
  '& > div:nth-of-type(2)': {
    borderRadius: 6,
  },
}));
