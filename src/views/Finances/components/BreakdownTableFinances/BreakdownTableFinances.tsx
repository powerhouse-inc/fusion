import { styled } from '@mui/material';
import FiltersBundle from '@/components/FiltersBundle/FiltersBundle';
import type { Filter, ResetFilter } from '@/components/FiltersBundle/types';
import FinancesTitle from '../FinancesTitle/FinancesTitle';

interface Props {
  year: string;
  filters: Filter[];
  resetFilters: ResetFilter;
}

const BreakdownTableFinances = ({ year, filters, resetFilters }: Props) => (
  <Container>
    <FinancesTitle
      year={year}
      title="Breakdown Table"
      tooltip="The breakdown table enhances the functionality of the breakdown chart by providing a side-by-side multi-metric comparison. It delivers a detailed view with subtotals for each budget category and their subdivisions, along with a cumulative total for selected metrics."
      hash="breakdown-table"
    />

    <FilterContainer>
      <FiltersBundle filters={filters} resetFilters={resetFilters} asPopover={[]} snapPoints={[450, 250, 0]} />
    </FilterContainer>
  </Container>
);
export default BreakdownTableFinances;
const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 26,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 24,
    alignItems: 'flex-start',
  },
}));

const FilterContainer = styled('div')(({ theme }) => ({
  height: 34,

  [theme.breakpoints.up('tablet_768')]: {
    height: 48,
    marginLeft: 'auto',
  },
}));
