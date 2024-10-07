import styled from '@emotion/styled';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { ThreeDots } from '../../svg/three-dots';
import MenuItemTheme from './MenuItemTheme';
import useMenuThemeMVVM from './useMenuTheme';
import type { ThemeType } from '../../../../core/enums/themeEnum';

interface Props {
  themeMode: ThemeType;
  toggleTheme: () => void;
}

export const MenuPaperStyle = (isLight: boolean) => ({
  background: isLight ? '#FFFFFF' : ' #000A13',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
});

const MenuTheme = ({ themeMode, toggleTheme }: Props) => {
  const { isLight, anchorEl, handleClick, open, handleClose } = useMenuThemeMVVM();

  return (
    <>
      <ThreeDotsButton
        isLight={isLight}
        onClick={handleClick}
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {<ThreeDots fill="#231536" fillDark="#EDEFFF" />}
      </ThreeDotsButton>
      <Menu
        PaperProps={{
          style: MenuPaperStyle(isLight),
        }}
        sx={{
          '& .MuiMenu-list': {
            paddingTop: '0px',
            paddingBottom: '0px',
          },
        }}
        disableScrollLock={true}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          onMouseLeave={handleClose}
          disableTouchRipple={true}
          disableGutters={true}
          sx={{
            paddingBottom: '16px',
            paddingTop: '0px',
            '&:hover': {
              background: 'none',
              cursor: 'default',
            },
            '&:last-of-type': {
              paddingBottom: '0px',
            },
          }}
          style={{
            backgroundColor: isLight ? '#FFFFFF' : ' #000A13',
          }}
        >
          <MenuItemTheme themeMode={themeMode} toggleTheme={toggleTheme} />
        </MenuItem>
      </Menu>
    </>
  );
};

const ThreeDotsButton = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35px',
  height: '35px',
  background: isLight ? 'white' : 'transparent',
  boxSizing: 'border-box',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #31424E;',
  borderRadius: '50%',
  cursor: 'pointer',
}));

export default MenuTheme;
