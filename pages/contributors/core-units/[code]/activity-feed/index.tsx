import CUActivityFeedContainer from '@ses/containers/CUActivity/CUActivityFeedContainer';
import { fetchCoreUnitActivityFeedData } from '@ses/containers/CUActivity/cuActivityAPI';
import { useState, useEffect } from 'react';
import { TeamContext } from '@/core/context/TeamContext';
import type { ChangeTrackingEvent } from '@/core/models/interfaces/activity';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import type { Team } from '@/core/models/interfaces/team';
import { fetchCoreUnits } from '@/views/CoreUnitsIndex/cuTableAPI';
import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';

interface CUActivityProps {
  coreUnits: CoreUnit[];
  coreUnit: CoreUnit;
  activities: ChangeTrackingEvent[];
}

const CoreUnitActivityPage: NextPage<CUActivityProps> = ({ coreUnit, coreUnits, activities }) => {
  const [currentCoreUnit, setCurrentCoreUnit] = useState<CoreUnit>(coreUnit);

  useEffect(() => {
    setCurrentCoreUnit(coreUnit);
  }, [coreUnit]);

  return (
    <TeamContext.Provider
      value={{
        teams: coreUnits as unknown as Team[],
        currentTeam: currentCoreUnit as unknown as Team,
        setCurrentTeam: setCurrentCoreUnit as unknown as (coreUnit: Team) => void,
      }}
    >
      <CUActivityFeedContainer coreUnit={currentCoreUnit} coreUnits={coreUnits} activities={activities} />
    </TeamContext.Provider>
  );
};

export default CoreUnitActivityPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const code = query.code as string;

  const coreUnits = await fetchCoreUnits();
  const coreUnitFiltered = coreUnits.filter((cu) => cu.shortCode === code);
  if (coreUnitFiltered.length === 0 || code === 'DEL') {
    return {
      notFound: true,
    };
  }

  const coreUnitId = coreUnitFiltered[0].id;
  const activities = await fetchCoreUnitActivityFeedData(coreUnitId);

  return {
    props: {
      coreUnits,
      coreUnit: coreUnitFiltered[0],
      activities,
    },
  };
};
