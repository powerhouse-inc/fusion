import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import type { Team } from '@/core/models/interfaces/team';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import HomeView from '@/views/Home/HomeView';
import type { FormattedFinancesData } from '@/views/Home/api/finances';
import { getFinancesData } from '@/views/Home/api/finances';
import { getGovernanceProposals } from '@/views/Home/api/makervoteQueries';
import type { RevenueAndSpendingRecords } from '@/views/Home/api/revenueAndSpending';
import { getRevenueAndSpendingData } from '@/views/Home/api/revenueAndSpending';
import { getScopeOfWorkState } from '@/views/RoadmapMilestones/api/queries';
import { getChiefHat } from '@/web3/api/governance';
import type { GetStaticProps, NextPage } from 'next';

interface HomePageProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  financesData: FormattedFinancesData;
  teams: Team[];
  governanceProposals: ExtendedExecutiveProposal[];
  roadmaps: Roadmap[];
  hatAddress: string;
}

const HomePage: NextPage<HomePageProps> = ({
  revenueAndSpendingData,
  financesData,
  teams,
  governanceProposals,
  roadmaps,
  hatAddress,
}) => (
  <HomeView
    revenueAndSpendingData={revenueAndSpendingData}
    financesData={financesData}
    teams={teams}
    governanceProposals={governanceProposals}
    roadmaps={roadmaps}
    hatAddress={hatAddress}
  />
);

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const [revenueAndSpendingData, financesData, teams, governanceProposals, roadmaps, hatAddress] = await Promise.all([
    getRevenueAndSpendingData(),
    getFinancesData(),
    fetchActors(),
    getGovernanceProposals(),
    getScopeOfWorkState(),
    getChiefHat(),
  ]);

  return {
    props: {
      revenueAndSpendingData,
      financesData,
      teams,
      governanceProposals,
      roadmaps,
      hatAddress,
    },
    revalidate: 1800, // Revalidate every 30 minutes (1800 seconds)
  };
};
