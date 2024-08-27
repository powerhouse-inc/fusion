import { styled, useMediaQuery, useTheme } from '@mui/material';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';

import ReactECharts from 'echarts-for-react';
import { useEffect, useMemo, useRef } from 'react';
import { formatterWaterfallChart, getChartAxisLabelByGranularity } from '../../utils/utils';
import LegendItemChart from '../LegendItemChart/LegendItemChart';
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
        top: isMobile ? 16 : isTablet ? 18 : isDesktop1024 ? 20 : isDesktop1280 ? 22 : 22,
        left: isMobile ? 36 : isTablet ? 68 : isDesktop1024 ? 66 : isDesktop1280 ? 66 : isDesktop1440 ? 68 : 65,
        right: isMobile ? 2 : isTablet ? -2 : isDesktop1024 ? -2 : isDesktop1280 ? -2 : isDesktop1440 ? 1 : 1,
        height: isMobile ? 185 : isTablet ? 385 : isDesktop1024 ? 384 : isDesktop1280 ? 382 : isDesktop1440 ? 380 : 380,
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
          margin: isMobile ? 16 : isTablet ? 24 : isDesktop1024 ? 24 : isDesktop1280 ? 24 : isDesktop1440 ? 26 : 24,
          color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300],
          align: 'center',
          fontFamily: 'Open Sans Condensed, sans-serif',
          fontWeight: 700,
          fontSize: isMobile ? 12 : 14,
          interval: 0,
          formatter: function (value: string, index: number) {
            const formatted = formatterWaterfallChart(selectedGranularity, isMobile, year, value, index);
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
          fontWeight: upTable ? 600 : 400,
        },
        verticalAlign: 'middle',
        height: upTable ? 15 : 12,

        type: 'value',
        zlevel: -1,
        axisLine: {
          show: false,
        },
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
          opts={{ renderer: 'svg' }}
        />
        {showLineYear && <LineYearBorderBottomChart year={year} />}
      </ChartContainer>
      <LegendContainer>
        {legends?.map((legend, index) => (
          <LegendItemChart isSvg={false} key={index} title={legend.title} color={legend.color} />
        ))}
      </LegendContainer>
    </Wrapper>
  );
};

export default WaterfallChart;

const Wrapper = styled('div')({
  width: '100%',
});

const ChartContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  maxWidth: 343,
  height: 275,
  marginLeft: 'auto',
  marginRight: 'auto',

  [theme.breakpoints.up('tablet_768')]: {
    height: 456,
    maxWidth: 700,
    width: 7040,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 954,
    width: 954,
    height: 508,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1185,
    width: 1185,
    height: 508,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1192,
    height: 508,
    width: 1192,
  },
}));

const LegendContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  paddingLeft: 2,
  gap: 32,
  marginTop: -2,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 64,
    paddingLeft: 0,
    marginTop: 42,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
    marginTop: -12,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 64,
    marginTop: -12,
    marginLeft: -6,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    gap: 64,
    marginTop: -12,
    marginLeft: -6,
  },
}));
