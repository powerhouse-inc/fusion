import type { Theme } from '@mui/material';
import type { breakpoints } from '@ses/styles/theme/themes';
import type { CSSProperties, MutableRefObject, ReactElement, ReactNode } from 'react';

export type FilterType = 'select' | 'radio' | 'checkbox' | 'cumulative'; // filter type identifier

export interface GenericFilter {
  id: string;
  label: string;
  collapsible?: boolean;
  type: FilterType;
}

export interface ResetFilter {
  canReset: boolean;
  onReset: () => void;
}

export interface SearchFilter {
  onChange: (value: string) => void;
  value?: string;
  widthStyles?: {
    fullWidth?: boolean;
    width?: number; // value in px
    menuWidth?: number; // value in px
  };
}

export interface SelectOption {
  value: string | number;
  label: string | ReactElement;
  extra?: {
    [key: string]: string;
  };
}

export interface SelectFilter extends GenericFilter {
  type: 'select';
  selected: SelectOption['value'] | SelectOption['value'][];
  multiple?: boolean; // default is false
  alwaysNumberedLabel?: boolean; // default is false
  options: SelectOption[];
  onChange: (value: SelectOption['value'] | SelectOption['value'][]) => void;
  customOptionsRender?: (option: SelectOption, isActive: boolean, theme?: Theme) => ReactNode;
  withAll?: boolean;
  customOptionsRenderAll?: (isActive: boolean, theme?: Theme) => ReactNode;
  widthStyles?: {
    fullWidth?: boolean;
    width?: CSSProperties['width'];
    menuWidth?: number; // value in px
    maxWidth?: number; // value in px
  };
  // Height of the items default should be 32px for container of options
  itemOptionStyles?: {
    height?: CSSProperties['height'];
    alignItems?: CSSProperties['alignItems'];
  };
}

export interface RadioOption {
  value: string | number;
  label: string | ReactElement;
  description?: string;
  selected?: boolean; // default is false
  group?: boolean | string;
}

export interface RadioFilter extends GenericFilter {
  type: 'radio';
  options: RadioOption[];
  onChange: (value: RadioOption['value']) => void;
}

export interface CheckboxFilter extends GenericFilter {
  type: 'checkbox';
  selected: boolean;
  onChange: () => void;
  options?: RadioOption[];
  customOptionsRender?: (option: RadioOption, isActive: boolean, theme?: Theme) => ReactNode;
  onOptionChange?: (value: RadioOption['value']) => void;
  selectedOptionValue?: string | number;
}

export interface CumulativeFilter extends GenericFilter {
  type: 'cumulative';
  cumulativeType: 'absolute' | 'relative';
  isCumulative: boolean;
  handleChangeCumulativeType: (value: 'absolute' | 'relative') => void;
  handleToggleCumulative: () => void;
}

// all available filters
export type Filter = SelectFilter | RadioFilter | CheckboxFilter | CumulativeFilter; // add possible filter types here

export type RenderTriggerFn = (onClick: () => void, ref: MutableRefObject<HTMLDivElement | null>) => ReactElement;

export interface FiltersBundleOptions {
  renderTrigger?: RenderTriggerFn; // default undefined (default trigger button is rendered)
  searchFilter?: SearchFilter; // default undefined (no search)
  resetFilters?: ResetFilter; // default undefined (no reset button)
  filters: Filter[];
  order?: Partial<Record<keyof typeof breakpoints, string[]>>;
  snapPoints?: number[];
  initialSnap?: number; // this is the index of the previous array
  asPopover?: (keyof typeof breakpoints | 'desktop')[];
  heightForScroll?: boolean; // Add height in desk for scroll when behavior as popover
}
