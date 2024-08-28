import { styled } from '@mui/material';
import { useEffect, useId, useState } from 'react';
import type { AnalyticMetric } from '@/core/models/interfaces/analytic';

const FILTERS: {
  label: string;
  value: AnalyticMetric;
}[] = [
  {
    label: 'Budget',
    value: 'Budget',
  },
  {
    label: 'Forecast',
    value: 'Forecast',
  },
  {
    label: 'Net Protocol Outflow',
    value: 'ProtocolNetOutflow',
  },
  {
    label: 'Net Expenses On-Chain',
    value: 'PaymentsOnChain',
  },
  {
    label: 'Actuals',
    value: 'Actuals',
  },
];

interface FilterTabsProps {
  selectedMetric: AnalyticMetric;
  onChangeTab: (metric: AnalyticMetric) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ selectedMetric, onChangeTab }) => {
  const id = useId();
  const [hasSmoke, setHasSmoke] = useState<[boolean, boolean]>([false, false]);

  useEffect(() => {
    const tab = document.getElementById(id);
    if (!tab) return;

    const handleScroll = () => {
      const hasLeft = tab.scrollLeft > 8;
      const hasRight = tab.scrollWidth - tab.scrollLeft - tab.clientWidth > 8;

      setHasSmoke([hasLeft, hasRight]);
    };

    tab.onscroll = handleScroll;
    handleScroll();

    return () => {
      tab.onscroll = null;
    };
  }, [id]);

  return (
    <Wrapper className="no-select" hasSmokeLeft={hasSmoke[0]} hasSmokeRight={hasSmoke[1]}>
      <TabContainer id={id}>
        {FILTERS.map((tab) => (
          <Tab key={tab.value} onClick={() => onChangeTab(tab.value)} active={tab.value === selectedMetric}>
            {tab.label}
          </Tab>
        ))}
      </TabContainer>
    </Wrapper>
  );
};

export default FilterTabs;

const Wrapper = styled('div')<{ hasSmokeLeft: boolean; hasSmokeRight: boolean }>(
  ({ theme, hasSmokeLeft, hasSmokeRight }) => ({
    background: theme.palette.isLight ? theme.palette.colors.gray[50] : '#232832',
    overflow: 'hidden',
    borderRadius: '12px 12px 0px 0px',
    position: 'relative',
    maxWidth: '100%',
    boxShadow: theme.palette.isLight
      ? '1px 0px 15px 0px rgba(117, 117, 117, 0.15)'
      : '4px 0px 12.3px 0px rgba(23, 24, 29, 0.30)',

    ...(hasSmokeLeft && {
      '&::before': {
        pointerEvents: 'none',
        touchAction: 'none',
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 59,
        height: '100%',
        background: theme.palette.isLight
          ? 'linear-gradient(90deg, #FCFCFC 21.24%, rgba(252, 252, 252, 0.00) 100%)'
          : 'linear-gradient(90deg, #232832 21.24%, rgba(252, 252, 252, 0.00) 100%)',
      },
    }),

    ...(hasSmokeRight && {
      '&::after': {
        pointerEvents: 'none',
        touchAction: 'none',
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: 59,
        height: '100%',
        background: theme.palette.isLight
          ? 'linear-gradient(270deg, #FCFCFC 21.24%, rgba(252, 252, 252, 0.00) 100%)'
          : 'linear-gradient(270deg, #232832 21.24%, rgba(252, 252, 252, 0.00) 100%)',
      },
    }),

    [theme.breakpoints.up('tablet_768')]: {
      minWidth: 192,
      borderRadius: '12px 0px 0px 12px',
    },
  })
);

const TabContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  overflowX: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'column',
    gap: 8,
    padding: '14px 0',
    minWidth: 192,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 205,
    gap: 5,
  },
}));

const Tab = styled('div')<{ active: boolean }>(({ theme, active }) => ({
  fontSize: 12,
  fontWeight: active ? 700 : 500,
  lineHeight: active ? '18px' : '22px',
  color: active
    ? theme.palette.isLight
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.slate[50]
    : theme.palette.isLight
    ? theme.palette.colors.gray[500]
    : theme.palette.colors.slate[400],
  background: active
    ? theme.palette.isLight
      ? theme.palette.colors.slate[50]
      : theme.palette.colors.charcoal[900]
    : 'transparent',
  whiteSpace: 'nowrap',
  padding: `8px 8px ${active ? 8 : 4}px`,
  cursor: 'pointer',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '0 24px',
    lineHeight: '22px',
    position: 'relative',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 4,
      height: '100%',
      borderRadius: '0px 4px 4px 0px',
      background: active
        ? theme.palette.isLight
          ? theme.palette.colors.gray[900]
          : theme.palette.colors.charcoal[700]
        : 'transparent',
    },

    '&:hover': {
      background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900],

      '&:before': {
        background: theme.palette.isLight ? theme.palette.colors.gray[400] : '#323740',
      },
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    lineHeight: '22px',
    padding: '2px 16px 2px 24px',
  },
}));
