import { styled, useMediaQuery, useTheme } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { zIndexEnum } from '@/core/enums/zIndexEnum';
import type { AnalyticMetric, BudgetMetric } from '@/core/models/interfaces/analytic';
import { usLocalizedNumber } from '@/core/utils/humanization';
import { sortDoughnutSeriesByValue } from '@/core/utils/sort';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import CardLegend from '../../../CardChartOverview/OverviewCardKeyDetailsBudget/DoughnutChartFinances/CardLegend';
import DaiToolTipIcon from '../../../CardChartOverview/OverviewCardKeyDetailsBudget/DoughnutChartFinances/DaiToolTipIcon';
import DoughnutChartFinancesSkeleton from '../../../CardChartOverview/OverviewCardKeyDetailsBudget/DoughnutChartFinances/DoughnutChartFinancesSkeleton';
import { chunkArray } from '../../../CardChartOverview/OverviewCardKeyDetailsBudget/DoughnutChartFinances/utils';
import { getCorrectMetricValuesOverViewChart } from '../../../CardChartOverview/utils';
import type { Theme } from '@mui/material';
import type { EChartsOption } from 'echarts-for-react';
import type { SwiperProps, SwiperRef } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

interface DesktopChartProps {
  seriesData: DoughnutSeries[];
  selectedMetric: AnalyticMetric;
  changeAlignment: boolean;
  showSwiper: boolean;
  numberSliderPerLevel?: number;
}

