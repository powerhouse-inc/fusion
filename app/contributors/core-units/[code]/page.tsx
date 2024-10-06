import { TeamContextProvider } from '@ses/core/context/TeamContext';
import isEmpty from 'lodash/isEmpty';
import { notFound } from 'next/navigation';
import CoreUnitAboutView from '@/views/CoreUnitAbout/CoreUnitAboutView';
import { fetchCoreUnitByCode } from '@/views/CoreUnitAbout/cuAboutAPI';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { Team } from '@ses/core/models/interfaces/team';

export async function generateMetadata({ params }: { params: { code: string } }) {
  const cuAbout = await fetchCoreUnitByCode(params.code);
  return {
    title: `Sky Fusion - ${cuAbout.name}`,
    description: cuAbout.sentenceDescription,
  };
}

export default async function CoreUnitAboutPage({ params }: { params: { code: string } }) {
  const code = params.code;
  const cuAbout = await fetchCoreUnitByCode(code);

  if (isEmpty(cuAbout) || code === 'DEL') {
    notFound();
  }

  return (
    <TeamContextProvider currentTeam={cuAbout as unknown as Team} teams={[]}>
      <CoreUnitAboutView code={code} cuAbout={cuAbout as CoreUnit} />
    </TeamContextProvider>
  );
}
