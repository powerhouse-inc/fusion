import { Button, Popover, styled, useTheme } from '@mui/material';
import SortsList from './SortsList';
import type { Sort, ResetSort } from './types';
import type { Theme } from '@mui/material';
import type { FC, MutableRefObject } from 'react';

interface SortTabletProps {
  isOpen: boolean;
  handleClose: () => void;
  sorts: Sort[];
  resetSorts?: ResetSort;
  anchorEl: MutableRefObject<HTMLDivElement | null>;
}

const SortTablet: FC<SortTabletProps> = ({ isOpen, handleClose, sorts, anchorEl, resetSorts }) => {
  const theme = useTheme();

  return (
    <Popover open={isOpen} anchorEl={anchorEl.current} onClose={handleClose} {...(StyledMenuProps(theme) as object)}>
      <Container>
        {!!resetSorts && (
          <SortHeader>
            <SortTitle>Sort by</SortTitle>
            <ResetButton variant="text" onClick={resetSorts?.onReset} disabled={!resetSorts.canReset}>
              Reset
            </ResetButton>
          </SortHeader>
        )}
      </Container>
      <SortsList sorts={sorts} handleClose={handleClose} />
    </Popover>
  );
};

export default SortTablet;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '16px 16px 0px',
}));

const SortHeader = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const SortTitle = styled('p')(({ theme }) => ({
  color: theme.palette.colors.slate[200],
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '22px',
  margin: '0px 0px 0px 8px',
  padding: 0,
}));

const ResetButton = styled(Button)(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[500],
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '22px',
  borderRadius: 6,
  background: 'transparent',
  marginRight: 2,
  padding: '4px 16px',
  textTransform: 'none',

  '&:disabled': {
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[800],
  },

  '&:hover': {
    background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[900],
  },
}));

const StyledMenuProps = (theme: Theme) => ({
  PaperProps: {
    sx: {
      minWidth: 311,
      color: '#000',
      backgroundImage: 'none',
      bgcolor: theme.palette.isLight ? '#ffffff' : theme.palette.colors.charcoal[900],
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      paddingBottom: '16px',
      '&.MuiPaper-elevation.MuiPaper-rounded': {
        borderRadius: '12px !important',
      },
      [theme.breakpoints.up('desktop_1024')]: {
        display: 'none',
      },
    },
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  sx: {
    mt: 0.5,
  },
});
