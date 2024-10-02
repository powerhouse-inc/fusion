import { styled, useMediaQuery, useTheme } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { replaceAllNumberLetOneBeforeDot } from '@/core/utils/string';
import type { BarChartSeries } from '@/views/Finances/utils/types';
import { createTooltipFormatter } from '../../utils/utils';
import useFinancesBarChart from './useFinancesBarChart';
import type { RevenueAndSpendingRecords } from '../../api/revenueAndSpending';
import type { Theme } from '@mui/material';
import type { EChartsOption } from 'echarts-for-react';
import type { FC } from 'react';

interface FinancesBarChartProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  years: string[];
}

const FinancesBarChart: FC<FinancesBarChartProps> = ({ revenueAndSpendingData }) => {
  const { financesBarChartRef } = useFinancesBarChart();
  const theme = useTheme();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  const { chartSeries } = useMemo(() => {
    const series: Record<string, number[]> = {
      psm: [],
      liquidationIncome: [],
      fees: [],
      dsr: [],
      mkrVesting: [],
      daiSpent: [],
    };

    const years = Object.keys(revenueAndSpendingData)
      // limit the years to 2021-2024 as there's no UI space for more years
      .filter((year) => Number(year) >= 2021 && Number(year) <= 2024)
      .sort((a, b) => Number(a) - Number(b));

    years.forEach((year) => {
      const record = revenueAndSpendingData[year];
      series.psm.push(record.psm);
      series.liquidationIncome.push(record.liquidationIncome);
      series.fees.push(record.fees);
      series.dsr.push(record.dsr);
      series.mkrVesting.push(record.mkrVesting);
      series.daiSpent.push(record.daiSpent);
    });

    return {
      chartSeries: series,
    };
  }, [revenueAndSpendingData]);

  const barWidth = isMobile ? 24 : isTablet ? 32 : 40;

  const series = [
    {
      data: chartSeries.psm,
      type: 'bar',
      stack: 'revenue',
      name: 'psm',
      barWidth,
      itemStyle: {
        color: theme.palette.isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900],
        borderRadius: 0,
      },
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
    },
    {
      data: chartSeries.liquidationIncome,
      type: 'bar',
      stack: 'revenue',
      name: 'liquidationIncome',
      barWidth,
      itemStyle: {
        color: theme.palette.isLight ? theme.palette.colors.green[500] : theme.palette.colors.green[700],
        borderRadius: 0,
      },
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
    },
    {
      data: chartSeries.fees,
      type: 'bar',
      stack: 'revenue',
      name: 'fees',
      barWidth,
      itemStyle: {
        color: theme.palette.isLight ? theme.palette.colors.green[300] : theme.palette.colors.green[500],
        borderRadius: [8, 8, 0, 0],
      },
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
    },
    {
      data: chartSeries.dsr,
      type: 'bar',
      stack: 'spending',
      name: 'dsr',
      barWidth,
      itemStyle: {
        color: theme.palette.isLight ? theme.palette.colors.orange[700] : theme.palette.colors.orange[900],
        borderRadius: 0,
      },
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
    },
    {
      data: chartSeries.mkrVesting,
      type: 'bar',
      stack: 'spending',
      name: 'mkrVesting',
      barWidth,
      itemStyle: {
        color: theme.palette.isLight ? theme.palette.colors.red[700] : theme.palette.colors.red[900],
        borderRadius: 0,
      },
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
    },
    {
      data: chartSeries.daiSpent,
      type: 'bar',
      stack: 'spending',
      name: 'daiSpent',
      barWidth,
      itemStyle: {
        color: theme.palette.isLight ? theme.palette.colors.red[500] : theme.palette.colors.red[700],
        borderRadius: [8, 8, 0, 0],
      },
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
    },
  ];

  const options: EChartsOption = {
    tooltip: {
      show: !isMobile,
      trigger: 'axis',
      borderRadius: 12,
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
      position: (
        point: [number, number],
        params: EChartsOption,
        dom: EChartsOption,
        rect: EChartsOption,
        size: EChartsOption
      ) => {
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

        return [xPos, yPos];
      },
      formatter: (value: BarChartSeries) => {
        const toolTipStyle = createTooltipFormatter(theme, isMobile)(value);
        return toolTipStyle;
      },
    },
    grid: {
      top: 8,
      right: 0,
      bottom: 20,
      left: isMobile ? 40 : 49,
    },
    xAxis: {
      data: ['2021', '2022', '2023', '2024'],
      type: 'category',
      axisLine: {
        lineStyle: {
          color: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[300],
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 4,
        fontFamily: 'OpenSansCondensed, san-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        lineHeight: isMobile ? 16 : 19,
        color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[400],
      },
      axisPointer: {
        show: !isMobile,
        type: 'shadow',
        label: {
          show: false,
        },
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[300],
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[300],
        },
      },
      axisLabel: {
        fontFamily: 'OpenSansCondensed, san-serif',
        fontWeight: 700,
        fontSize: isMobile ? 12 : 14,
        color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[500],
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }
          return replaceAllNumberLetOneBeforeDot(value, true);
        },
      },
    },
    series,
  };

  return (
    <Container>
      <ReactECharts
        ref={financesBarChartRef}
        option={options}
        style={{
          width: '100%',
          height: '100%',
        }}
        opts={{ renderer: 'svg' }}
      />
    </Container>
  );
};

export default FinancesBarChart;

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  height: 216,
  marginTop: 8,

  [theme.breakpoints.up('tablet_768')]: {
    width: 385,
    height: 253,
    marginTop: 20,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 526,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 449,
    height: 360,
    marginTop: 8,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 480,
  },
}));
