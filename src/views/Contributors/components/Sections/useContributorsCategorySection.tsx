import { useState } from 'react';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType } from '@/core/models/interfaces/types';

export const useContributorsCategorySection = (teams: Team[]) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState('1');

  const handleActiveCategoryTab = (id: string) => setActiveCategoryTab(id);

  const ecosystemActors =
    teams?.filter((team) => team.type === ResourceType.EcosystemActor).length > 6
      ? teams.filter((team) => team.type === ResourceType.EcosystemActor).slice(0, 6)
      : teams.filter((team) => team.type === ResourceType.EcosystemActor);
  const alignedDelegates =
    teams?.filter((team) => team.type === ResourceType.AlignedDelegates).length > 6
      ? teams.filter((team) => team.type === ResourceType.AlignedDelegates).slice(0, 6)
      : teams.filter((team) => team.type === ResourceType.AlignedDelegates);
  const keepers =
    teams?.filter((team) => team.type === ResourceType.Keepers).length > 6
      ? teams.filter((team) => team.type === ResourceType.Keepers).slice(0, 6)
      : teams.filter((team) => team.type === ResourceType.Keepers);
  const coreUnits =
    teams?.filter((team) => team.type === ResourceType.CoreUnit).length > 6
      ? teams.filter((team) => team.type === ResourceType.CoreUnit).slice(0, 6)
      : teams.filter((team) => team.type === ResourceType.CoreUnit);
  const delegates =
    teams?.filter((team) => team.type === ResourceType.Delegates).length > 6
      ? teams.filter((team) => team.type === ResourceType.Delegates).slice(0, 6)
      : teams.filter((team) => team.type === ResourceType.Delegates);
  const spfs =
    teams?.filter((team) => team.type === ResourceType.SpecialPurposeFund).length > 6
      ? teams.filter((team) => team.type === ResourceType.SpecialPurposeFund).slice(0, 6)
      : teams.filter((team) => team.type === ResourceType.SpecialPurposeFund);

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

  return {
    teamCategoriesTabs,
    activeCategoryTab,
    handleActiveCategoryTab,
    isLegacy,
    ecosystemActors,
    coreUnits,
    alignedDelegates,
    keepers,

    delegates,
    spfs,
  };
};
