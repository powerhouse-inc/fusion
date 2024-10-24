import { ExpandMore, Check } from '@mui/icons-material';
import { Select, MenuItem, FormControl, styled, Box, Typography } from '@mui/material';
import deepmerge from '@mui/utils/deepmerge';
import useCustomSelect from './useCustomSelect';
import type { CustomSelectProps } from './type';
import type { MenuProps, Theme } from '@mui/material';
import type { CSSProperties } from 'react';

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  onChange,
  selected,
  customOptionsRender,
  withAll = false,
  customOptionsRenderAll,
  multiple = false,
  alwaysNumberedLabel = false,
  style,
  notShowDescription = true,
  menuProps,
  className,
  isFixed = false,
}) => {
  const { theme, isAllSelected, selectRef, handleChange, handleChangeAll, renderValue, isActive, onEnter } =
    useCustomSelect({
      label,
      options,
      multiple,
      alwaysNumberedLabel,
      selected,
      withAll,
      isFixed,
      onChange,
    });

  const combinedMenuProps = deepmerge(
    StyledMenuProps(theme, style?.menuWidth ?? 200, style?.height || 'fit-content', isFixed),
    {
      TransitionProps: { onEnter },
      ...menuProps,
    }
  );

  return (
    <Container>
      <StyledFormControl
        variant="outlined"
        fullWidth={style?.fullWidth || false}
        width={style?.width || 97}
        maxWidth={style?.maxWidth}
        className={className}
      >
        <StyledSelect
          ref={selectRef}
          displayEmpty
          multiple={multiple}
          value={selected}
          onChange={handleChange}
          renderValue={renderValue}
          IconComponent={ExpandMore}
          className={className}
          MenuProps={combinedMenuProps as unknown as Partial<MenuProps>}
        >
          {notShowDescription && (
            <MenuItemLabel disabled>
              <MenuItemLabelTypography>{typeof label === 'string' ? label : label()}</MenuItemLabelTypography>
            </MenuItemLabel>
          )}

          {withAll && (
            <MenuItemDefault
              borderTop={true}
              borderBottom={false}
              onClick={handleChangeAll}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {(customOptionsRenderAll && customOptionsRenderAll(isAllSelected || false, theme)) || 'Select All'}
              {multiple && <CheckIcon className={`check ${isAllSelected ? 'active' : ''}`} />}
            </MenuItemDefault>
          )}
          {options.map((option, index) => (
            <MenuItemDefault
              borderTop={!withAll && index === 0}
              borderBottom={index === options.length - 1}
              key={option.value}
              value={option.value}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box display="flex" alignItems="center">
                {customOptionsRender ? (
                  customOptionsRender(option, isActive(option), theme)
                ) : (
                  <MenuItemTypography active={isActive(option)}>{option.label}</MenuItemTypography>
                )}
              </Box>
              {multiple && <CheckIcon className={`check ${isActive(option) ? 'active' : ''}`} />}
            </MenuItemDefault>
          ))}
        </StyledSelect>
      </StyledFormControl>
    </Container>
  );
};

export default CustomSelect;

const Container = styled('div')({
  position: 'relative',
});

const StyledFormControl = styled(FormControl, {
  shouldForwardProp: (prop) => !['maxWidth', 'fullWidth', 'width'].includes(prop as string),
})<{
  fullWidth: boolean;
  width: CSSProperties['width'];
  maxWidth: CSSProperties['maxWidth'];
}>(({ fullWidth, width, maxWidth }) => ({
  width: fullWidth ? '100%' : `${width}px`,
  ...(maxWidth !== undefined && {
    maxWidth,
  }),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[800],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.charcoal[700]}`,
  borderRadius: 8,
  color: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.gray[300],
  height: '32px',
  fontWeight: 600,
  padding: '0 2px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover': {
    color: theme.palette.isLight ? theme.palette.colors.gray[800] : theme.palette.colors.gray[100],
    border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[400] : theme.palette.colors.charcoal[600]}`,
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[700],
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiSelect-icon': {
    marginRight: 4,
    color: theme.palette.isLight ? '#404446' : '#EFEFEF',
  },
}));

