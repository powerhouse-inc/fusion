import orderBy from 'lodash/orderBy';

import { useState } from 'react';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType } from '@/core/models/interfaces/types';

export const useContributorsCategorySection = (teams: Team[]) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState('1');

  const handleActiveCategoryTab = (id: string) => setActiveCategoryTab(id);

  const orderedTeams = orderBy(
    teams,
    [(team) => team.lastActivity?.created_at ?? '', (team) => team.lastActivity?.update_at ?? ''],
    ['desc', 'desc']
  );

  const ecosystemActors =
    orderedTeams?.filter((team) => team.type === ResourceType.EcosystemActor).length > 4
      ? orderedTeams.filter((team) => team.type === ResourceType.EcosystemActor).slice(0, 4)
      : orderedTeams.filter((team) => team.type === ResourceType.EcosystemActor);
  const alignedDelegates =
    orderedTeams?.filter((team) => team.type === ResourceType.AlignedDelegates).length > 4
      ? orderedTeams.filter((team) => team.type === ResourceType.AlignedDelegates).slice(0, 4)
      : orderedTeams.filter((team) => team.type === ResourceType.AlignedDelegates);
  const keepers =
    orderedTeams?.filter((team) => team.type === ResourceType.Keepers).length > 4
      ? orderedTeams.filter((team) => team.type === ResourceType.Keepers).slice(0, 4)
      : orderedTeams.filter((team) => team.type === ResourceType.Keepers);
  const coreUnits =
    orderedTeams?.filter((team) => team.type === ResourceType.CoreUnit).length > 4
      ? orderedTeams.filter((team) => team.type === ResourceType.CoreUnit).slice(0, 4)
      : orderedTeams.filter((team) => team.type === ResourceType.CoreUnit);
  const delegates =
    orderedTeams?.filter((team) => team.type === ResourceType.Delegates).length > 4
      ? orderedTeams.filter((team) => team.type === ResourceType.Delegates).slice(0, 4)
      : orderedTeams.filter((team) => team.type === ResourceType.Delegates);
  const spfs =
    orderedTeams?.filter((team) => team.type === ResourceType.SpecialPurposeFund).length > 4
      ? orderedTeams.filter((team) => team.type === ResourceType.SpecialPurposeFund).slice(0, 4)
      : orderedTeams.filter((team) => team.type === ResourceType.SpecialPurposeFund);

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
