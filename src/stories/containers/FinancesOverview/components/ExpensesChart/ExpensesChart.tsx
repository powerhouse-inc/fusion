import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { replaceAllNumberLetOneBeforeDot } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import ReactECharts from 'echarts-for-react';

import React from 'react';

import LegendItem from './LegendItem';
import type { ValuesDataWithBorder } from '@ses/core/models/dto/chartDTO';

interface Props {
  newActual: ValuesDataWithBorder[];
  newDiscontinued: ValuesDataWithBorder[];
  newPrediction: ValuesDataWithBorder[];
}

const ExpensesChart: React.FC<Props> = ({ newActual, newDiscontinued, newPrediction }: Props) => {
  const { isLight } = useThemeContext();
  const isUpDesktop1194 = useMediaQuery(lightTheme.breakpoints.up('desktop_1194'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const upTable = useMediaQuery(lightTheme.breakpoints.up('table_834'));
  const isZeroValue = false;

  const options = {
    grid: {
      height: upTable ? 317 : 204,
      right: '0%',
      bottom: '10%',
    },
    xAxis: {
      type: 'category',
      data: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
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
        color: isLight ? '#434358' : '#708390',
        align: 'center',
        fontFamily: 'Inter,san-serif',
        fontWeight: 400,
        fontSize: upTable ? 12 : 9,
        height: upTable ? 15 : 11,
        baseline: 'top',
        interval: 0,
      },
    },
    yAxis: {
      axisLabel: {
        margin: upTable ? 16 : 7,
        formatter: function (value: number, index: number) {
          if (value === 0 && index === 0) {
            return value.toString();
          }

          return replaceAllNumberLetOneBeforeDot(value).replace(/\.?0+$/g, '');
        },
        color: isLight ? '#231536' : '#EDEFFF',
        fontSize: upTable ? 12 : 10,
        height: upTable ? 15 : 12,
        fontFamily: 'Inter, sans-serif',
        fontWeight: upTable ? 600 : 400,
      },
      verticalAlign: 'middle',
      height: upTable ? 15 : 12,

      type: 'value',
      zlevel: 1,
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: isLight ? '#31424E' : '#D8E0E3',
          width: isZeroValue ? 0 : 0.25,
        },
      },
    },
    series: [
      {
        name: 'Active Budget',
        data: newActual,
        type: 'bar',
        stack: 'x',
        showBackground: true,
        backgroundStyle: {
          color: isLight ? '#ECF1F3' : '#10191F',
          borderRadius: 6,
        },
        barWidth: upTable && !isUpDesktop1194 ? 40 : isUpDesktop1194 ? 32 : 22,
        itemStyle: {
          color: isLight ? '#0EB19F' : '#027265',
        },
      },
      {
        name: 'Discontinued',
        data: newDiscontinued,
        type: 'bar',
        stack: 'x',
        showBackground: true,
        backgroundStyle: {
          color: isLight ? '#ECF1F3' : '#10191F',
          borderRadius: 6,
        },
        barWidth: upTable && !isUpDesktop1194 ? 40 : isUpDesktop1194 ? 32 : 22,
        itemStyle: {
          color: isLight ? '#027265' : '#2C3F3B',
        },
      },
      {
        name: 'Expense forecasts',
        data: newPrediction,
        type: 'bar',
        stack: 'x',
        showBackground: true,
        backgroundStyle: {
          color: isLight ? '#ECF1F3' : '#10191F',
          borderRadius: 6,
        },
        barWidth: upTable && !isUpDesktop1194 ? 40 : isUpDesktop1194 ? 32 : 22,
        itemStyle: {
          color: isLight ? '#68FEE3' : '#1AAB9B',
        },
      },
    ],
  };

  return (
    <ContainerAndLegend>
      <Legend>
        <LegendItem
          color={isLight ? '#0EB19F' : '#027265'}
          text="Active Budget"
          style={{ paddingLeft: isTable ? 0 : upTable ? 10 : 10 }}
        />
        <LegendItem color={isLight ? '#027265' : '#2C3F3B'} text="Discontinued" />
        <LegendItem color={isLight ? '#68FEE3' : '#1AAB9B'} text="Expense forecasts" />
      </Legend>
      <Container>
        <ReactECharts
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
      </Container>
    </ContainerAndLegend>
  );
};

const ContainerAndLegend = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Container = styled.div({
  height: 260,
  width: 343,
  maxWidth: 343,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  paddingLeft: 4,

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    height: 387,
    width: 607,
    maxWidth: 607,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    height: 387,
    width: 479,
    maxWidth: 479,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 504,
    maxWidth: 504,
  },
});

const Legend = styled.div({
  maxWidth: 343,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: -4,

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: -8,
    paddingLeft: 60,
    maxWidth: 607,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: -8,
    paddingLeft: 11,
    maxWidth: 479,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 504,
    paddingLeft: 36,
  },
});

export default ExpensesChart;