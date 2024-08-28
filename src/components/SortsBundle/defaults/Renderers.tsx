import { styled } from '@mui/material';
import SortIcon from 'public/assets/svg/sort.svg';
import type { RenderTriggerFn } from '../types';

export const defaultTriggerRenderer: RenderTriggerFn = (onClick, ref) => (
  <SortContainer onClick={onClick} ref={ref}>
    <SortIcon width="10" height="20" />
  </SortContainer>
);

const SortContainer = styled('div')(({ theme }) => ({
  width: 10,
  height: 20,
  color: theme.palette.colors.slate[300],
  '&:hover': {
    color: theme.palette.isLight ? theme.palette.colors.slate[400] : theme.palette.colors.slate[200],
    cursor: 'pointer',
  },
}));
