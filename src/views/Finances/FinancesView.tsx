import { styled } from '@mui/material';
import IconTitleWithCode from '@ses/components/IconTitleWithCode/IconTitleWithCode';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { BudgetMetricsModalProvider } from '@ses/core/context/BudgetMetricsModalContext';
import React from 'react';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import Notice from '@/components/Notice/Notice';
import BreakdownChartSection from './components/BreakdownChartSection/BreakdownChartSection';
import ConditionalWrapper from './components/ConditionalWrapper/ConditionalWrapper';
import BreadcrumbYearNavigation from './components/SectionPages/BreadcrumbYearNavigation';
import BreakdownTable from './components/SectionPages/BreakdownTable/BreakdownTable';
import CardsNavigation from './components/SectionPages/CardsNavigation/CardsNavigation';
import ExpenseMetricsSection from './components/SectionPages/ExpenseMetricsSection/ExpenseMetricsSection';
import ExpenseReports from './components/SectionPages/ExpenseReports/ExpenseReports';
import OverviewSection from './components/SectionPages/OverviewSection/OverviewSection';
import ReservesWaterfallChartSection from './components/SectionPages/ReservesWaterfallChartSection/ReservesWaterfallChartSection';
import { useFinancesView } from './useFinancesView';
import type { Budget } from '@ses/core/models/interfaces/budget';

interface Props {
  budgets: Budget[];
  allBudgets: Budget[];
  yearsRange: string[];
  initialYear: string;
}

