import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, styled, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import Ellipsis from 'public/assets/svg/ellipsis.svg';
import { useEffect, useId, useState } from 'react';
import CustomSheet from '../CustomSheet/CustomSheet';
import type { BreadcrumbItem } from './Breadcrumb';
import type { Theme } from '@mui/material';

interface DotsSegmentProps {
  items: BreadcrumbItem[];
  defaultOpen?: boolean; // to manage the menu in the stories
}

const DotsSegment: React.FC<DotsSegmentProps> = ({ items, defaultOpen = false }) => {
  const iconId = useId();
  const menuId = useId();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isMobileOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = defaultOpen || Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (defaultOpen) {
      // correctly set the menu in the stories
      setAnchorEl(document.getElementById(iconId));
    }
  }, [defaultOpen, iconId]);

  return (
    <>
      <Icon
        id={iconId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Ellipsis />
      </Icon>

      {isMobile ? (
        <CustomSheet
          isOpen={open}
          handleClose={handleClose}
          snapPoints={[64 + items.length * 34 + (items.length - 1) * 10, 0]}
          initialSnap={0}
        >
          <SheetContent>
            {[...items].reverse().map((item, index) => (
              <SheetItem key={index} onClick={handleClose} autoFocus={false} className={index === 0 ? 'active' : ''}>
                {index === 0 ? <span>{item.label}</span> : <Link href={item.href}>{item.label}</Link>}
              </SheetItem>
            ))}
          </SheetContent>
        </CustomSheet>
      ) : (
        <Popper open={open} anchorEl={anchorEl} role={undefined} placement="bottom-start" transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <PaperStyled>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={false}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    disablePadding={true}
                  >
                    {items.map((item, index) => (
                      <MenuItem key={index} onClick={handleClose} autoFocus={false}>
                        {isMobileOrTablet && index === items.length - 1 ? (
                          <span>{item.label}</span>
                        ) : (
                          <Link href={item.href}>{item.label}</Link>
                        )}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </PaperStyled>
            </Grow>
          )}
        </Popper>
      )}
    </>
  );
};

export default DotsSegment;

const Icon = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  padding: '0 4px',
  cursor: 'pointer',

  [theme.breakpoints.up('tablet_768')]: {
    background: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[900],

    '&:hover': {
      background: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800],

      '& svg path': {
        fill: theme.palette.isLight ? theme.palette.colors.charcoal[700] : theme.palette.colors.charcoal[400],
      },
    },
  },
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  background: theme.palette.isLight ? 'white' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,
  padding: 16,
  maxWidth: 273,
  minWidth: 200,

  '&.MuiPaper-rounded': {
    borderRadius: '12px!important',
  },

  '& .MuiList-root': {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 0,
    borderRadius: 12,
    background: theme.palette.isLight ? theme.palette.colors.gray[50] : '#373E4D4D',
    boxShadow: theme.fusionShadows.innerShadow,
    overflow: 'hidden',
    '& span, & a': {
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: 8,
    },
  },
  '& .MuiMenuItem-root': {
    padding: 0,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '17px',
    color: 'red',
    minHeight: 32,

    '& a, & span': {
      color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
    },

    '& a': {
      fontWeight: 400,
    },
    '&:hover': {
      background: theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(37, 42, 52, 0.2)',
    },
  },
}));

const SheetContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: '0 16px 32px',
  borderRadius: 12,
  boxShadow: theme.fusionShadows.innerShadow,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(55, 62, 77, 0.3)',
  overflow: 'hidden',
}));

const SheetItem = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '8px 7.5px',
  fontSize: 14,
  lineHeight: '17px',
  fontWeight: 400,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[100],
  width: '100%',

  '& a': {
    width: '100%',
  },

  '& span': {
    fontWeight: 600,
  },

  '&.active': {
    background: theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(37, 42, 52, 0.4)',
  },
}));
