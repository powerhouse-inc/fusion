import { ClickAwayListener, Grow, Paper, Popper, styled, useMediaQuery, useTheme } from '@mui/material';
import CheckOnComponent from '@ses/components/svg/check-on-new';
import CheckboxOff from '@ses/components/svg/checkbox-off';
import { SelectChevronDown } from '@ses/components/svg/select-chevron-down';
import { useState, useRef } from 'react';
import CumulativeSelectItem from './CumulativeSelectItem';
import type { CumulativeFilter } from '../../types';
import type { Theme } from '@mui/material';

interface CumulativeFilterProps {
  filter: CumulativeFilter;
}

const CumulativeFilterComponent: React.FC<CumulativeFilterProps> = ({ filter }) => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const anchorRef = useRef(null);

  const handleOpenMenu = () => {
    if (filter.isCumulative) {
      setOpen((prev) => !prev);
    }
  };

  const getButtonText = () => {
    if (!filter.isCumulative) return 'Cumulative';
    if (isTablet) {
      return filter.cumulativeType === 'relative' ? 'Relative ' : 'Absolute';
    } else {
      return filter.cumulativeType === 'relative' ? 'Relative Cumulative' : 'Absolute Cumulative';
    }
  };
  return (
    <Container>
      <SelectBtn>
        <CheckBtn onClick={filter.handleToggleCumulative}>
          {filter.isCumulative ? (
            <CheckOnComponent fill="#343839" fillDark="#D7D8D9" width={12} height={12} />
          ) : (
            <CheckboxOff fill="#343839" fillDark="#D7D8D9" width={12} height={12} />
          )}
        </CheckBtn>
        {getButtonText()}
        <MenuBtn isActive={filter.isCumulative} onClick={handleOpenMenu} ref={anchorRef}>
          <StyledSelectChevronDown
            isOpen={open}
            fill={isLight ? (filter.isCumulative ? '#25273D' : '#BEBFC5') : filter.isCumulative ? '#D7D8D9' : '#48495F'}
          />
        </MenuBtn>
      </SelectBtn>

      <DesktopPopper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : placement === 'bottom-end' ? 'right top' : 'left bottom',
            }}
          >
            <CustomPaper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <ItemsContainer>
                  <CumulativeSelectItem
                    onClick={() => filter.handleChangeCumulativeType('relative')}
                    type="relative"
                    selected={filter.cumulativeType === 'relative'}
                  />

                  <CumulativeSelectItem
                    onClick={() => filter.handleChangeCumulativeType('absolute')}
                    type="absolute"
                    selected={filter.cumulativeType === 'absolute'}
                  />
                </ItemsContainer>
              </ClickAwayListener>
            </CustomPaper>
          </Grow>
        )}
      </DesktopPopper>
    </Container>
  );
};

export default CumulativeFilterComponent;

const SelectBtn = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontWeight: 600,
  background: theme.palette.mode === 'light' ? '#ffffff' : '#10191F',
  padding: '4px 8px',
  outline: 'none',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[800],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.charcoal[700]}`,
  borderRadius: 8,
  color: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.gray[300],
  height: 32,

  lineHeight: '24px',
  letterSpacing: '-0.32px',
}));

const CheckBtn = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  cursor: 'pointer',
}));

const MenuBtn = styled('div')<{ isActive: boolean }>(({ isActive, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 24,
  paddingLeft: 8,
  cursor: isActive ? 'pointer' : 'auto',

  borderLeft: `1px solid ${theme.palette.mode === 'light' ? '#D4D9E1' : '#787A9B'}`,
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  width: 282,
  bgcolor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#2b303b',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#2b303b',
  borderRadius: 6,
  overflow: 'hidden',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  marginTop: 8,
}));

const StyledSelectChevronDown = styled(SelectChevronDown)<{ isOpen: boolean }>(({ isOpen }) => ({
  transform: isOpen ? 'scaleY(-1)' : 'scaleY(1)',
}));

const Container = styled('div')({
  position: 'relative',
});

const DesktopPopper = styled(Popper)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'block',
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#2b303b',
    bgcolor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#2b303b',
    overflow: 'hidden',
    '&.MuiPopper-root': {
      overflow: 'hidden',
      borderRadius: 12,
    },
  },
}));

const ItemsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#2b303b',
}));
