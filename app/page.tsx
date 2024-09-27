import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import HomeView from '@/views/Home/HomeView';
import { getFinancesData } from '@/views/Home/api/finances';
import { getGovernanceProposals } from '@/views/Home/api/makervoteQueries';
import { getRevenueAndSpendingData } from '@/views/Home/api/revenueAndSpending';
import { getScopeOfWorkState } from '@/views/RoadmapMilestones/api/queries';
import { getChiefHat } from '@/web3/api/governance';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sky Fusion Dashboard',
  description:
    "Sky Fusion Dashboard offers key data insights into the Sky Ecosystem's finances, governance, contributors, and roadmaps.",
};

export const revalidate = 60; // 1 minute

const Page = async () => {
  const [revenueAndSpendingData, financesData, teams, governanceProposals, roadmaps, hatAddress] = await Promise.all([
    getRevenueAndSpendingData(),
    getFinancesData(),
    fetchActors(),
    getGovernanceProposals(),
    getScopeOfWorkState(),
    getChiefHat(),
  ]);

  return (
    <HomeView
      revenueAndSpendingData={revenueAndSpendingData}
      financesData={financesData}
      teams={teams}
      governanceProposals={governanceProposals}
      roadmaps={roadmaps}
      hatAddress={hatAddress ?? ''}
    />
  );
};

export default Page;
