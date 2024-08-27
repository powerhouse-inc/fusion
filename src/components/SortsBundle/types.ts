import type { Theme } from '@mui/material';
import type { MutableRefObject, ReactElement, ReactNode } from 'react';

export type SortType = 'column'; // sort type identifier
export type OptionVariant = 'title' | 'radio'; // add possible option variants here

export interface GenericSort {
  id: string;
  label: string;
  type: SortType;
}

export interface ResetSort {
  canReset: boolean;
  onReset: () => void;
}

export interface Option {
  variant: OptionVariant;
  value?: string | number;
  order?: 'Desc' | 'Asc';
  label: string | ReactElement;
}

export interface ColumnSort extends GenericSort {
  type: 'column';
  options: Option[];
  customOptionsRender?: (option: Option, isActive: boolean, theme?: Theme) => ReactNode;
  onOptionChange: (option: Option) => void;
  selectedOption: Option;
}

// all available sorts
export type Sort = ColumnSort; // add possible sort types here

export type RenderTriggerFn = (onClick: () => void, ref: MutableRefObject<HTMLDivElement | null>) => ReactElement;

export interface SortsBundleOptions {
  renderTrigger?: RenderTriggerFn; // default undefined (default trigger button is rendered)
  resetSorts?: ResetSort; // default undefined (no reset button)
  sorts: Sort[];
  snapPoints?: number[];
  initialSnap?: number; // this is the index of the previous array
}
