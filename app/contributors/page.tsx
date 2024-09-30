import ContributorsView from '@/views/Contributors/ContributorsView';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sky Fusion - Ecosystem Contributors',
  description:
    'Learn about the current and legacy contributor teams and individuals in the Sky Ecosystem: Ecosystem Actors, Aligned Delegates, Keepers, and more.',
};

const Page = async () => {
  const teams = await fetchActors();

  return <ContributorsView teams={teams} />;
};

export default Page;
