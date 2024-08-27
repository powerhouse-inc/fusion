import { Checkbox, Radio, styled, useTheme } from '@mui/material';
import AbsoluteCumulativeFilterOptionIcon from 'public/assets/svg/absolute_cumulative_filter_option.svg';
import RelativeCumulativeFilterOptionIcon from 'public/assets/svg/relative_cumulative_filter_option.svg';
import { Fragment } from 'react';
import FilterAsListBase from './FilterAsListBase';
import type { CheckboxFilter } from '../types';
import type { FC } from 'react';

interface CustomCheckboxProps {
  filter: CheckboxFilter;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ filter }) => {
  const theme = useTheme();

  return (
    <FilterAsListBase
      label={filter.label}
      element={
        <StyledCheckbox
          checked={filter.selected}
          inputProps={{ 'aria-label': 'Cumulative Checkbox' }}
          disableRipple
          size="small"
        />
      }
      filter={filter}
    >
      <Container>
        {filter.options?.map((option, index) => {
          const isActive = filter.selected && filter.selectedOptionValue === option.value;

          return (
            <Fragment key={`${option.value}-${index}`}>
              {filter.customOptionsRender !== undefined ? (
                filter.customOptionsRender(option, isActive, theme)
              ) : (
                <DivWithRadioOption
                  onClick={() => {
                    filter.selected && filter.onOptionChange !== undefined && filter.onOptionChange(option.value);
                  }}
                  isActive={isActive}
                >
                  <OptionContent>
                    {/* For other filters, add more icons here if necessary */}
                    {filter.id === 'cumulative' && option.value === 'relative' && (
                      <CumulativeOptionIcon as={RelativeCumulativeFilterOptionIcon} />
                    )}
                    {filter.id === 'cumulative' && option.value === 'absolute' && (
                      <CumulativeOptionIcon as={AbsoluteCumulativeFilterOptionIcon} />
                    )}

                    <OptionTitleContainer>
                      <OptionTitle isActive={isActive}>{option.label}</OptionTitle>
                      <OptionDescription>{option.description ?? ''}</OptionDescription>
                    </OptionTitleContainer>
                  </OptionContent>
                  <StyledRadio
                    checked={isActive}
                    value={option.value}
                    name={`${filter.id}-radio`}
                    inputProps={{ 'aria-label': typeof option.label === 'string' ? option.label : '' }}
                    disableRipple
                    size="small"
                  />
                </DivWithRadioOption>
              )}
            </Fragment>
          );
        })}
      </Container>
    </FilterAsListBase>
  );
};

export default CustomCheckbox;

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  width: 16,
  height: 16,
  padding: 0,
  borderRadius: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  '&.Mui-checked': {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  },

  '& > svg': {
    width: 16,
    height: 16,
  },
}));

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

const DivWithRadioOption = styled('div')<{ isActive: boolean }>(({ theme, isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  padding: 8,
  cursor: 'pointer',

  ...(isActive && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : '#292E39',
  }),

  '&:hover': {
    backgroundColor: isActive
      ? `${theme.palette.isLight ? 'rgba(243, 245, 247, 0.50)' : 'rgba(37, 42, 52, 0.20)'}`
      : `${theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(37, 42, 52, 0.40)'}`,
  },
}));

const OptionContent = styled('div')(() => ({
  display: 'flex',
  gap: 8,
  flex: '1 0 0',
}));

const CumulativeOptionIcon = styled('div')(({ theme }) => ({
  width: 17,
  height: 17,

  '& > path:first-of-type': {
    stroke: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[300],
  },

  '& > path:last-of-type': {
    stroke: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  },
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
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const OptionDescription = styled('span')(({ theme }) => ({
  width: '100%',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  width: 16,
  height: 16,
  padding: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  '&.Mui-checked': {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  },

  '& > span': {
    width: 16,
    height: 16,

    '& > svg': {
      width: 16,
      height: 16,
    },
  },
}));
