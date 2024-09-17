import { styled } from '@mui/material';
import Magnifier from 'public/assets/svg/magnifying.svg';
import React, { useState } from 'react';
import type { SearchFilter } from '../FiltersBundle/types';

interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  placeholder: string;
  onChange?: (text: string) => void;
  className?: string;
  widthStyles?: SearchFilter['widthStyles'];
}

const Search: React.FC<SearchInputProps> = ({
  value,
  defaultValue,
  placeholder,
  onChange,

  className,
  widthStyles,
}) => {
  const [focus, setFocus] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };

  const handleOnFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = () => {
    setFocus(false);
  };

  return (
    <Container className={className} fullWidth={widthStyles?.fullWidth || false} width={widthStyles?.width || 97}>
      <InputWrapper>
        <IconWrapper>
          <Magnifier />
        </IconWrapper>

        <Input
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          id="search-input"
          onChange={handleChange}
          placeholder={focus ? '' : placeholder}
          value={value}
          defaultValue={defaultValue}
          autoComplete="off"
          name="search"
        />
      </InputWrapper>
    </Container>
  );
};

export default Search;

const Container = styled('div', { shouldForwardProp: (prop) => prop !== 'fullWidth' && prop !== 'width' })<{
  fullWidth: boolean;
  width: number;
}>(({ fullWidth, width }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 10,
  width: fullWidth ? '100%' : `${width}px`,
}));

const InputWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: 'min(100%, 290px)',
});

const Input = styled('input')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 16,
  flex: 1,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[300],
  outline: 'none',
  width: '100%',
  lineHeight: '24px',
  border: 'none',
  borderRadius: 8,
  padding: '4px 12px 4px 46px',
  boxSizing: 'border-box',
  transition: 'all .3s ease',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : '#21262F',
  '&::placeholder': {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[300],
  },
}));
const IconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 14,
  display: 'flex',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[200],
  width: 15,
  height: 15,
}));
