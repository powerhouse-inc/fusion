import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import AccountsSnapshotTabContainer from '@/components/AccountsSnapshot/AccountsSnapshotTabContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import BudgetStatementPager from '@/components/BudgetStatement/BudgetStatementPager/BudgetStatementPager';
import PageContainer from '@/components/Container/PageContainer';
import TeamHeader from '@/components/TeamHeader/TeamHeader';
import type { SnapshotLimitPeriods } from '@/core/hooks/useBudgetStatementPager';
import type { Team } from '@/core/models/interfaces/team';
import type { ResourceType } from '@/core/models/interfaces/types';
import useBudgetStatementView from './useBudgetStatementView';

interface BudgetStatementViewProps {
  snapshotLimitPeriods: SnapshotLimitPeriods | undefined;
}

const BudgetStatementView: React.FC<BudgetStatementViewProps> = ({ snapshotLimitPeriods }) => {
  const {
    ownerTypeQuery,
    ownerType,
    teamInfo,
    breadcrumbItems,
    snapshotCreated,
    setSnapshotCreated,
    currentMonth,
    hasNextMonth,
    hasPreviousMonth,
    handleNextMonth,
    handlePreviousMonth,
  } = useBudgetStatementView(snapshotLimitPeriods);

  return (
    <PageContainer>
      <SEOHead
        title={`MakerDAO Teams | ${teamInfo.name}`}
        description={teamInfo.sentenceDescription}
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
        canonicalURL={siteRoutes.budgetStatements(ownerTypeQuery)}
      />

      <Breadcrumb items={breadcrumbItems} />
      <TeamHeader team={teamInfo as unknown as Team} withDescription={false} />

      <ContainerInside>
        <BudgetStatementPager
          currentMonth={currentMonth}
          handleNext={handleNextMonth}
          handlePrevious={handlePreviousMonth}
          hasNext={hasNextMonth()}
          hasPrevious={hasPreviousMonth()}
          showExpenseReportStatusCTA={false}
          lastUpdate={snapshotCreated}
        />

        <Wrapper>
          <AccountsSnapshotTabContainer
            snapshotOwner={teamInfo.name}
            currentMonth={currentMonth}
            ownerId={null}
            longCode={teamInfo.code}
            shortCode={teamInfo.code}
            resource={ownerType as unknown as ResourceType}
            setSnapshotCreated={setSnapshotCreated}
          />
        </Wrapper>
      </ContainerInside>
    </PageContainer>
  );
};

export default BudgetStatementView;

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

const Wrapper = styled('div')(({ theme }) => ({
  marginTop: 24,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 32,
  },
}));
