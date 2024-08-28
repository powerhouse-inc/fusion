import { Radio, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import SortAsListBase from './SortAsListBase';
import type { ColumnSort } from '../types';
import type { FC } from 'react';

interface CustomSelectProps {
  sort: ColumnSort;
  onClose: () => void;
}

const CustomSelect: FC<CustomSelectProps> = ({ sort, onClose }) => {
  const theme = useTheme();

  return (
    <SortAsListBase label={sort.label}>
      <Container>
        {sort.options?.map((option, index) => {
          const isActive = sort.selectedOption.value === option.value && sort.selectedOption.order === option.order;

          return (
            <Fragment key={`${option.variant}-${index}${index}`}>
              {sort.customOptionsRender !== undefined ? (
                sort.customOptionsRender(option, isActive, theme)
              ) : (
                <DivWithRadioOption
                  onClick={() => {
                    if (option.variant === 'radio') {
                      sort.onOptionChange(option);
                      onClose();
                    } else {
                      return undefined;
                    }
                  }}
                  isActive={isActive}
                  variant={option.variant}
                >
                  <OptionContent>
                    <OptionTitleContainer>
                      <OptionTitle isActive={option.variant === 'title'}>{option.label}</OptionTitle>
                    </OptionTitleContainer>
                  </OptionContent>
                  {option.variant === 'radio' && (
                    <StyledRadio
                      checked={isActive}
                      value={`${option.value}-${option.order}`}
                      name={`${sort.id}-radio`}
                      inputProps={{ 'aria-label': typeof option.label === 'string' ? option.label : '' }}
                      disableRipple
                      size="small"
                    />
                  )}
                </DivWithRadioOption>
              )}
            </Fragment>
          );
        })}
      </Container>
    </SortAsListBase>
  );
};

export default CustomSelect;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

const DivWithRadioOption = styled('div')<{ isActive: boolean; variant: string }>(({ theme, isActive, variant }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  padding: '5px 8px',
  cursor: 'default',

  ...(isActive && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : '#292E39',
  }),

  ...(variant === 'radio' && {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: isActive
        ? `${theme.palette.isLight ? 'rgba(243, 245, 247, 0.50)' : 'rgba(37, 42, 52, 0.20)'}`
        : `${theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(37, 42, 52, 0.40)'}`,
    },
  }),
}));

const OptionContent = styled('div')(() => ({
  display: 'flex',
  gap: 8,
  flex: '1 0 0',
}));

const OptionTitleContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: 4,
  flex: '1 0 0',
}));

const OptionTitle = styled('h4')<{ isActive: boolean }>(({ theme, isActive }) => ({
  width: '100%',
  margin: 0,
  fontWeight: isActive ? 600 : 400,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight
    ? theme.palette.colors.gray[900]
    : isActive
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.gray[300],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  width: 14,
  height: 14,
  padding: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  '&.Mui-checked': {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  },

  '& > span': {
    width: 14,
    height: 14,

    '& > svg': {
      width: 14,
      height: 14,
    },
  },
}));
