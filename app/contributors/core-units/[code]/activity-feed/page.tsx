import { siteRoutes } from '@ses/config/routes';
import { notFound } from 'next/navigation';
import React from 'react';
import CUActivityFeedContainer from '@/stories/containers/CUActivity/CUActivityFeedContainer';
import { fetchCoreUnitActivityFeedData } from '@/stories/containers/CUActivity/cuActivityAPI';
import { fetchCoreUnits } from '@/views/CoreUnitsIndex/cuTableAPI';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { Metadata } from 'next';

interface Props {
  params: { code: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = params;
  const coreUnits = await fetchCoreUnits();
  const coreUnit = coreUnits.find((cu) => cu.shortCode === code);

  if (!coreUnit) {
    return {};
  }

  return {
    title: `Sky Fusion - ${coreUnit.name} Activity Feed`,
    description: `Learn about ${coreUnit.name}'s Activity Feed: including previous modifications that the Core Unit has made to their Expense Reports, FTEs, and more.`,
    alternates: {
      canonical: siteRoutes.coreUnitActivityFeed(coreUnit.shortCode),
    },
  };
}

export default async function CoreUnitActivityPage({ params }: Props) {
  const { code } = params;

  const coreUnits = await fetchCoreUnits();
  const coreUnitFiltered = coreUnits.filter((cu) => cu.shortCode === code);

  if (coreUnitFiltered.length === 0 || code === 'DEL') {
    notFound();
  }

  const coreUnit = coreUnitFiltered[0];
  const activities = await fetchCoreUnitActivityFeedData(coreUnit.id);

  return (
    <CUActivityFeedContainer
      coreUnit={coreUnit as unknown as CoreUnit}
      activities={activities as unknown as ChangeTrackingEvent[]}
    />
  );
}
