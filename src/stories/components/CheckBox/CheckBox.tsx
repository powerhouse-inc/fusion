import { styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import CheckOnComponent from '../svg/check-on-new';
import CheckboxOff from '../svg/checkbox-off';

interface Props {
  label: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

const CheckBox = ({ label, isChecked, setIsChecked }: Props) => {
  const handleClick = () => {
    setIsChecked(isChecked);
  };
  return (
    <Container>
      <IconButton
        onClick={handleClick}
        sx={{
          padding: '0px',
        }}
      >
        {isChecked ? (
          <CheckOnComponent fill="#504DFF" fillDark="#504DFF" width={12} height={12} />
        ) : (
          <CheckboxOff fill="#6F7A85" fillDark="#5B646D" width={12} height={12} />
        )}
      </IconButton>
      <StyleLabel isChecked={isChecked} onClick={handleClick}>
        {label}
      </StyleLabel>
    </Container>
  );
};

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const StyleLabel = styled('span')<{ isChecked: boolean }>(({ isChecked, theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: ' normal',
  fontWeight: isChecked ? 600 : 500,
  fontSize: '14px',
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  display: 'inline-block',
  marginLeft: '10px',
  cursor: 'pointer',
}));

export default CheckBox;
