import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import CoreUnitsIndexView from '@/views/CoreUnitsIndex/CoreUnitsIndexView';
import { fetchCoreUnits } from '@/views/CoreUnitsIndex/cuTableAPI';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sky Fusion - Core Units Legacy Ecosystem Contributors',
  description:
    'Learn about Core Units as legacy contributor teams: their key information, activity, expenditures, FTE numbers, and more.',
};

const CuTablePage = async () => {
  const coreUnits = await fetchCoreUnits();

  return <CoreUnitsIndexView coreUnits={coreUnits as unknown as CoreUnit[]} />;
};

export default CuTablePage;
