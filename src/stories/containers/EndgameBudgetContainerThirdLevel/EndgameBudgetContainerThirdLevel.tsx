import styled from '@emotion/styled';
import BigButton from '@ses/components/Button/BigButton/BigButton';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import IconTitle from '@ses/components/IconTitle/IconTitle';
import lightTheme from '@ses/styles/theme/light';
import React, { useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BreakdownChartSection from '../Finances/components/BreakdownChartSection/BreakdownChartSection';
import CardCoreUnitThirdLevelBudget from '../Finances/components/CardCoreUnitThirdLevelBudget/CardCoreUnitThirdLevelBudget';
import CardNavigationMobile from '../Finances/components/CardNavigationMobile/CardNavigationMobile';
import ConditionalWrapper from '../Finances/components/ConditionalWrapper/ConditionalWrapper';
import BreadcrumbYearNavigation from '../Finances/components/SectionPages/BreadcrumbYearNavigation';
import BreakdownTable from '../Finances/components/SectionPages/BreakdownTable';
import CardChartOverview from '../Finances/components/SectionPages/CardChartOverview/CardChartOverview';
import DelegateExpenseTrendFinances from '../Finances/components/SectionPages/DelegateExpenseTrendFinances/DelegateExpenseTrendFinances';
import { mockDataTableQuarterlyArray } from '../Finances/utils/mockData';
import { useEndgameBudgetContainerThirdLevel } from './useEndgameBudgetContainerThirdLevel';
import type { NavigationCard } from '../Finances/utils/types';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { SwiperProps, SwiperRef } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

interface Props {
  budgets: Budget[];
  yearsRange: string[];
  initialYear: string;
  coreUnits: CoreUnitDto[];
}

const EndgameBudgetContainerThirdLevel: React.FC<Props> = ({ budgets, yearsRange, initialYear, coreUnits }) => {
  const {
    trailingAddress,
    trailingAddressDesk,
    handleChangeYearsEndgameAtlasBudget,
    year,
    title,
    icon,
    handleLoadMore,
    onSortClick,
    reportExpenseItems,
    showSome,
    headersExpenseReport,
    actuals,
    budgetCap,
    prediction,
    selectedThirdLevel,
    filtersThirdLevel,
    handleSelectFilterThirdLevel,
    doughnutSeriesData,
    loadMoreCards,
    handleLoadMoreCards,
    isLight,
    cardsToShow,
    periodFilter,
    defaultMetricsWithAllSelected,
    activeMetrics,
    handlePeriodChange,
    handleResetMetrics,
    handleSelectChangeMetrics,
    selectMetrics,
    periodicSelectionFilter,
    getAllMetricsValuesTotal,
    allowSelectAll,
    maxItems,
    minItems,
    calculateItemsPerPage,
    popupContainerHeight,
    selectedBreakdownMetric,
    selectedBreakdownGranularity,
    handleBreakdownMetricChange,
    handleBreakdownGranularityChange,
    isDisabled,
    handleResetFilterBreakDownChart,
  } = useEndgameBudgetContainerThirdLevel(budgets, initialYear, coreUnits);
  const ref = useRef<SwiperRef>(null);
  const totalItems = cardsToShow.length;
  const itemsPerPage = calculateItemsPerPage();
  const totalShow = Math.ceil(totalItems / itemsPerPage);
  console.log('totalShow', totalItems, itemsPerPage, totalShow);
  // Options of Swiper
  const swiperOptions = {
    pagination: {
      type: 'bullets',
      enabled: true,
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 2,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 2,
      },
      1440: {
        slidesPerView: 6,
        spaceBetween: 2,
      },
      1920: {
        slidesPerView: 8,
        spaceBetween: 2,
      },
    },
  } as SwiperProps;
  return (
    <PageContainer>
      <BreadcrumbYearNavigation
        trailingAddress={trailingAddress}
        years={yearsRange}
        handleChange={handleChangeYearsEndgameAtlasBudget}
        selectedValue={year}
        trailingAddressDesk={trailingAddressDesk}
        title={title}
      />
      <Container>
        <ContainerTitle>
          <IconTitle icon={icon} title={title} />
        </ContainerTitle>
        <ContainerSections>
          <WrapperDesk>
            <CardChartOverview
              filters={filtersThirdLevel}
              filterSelected={selectedThirdLevel}
              handleSelectFilter={handleSelectFilterThirdLevel}
              actuals={actuals}
              budgetCap={budgetCap}
              prediction={prediction}
              doughnutSeriesData={doughnutSeriesData}
            />
          </WrapperDesk>
          <WrapperMobile>
            {cardsToShow.map((card: NavigationCard, index: number) => (
              <CardNavigationMobile
                valueDai={card?.valueDai || 0}
                totalDai={card?.totalDai || 0}
                href={card.href || '#'}
                image={card.image || ''}
                title={card.title}
                barColor={card.color}
                key={index}
                code={card.code}
              />
            ))}
            {loadMoreCards && (
              <ContainerButton>
                <DividerStyle isLight={isLight} />
                <BigButtonStyled title={'Load More'} onClick={handleLoadMoreCards} />
                <DividerStyle isLight={isLight} />
              </ContainerButton>
            )}
          </WrapperMobile>
          <SwiperWrapper>
            <Swiper
              direction="horizontal"
              ref={ref}
              modules={[Pagination, Navigation]}
              centerInsufficientSlides
              pagination={true}
              {...swiperOptions}
            >
              {cardsToShow.map((coreUnit, index) => (
                <SwiperSlide key={index}>
                  <CardWrapper>
                    <CardCoreUnitThirdLevelBudget
                      code={coreUnit.code}
                      href="#"
                      image={coreUnit.image}
                      name={coreUnit.title}
                    />
                  </CardWrapper>
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>
          <BreakdownChartSection
            year={year}
            selectedMetric={selectedBreakdownMetric}
            selectedGranularity={selectedBreakdownGranularity}
            onMetricChange={handleBreakdownMetricChange}
            onGranularityChange={handleBreakdownGranularityChange}
            isDisabled={isDisabled}
            handleResetFilter={handleResetFilterBreakDownChart}
          />
        </ContainerSections>
        <ConditionalWrapper period={periodFilter}>
          <BreakdownTable
            handleResetMetrics={defaultMetricsWithAllSelected}
            activeItems={activeMetrics}
            handleChange={handlePeriodChange}
            handleResetFilter={handleResetMetrics}
            handleSelectChange={handleSelectChangeMetrics}
            metrics={selectMetrics}
            periodicSelectionFilter={periodicSelectionFilter}
            selectedValue={periodFilter}
            year={year}
            headerTableMetrics={getAllMetricsValuesTotal()}
            metricTotal={getAllMetricsValuesTotal()}
            maxItems={maxItems}
            minItems={minItems}
            allowSelectAll={allowSelectAll}
            popupContainerHeight={popupContainerHeight}
            breakdownTable={[mockDataTableQuarterlyArray[0]]}
          />
        </ConditionalWrapper>
        <ContainerLastReport>
          <DelegateExpenseTrendFinances
            columns={headersExpenseReport}
            expenseReport={reportExpenseItems}
            sortClick={onSortClick}
            handleLoadMore={handleLoadMore}
            showSome={showSome}
          />
        </ContainerLastReport>
      </Container>
    </PageContainer>
  );
};
export default EndgameBudgetContainerThirdLevel;

const ContainerTitle = styled.div({
  marginTop: 24,
  marginBottom: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
    marginTop: 32,
    marginBottom: 64,
  },
});

const ContainerSections = styled.div({
  gap: 16,
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 64,
  },
});

const WrapperDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 64,
  },
});