const DesktopChart: React.FC<DesktopChartProps> = ({
  seriesData,
  selectedMetric,
  changeAlignment,
  showSwiper,
  numberSliderPerLevel = 6,
}) => {
  const chartRef = useRef<EChartsOption | null>(null);
  const ref = useRef<SwiperRef>(null);
  const theme = useTheme();
  const [visibleSeries, setVisibleSeries] = useState<DoughnutSeries[]>(seriesData);
  const [legends, setLegends] = useState<DoughnutSeries[]>(seriesData);
  const isDeepLevel = seriesData.length > 6;

  useEffect(() => {
    setVisibleSeries(seriesData);
    setLegends(seriesData);
    // avoid to cut off the chart on page load
    chartRef.current?.getEchartsInstance()?.resize();
  }, [seriesData]);
  const isTable = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));

  useEffect(() => {
    // Resize chart on window resize to avoid UI flickering
    const onResize = () => {
      const chartInstance = chartRef.current?.getEchartsInstance();
      chartInstance?.resize();
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const tooltipSelectedMetricLabel = useMemo(() => {
    switch (selectedMetric) {
      case 'PaymentsOnChain':
        return 'Net Expenses On-Chain';
      case 'ProtocolNetOutflow':
        return 'Net Protocol Outflow';
      default:
        return selectedMetric;
    }
  }, [selectedMetric]);

  const doughnutSeriesChunks = chunkArray(sortDoughnutSeriesByValue(seriesData), numberSliderPerLevel);
  const numberSlider = doughnutSeriesChunks.size;
  const options = useMemo(
    () => ({
      color: visibleSeries.map((data) => data.color),
      tooltip: {
        extraCssText: `z-index:${zIndexEnum.ECHART_TOOL_TIP};border-radius: 12px;overflow: hidden;`,
        show: true,
        trigger: 'item',
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          width: 40,
        },
        padding: 0,
        borderWidth: 1,
        formatter: function (params: DoughnutSeries) {
          const index = visibleSeries.findIndex((data) => data.name === params.name);
          const itemRender = visibleSeries[index];
          const selectedMetricKey = getCorrectMetricValuesOverViewChart(selectedMetric) as keyof BudgetMetric;
          const customTooltip = `
          <div style="background-color:${
            theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800]
          };padding:7px 15px;min-width:194px;">
            <div style="color:${
              theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100]
            };font-size: 18px;font-weight: 700;line-height: 120%;">${
            itemRender.percent === 0
              ? 0
              : itemRender.percent < 0.1
              ? '<0.1'
              : itemRender.percent < 1
              ? usLocalizedNumber(itemRender.percent, 2)
              : usLocalizedNumber(itemRender.percent, 1)
          }%</div>
            <div style="margin-bottom:8px;color:${
              theme.palette.isLight ? theme.palette.colors.charcoal[300] : theme.palette.colors.charcoal[300]
            };font-size: 14px;font-weight: 600;line-height: 22px;max-width: 300px; white-space: nowrap;overflow: hidden; text-overflow: ellipsis;">${
            itemRender.name
          }</div>
            <div style="display:flex;flex-direction:row;gap:32px">
                <div style="display:flex;flex-direction:column">
                  <div style="margin-bottom:4;color:${
                    theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100]
                  };font-size: 16px;font-weight: 600;line-height: 24px;">${usLocalizedNumber(
            itemRender.metrics[selectedMetricKey === 'budget' ? 'paymentsOnChain' : selectedMetricKey].value,
            2
          )}</div>
                  <div style="color:${
                    theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[500]
                  };font-size: 12px;font-weight: 500;line-height: 18px;">${
            selectedMetric === 'Budget' ? 'Net Expenses On-Chain' : tooltipSelectedMetricLabel
          }</div>
               </div>
                <div style="display:flex;flex-direction:column">
                  <div style="margin-bottom:4;color:${
                    theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100]
                  };font-size: 16px;font-weight: 600;line-height: 24px;">${usLocalizedNumber(
            itemRender.metrics.budget.value,
            2
          )}</div>
                  <div style="color:${
                    theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[500]
                  };font-size: 12px;font-weight: 500;line-height: 18px;">Budget Cap</div>
               </div>
            </div>
          </div>
          `;

          return customTooltip;
        },
      },
      series: [
        {
          name: 'Overview Card',
          type: 'pie',
          radius: isTable || isDesktop1024 ? [32, 64] : [37, 73],
          center: ['50%', '50%'],
          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: visibleSeries.map((data) => ({
            ...data,
            // transform negative values to positive to avoid hidden values on the chart
            value: Math.abs(data.value),
          })),
        },
      ],
    }),
    [isDesktop1024, theme, isTable, selectedMetric, tooltipSelectedMetricLabel, visibleSeries]
  );

  const toggleSeriesVisibility = (seriesName: string) => {
    const chartInstance = chartRef.current?.getEchartsInstance();
    const newArray = visibleSeries.map((item) => {
      if (item.name === seriesName) {
        chartInstance.dispatchAction({
          type: 'hideTip',
        });
        const isVisible = !item.isVisible;
        return {
          ...item,
          isVisible,
          value: isVisible ? item.originalValue || 0 : -1,
        };
      }
      return item;
    });
    // iterate through legends
    const newLegend = legends.map((item) => {
      if (item.name === seriesName) {
        chartInstance.dispatchAction({
          type: 'hideTip',
        });
        const isVisible = !item.isVisible;
        return {
          ...item,
          color: isVisible ? item?.originalColor || 'red' : 'rgb(204, 204, 204)',
          isVisible,
          value: item.originalValue || 0,
        };
      }
      return item;
    });
    setLegends(newLegend);
    setVisibleSeries(newArray);
  };

  const onLegendItemHover = (legendName: string) => {
    const dataIndex = visibleSeries.find((data) => data.name === legendName);
    if (dataIndex) {
      if (dataIndex.value !== 0) {
        const chartInstance = chartRef.current.getEchartsInstance();
        chartInstance.dispatchAction({
          type: 'highlight',
          name: legendName,
          seriesIndex: 0,
        });
        chartInstance.dispatchAction({
          type: 'showTip',
          name: legendName,
          seriesIndex: 0,
        });
      }
    }
  };

  const onLegendItemLeave = (legendName: string) => {
    const chartInstance = chartRef.current.getEchartsInstance();
    chartInstance.dispatchAction({
      type: 'downplay',
      name: legendName,
    });
    chartInstance.dispatchAction({
      type: 'hideTip',
    });
  };

  // Options of Swiper
  const swiperOptions = {
    pagination: {
      type: 'bullets',
      enabled: true,
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
      1024: {
        spaceBetween: 2,
      },
      1280: {
        spaceBetween: 2,
      },
      1440: {
        spaceBetween: 2,
      },
      1920: {
        spaceBetween: 2,
      },
    },
  } as SwiperProps;

  useEffect(() => {
    // avoid to merge data when moving between levels
    const chartInstance = chartRef?.current?.getEchartsInstance();
    chartInstance?.setOption(options, { notMerge: true });
  }, [options]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <DoughnutChartFinancesSkeleton />;
  }

  return (
    <Container isDeepLevel={isDeepLevel} haveMoreThanThreeItems={seriesData.length > 3}>
      <ContainerChart>
        <ReactECharts
          ref={chartRef}
          className="chart-container"
          option={options}
          style={{
            height: '100%',
            width: '100%',
          }}
          opts={{ renderer: 'svg' }}
        />
        <ContainerDaiIcon>
          <DaiToolTipIcon />
        </ContainerDaiIcon>
      </ContainerChart>
      {showSwiper ? (
        <SwiperWrapper isDeepLevel={isDeepLevel} numberSliderPerLevel={numberSliderPerLevel}>
          <Swiper
            direction="horizontal"
            ref={ref}
            modules={[Pagination, Navigation]}
            centerInsufficientSlides
            pagination={true}
            {...swiperOptions}
          >
            <ContainerLegend isDeepLevel={isDeepLevel} changeAlignment={changeAlignment} numberSlider={numberSlider}>
              {Array.from(doughnutSeriesChunks.entries()).map(([index, dataChunk]) => (
                <SwiperSlide key={index}>
                  <CardLegend
                    key={index}
                    changeAlignment={changeAlignment}
                    doughnutSeriesData={dataChunk}
                    toggleSeriesVisibility={toggleSeriesVisibility}
                    onLegendItemHover={onLegendItemHover}
                    onLegendItemLeave={onLegendItemLeave}
                    isDeepLevel={isDeepLevel}
                  />
                </SwiperSlide>
              ))}
            </ContainerLegend>
          </Swiper>
        </SwiperWrapper>
      ) : (
        <ContainerLegendNotSwiper>
          <CardLegend
            changeAlignment={changeAlignment}
            doughnutSeriesData={seriesData}
            toggleSeriesVisibility={toggleSeriesVisibility}
            onLegendItemHover={onLegendItemHover}
            onLegendItemLeave={onLegendItemLeave}
            isDeepLevel={isDeepLevel}
          />
        </ContainerLegendNotSwiper>
      )}
    </Container>
  );
};

export default DesktopChart;

const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isDeepLevel' && prop !== 'haveMoreThanThreeItems',
})<{ isDeepLevel: boolean; haveMoreThanThreeItems: boolean }>(({ theme, isDeepLevel, haveMoreThanThreeItems }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    justifyContent: 'center',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 30,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: isDeepLevel ? 40 : 32,
    ...(haveMoreThanThreeItems && {
      justifyContent: 'flex-start',
      marginLeft: 16,
    }),
  },
  [theme.breakpoints.up('desktop_1440')]: {
    ...(haveMoreThanThreeItems && {
      marginLeft: 24,
    }),
  },
}));

