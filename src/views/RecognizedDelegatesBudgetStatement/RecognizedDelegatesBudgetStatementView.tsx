import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import AuditorCommentsContainer from '@/components/BudgetStatement/BudgetStatementAuditorComments/AuditorCommentsContainer/AuditorCommentsContainer';
import BudgetStatementPager from '@/components/BudgetStatement/BudgetStatementPager/BudgetStatementPager';
import PageContainer from '@/components/Container/PageContainer';
import Tabs from '@/components/Tabs/Tabs';
import TeamHeader from '@/components/TeamHeader/TeamHeader';
import { siteRoutes } from '@/config/routes';
import { CommentActivityContext } from '@/core/context/CommentActivityContext';
import type { DelegatesDto } from '@/core/models/dto/delegatesDTO';
import type { Snapshots } from '@/core/models/dto/snapshotAccountDTO';
import { ResourceType } from '@/core/models/interfaces/types';
import DelegatesActuals from './components/DelegatesActuals/DelegatesActuals';
import DelegatesForecast from './components/DelegatesForecast/DelegatesForecast';
import TransactionLink from './components/TransactionLink/TransactionLink';
import useRecognizedDelegatesReport, { DELEGATES_REPORT_IDS_ENUM } from './useRecognizedDelegatesReport';

type RecognizedDelegatesProps = {
  delegates: DelegatesDto;
  snapshots: Snapshots[];
};

const RecognizedDelegatesBudgetStatementView: React.FC<RecognizedDelegatesProps> = ({ delegates, snapshots }) => {
  const {
    itemsBreadcrumb,
    lastUpdateForBudgetStatement,
    showExpenseReportStatusCTA,
    tabItems,
    lastVisitHandler,
    currentMonth,
    currentBudgetStatement,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    allBudgetStatement,
    comments,
    selectedTab,
    onTabChange,
    delegateTeam,
    currentStatus,
  } = useRecognizedDelegatesReport(delegates, snapshots);

  return (
    <PageContainer>
      <SEOHead
        title="Sky Fusion - Recognized Delegates Budget Statements"
        description="Learn about Recognized Delegates' Budget Statements: total funding overview from reported expenses for the recognized delegates that have received compensation."
        canonicalURL={siteRoutes.recognizedDelegateReport}
      />

      <Breadcrumb items={itemsBreadcrumb} />
      <TeamHeader team={delegateTeam} withDescription={false} />

      <ContainerInside>
        <BudgetStatementPager
          currentMonth={currentMonth}
          handleNext={handleNextMonth}
          handlePrevious={handlePreviousMonth}
          hasNext={hasNextMonth()}
          hasPrevious={hasPreviousMonth()}
          budgetStatus={currentStatus}
          showExpenseReportStatusCTA={showExpenseReportStatusCTA}
          lastUpdate={lastUpdateForBudgetStatement}
        />

        <ContainerTabs>
          <Tabs tabs={tabItems} onChange={onTabChange} tabQuery={'section'} />
        </ContainerTabs>

        {selectedTab === DELEGATES_REPORT_IDS_ENUM.ACTUALS && (
          <DelegatesActuals budgetStatement={allBudgetStatement} currentMonth={currentMonth} />
        )}
        {selectedTab === DELEGATES_REPORT_IDS_ENUM.FORECAST && (
          <DelegatesForecast budgetStatement={allBudgetStatement} currentMonth={currentMonth} />
        )}
        {selectedTab === DELEGATES_REPORT_IDS_ENUM.COMMENTS && (
          <CommentActivityContext.Provider value={{ lastVisitHandler }}>
            <AuditorCommentsContainer
              budgetStatement={currentBudgetStatement}
              comments={comments}
              resource={ResourceType.Delegates}
            />
          </CommentActivityContext.Provider>
        )}

        <AdditionalNotesContainer>
          <AdditionalNotesTitle>Additional Notes</AdditionalNotesTitle>
          <AdditionalNotesDescriptionContainer>
            <AdditionalNotesDescription>
              The expenses on this page are for all Recognized Delegates that receive compensation.
            </AdditionalNotesDescription>
            <TransactionLink href="https://vote.makerdao.com/delegates" text="vote.makerdao.com/delegates" />
            <TransactionLink
              href="https://forum.makerdao.com/tag/compensation"
              text="MakerDAO forum reports for delegate"
            />
          </AdditionalNotesDescriptionContainer>
        </AdditionalNotesContainer>
      </ContainerInside>
    </PageContainer>
  );
};

export default RecognizedDelegatesBudgetStatementView;

const ContainerInside = styled('div')(({ theme }) => ({
  display: 'block',
  width: '100%',
  margin: '16px auto 0px',
  paddingRight: 16,
  paddingLeft: 16,
  textAlign: 'left',

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
    paddingRight: 32,
    paddingLeft: 32,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingRight: 40,
    paddingLeft: 40,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

const ContainerTabs = styled('div')(({ theme }) => ({
  margin: '32px 0 24px',

  '& > div > div > a': {
    paddingBottom: 8,
  },

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
  },
}));

const AdditionalNotesContainer = styled('div')({
  margin: '32px 0px 64px',
});

const AdditionalNotesTitle = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    lineHeight: '21.6px',
  },
}));

const AdditionalNotesDescriptionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 8,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 16,
  },
}));

const AdditionalNotesDescription = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },
}));