const FinancesView: React.FC<Props> = ({ budgets, allBudgets, yearsRange, initialYear }) => {
  const {
    year,
    levelNumber,
    icon,
    title,
    description,
    breakdownItems,
    cardOverViewSectionData,
    handleChangeYears,
    cardsNavigationInformation,
    breakdownTable,
    expensesMetrics,
    breakdownChartSectionData,
    expenseReportSection,
    reserveChart,
    code,
    isMobile,
    seo,
  } = useFinancesView(budgets, allBudgets, initialYear);

  return (
    <PageContainer>
      <SEOHead title={seo.title} description={seo.description} />

      <BudgetMetricsModalProvider>
        <BreadcrumbYearNavigation
          breakdownItems={breakdownItems}
          years={yearsRange}
          handleChange={handleChangeYears}
          selectedValue={year}
        />

        <Container>
          <TitleContainer>
            {/* Page title */}
            {levelNumber === 1 ? (
              <FirstLevelTitle>Sky Ecosystem Finances</FirstLevelTitle>
            ) : (
              <NthTitleBox>
                <IconTitleWithCode
                  icon={icon || '/assets/img/default-icon-cards-budget.svg'}
                  title={title}
                  code={code}
                />
              </NthTitleBox>
            )}
            <TitleDescription levelNumber={levelNumber}>
              {levelNumber === 1 ? (
                <p>
                  The Sky finances section offers a complete breakdown of budget and expenditure data for contributor
                  teams since the DAO's launch in 2021.
                </p>
              ) : (
                description
              )}
            </TitleDescription>
          </TitleContainer>
          <NoticeContainer>
            <Notice />
          </NoticeContainer>

          <ContainerSections>
            <OverviewSection
              // budget utilization
              paymentsOnChain={cardOverViewSectionData.paymentsOnChain}
              budgetCap={cardOverViewSectionData.budgetCap}
              // chart
              selectedMetric={cardOverViewSectionData.selectedMetric}
              seriesData={cardOverViewSectionData.doughnutSeriesData}
              handleMetricChange={cardOverViewSectionData.handleSelectedMetric}
              // legend
              changeAlignment={cardOverViewSectionData.changeAlignment}
              showSwiper={cardOverViewSectionData.showSwiper}
              numberSliderPerLevel={cardOverViewSectionData.numberSliderPerLevel}
            />
            <CardsNavigation cardsNavigationInformation={cardsNavigationInformation} />
          </ContainerSections>
          <SectionBreakdownChartSection showSwiper={cardOverViewSectionData.showSwiper}>
            <BreakdownChartSection
              isLoading={breakdownChartSectionData.isLoading}
              year={year}
              selectedMetric={breakdownChartSectionData.selectedMetric}
              selectedGranularity={breakdownChartSectionData.selectedGranularity}
              series={breakdownChartSectionData.series}
              handleToggleSeries={breakdownChartSectionData.handleToggleSeries}
              refBreakDownChart={breakdownChartSectionData.refBreakDownChart}
              showLegendValue={breakdownChartSectionData.showLegendValue}
              isChecked={breakdownChartSectionData.isChecked}
              handleChangeSwitch={breakdownChartSectionData.handleChangeSwitch}
              canReset={breakdownChartSectionData.canReset}
              filters={breakdownChartSectionData.filters}
              onReset={breakdownChartSectionData.onReset}
              showScrollAndToggle={breakdownChartSectionData.showScrollAndToggle}
            />
          </SectionBreakdownChartSection>

          <ContainerSpace>
            <ExpenseMetricsSection
              expenseMetrics={{
                title: levelNumber === 1 ? 'Sky Expense Metrics' : `${title} Expense Metrics`,
                selectedGranularity: expensesMetrics.selectedGranularity,
                isCumulative: expensesMetrics.isCumulative,
                cumulativeType: expensesMetrics.cumulativeType,
                series: expensesMetrics.series,
                handleToggleSeries: expensesMetrics.handleToggleSeries,
                isLoading: expensesMetrics.isLoading,
                year,
                filters: expensesMetrics.filters,
                canReset: expensesMetrics.canReset,
                onReset: expensesMetrics.onReset,
              }}
            />
          </ContainerSpace>
          <ContainerSpace>
            <ReservesWaterfallChartSection
              title={`${levelNumber === 1 ? (isMobile ? 'Sky F.' : 'Sky Finances') : title} Reserves`}
              legends={reserveChart.legendItems}
              series={reserveChart.series}
              selectedGranularity={reserveChart.selectedGranularity}
              year={year}
              isLoading={reserveChart.isLoading}
              canReset={reserveChart.canReset}
              onReset={reserveChart.onReset}
              filters={reserveChart.filters}
              startPoint={reserveChart.startPoint}
            />
          </ContainerSpace>
        </Container>
      </BudgetMetricsModalProvider>

      <ConditionalWrapper period={breakdownTable.periodFilter}>
        <BreakdownTable
          activeItems={breakdownTable.activeMetrics}
          selectedValue={breakdownTable.periodFilter}
          year={year}
          breakdownTable={breakdownTable.tableBody ?? []}
          isLoading={breakdownTable.isLoading}
          headerTable={breakdownTable.tableHeader ?? []}
          title={levelNumber === 1 ? 'Sky Budget' : title}
          filters={breakdownTable.filters}
          resetFilters={breakdownTable.resetFilters}
        />
      </ConditionalWrapper>

      <Container>
        <ContainerSpace>
          <ExpenseReports
            year={year}
            selectedMetric={expenseReportSection.selectedMetric}
            onMetricChange={expenseReportSection.onMetricChange}
            selectedStatuses={expenseReportSection.selectedStatuses}
            onStatusSelectChange={expenseReportSection.onStatusSelectChange}
            handleResetFilter={expenseReportSection.handleResetFilter}
            statusesItems={expenseReportSection.statusesItems}
            columns={expenseReportSection.headersExpenseReport}
            sortClick={expenseReportSection.onSortClick}
            expenseReportResponse={expenseReportSection.expenseReportResponse}
            isDisabled={expenseReportSection.isDisabled}
            hasExpenseReport={expenseReportSection.hasExpenseReports}
            sorts={expenseReportSection.sorts}
            canReset={expenseReportSection.canReset}
            onReset={expenseReportSection.onReset}
          />
        </ContainerSpace>
      </Container>
    </PageContainer>
  );
};

export default FinancesView;

const TitleContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 72,
  marginBottom: 16,
}));

const NoticeContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: 16,

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'flex-end',
  },
}));

const TitleDescription = styled('div')<{ levelNumber: number }>(({ theme, levelNumber }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: '22px',
  color: theme.palette.colors.gray[500],
  margin: 0,
  marginLeft: levelNumber === 1 ? 0 : 40,

  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: levelNumber === 1 ? 0 : 58,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },

  p: {
    margin: 0,
  },
}));

const FirstLevelTitle = styled('h1')(({ theme }) => ({
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '120%',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  margin: 0,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 24,
  },
}));

const NthTitleBox = styled('h1')(({ theme }) => ({
  margin: 0,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 28,
  },
}));

const ContainerSections = styled('div')(({ theme }) => ({
  gap: 16,
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const SectionBreakdownChartSection = styled('div')<{ showSwiper: boolean }>(({ theme, showSwiper }) => ({
  marginTop: showSwiper ? 12 : 24,
  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: showSwiper ? 20 : 32,
  },
}));

const ContainerSpace = styled('div')(({ theme }) => ({
  marginTop: 24,
  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,
  },
}));