const ContainerChart = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  position: 'relative',

  [theme.breakpoints.up('tablet_768')]: {
    width: 138,
    minWidth: 138,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 158,
    minWidth: 158,
  },
}));

const ContainerLegend = styled('div', {
  shouldForwardProp: (prop) => !['isDeepLevel', 'changeAlignment', 'numberSlider'].includes(prop as string),
})<{ isDeepLevel: boolean; changeAlignment: boolean; numberSlider: number }>(
  ({ theme, isDeepLevel, changeAlignment, numberSlider }) => ({
    display: 'flex',
    flex: isDeepLevel && numberSlider >= 2 ? 1 : 'none',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: isDeepLevel && changeAlignment ? 'flex-start' : changeAlignment ? 'flex-start' : 'center',
    gap: isDeepLevel ? 16 : 14,
    maxWidth: '100%',
    position: 'relative',

    [theme.breakpoints.up('desktop_1280')]: {
      gap: 16,
    },
  })
);

const ContainerLegendNotSwiper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '100%',
  position: 'relative',
}));

const SwiperWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isDeepLevel' && prop !== 'numberSliderPerLevel',
})<{ isDeepLevel: boolean; numberSliderPerLevel: number }>(({ theme, isDeepLevel, numberSliderPerLevel }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    position: 'relative',
    width: 200,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: isDeepLevel ? 0 : 16,
    display: 'flex',
    width: 250,
    minWidth: 250,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    position: 'relative',
    ...(numberSliderPerLevel === 12 && {
      minWidth: 365,
    }),
  },
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    position: 'relative',
    ...(numberSliderPerLevel === 12 && {
      minWidth: 440,
    }),
  },

  '& .swiper-pagination-horizontal': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  '& .swiper-pagination-bullet': {
    backgroundColor: `${
      theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[700]
    } !important`,
    opacity: 1,
    width: 8,
    height: 8,
    borderRadius: '50%',
    '&:first-of-type': {
      borderRadius: '6px 0 0 6px',
    },
    '&:last-of-type': {
      borderRadius: '0 6px 6px 0',
    },
  },
  '& .swiper-pagination-bullet-active': {
    backgroundColor: `${
      theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50]
    } !important`,
  },
}));

const ContainerDaiIcon = styled('div')({
  width: 64,
  height: 64,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
});
