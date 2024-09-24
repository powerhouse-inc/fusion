import { useState } from 'react';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType } from '@/core/models/interfaces/types';

export const useContributorsCategorySection = (teams: Team[]) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState('1');

  const handleActiveCategoryTab = (id: string) => setActiveCategoryTab(id);

  // Filter teams by type
  const ecosystemActors = teams?.filter((team) => team.type === ResourceType.EcosystemActor)?.slice(0, 6);
  const alignedDelegates = teams?.filter((team) => team.type === ResourceType.CoreUnit)?.slice(0, 6);
  const keepers = teams?.filter((team) => team.type === ResourceType.EcosystemActor)?.slice(0, 6);
  const coreUnits = teams?.filter((team) => team.type === ResourceType.CoreUnit)?.slice(0, 6);
  const delegates = teams?.filter((team) => team.type === ResourceType.AlignedDelegates)?.slice(0, 6);
  const spfs = teams?.filter((team) => team.type === ResourceType.SpecialPurposeFund)?.slice(0, 6);

  const teamCategoriesTabs = [
    {
      id: '1',
      title: 'Current',
    },
    {
      id: '2',
      title: 'Legacy',
    },
  ];

  const isLegacy = activeCategoryTab === '2';

  // Contributors Home Page
  const subtitleContributors = `These are the  ${
    activeCategoryTab === '1' ? 'Current' : 'Legacy'
  } Contributors in the Sky Ecosystem.`;

  return {
    teamCategoriesTabs,
    activeCategoryTab,
    handleActiveCategoryTab,
    isLegacy,
    ecosystemActors,
    coreUnits,
    alignedDelegates,
    keepers,
    subtitleContributors,
    delegates,
    spfs,
  };
};
