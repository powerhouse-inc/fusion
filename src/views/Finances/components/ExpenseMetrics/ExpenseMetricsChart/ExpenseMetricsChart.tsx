import { styled, useMediaQuery, useTheme } from '@mui/material';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import ReactECharts from 'echarts-for-react';
import { useRef } from 'react';
import { usLocalizedNumber } from '@/core/utils/humanization';
import type { BarChartSeries, LineChartSeriesData } from '@/views/Finances/utils/types';
import {
  formatBudgetName,
  formatterBreakdownChart,
  getChartAxisLabelByGranularity,
  removeBudgetWord,
  getMonthAbbreviationToolTip,
} from '@/views/Finances/utils/utils';
import type { CumulativeType } from '../useExpenseMetrics';
import type { Theme } from '@mui/material';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { EChartsOption } from 'echarts-for-react';
import type { FC } from 'react';

interface ExpenseMetricsChartProps {
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: LineChartSeriesData[];
  handleToggleSeries: (series: string) => void;
  isCumulative: boolean;
  cumulativeType: CumulativeType;
}

const ExpenseMetricsChart: FC<ExpenseMetricsChartProps> = ({
  year,
  selectedGranularity,
  series,
  handleToggleSeries,
  isCumulative,
  cumulativeType,
}) => {
  const theme = useTheme();
  const chartRef = useRef<EChartsOption>(null);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const showLineYear = isMobile && (selectedGranularity === 'monthly' || selectedGranularity === 'quarterly');

  const options: EChartsOption = {
    tooltip: {
      borderRadius: 12,
      show: !isMobile,
      trigger: 'axis',
      extraCssText: `z-index:${zIndexEnum.ECHART_TOOL_TIP}`,
      backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: theme.palette.isLight ? '#D4D9E1' : '#231536',
          opacity: 0.15,
        },
      },
      padding: 0,
      borderColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
      borderWidth: 1,
      position: (point: [number, number]) => {
        const margin = isTablet ? 0 : 8;
        const xPos = point[0] + margin;
        const yPos = point[1] + margin;

        return [xPos, yPos];
      },
      formatter: (params: BarChartSeries[]) => {
        // If all values are cero, don't show tooltip
        if (params.every((item) => item.value === 0)) {
          return '';
        }

        const filteredParams = params.filter((item) => item.value !== 0 && Math.abs(item.value) > 0.004);
        const shortAmount = params.length > 10;
        const flexDirection = shortAmount ? 'row' : 'column';
        const wrap = shortAmount ? 'flex-wrap:wrap;' : '';
        const gap = shortAmount ? '16px' : '12px';
        const minMax = isTablet
          ? 'max-width:300px'
          : isDesktop1024
          ? 'max-width:400px'
          : 'min-width:190px;max-width:450px';
        const maxWithTablet = isTablet ? 'max-width:190px' : isDesktop1024 ? 'max-width:450px' : '';

        return `
          <div style="border-radius:12px;background-color:${
            theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800]
          };box-shadow:${
          theme.palette.isLight ? theme.fusionShadows.graphShadow : 'none'
        };padding:16px;overflow:auto;font-family:Inter,sans-serif">
            <div style="margin-bottom:16px;font-size:12px;font-weight:600;color:${
              theme.palette.isLight ? theme.palette.colors.charcoal[300] : theme.palette.colors.slate[100]
            }">${
          (selectedGranularity as string) === 'Annually'
            ? year
            : getMonthAbbreviationToolTip(filteredParams?.[0]?.dataIndex as number)
        }</div>
            ${
              isCumulative
                ? `<div style="text-transform:uppercase;font-weight:300;font-size:11px;color:${
                    theme.palette.isLight ? '#434358' : theme.palette.colors.slate[100]
                  }">${cumulativeType} cumulative</div>`
                : ''
            }
            <div style="display:flex;flex-direction:${flexDirection};gap:${gap};${wrap}${minMax}">
              ${filteredParams
                .reverse()
                .map(
                  (item) =>
                    `<div style="display:flex;align-items:center;gap:6px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
                      isMobile ? 13 : 16
                    }" viewBox="0 0 13 13" fill="none" style="min-width:${isMobile ? 13 : 16};min-height:${
                      isMobile ? 13 : 16
                    }">
                    <circle cx="6.5" cy="6.5" r="5.5" stroke="${item.color}" />
                    <circle cx="6.5" cy="6.5" r="4" fill="${item.color}" />
                  </svg>
                  <span style="display:inline-block;font-size:14px;color:${
                    theme.palette.isLight ? theme.palette.colors.charcoal[300] : theme.palette.colors.slate[100]
                  };white-space:nowrap;overflow:hidden;text-overflow:ellipsis;${maxWithTablet}"> ${
                      !isMobile
                        ? formatBudgetName(item.seriesName)
                        : removeBudgetWord(formatBudgetName(item.seriesName))
                    }:</span>
                  <span style="font-size:16px;font-weight:700;color:${
                    theme.palette.isLight ? theme.palette.colors.charcoal[900] : '#EDEFFF'
                  };display:inline-block;">${usLocalizedNumber(item.value, 2)}</span>
                </div>`
                )
                .join('')}
            </div>
          </div>
          `;
      },
    },
    grid: {
      top: 5,
      right: 0,
      bottom: 0,
      left: isMobile ? 40 : isTablet ? 60 : isDesktop1024 ? 55 : 60,
      height: isMobile ? 180 : isTablet ? 251 : isDesktop1024 ? 253 : 317,
    },
    xAxis: {
      type: 'category',
      data: getChartAxisLabelByGranularity(selectedGranularity, isMobile, false, true),
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
        symbolOffset: 'left',
        lineStyle: {
          color: 'transparent',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: isMobile ? 8 : isTablet ? 10 : 12,
        fontFamily: 'OpenSansCondensed, sans-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        lineHeight: isMobile ? 16 : 19,
        height: isMobile ? 16 : 19,
        align: 'center',
        baseline: 'top',
        color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300],
        interval: 0,

        formatter: (value: string) => {
          const formatted = formatterBreakdownChart(
            selectedGranularity as AnalyticGranularity,
            isMobile,
            year,
            value,
            isMobile
          );
          return formatted;
        },
      },
    },
    yAxis: {
      axisLabel: {
        margin: isMobile ? 8 : isTablet ? 10 : isDesktop1024 ? 12 : isDesktop1280 ? 14 : 16,
        fontFamily: 'OpenSansCondensed, sans-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        lineHeight: isMobile ? 16 : 19,
        height: isMobile ? 16 : 19,
        verticalAlign: 'middle',
        color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[100],
        interval: 0,

        formatter: (value: number, index: number) => {
          if (value === 0 && index === 0) {
            return value.toString();
          }

          return replaceAllNumberLetOneBeforeDot(value, true);
        },
      },
      type: 'value',
      zlevel: 1,
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300],
          width: 0.25,
        },
      },
    },
    series,
  };

  const onLegendItemHover = (legendName: string) => {
    const chartInstance = chartRef.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'highlight',
      seriesName: legendName,
    });
  };

  const onLegendItemLeave = (legendName: string) => {
    const chartInstance = chartRef.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'downplay',
      seriesName: legendName,
    });
  };

  return (
    <ChartContainer>
      <ReactECharts
        ref={chartRef}
        option={options}
        style={{
          width: '100%',
          height: '100%',
        }}
        opts={{ renderer: 'svg' }}
      />
      {showLineYear && (
        <YearXAxis>
          <YearText>{year}</YearText>
        </YearXAxis>
      )}
      <LegendContainer>
        <LegendWrapper>
          {series.map((seriesItem: LineChartSeriesData, index: number) => (
            <LegendItem
              key={`${seriesItem.name}-${index}`}
              onMouseEnter={() => onLegendItemHover(seriesItem.name)}
              onMouseLeave={() => onLegendItemLeave(seriesItem.name)}
              onClick={() => handleToggleSeries(seriesItem.name)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={isMobile ? 12 : 16}
                height={isMobile ? 12 : 16}
                viewBox={`0 0 ${isMobile ? 12 : 16} ${isMobile ? 12 : 16}`}
                fill="none"
              >
                <circle
                  cx={isMobile ? 6 : 8}
                  cy={isMobile ? 6 : 8}
                  r={isMobile ? 5.5 : 7.5}
                  stroke={seriesItem.itemStyle.color}
                />
                <circle
                  cx={isMobile ? 6 : 8}
                  cy={isMobile ? 6 : 8}
                  r={isMobile ? 4 : 6}
                  fill={seriesItem.itemStyle.color}
                />
              </svg>
              {seriesItem.name === 'Net Expenses Off-chain'
                ? `${isMobile ? 'Net Expenses Off-chain' : 'Net Expenses Off-chain included'}`
                : seriesItem.name}
            </LegendItem>
          ))}
        </LegendWrapper>
      </LegendContainer>
    </ChartContainer>
  );
};

export default ExpenseMetricsChart;

const ChartContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  height: 300,
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 24,
    height: 286,

    '& > div:first-of-type': {
      maxWidth: 'calc(100% - 287px)',
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 288,

    '& > div:first-of-type': {
      maxWidth: 'calc(100% - 386px)',
    },
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
    height: 353,
    marginTop: 24,

    '& > div:first-of-type': {
      maxWidth: 765,
    },
  },
  [theme.breakpoints.up('desktop_1440')]: {
    '& > div:first-of-type': {
      maxWidth: 840,
    },
  },
}));

const YearXAxis = styled('div')(({ theme }) => {
  const border = `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
  }`;

  return {
    position: 'absolute',
    bottom: 72,
    left: 40,
    right: 0,
    height: 12,
    borderLeft: border,
    borderRight: border,
    borderBottom: border,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  };
});

const YearText = styled('div')(({ theme }) => ({
  position: 'absolute',
  fontFamily: 'Open Sans Condensed, sans-serif',
  fontWeight: 700,
  fontSize: 12,
  lineHeight: '16px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700],
  bottom: -6,
  width: 52,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.isLight ? 'white' : theme.palette.colors.charcoal[900],
  textAlign: 'center',
  letterSpacing: '1px',
}));

const LegendContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  bottom: 0,

  [theme.breakpoints.up('tablet_768')]: {
    position: 'static',
    alignItems: 'center',
    flex: '1 0 0',
    width: 'auto',
    padding: '0px 16px',
    borderRadius: 12,
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  },
}));

const LegendWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 24,
  },
}));

const LegendItem = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[50],
  cursor: 'pointer',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));
