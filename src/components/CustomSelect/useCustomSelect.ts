import { useTheme } from '@mui/material';
import { useRef, useEffect } from 'react';
import type { CustomSelectProps, OptionItem } from './type';
import type { SelectChangeEvent } from '@mui/material';
import type { ReactNode } from 'react';

export interface Props {
  label: CustomSelectProps['label'];
  options: CustomSelectProps['options'];
  multiple?: CustomSelectProps['multiple'];
  alwaysNumberedLabel?: CustomSelectProps['alwaysNumberedLabel'];
  selected: CustomSelectProps['selected'];
  withAll?: CustomSelectProps['withAll'];
  isFixed: boolean;
  onChange: CustomSelectProps['onChange'];
}

export default function useCustomSelect({
  label,
  options,
  multiple,
  alwaysNumberedLabel,
  selected,
  withAll,
  isFixed,
  onChange,
}: Props) {
  let isHandlingAll = false;
  const theme = useTheme();
  const isAllSelected = multiple && withAll && Array.isArray(selected) && selected.length === options.length;
  const selectRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (!isHandlingAll) {
      onChange(event.target.value as string | string[]);
    }
    isHandlingAll = false;
  };

  const handleChangeAll = () => {
    isHandlingAll = true;
    onChange(isAllSelected ? [] : options.map((option) => option.value));
  };

  const renderValue = (value: unknown): ReactNode => {
    if ((value as string | string[]).length === 0) return `${label}`;
    if (multiple) {
      const selectedOptions = (value as string[]).map((v) => options.find((option) => option.value === v));
      if (selectedOptions.length > 1 || (selectedOptions.length === 1 && alwaysNumberedLabel)) {
        return `${label} (${selectedOptions.length})`;
      }
      return selectedOptions[0]?.label;
    }
    return `${options.find((option: OptionItem) => option.value === value)?.label}`;
  };

  const isActive = (option: OptionItem) =>
    multiple ? (selected as (string | number)[]).includes(option.value) : selected === option.value;

  const onEnter = () => {
    if (selectRef.current !== null) {
      const menu = selectRef.current.querySelector('.MuiMenu-paper');
      if (menu !== null) {
        if (!isFixed && menu.parentElement !== null) {
          const diff =
            menu.parentElement.getBoundingClientRect().width - selectRef.current.getBoundingClientRect().width;
          menu.parentElement.style.left = `${-diff}px`;
        }
        menu.scrollTop > 0 &&
          menu.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' as ScrollBehavior,
          });
      }
    }
  };

  useEffect(() => {
    if (!isFixed && selectRef.current !== null) {
      const divRef = selectRef.current;

      const observer = new ResizeObserver(() => {
        const menu = divRef.querySelector('.MuiMenu-paper');
        if (menu !== null && menu.parentElement !== null) {
          const diff = menu.parentElement.getBoundingClientRect().width - divRef.getBoundingClientRect().width;
          menu.parentElement.style.left = `${-diff}px`;
        }
      });

      observer.observe(divRef);

      return () => {
        observer.unobserve(divRef);
      };
    }
  }, [isFixed]);

  return {
    theme,
    isAllSelected,
    selectRef,
    handleChange,
    handleChangeAll,
    renderValue,
    isActive,
    onEnter,
  };
}
