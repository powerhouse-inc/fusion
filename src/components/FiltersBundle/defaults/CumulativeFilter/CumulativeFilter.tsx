import { ClickAwayListener, Grow, Paper, Popper, styled } from '@mui/material';
import CheckOnComponent from '@ses/components/svg/check-on-new';
import CheckboxOff from '@ses/components/svg/checkbox-off';
import { SelectChevronDown } from '@ses/components/svg/select-chevron-down';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useState, useRef } from 'react';
import CumulativeSelectItem from './CumulativeSelectItem';
import type { CumulativeFilter } from '../../types';

interface CumulativeFilterProps {
  filter: CumulativeFilter;
}

const CumulativeFilterComponent: React.FC<CumulativeFilterProps> = ({ filter }) => {
  const { isLight } = useThemeContext();
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef(null);

  const handleOpenMenu = () => {
    if (filter.isCumulative) {
      setOpen((prev) => !prev);
    }
  };
  // TODO: Add this change as improvement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getButtonText = () => {
    if (!filter.isCumulative) return 'Cumulative';
    return filter.cumulativeType === 'relative' ? 'Relative Cumulative' : 'Absolute Cumulative';
  };
  return (
    <Container>
      <SelectBtn>
        <CheckBtn onClick={filter.handleToggleCumulative}>
          {filter.isCumulative ? (
            <CheckOnComponent fill="#25273D" fillDark="#D2D4EF" width={12} height={12} />
          ) : (
            <CheckboxOff fill="#25273D" fillDark="#D2D4EF" width={12} height={12} />
          )}
        </CheckBtn>
        Cumulative{' '}
        <MenuBtn isActive={filter.isCumulative} onClick={handleOpenMenu} ref={anchorRef}>
          <StyledSelectChevronDown
            isOpen={open}
            fill={isLight ? (filter.isCumulative ? '#25273D' : '#BEBFC5') : filter.isCumulative ? '#B7A6CD' : '#48495F'}
          />
        </MenuBtn>
      </SelectBtn>

      {filter.isCumulative && (
        <MobileItems>
          <CumulativeSelectItem
            onClick={() => filter.handleChangeCumulativeType('relative')}
            type="relative"
            selected={filter.cumulativeType === 'relative'}
          />
          <Divider />
          <CumulativeSelectItem
            onClick={() => filter.handleChangeCumulativeType('absolute')}
            type="absolute"
            selected={filter.cumulativeType === 'absolute'}
          />
        </MobileItems>
      )}

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
                <div>
                  <CumulativeSelectItem
                    onClick={() => filter.handleChangeCumulativeType('relative')}
                    type="relative"
                    selected={filter.cumulativeType === 'relative'}
                  />
                  <Divider />
                  <CumulativeSelectItem
                    onClick={() => filter.handleChangeCumulativeType('absolute')}
                    type="absolute"
                    selected={filter.cumulativeType === 'absolute'}
                  />
                </div>
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
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 600,
  background: theme.palette.mode === 'light' ? '#ffffff' : '#10191F',
  padding: '7px 0 7px 16px',
  outline: 'none',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[800],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.charcoal[700]}`,
  borderRadius: 8,
  color: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.gray[300],
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
  height: 18,
  paddingLeft: 11,
  paddingRight: 16,
  cursor: isActive ? 'pointer' : 'auto',
  borderLeft: `1px solid ${theme.palette.mode === 'light' ? '#D4D9E1' : '#787A9B'}`,
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  width: 282,

  bgcolor: theme.palette.isLight ? '#ffffff' : theme.palette.colors.charcoal[900],
  backgroundColor: theme.palette.isLight ? '#ffffff' : theme.palette.colors.charcoal[900],
  borderRadius: 6,
  overflow: 'hidden',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  marginTop: 9,
}));

const Divider = styled('div')(() => ({
  height: 1,
  width: '100%',
  background: '#D4D9E1',
}));

const StyledSelectChevronDown = styled(SelectChevronDown)<{ isOpen: boolean }>(({ isOpen }) => ({
  transform: isOpen ? 'scaleY(-1)' : 'scaleY(1)',
}));

const Container = styled('div')({
  position: 'relative',
});

const MobileItems = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('tablet_768')]: {
    display: 'block',
    marginTop: 8,
  },
}));

const DesktopPopper = styled(Popper)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'block',
  },
}));
