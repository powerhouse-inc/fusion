import { styled } from '@mui/material';
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

const TableHeader = styled('div')(({ theme }) => ({
  marginTop: 24,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const TableWrapper = styled('div')(({ theme }) => ({
  marginTop: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 8,
    gap: 8,
  },
}));

const MainContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  marginTop: 40,

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 64,
  },
}));

const SkeletonWrapper = styled('div')({
  marginTop: 24,
});