const ContainerLastReport = styled.div({
  marginTop: 40,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 64,
  },
});

const CardWrapper = styled.div({
  marginLeft: 8,
  marginRight: 8,
  marginBottom: 4,
  marginTop: 4,
  display: 'flex',
  flex: '1',

  [lightTheme.breakpoints.up('tablet_768')]: {
    // marginLeft: 16,
    // marginRight: 16,
  },
});

const SwiperWrapper = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 32,
    display: 'block',
  },

  '& .swiper-slide': {
    maxWidth: 100,

    marginBottom: 20,

    [lightTheme.breakpoints.up('tablet_768')]: {
      maxWidth: 150,
    },
  },

  '& .swiper-pagination': {
    marginTop: 24,
    height: 16,
  },
  '& .swiper-pagination-bullet': {
    width: 16,
    height: 16,
  },
  '& .swiper-pagination-bullet-active': {
    backgroundColor: '#2DC1B1 !important',
  },
  '& .swiper-slide-active': {
    marginLeft: -8,
    [lightTheme.breakpoints.up('tablet_768')]: {
      marginLeft: -16,
    },
  },
});

const WrapperMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});

const ContainerButton = styled.div({
  width: '100%',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  marginTop: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
  },
});
const DividerStyle = styled.div<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#D4D9E1' : '#405361',
  height: 1,
  display: 'flex',
  flex: 1,
}));

const BigButtonStyled = styled(BigButton)({
  minWidth: 127,
  height: 31,
  padding: '8px 24px',
  letterSpacing: 1,
  [lightTheme.breakpoints.up('tablet_768')]: {
    minWidth: 207,
  },
});