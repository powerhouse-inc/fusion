import { styled, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CheckOnComponent from '../svg/check-on-new';
import CheckboxOff from '../svg/checkbox-off';
import type { FC } from 'react';

interface Props {
  label: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

const CheckBox: FC<Props> = ({ label, isChecked, setIsChecked }) => {
  const theme = useTheme();
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