const MenuItemLabel = styled(MenuItem)({
  minHeight: 12,
  marginTop: -40,
  position: 'absolute',
  top: 0,
  left: 0,

  '&.Mui-disabled': {
    opacity: 1,
  },
});

const MenuItemDefault = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'borderTop' && prop !== 'borderBottom',
})<{ borderTop: boolean; borderBottom: boolean }>(({ theme, borderTop, borderBottom }) => ({
  borderTopLeftRadius: borderTop ? 12 : 0,
  borderTopRightRadius: borderTop ? 12 : 0,
  borderBottomLeftRadius: borderBottom ? 12 : 0,
  borderBottomRightRadius: borderBottom ? 12 : 0,
  backgroundColor: 'transparent !important',
  minHeight: 32,
  margin: '4px 0',

  '& .check path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.charcoal[800],
  },
  '&:hover .check path': {
    fill: theme.palette.colors.gray[500],
  },
  '& .check.active path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  },
}));

const MenuItemTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[600] : theme.palette.colors.gray[50],
  fontSize: '14px',
  fontWeight: active ? 600 : 400,
  lineHeight: '22px',
  marginLeft: '-8px',
}));

const MenuItemLabelTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[600] : theme.palette.colors.slate[50],
  fontSize: '14px',
  fontWeight: 700,
  lineHeight: '22px',
  marginLeft: '-8px',
}));

const CheckIcon = styled(Check)(() => ({
  width: 16,
  height: 16,
}));

const StyledMenuProps = (theme: Theme, width: number, height: string | number, isFixed: boolean) => ({
  PaperProps: {
    sx: {
      ...(!isFixed && {
        position: 'static',
        maxWidth: '100%',
        maxHeight: '100%',
        minHeight: height,
      }),
      height,
      width: `${width}px`,
      color: '#000',
      backgroundImage: 'none',
      bgcolor: theme.palette.isLight ? '#ffffff' : theme.palette.colors.charcoal[900],
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',

      '&.MuiPaper-elevation.MuiPaper-rounded': {
        borderRadius: '12px !important',
      },

      '& .MuiMenu-list': {
        position: 'relative',
        borderRadius: '12px',
        bgcolor: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(55, 62, 77, 0.30)',
        margin: '50px 8px 8px',
        padding: 0,
      },

      '& .MuiMenuItem-root': {
        '&.Mui-selected': {
          bgcolor: `${theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(37, 42, 52, 0.40)'} !important`,
          '&:hover': {
            '.MuiTypography-root': {
              fontWeight: 600,
              color: `${
                theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50]
              } !important`,
            },
            bgcolor: `${theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(37, 42, 52, 0.40)'} !important`,
          },
        },

        '&:hover': {
          '.MuiTypography-root': {
            fontWeight: 600,
            color: theme.palette.colors.gray[500],
          },
          bgcolor: `${theme.palette.isLight ? 'rgba(243, 245, 247, 0.50)' : 'rgba(37, 42, 52, 0.20)'} !important`,
        },
      },
      // Add this style for scroll in case fix height props are passed
      '&::-webkit-scrollbar': {
        width: 4,
        marginLeft: 4,
        borderRadius: 12,
      },
      '&::-webkit-scrollbar-thumb': {
        background: theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[700],
        borderRadius: 12,
        height: 16,
      },
    },
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  /* Prevent jumps when open/close the dropdown. This has accessibility implications that are recommended to be addressed in the future. */
  disableAutoFocus: true,
  MenuListProps: {
    autoFocusItem: false,
  },
  sx: {
    ...(!isFixed && {
      position: 'absolute',
      top: 32,
      width: 'fit-content',
      height: 'fit-content',
    }),
    cursor: 'default',
  },
});
