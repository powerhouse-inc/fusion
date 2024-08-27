import { styled } from '@mui/material';
import React from 'react';
import { replaceAllNumberLetOneBeforeDot } from '@/core/utils/string';
import type { BreakdownChartSeriesData } from '@/views/Finances/utils/types';
import { formatBudgetName, removeBudgetWord } from '@/views/Finances/utils/utils';
import type { FC } from 'react';

interface Props {
  element: BreakdownChartSeriesData;
  onLegendItemHover: (legendName: string) => void;
  onLegendItemLeave: (legendName: string) => void;
  handleToggleSeries: (series: string) => void;
  className?: string;
  index: number;
  showLegendValue?: boolean;
}

const LegendItemBreakDownChart: FC<Props> = ({
  element,
  onLegendItemHover,
  onLegendItemLeave,
  handleToggleSeries,
  index,
  className,
  showLegendValue = true,
}) => (
  <Container
    className={className}
    onMouseEnter={() => onLegendItemHover(element.name ?? '')}
    onMouseLeave={() => onLegendItemLeave(element.name ?? '')}
    onClick={() => handleToggleSeries(element.name ?? '')}
  >
    <SVGContainer>
      <SvgStyled xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" fill="none">
        <circle cx="6.5" cy="6.5" r="5.5" stroke={element.itemStyle.colorOriginal} />
        <circle cx="6.5" cy="6.5" r="4" fill={element.itemStyle.colorOriginal} />
      </SvgStyled>
    </SVGContainer>
    <Name>{removeBudgetWord(formatBudgetName(element.name))}</Name>

    {showLegendValue && <Value>{replaceAllNumberLetOneBeforeDot(element?.data[index]?.value ?? 0, true)}</Value>}
  </Container>
);

export default LegendItemBreakDownChart;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: 8,
  alignItems: 'center',
  cursor: 'pointer',
  width: 'fit-content',
  height: 'fit-content',
}));

const SVGContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const SvgStyled = styled('svg')(({ theme }) => ({
  width: 12,
  height: 12,
  [theme.breakpoints.up('tablet_768')]: {
    width: 16,
    height: 16,
  },
}));
const Name = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.slate[50],

  textAlign: 'center',
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: '22px',
    width: 212,
    textAlign: 'start',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    lineHeight: '24px',
    width: 250,
  },
}));

const Value = styled('div')(({ theme }) => ({
  color: theme.palette.colors.slate[200],
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '18px',
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));
