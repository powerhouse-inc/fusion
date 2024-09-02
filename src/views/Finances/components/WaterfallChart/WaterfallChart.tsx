import { styled, useMediaQuery, useTheme } from '@mui/material';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';

import ReactECharts from 'echarts-for-react';
import { useEffect, useMemo, useRef } from 'react';
import { formatterWaterfallChart, getChartAxisLabelByGranularity } from '../../utils/utils';
import LegendItemWaterfall from '../LegendItemChart/LegendItemWaterfall';
import LineYearBorderBottomChart from '../LineYearBorderBottomChart/LineYearBorderBottomChart';
import type { LegendItemsWaterfall, LineWaterfall, WaterfallChartSeriesData } from '../../utils/types';
import type { Theme } from '@mui/material';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { EChartsOption } from 'echarts-for-react';

interface Props {
  legends: LegendItemsWaterfall[];
  year: string;
  selectedGranularity: AnalyticGranularity;
  series: (WaterfallChartSeriesData | LineWaterfall)[];
}

const WaterfallChart: React.FC<Props> = ({ legends, year, selectedGranularity, series }) => {
  const theme = useTheme();
  const refWaterfallChart = useRef<EChartsOption | null>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const upTable = useMediaQuery((theme: Theme) => theme.breakpoints.up('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesktop1440 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1440', 'desktop_1920'));
  const showLineYear = isMobile && selectedGranularity === 'monthly';

  const xAxisStyles = useMemo(
    () => ({
      textAlign: 'center',
      fontFamily: 'Open Sans Condensed, sans-serif',
      fontWeight: 700,
      fontSize: isMobile ? 12 : 14,
      verticalAlign: 'top',
      interval: 0,
      padding: [0, 0, 3, 0],
    }),
    [isMobile]
  );

  // Start mobile style
  const startFinishMobile = useMemo(
    () => ({
      ...xAxisStyles,
      color: theme.palette.isLight
        ? isMobile
          ? theme.palette.colors.gray[900]
          : theme.palette.colors.slate[100]
        : theme.palette.colors.slate[50],
    }),
    [xAxisStyles, theme.palette.isLight, theme.palette.colors.gray, theme.palette.colors.slate, isMobile]
  );

  const xYearStyles = useMemo(
    () => ({
      ...xAxisStyles,
      padding: [0, 0, 0, 0],
    }),
    [xAxisStyles]
  );

  const startStyles = useMemo(
    () => ({
      ...xAxisStyles,
      color: theme.palette.isLight ? theme.palette.colors.slate[400] : theme.palette.colors.slate[50],
    }),
    [xAxisStyles, theme.palette.isLight, theme.palette.colors.slate]
  );

  const startYearStyles = useMemo(
    () => ({
      ...xYearStyles,
      color: theme.palette.isLight ? theme.palette.colors.slate[400] : theme.palette.colors.slate[50],
    }),
    [xYearStyles, theme.palette.isLight, theme.palette.colors.slate]
  );

  const options: EChartsOption = useMemo(
    () => ({
      grid: {
        top: isMobile ? 16 : isTablet ? 18 : isDesktop1024 ? 16 : isDesktop1280 ? 18 : isDesktop1440 ? 16 : 22,
        left: isMobile ? 40 : isTablet ? 68 : isDesktop1024 ? 70 : isDesktop1280 ? 55 : isDesktop1440 ? 130 : 65,
        right: isMobile ? 0 : isTablet ? 0 : isDesktop1024 ? 0 : isDesktop1280 ? 4 : 65,
        height: isMobile ? 178 : isTablet ? 220 : isDesktop1024 ? 240 : isDesktop1280 ? 300 : isDesktop1440 ? 310 : 310,
      },
      xAxis: {
        type: 'category',
        data: getChartAxisLabelByGranularity(selectedGranularity, isMobile, true),
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
          margin: isMobile ? 14 : isTablet ? 14 : isDesktop1024 ? 24 : isDesktop1280 ? 24 : isDesktop1440 ? 26 : 24,
          color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300],
          align: 'center',

          fontFamily: 'Open Sans Condensed, sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? 12 : 14,
          interval: 0,
          formatter: function (value: string, index: number) {
            const formatted = formatterWaterfallChart(selectedGranularity, isMobile, isTablet, year, value, index);
            return formatted;
          },
          rich: {
            month: xAxisStyles,
            year: xYearStyles,
            mobileStyle: startFinishMobile,
            startYear: startYearStyles,
            start: startStyles,
          },
        },
      },
      yAxis: {
        min: 0,
        axisLabel: {
          padding: isMobile
            ? [0, 0, 0, 2]
            : isTablet
            ? [0, 14, 0, 0]
            : isDesktop1024
            ? [0, 12, 0, 0]
            : isDesktop1280
            ? [0, 6, 0, 0]
            : isDesktop1440
            ? [0, 12, 0, 0]
            : [0, 12, 0, 0],
          formatter: function (value: number, index: number) {
            if (index === 0) {
              return value.toString();
            }
            return replaceAllNumberLetOneBeforeDot(value);
          },
          color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[100],
          fontSize: isMobile ? 12 : 14,
          fontFamily: 'Open Sans Condensed, sans-serif',
          fontWeight: 700,
        },
        verticalAlign: 'middle',
        height: upTable ? 15 : 12,

        type: 'value',
        zlevel: -1,
        axisLine: {
          show: false,
        },
        splitNumber: 9,
        splitLine: {
          lineStyle: {
            color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[800],
            width: 0.25,
          },
        },
      },
      series,
    }),
    [
      isDesktop1024,
      isDesktop1280,
      isDesktop1440,
      isMobile,
      isTablet,
      selectedGranularity,
      series,
      startFinishMobile,
      startStyles,
      startYearStyles,
      theme.palette.colors.charcoal,
      theme.palette.colors.gray,
      theme.palette.colors.slate,
      theme.palette.isLight,
      upTable,
      xAxisStyles,
      xYearStyles,
      year,
    ]
  );

  useEffect(() => {
    // avoid to merge data for lines
    const chartInstance = refWaterfallChart?.current?.getEchartsInstance();
    chartInstance?.setOption(options, { notMerge: true });
  }, [options]);

  return (
    <Wrapper>
      <ChartContainer>
        <ReactECharts
          ref={refWaterfallChart}
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{
            renderer: 'svg',
          }}
        />
        {showLineYear && <LineYearBorderBottomChart year={year} />}
      </ChartContainer>
      <LegendContainer>
        {legends?.map((legend, index) => (
          <LegendItemWaterfall key={index} title={legend.title} color={legend.color} />
        ))}
      </LegendContainer>
    </Wrapper>
  );
};

export default WaterfallChart;

const Wrapper = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ChartContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  height: 275,

  [theme.breakpoints.up('tablet_768')]: {
    height: 312,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    height: 353,
    width: '100%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '100%',
    height: 412,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    height: 440,
    width: '100%',
  },
}));

const LegendContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 16,
  marginTop: -16,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 64,
    paddingLeft: 0,
    marginTop: -12,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
    marginTop: -22,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 64,
    marginTop: -10,
    marginLeft: -6,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    gap: 64,
    marginTop: -38,
    marginLeft: 2,
  },
}));
