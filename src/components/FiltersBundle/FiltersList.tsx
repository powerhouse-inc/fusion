import { styled } from '@mui/material';
import SimpleBar from 'simplebar-react';
import CumulativeAsList from './defaults/CumulativeFilter/CumulativeAsList';
import CustomCheckbox from './defaults/CustomCheckbox';
import RadioAsList from './defaults/RadioAsList';
import SelectAsList from './defaults/SelectAsList';
import type { Filter } from './types';

interface FilterListProps {
  filters: Filter[];
  handleClose: () => void;
  // Add this props many items and want to add scroll
  heightForScroll?: boolean;
}

const FilterList: React.FC<FilterListProps> = ({ filters, handleClose, heightForScroll = false }) => (
  <SimpleBarStyled heightForScroll={heightForScroll}>
    <Container>
      {filters.map((filter, index) => {
        switch (filter.type) {
          case 'select': {
            return <SelectAsList key={`filter-SelectAsList-${index}`} filter={filter} onClose={handleClose} />;
          }
          case 'radio': {
            return <RadioAsList key={`filter-RadioAsList-${index}`} filter={filter} />;
          }
          case 'checkbox': {
            return <CustomCheckbox key={`filter-CustomCheckbox-${index}`} filter={filter} />;
          }
          case 'cumulative': {
            return <CumulativeAsList key={`filter-CumulativeAsList-${index}`} filter={filter} />;
          }
          default: {
            throw new Error('Unknown filter type');
          }
        }
      })}
    </Container>
  </SimpleBarStyled>
);

export default FilterList;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '0 16px',
}));

const SimpleBarStyled = styled(SimpleBar, {
  shouldForwardProp: (prop) => prop !== 'heightForScroll',
})<{ heightForScroll?: boolean }>(({ theme, heightForScroll }) => ({
  overflowY: 'auto',
  maxHeight: '100%',
  '.simplebar-scrollbar::before': {
    width: 4,
    marginLeft: 0,
    height: 64,
    background: theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[700],
    borderRadius: 12,
  },
  [theme.breakpoints.up('tablet_768')]: {
    maxHeight: '450px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    maxHeight: heightForScroll ? 496 : '100%',
  },
}));
