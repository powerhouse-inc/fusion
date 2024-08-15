import { styled } from '@mui/material';
import React from 'react';
import type { BreakdownChartSeriesData } from '@/views/Finances/utils/types';
import { formatBudgetName, removeBudgetWord } from '@/views/Finances/utils/utils';
import type { FC } from 'react';

interface Props {
  key: React.Key;
  element: BreakdownChartSeriesData;
  onLegendItemHover: (legendName: string) => void;
  onLegendItemLeave: (legendName: string) => void;
  handleToggleSeries: (series: string) => void;
  className?: string;
}

const LegendItemBreakDownChart: FC<Props> = ({
  key,
  element,
  onLegendItemHover,
  onLegendItemLeave,
  handleToggleSeries,
  className,
}) => (
  <Container
    className={className}
    key={key}
    onMouseEnter={() => onLegendItemHover(element.name)}
    onMouseLeave={() => onLegendItemLeave(element.name)}
    onClick={() => handleToggleSeries(element.name)}
  >
    <SVGContainer>
      <SvgStyled xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" fill="none">
        <circle cx="6.5" cy="6.5" r="5.5" stroke={element.itemStyle.colorOriginal} />
        <circle cx="6.5" cy="6.5" r="4" fill={element.itemStyle.colorOriginal} />
      </SvgStyled>
    </SVGContainer>
    <Name>{removeBudgetWord(formatBudgetName(element.name))}</Name>

    <Value>1.79 M</Value>
  </Container>
);

export default LegendItemBreakDownChart;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: 8,
  alignItems: 'center',
  cursor: 'pointer',
  height: 'fit-content',
  [theme.breakpoints.up('tablet_768')]: {
    margin: '0 auto',
  },
}));

const SVGContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const SvgStyled = styled('svg')(({ theme }) => ({
  width: 13,
  height: 13,
  [theme.breakpoints.up('tablet_768')]: {
    width: 16,
    height: 16,
  },
}));
const Name = styled('div')(({ theme }) => ({
  fontSize: 16,
  lineHeight: '18px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : 'red',

  textAlign: 'center',
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    gap: 8,
    lineHeight: '22px',
  },
}));

const Value = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[200] : 'red',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '18px',
}));
