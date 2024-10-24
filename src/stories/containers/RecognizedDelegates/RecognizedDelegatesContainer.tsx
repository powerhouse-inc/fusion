import { styled } from '@mui/material';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import DelegateExpenseBreakdown from './DelegateExpenseBreakdown/DelegateExpenseBreakdown';
import DelegateExpenseTrend from './DelegateExpenseTrend';
import TotalAndKeyStatsComponent from './TotalAndKeyStatsComponent/TotalAndkeyStatusComponent';
import { useRecognizedDelegates } from './useRecognizedDelegates';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { Analytic } from '@ses/core/models/interfaces/analytic';
import type { FC } from 'react';

interface Props {
  delegates: RecognizedDelegatesDto[];
  totalMakerDAOExpenses: number;
  monthlyAnalytics: Analytic;
  totalAnalytics: Analytic;
}

const RecognizedDelegatesContainer: FC<Props> = ({
  delegates,
  totalMakerDAOExpenses,
  monthlyAnalytics,
  totalAnalytics,
}) => {
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
    <ExtendedPageContainer>
      <SEOHead
        title="Sky Fusion - Recognized Delegates Legacy Ecosystem Contributors"
        description="Learn about Recognized Delegates as legacy contributors: their key information, activity, expenditures, and more."
      />
      <Container>
        <Title>Recognized Delegates</Title>
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

const Title = styled('h1')(({ theme }) => ({
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  marginTop: 32,
  marginBottom: 16,
  [theme.breakpoints.up('table_834')]: {
    fontSize: 24,
    lineHeight: '29px',
    letterSpacing: '0.4px',
    marginTop: 24,
  },
  [theme.breakpoints.up('desktop_1194')]: {
    marginTop: 24,
  },
}));

const ExtendedPageContainer = styled(PageContainer)(({ theme }) => ({
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.background.dm,
  backgroundImage: theme.palette.isLight ? '#FFFFFF' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
}));

const ContainerTrend = styled('div')(({ theme }) => ({
  marginTop: 40,
  marginBottom: 32,
  height: 378,
  [theme.breakpoints.up('table_834')]: {
    width: 690,
    margin: '38px auto 24px',
  },
}));

const ContainerBreakdown = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));

const ContainerButton = styled('div')(({ theme }) => ({
  margin: '46px auto 64px',
  width: 300,
  height: 48,
  [theme.breakpoints.up('desktop_1194')]: {
    margin: '48px auto 64px',
  },
}));

const Button = styled(LinkButton)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.colors.sky[1000],
  border: 'none',
  '&:hover': {
    backgroundColor: `${
      theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.sky[900]
    } !important`,
    '& > div': {
      color: `${theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[50]} !important`,
    },
  },
  '&:active > div': {
    color: `${theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50]} !important`,
  },

  '& > div': {
    fontWeight: 500,
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    lineHeight: '19px',
    color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
}));
