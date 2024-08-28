import { styled } from '@mui/material';
import SimpleBar from 'simplebar-react';
import CustomSelect from './defaults/CustomSelect';
import type { Sort } from './types';
import type { FC } from 'react';

interface SortListProps {
  sorts: Sort[];
  handleClose: () => void;
}

const SortsList: FC<SortListProps> = ({ sorts, handleClose }) => (
  <SimpleBarStyled>
    <Container>
      {sorts.map((s) => {
        switch (s.type) {
          case 'column': {
            return <CustomSelect sort={s} onClose={handleClose} />;
          }
          default: {
            throw new Error('Unknown sort type');
          }
        }
      })}
    </Container>
  </SimpleBarStyled>
);

export default SortsList;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '0 16px',
}));

const SimpleBarStyled = styled(SimpleBar)(({ theme }) => ({
  overflowY: 'auto',
  maxHeight: '100%',
  '.simplebar-scrollbar::before': {
    width: 4,
    marginLeft: 0,
    background: theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[700],
    borderRadius: 12,
  },
  [theme.breakpoints.up('tablet_768')]: {
    maxHeight: '450px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    maxHeight: '100%',
  },
}));
