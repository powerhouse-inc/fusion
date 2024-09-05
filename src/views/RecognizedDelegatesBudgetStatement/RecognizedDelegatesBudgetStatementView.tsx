import { styled } from '@mui/material';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { CommentActivityContext } from '@ses/core/context/CommentActivityContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import AuditorCommentsContainer from '@/components/BudgetStatement/BudgetStatementAuditorComments/AuditorCommentsContainer/AuditorCommentsContainer';
import BudgetStatementPager from '@/components/BudgetStatement/BudgetStatementPager/BudgetStatementPager';
import PageContainer from '@/components/Container/PageContainer';
import Tabs from '@/components/Tabs/Tabs';
import TeamHeader from '@/components/TeamHeader/TeamHeader';
import type { Snapshots } from '@/core/models/dto/snapshotAccountDTO';
import DelegatesActuals from './components/DelegatesActuals/DelegatesActuals';
import DelegatesForecast from './components/DelegatesForecast/DelegatesForecast';
import useRecognizedDelegatesReport, { DELEGATES_REPORT_IDS_ENUM } from './useRecognizedDelegatesReport';
import type { DelegatesDto } from '@ses/core/models/dto/delegatesDTO';

type RecognizedDelegatesProps = {
  delegates: DelegatesDto;
  snapshots: Snapshots[];
};

const RecognizedDelegatesBudgetStatementView: React.FC<RecognizedDelegatesProps> = ({ delegates, snapshots }) => {
  const {
    itemsBreadcrumb,
    isMobile,
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
        title={'MakerDAO Recognized Delegates Expense Reports | Finances'}
        description={
          'MakerDAO Recognized Delegates Expenses Reports provides a transparent overview of recognized delegates expenses, compensations, and benefits'
        }
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
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

        <ContainerAdditionalNotes>
          <TitleNotes>Additional Notes</TitleNotes>
          <Description>
            The expenses on this page are for all Recognized Delegates that receive compensation. To view all delegates
            visit
            <span>
              <CustomLink
                iconWidth={10}
                iconHeight={10}
                children={'vote.makerdao.com/delegates'}
                href="https://vote.makerdao.com/delegates"
                marginLeft="7px"
              />
            </span>
          </Description>
          <Description>
            MakerDAO forum reports for delegate can be found
            <SpacerDescription style={{ width: 1 }} />
            <CustomLink
              iconWidth={10}
              iconHeight={10}
              children={'here'}
              href="https://forum.makerdao.com/tag/compensation"
              marginLeft="7px"
              style={{
                marginLeft: isMobile ? '0px' : '4px',
              }}
            />
          </Description>
        </ContainerAdditionalNotes>
      </ContainerInside>
    </PageContainer>
  );
};

export default RecognizedDelegatesBudgetStatementView;

const ContainerInside = styled('div')(({ theme }) => ({
  display: 'block',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1440px',
  marginBottom: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 24,
  paddingRight: '64px',
  paddingLeft: '64px',

  [theme.breakpoints.up('desktop_1920')]: {
    maxWidth: '1312px',
    paddingRight: '0px',
    paddingLeft: '0px',
  },

  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    paddingRight: '48px',
    paddingLeft: '48px',
  },

  [theme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    paddingRight: '32px',
    paddingLeft: '32px',
  },

  [theme.breakpoints.down('tablet_768')]: {
    paddingRight: '16px',
    paddingLeft: '16px',
  },
}));

const ContainerTabs = styled('div')(({ theme }) => ({
  margin: '32px 0',

  '& > div > div > a': {
    paddingBottom: 8,

    [theme.breakpoints.up('tablet_768')]: {
      paddingBottom: 14,
    },
  },
}));

const ContainerAdditionalNotes = styled('div')({
  marginTop: 40,
  marginBottom: 64,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const Description = styled('div')(({ theme }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  letterSpacing: 0,
  color: theme.palette.isLight ? '#231536' : '#d2d4ef',
  '> a': {
    fontSize: 14,
    lineHeight: '18px',
    letterSpacing: 0,
  },
  '> span a': {
    fontSize: 14,
    lineHeight: '18px',
    letterSpacing: 0,
  },
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    '> a': {
      fontSize: 16,
      lineHeight: '18px',
      letterSpacing: 0,
    },
    '> span a': {
      fontSize: 16,
      lineHeight: '18px',
      letterSpacing: 0,
    },
  },
}));
const TitleNotes = styled('div')(({ theme }) => ({
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  display: 'flex',
  color: theme.palette.isLight ? '#231536' : '#d2d4ef',
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const SpacerDescription = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));
