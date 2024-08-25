import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { Filter, ResetFilter } from '@/components/FiltersBundle/types';
import BreakdownTableFinances from '../../BreakdownTableFinances/BreakdownTableFinances';
import FinancesTable from '../../FinancesTable/FinancesTable';
import HeaderTable from '../../HeaderTable/HeaderTable';
import BreakdownTableSkeleton from './BreakdownTableSkeleton/BreakdownTableSkeleton';
import type { MetricValues, PeriodicSelectionFilter, TableFinances } from '../../../utils/types';

interface Props {
  activeItems: string[];
  selectedValue: string;
  year: string;
  breakdownTable: TableFinances[];
  isLoading: boolean;
  headerTable: MetricValues[];
  title: string;
  filters: Filter[];
  resetFilters: ResetFilter;
}

const BreakdownTable: React.FC<Props> = ({
  activeItems,
  selectedValue,
  year,
  breakdownTable,
  isLoading,
  headerTable,
  title,
  filters,
  resetFilters,
}) => (
  <MainContainer>
    <BreakdownTableFinances year={year} filters={filters} resetFilters={resetFilters} />

    {isLoading ? (
      <SkeletonWrapper>
        <BreakdownTableSkeleton />
      </SkeletonWrapper>
    ) : (
      <>
        <TableHeader>
          <HeaderTable
            title={title}
            year={year}
            period={selectedValue as PeriodicSelectionFilter}
            headerTable={headerTable}
            activeMetrics={activeItems}
          />
        </TableHeader>
        <TableWrapper>
          <FinancesTable
            breakdownTable={breakdownTable}
            metrics={activeItems}
            year={year}
            period={selectedValue as PeriodicSelectionFilter}
          />
        </TableWrapper>
      </>
    )}
  </MainContainer>
);

export default BreakdownTable;

const TableHeader = styled.div({
  marginTop: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const TableWrapper = styled.div({
  marginTop: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
  },
});

const MainContainer = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  marginTop: 40,
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 64,
  },
});

const SkeletonWrapper = styled('div')({
  marginTop: 24,
});
