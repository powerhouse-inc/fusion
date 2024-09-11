import styled from '@emotion/styled';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import DelegateExpenseBreakdown from './DelegateExpenseBreakdown/DelegateExpenseBreakdown';
import DelegateExpenseTrend from './DelegateExpenseTrend';
import TotalAndKeyStatsComponent from './TotalAndKeyStatsComponent/TotalAndkeyStatusComponent';
import { useRecognizedDelegates } from './useRecognizedDelegates';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { Analytic } from '@ses/core/models/interfaces/analytic';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  delegates: RecognizedDelegatesDto[];
  totalMakerDAOExpenses: number;
  monthlyAnalytics: Analytic;
  totalAnalytics: Analytic;
}

const RecognizedDelegatesContainer: React.FC<Props> = ({
  delegates,
  totalMakerDAOExpenses,
  monthlyAnalytics,
  totalAnalytics,
}) => {
  const { isLight } = useThemeContext();
  const {
    totalDAI,
    mediaAnnual,
    shadowTotal,
    recognizedDelegates,
    startDate,
    endDate,
    handleSelectChange,
    activeElements,
    selectElements,
    handleResetFilter,
    resultFilteredCards,
    delegatesExpenses,
    otherExpenses,
    maxValuesRelative,
    resultFilteredChart,
  } = useRecognizedDelegates(delegates, totalMakerDAOExpenses, monthlyAnalytics, totalAnalytics);

  return (
    <ExtendedPageContainer isLight={isLight}>
      <SEOHead
        title="Sky Fusion - Recognized Delegates Legacy Ecosystem Contributors"
        description="Learn about Recognized Delegates as legacy contributors: their key information, activity, expenditures, and more."
      />
      <Container>
        <Title isLight={isLight}>Recognized Delegates</Title>
        <TotalAndKeyStatsComponent
          totalDAI={totalDAI}
          start={startDate}
          end={endDate}
          annual={mediaAnnual}
          shadowTotal={shadowTotal}
          totalDelegates={recognizedDelegates}
          delegatesExpenses={delegatesExpenses}
          otherExpenses={otherExpenses}
        />
        <ContainerTrend>
          <DelegateExpenseTrend
            handleResetFilter={handleResetFilter}
            expenses={resultFilteredChart}
            endDate={endDate}
            startDate={startDate}
            activeItems={activeElements}
            items={selectElements}
            handleSelectChange={handleSelectChange}
          />
        </ContainerTrend>
        <ContainerBreakdown>
          <DelegateExpenseBreakdown
            delegates={resultFilteredCards}
            totalDai={totalDAI}
            relativeValue={maxValuesRelative}
          />
        </ContainerBreakdown>
        <ContainerButton>
          <Button
            href={siteRoutes.recognizedDelegateReport}
            label="View Budget Statements"
            buttonType={ButtonType.Primary}
          />
        </ContainerButton>
      </Container>
    </ExtendedPageContainer>
  );
};

export default RecognizedDelegatesContainer;

const Title = styled.h1<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 32,
  marginBottom: 16,
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 24,
    lineHeight: '29px',
    letterSpacing: '0.4px',
    marginTop: 24,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 24,
  },
}));

const ExtendedPageContainer = styled(PageContainer)<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
}));

const ContainerTrend = styled.div({
  marginTop: 40,
  marginBottom: 32,
  height: 378,
  [lightTheme.breakpoints.up('table_834')]: {
    width: 690,
    margin: '38px auto 24px',
  },
});

const ContainerBreakdown = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

const ContainerButton = styled.div({
  margin: '46px auto 64px',
  width: 300,
  height: 48,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    margin: '48px auto 64px',
  },
});

const Button = styled(LinkButton)({
  width: '100%',

  '& > div': {
    fontWeight: 500,
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    lineHeight: '19px',
  },
});
