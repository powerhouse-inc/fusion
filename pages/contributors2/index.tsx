import type { Team } from '@/core/models/interfaces/team';
import ContributorsView from '@/views/Contributors/ContributorsView';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import type { GetServerSideProps } from 'next/types';

interface Props {
  teams: Team[];
}

const TeamsPage: React.FC<Props> = ({ teams }) => <ContributorsView teams={teams} />;

export default TeamsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const teams = await fetchActors();

  return {
    props: {
      teams,
    },
  };
};
