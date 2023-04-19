import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { Close } from '../svg/close';
import Magnifier from '../svg/magnifier';
import type { CSSProperties } from 'react';
interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  placeholder: string;
  onChange?: (text: string) => void;
  style?: CSSProperties;
  handleClearSearch?: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  small?: boolean;
}

export const SearchInput = (props: SearchInputProps) => {
  const { isLight } = useThemeContext();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(event.target.value);
  };

  const isDesktop = useMediaQuery('(min-width: 834px)');

  const [focus, setFocus] = useState(false);

  return (
    <Container style={props.style}>
      <InputWrapper>
        <Input
          ref={props.inputRef}
          isLight={isLight}
          id="search-input"
          onChange={handleChange}
          placeholder={props.placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          focus={focus || !!props.value}
          value={props.value}
          defaultValue={props.defaultValue}
          small={props.small}
          autoComplete="off"
        />
        <IconWrapper>
          {focus || !!props.value || !!props.defaultValue ? (
            <Close
              onClick={props.handleClearSearch}
              width={10}
              height={10}
              fill="#25273D"
              fillDark="rgb(237, 239, 255)"
            />
          ) : (
            <Magnifier
              fill={isLight ? '#25273D' : '#ADAFD4'}
              width={isDesktop ? 16 : 10}
              height={isDesktop ? 16 : 10}
            />
          )}
        </IconWrapper>
      </InputWrapper>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
});

const InputWrapper = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: 'min(100%, 330px)',
});

const Input = styled.input<{ focus: boolean; isLight: boolean; small?: boolean }>(({ focus, isLight, small }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  flex: 1,
  color: isLight ? '#25273D' : '#FFFFFF',
  outline: 'none',
  width: '100%',
  height: '34px',
  border:
    isLight && focus
      ? '1px solid #231536'
      : isLight && !focus
      ? '1px solid #D4D9E1'
      : !isLight && focus
      ? '1px solid #787A9B'
      : '1px solid #343442',
  borderRadius: '22px',
  padding: '15px 45px 15px 16px',
  boxSizing: 'border-box',
  transition: 'all .3s ease',
  backgroundColor: isLight ? '#FFFFFF' : '#10191F',
  '&::placeholder': {
    color: isLight ? '#B0BCC0' : '#D2D4EF',
  },
  '@media (min-width: 834px)': !small
    ? {
        width: '320px',
        height: '48px',
        fontSize: '14px',
      }
    : undefined,
}));

const IconWrapper = styled.div({
  position: 'absolute',
  right: '22px',
  display: 'flex',
});