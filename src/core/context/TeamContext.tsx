'use client';

import { useContext, createContext } from 'react';
import type { Team } from '../models/interfaces/team';

export type TeamContextValues = {
  teams?: Team[];
  currentTeam?: Team;
  setCurrentTeam?: (team: Team) => void;
};

export const TeamContext = createContext<TeamContextValues>({
  setCurrentTeam: () => {
    throw new Error('Not implemented yet');
  },
});

export const TeamContextProvider = ({
  children,
  currentTeam,
  teams,
}: {
  children: React.ReactNode;
  currentTeam: Team;
  teams: Team[];
}) => (
  <TeamContext.Provider
    value={{
      currentTeam,
      teams,
    }}
  >
    {children}
  </TeamContext.Provider>
);

export const useTeamContext = () => useContext(TeamContext);
