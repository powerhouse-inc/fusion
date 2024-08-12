import { SWRConfig, unstable_serialize as unstableSerialize } from 'swr';
import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import type { Team } from '@/core/models/interfaces/team';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import HomeView from '@/views/Home/HomeView';
import type { FormattedFinancesData } from '@/views/Home/api/finances';
import { getFinancesData } from '@/views/Home/api/finances';
import { getForumPosts } from '@/views/Home/api/forum';
import { getGovernanceProposals } from '@/views/Home/api/makervoteQueries';
import type { RevenueAndSpendingRecords } from '@/views/Home/api/revenueAndSpending';
import { getRevenueAndSpendingData } from '@/views/Home/api/revenueAndSpending';
import { ForumCategories } from '@/views/Home/components/GovernanceSection/ForumOverview/categories';
import { getScopeOfWorkState } from '@/views/RoadmapMilestones/api/queries';
import type { GetServerSideProps, NextPage } from 'next';

interface HomePageProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  financesData: FormattedFinancesData;
  teams: Team[];
  governanceProposals: ExtendedExecutiveProposal[];
  roadmaps: Roadmap[];
  fallback: Record<string, unknown>;
}

const HomePage: NextPage<HomePageProps> = ({
  revenueAndSpendingData,
  financesData,
  teams,
  governanceProposals,
  roadmaps,
  fallback,
}) => (
  <SWRConfig value={{ fallback }}>
    <HomeView
      revenueAndSpendingData={revenueAndSpendingData}
      financesData={financesData}
      teams={teams}
      governanceProposals={governanceProposals}
      roadmaps={roadmaps}
    />
  </SWRConfig>
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const [revenueAndSpendingData, financesData, teams, governanceProposals, forumPosts, roadmaps] = await Promise.all([
    getRevenueAndSpendingData(),
    getFinancesData(),
    fetchActors(),
    getGovernanceProposals(),
    getForumPosts(ForumCategories[0].id),
    getScopeOfWorkState(),
  ]);

  return {
    props: {
      revenueAndSpendingData,
      financesData,
      teams,
      governanceProposals,
      roadmaps,
      fallback: {
        [unstableSerialize(['forum', ForumCategories[0].id.toString()])]: forumPosts,
      },
    },
  };
};
