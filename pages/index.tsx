import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import type { Team } from '@/core/models/interfaces/team';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import HomeView from '@/views/Home/HomeView';
import type { FormattedFinancesData } from '@/views/Home/api/finances';
import { getFinancesData } from '@/views/Home/api/finances';
import { getGovernanceProposals } from '@/views/Home/api/makervoteQueries';
import type { RevenueAndSpendingRecords } from '@/views/Home/api/revenueAndSpending';
import { getScopeOfWorkState } from '@/views/RoadmapMilestones/api/queries';
import { getChiefHat } from '@/web3/api/governance';
import type { GetServerSideProps, NextPage } from 'next';

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

export const getServerSideProps: GetServerSideProps = async () => {
  const [
    // TODO: re-enable revenue and spending fetching once there's a replacement for makerburn api
    // revenueAndSpendingData,
    financesData,
    teams,
    governanceProposals,
    roadmaps,
    hatAddress,
  ] = await Promise.all([
    // getRevenueAndSpendingData(),
    getFinancesData(),
    fetchActors(),
    getGovernanceProposals(),
    getScopeOfWorkState(),
    getChiefHat(),
  ]);

  const revenueAndSpendingData = {
    2021: {
      fees: 0,
      liquidationIncome: 0,
      psm: 0,
      daiSpent: 0,
      mkrVesting: 0,
      dsr: 0,
    },
    2022: {
      fees: 0,
      liquidationIncome: 0,
      psm: 0,
      daiSpent: 0,
      mkrVesting: 0,
      dsr: 0,
    },
    2023: {
      fees: 0,
      liquidationIncome: 0,
      psm: 0,
      daiSpent: 0,
      mkrVesting: 0,
      dsr: 0,
    },
    2024: {
      fees: 0,
      liquidationIncome: 0,
      psm: 0,
      daiSpent: 0,
      mkrVesting: 0,
      dsr: 0,
    },
  };

  return {
    props: {
      revenueAndSpendingData,
      financesData,
      teams,
      governanceProposals,
      roadmaps,
      hatAddress,
    },
  };
};
