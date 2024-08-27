import { Button, styled } from '@mui/material';
import CleanIcon from 'public/assets/svg/clean.svg';
import CustomSheet from '../CustomSheet/CustomSheet';
import SortsList from './SortsList';
import type { Sort, ResetSort } from './types';
import type { FC } from 'react';

interface SortMobileProps {
  isOpen: boolean;
  handleClose: () => void;
  sorts: Sort[];
  resetSorts?: ResetSort;
  snapPoints?: number[];
  initialSnap?: number;
}

const SortMobile: FC<SortMobileProps> = ({
  isOpen,
  handleClose,
  sorts,
  resetSorts,
  snapPoints = [600, 400, 250, 0],
  initialSnap,
}) => (
  <CustomSheet isOpen={isOpen} handleClose={handleClose} initialSnap={initialSnap} snapPoints={snapPoints}>
    <SortTitle>Sort by</SortTitle>
    <SortsList sorts={sorts} handleClose={handleClose} />
    {!!resetSorts && (
      <FullWidthReset
        variant="contained"
        color="primary"
        disabled={!resetSorts?.canReset}
        onClick={resetSorts?.onReset}
      >
        <CleanIcon width="21" height="22" />
        Reset
      </FullWidthReset>
    )}
  </CustomSheet>
);

export default SortMobile;

const FullWidthReset = styled(Button)(({ theme }) => ({
  padding: '6px 8px 6px 4px',
  margin: '16px',
  borderRadius: 8,
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.charcoal[100],
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '150%',
  textTransform: 'none',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'row',
  gap: 4,

  '&:disabled, &:hover': {
    boxShadow: 'none',
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[300],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  },
}));

const SortTitle = styled('p')(({ theme }) => ({
  color: theme.palette.colors.slate[200],
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '22px',
  margin: '0px 0px 2px 24px',
  padding: 0,
}));
