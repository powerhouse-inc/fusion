import { styled, useMediaQuery, useTheme } from '@mui/material';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useMemo } from 'react';
import { usLocalizedNumber } from '@/core/utils/humanization';
import type { BarChartSeries, BreakdownChartSeriesData } from '@/views/Finances/utils/types';
import {
  formatterBreakdownChart,
  getChartAxisLabelByGranularity,
  formatBudgetName,
  removeBudgetWord,
  getMonthAbbreviationToolTip,
} from '@/views/Finances/utils/utils';
import { getSelectMetricText } from '../utils';

import LegendBreakDownChart from './LegendBreakDownChart/LegendBreakDownChart';
import type { Theme } from '@mui/material';
import type { AnalyticGranularity, AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { EChartsOption } from 'echarts-for-react';

interface BreakdownChartProps {
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: BreakdownChartSeriesData[];
  handleToggleSeries: (series: string) => void;
  refBreakDownChart: React.RefObject<EChartsOption | null>;
  selectedMetric?: AnalyticMetric;
  isChecked: boolean;
  handleChangeSwitch: () => void;
  showLegendValue?: boolean;
  showScrollAndToggle?: boolean;
}

const BreakdownChart: React.FC<BreakdownChartProps> = ({
  year,
  refBreakDownChart,
  series,
  handleToggleSeries,
  selectedGranularity,
  selectedMetric,
  showLegendValue,
  isChecked,
  handleChangeSwitch,
  showScrollAndToggle,
}) => {
  const theme = useTheme();

  const isLessMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('mobile_375'));
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.between('mobile_375', 'tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const upTable = useMediaQuery((theme: Theme) => theme.breakpoints.up('tablet_768'));
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesktop1440 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1440'));

  const isMobileOrLess = isMobile || isLessMobile;
  const showLineYear = (isMobile || isLessMobile) && selectedGranularity === 'monthly';

  const xAxisStyles = useMemo(
    () => ({
      fontFamily: 'OpenSansCondensed, sans-serif',
      textAlign: 'center',
      color: '#708390',
      fontWeight: 600,
      fontSize: upTable ? 12 : isLessMobile ? 8 : 9,
      verticalAlign: 'top',
      interval: 0,
    }),
    [isLessMobile, upTable]
  );

  const options: EChartsOption = useMemo(
    () => ({
      tooltip: {
        borderRadius: 12,
        show: !isMobile,
        trigger: 'axis',
        extraCssText: `z-index:${zIndexEnum.ECHART_TOOL_TIP}`,

        backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
        // This is the shadow of the on the bar that tooltip is
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
        position: function (
          point: [number, number],
          params: EChartsOption,
          dom: EChartsOption,
          rect: EChartsOption,
          size: EChartsOption
        ) {
          const MORE_WITH = 10;
          const withTooltip = size.contentSize[0];
          const heightTooltip = size.contentSize[0];

          let xPos = point[0];
          let yPos = point[1];

          const tooltipWidth = withTooltip;
          const tooltipHeight = heightTooltip;

          if (xPos + tooltipWidth + MORE_WITH > window.innerWidth) {
            xPos -= tooltipWidth;
          }

          if (yPos + tooltipHeight + MORE_WITH > window.innerHeight) {
            yPos -= tooltipHeight;
          }
        },

        formatter: function (params: BarChartSeries[]) {
          // If all values are cero, don't show tooltip
          if (params.every((item) => item.value === 0)) {
            return '';
          }

          const filteredParams = params.filter((item) => item.value !== 0 && Math.abs(item.value) > 0.004);
          const shortAmount = params.length > 10;
          const flexDirection = shortAmount ? 'row' : 'column';
          const wrap = shortAmount ? 'flex-wrap:wrap;' : '';
          const gap = shortAmount ? '16px' : '12px';
          const minMaxValues = {
            tablet: 'max-width:300px',
            desktop1024: 'max-width:400px',
            default: 'min-width:190px;max-width:450px',
          };
          let minMax: string;
          if (isTablet) {
            minMax = minMaxValues.tablet;
          } else if (isDesktop1024) {
            minMax = minMaxValues.desktop1024;
          } else {
            minMax = minMaxValues.default;
          }

          const maxWithTableValues = {
            tablet: 'max-width:190px',
            desktop1024: 'max-width:450px',
            default: '',
          };

          let maxWithTable: string;
          if (isTablet) {
            maxWithTable = maxWithTableValues.tablet;
          } else if (isDesktop1024) {
            maxWithTable = maxWithTableValues.desktop1024;
          } else {
            maxWithTable = maxWithTableValues.default;
          }

          return `
            <div style="border-radius:12px;background-color:${
              theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800]
            };box-shadow:${
            theme.palette.isLight ? theme.fusionShadows.graphShadow : 'none'
          };padding:16px;overflow:auto; font-family:Inter ,sans-serif">
              <div style="margin-bottom:16px;font-size:12px;font-weight:600;color:${
                theme.palette.isLight ? theme.palette.colors.charcoal[300] : '#B6BCC2'
              }">${
            (selectedGranularity as string) === 'Annually'
              ? year
              : getMonthAbbreviationToolTip(filteredParams?.[0]?.dataIndex as number)
          }<span style="display:inline-block;margin-left:4px">${getSelectMetricText(selectedMetric)}</span></div>
              <div style="display:flex;flex-direction:${flexDirection};gap:${gap};${wrap}${minMax}">
                ${filteredParams
                  .reverse()
                  .map(
                    (item) =>
                      `<div style="display: flex;align-items:center;gap: 6px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
                        isMobile ? 13 : 16
                      }" viewBox="0 0 13 13" fill="none" style="min-width:${isMobile ? 13 : 16};min-height:${
                        isMobile ? 13 : 16
                      }">
                      <circle cx="6.5" cy="6.5" r="5.5" stroke="${item.color}" />
                      <circle cx="6.5" cy="6.5" r="4" fill="${item.color}" />
                    </svg>
                    <span style="display: inline-block;font-size:14px;color:${
                      theme.palette.isLight ? theme.palette.colors.charcoal[300] : '#B6BCC2'
                    };white-space:nowrap;overflow:hidden;text-overflow:ellipsis;${maxWithTable}"> ${removeBudgetWord(
                        formatBudgetName(item.seriesName)
                      )}:</span>
                    <span style="font-size:16px;font-weight:700;color:${
                      theme.palette.isLight ? theme.palette.colors.charcoal[900] : '#EDEFFF'
                    };display: inline-block;">${usLocalizedNumber(item.value, 2)}</span>
                  </div>`
                  )
                  .join('')}
              </div>
            </div>
            `;
        },
      },
      grid: {
        height: isLessMobile
          ? 198
          : isMobile
          ? 170
          : isTablet
          ? 230
          : isDesktop1024
          ? 225
          : isDesktop1280
          ? 312
          : isDesktop1440
          ? 314
          : 312,
        top: isLessMobile ? 10 : isMobile ? 10 : isTablet ? 10 : isDesktop1024 ? 30 : isDesktop1280 ? 11 : 11,
        right: isMobile ? 4 : isTablet ? 0 : isDesktop1024 ? 0 : isDesktop1280 ? 4 : 4,
      },
      xAxis: {
        show: true,
        type: 'category',
        data: getChartAxisLabelByGranularity(selectedGranularity, isMobileOrLess, false, true),
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
          margin: isMobile ? 12 : isTablet ? 12 : isDesktop1024 ? 16 : isDesktop1280 ? 16 : 16,
          color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300],
          align: 'center',
          fontFamily: 'OpenSansCondensed, sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? 12 : 14,
          baseline: 'top',
          interval: 0,
          formatter: function (value: string) {
            const formatted = formatterBreakdownChart(
              selectedGranularity as AnalyticGranularity,
              isMobile,
              year,
              value,
              isLessMobile
            );
            return formatted;
          },
          rich: {
            month: xAxisStyles,
            year: xAxisStyles,
          },
        },
      },
      yAxis: {
        min: series.length === 0 ? 0 : null,
        max: series.length === 0 ? 1 : null,
        show: true,

        axisLabel: {
          show: true,
          fontFamily: 'OpenSansCondensed, sans-serif',
          margin: isMobile ? 10 : isTablet ? 8 : isDesktop1024 ? 24 : isDesktop1280 ? 30 : isDesktop1440 ? 32 : 36,
          formatter: function (value: number, index: number) {
            if (value === 0 && index === 0) {
              return value.toString();
            }
            return replaceAllNumberLetOneBeforeDot(value, true);
          },
          color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[100],
          fontSize: isLessMobile ? 12 : isMobile ? 12 : 14,
          fontWeight: 700,
        },
        verticalAlign: 'middle',

        type: 'value',
        zlevel: -1,
        splitNumber: 9,
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            width: 0.25,
            color: theme.palette.isLight ? theme.palette.colors.gray[400] : theme.palette.colors.charcoal[800],
          },
        },
      },
      series,
    }),
    [
      isDesktop1024,
      isDesktop1280,
      isDesktop1440,
      isLessMobile,
      isMobile,
      isMobileOrLess,
      isTablet,
      selectedGranularity,
      selectedMetric,
      series,
      theme.fusionShadows.graphShadow,
      theme.palette.colors.charcoal,
      theme.palette.colors.gray,
      theme.palette.colors.slate,
      theme.palette.isLight,
      xAxisStyles,
      year,
    ]
  );

  useEffect(() => {
    // avoid to merge data when moving between levels
    const chartInstance = refBreakDownChart?.current?.getEchartsInstance();
    chartInstance?.setOption(options, { notMerge: true });
  }, [options, refBreakDownChart]);

  const onLegendItemHover = (legendName: string) => {
    const chartInstance = refBreakDownChart?.current?.getEchartsInstance();
    chartInstance?.dispatchAction({
      type: 'highlight',
      seriesName: legendName,
    });
  };

  const onLegendItemLeave = (legendName: string) => {
    const chartInstance = refBreakDownChart?.current?.getEchartsInstance();
    chartInstance?.dispatchAction({
      type: 'downplay',
      seriesName: legendName,
    });
  };

  return (
    <Wrapper>
      <ChartContainer>
        <ReactECharts
          ref={refBreakDownChart}
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
        {showLineYear && (
          <YearXAxis isLessMobile={isLessMobile}>
            <YearText>{year}</YearText>
          </YearXAxis>
        )}
      </ChartContainer>
      <LegendBreakDownChart
        handleChangeSwitch={handleChangeSwitch}
        isChecked={isChecked}
        series={series}
        handleToggleSeries={handleToggleSeries}
        onLegendItemHover={onLegendItemHover}
        onLegendItemLeave={onLegendItemLeave}
        showLegendValue={showLegendValue}
        showScrollAndToggle={showScrollAndToggle}
      />
    </Wrapper>
  );
};

export default BreakdownChart;

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',

    alignItems: 'revert',
    justifyContent: 'space-between',
    gap: 24,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const ChartContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  height: 227,

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 'calc(100% - 287px)',
    height: 268,
    marginTop: 0,
    paddingLeft: 20,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    height: 288,
    paddingLeft: 20,
    width: '100%',
    maxWidth: 'calc(100% - 386px)',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    height: 356,
    paddingLeft: 0,
    maxWidth: 'calc(100% - 387px)',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 'calc(100% - 424px)',
    height: 356,
    marginLeft: -10,
  },
}));

const YearXAxis = styled('div')<{ isLessMobile: boolean }>(({ theme, isLessMobile }) => {
  const border = `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
  }`;

  return {
    position: 'absolute',
    bottom: isLessMobile ? 12 : 0,
    left: isLessMobile ? 30 : 40,
    right: 5,
    height: 11,
    borderLeft: border,
    borderRight: border,
    borderBottom: border,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  };
});

const YearText = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700],
  position: 'absolute',
  bottom: -6,

  width: 52,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  textAlign: 'center',
  fontWeight: 700,
  letterSpacing: '1px',
}));
