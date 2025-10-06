import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import type { Team } from '@/core/models/interfaces/team';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import HomeView from '@/views/Home/HomeView';
import { getGovernanceProposals } from '@/views/Home/api/makervoteQueries';
import { getScopeOfWorkState } from '@/views/RoadmapMilestones/api/queries';
import { getChiefHat } from '@/web3/api/governance';
import type { GetServerSideProps, NextPage } from 'next';

// TODO: Re-enable finances data once there's a replacement data source for Makerburn, as it was decommissioned.
// Ignore commented code, it was left for quick re-enabling of finances data.
interface HomePageProps {
  // revenueAndSpendingData: RevenueAndSpendingRecords;
  // financesData: FormattedFinancesData;
  teams: Team[];
  governanceProposals: ExtendedExecutiveProposal[];
  roadmaps: Roadmap[];
  hatAddress: string;
}

const HomePage: NextPage<HomePageProps> = ({
  // revenueAndSpendingData,
  // financesData,
  teams,
  governanceProposals,
  roadmaps,
  hatAddress,
}) => (
  <HomeView
    // revenueAndSpendingData={revenueAndSpendingData}
    // financesData={financesData}
    teams={teams}
    governanceProposals={governanceProposals}
    roadmaps={roadmaps}
    hatAddress={hatAddress}
  />
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const [
    // revenueAndSpendingData,
    // financesData,
    teams,
    governanceProposals,
    roadmaps,
    hatAddress,
  ] = await Promise.all([
    // getRevenueAndSpendingData(),
    // getFinancesData(),
    fetchActors(),
    getGovernanceProposals(),
    getScopeOfWorkState(),
    getChiefHat(),
  ]);

  return {
    props: {
      // revenueAndSpendingData,
      // financesData,
      teams,
      governanceProposals,
      roadmaps,
      hatAddress,
    },
  };
};
