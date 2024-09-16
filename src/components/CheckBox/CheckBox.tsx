import { IconButton, styled, useTheme } from '@mui/material';
import CheckOnComponent from '@ses/components/svg/check-on-new';
import CheckboxOff from '@ses/components/svg/checkbox-off';
import type { FC } from 'react';

interface CheckBoxProps {
  label: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

const CheckBox: FC<CheckBoxProps> = ({ label, isChecked, setIsChecked }) => {
  const theme = useTheme();
  const handleClick = () => {
    setIsChecked(isChecked);
  };

  return (
    <Container onClick={handleClick}>
      <IconButton
        sx={{
          padding: 0,
        }}
        disableRipple
      >
        {isChecked ? (
          <CheckOnComponent
            fill={theme.palette.colors.sky[1000]}
            fillDark={theme.palette.colors.sky[1000]}
            width={12}
            height={12}
          />
        ) : (
          <CheckboxOff
            fill={theme.palette.colors.slate[200]}
            fillDark={theme.palette.colors.slate[300]}
            width={12}
            height={12}
          />
        )}
      </IconButton>
      <StyledLabel isChecked={isChecked}>{label}</StyledLabel>
    </Container>
  );
};

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const StyledLabel = styled('span')<{ isChecked: boolean }>(({ isChecked, theme }) => ({
  marginLeft: 7,
  fontFamily: 'Inter, sans-serif',
  fontWeight: isChecked ? 600 : 500,
  fontSize: '14px',
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

export default CheckBox;
