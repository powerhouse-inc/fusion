import { DateTime } from 'luxon';
import BudgetStatementView from '@/views/BudgetStatement/BudgetStatementView';
import { fetchCompactedBudgetStatements } from '@/views/BudgetStatement/api/budgetStatements';
import type { AllowedOwnerType } from '@/views/BudgetStatement/types';
import { allowedOwnerTypeToResourceType } from '@/views/BudgetStatement/utils';

import { getLastSnapshotPeriod } from '@/views/CoreUnitBudgetStatement/BudgetStatementAPI';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

const BudgetStatementPage: NextPage = ({
  snapshotLimitPeriods,
  compactedBudgetStatements,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <BudgetStatementView
    snapshotLimitPeriods={
      snapshotLimitPeriods
        ? {
            // deserialize the ISO strings to date objects
            earliest: DateTime.fromISO(snapshotLimitPeriods.earliest).toUTC(),
            latest: DateTime.fromISO(snapshotLimitPeriods.latest).toUTC(),
          }
        : undefined
    }
    compactedBudgetStatements={compactedBudgetStatements}
  />
);

export default BudgetStatementPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const ownerType = context.params?.ownerType as string;
  if (!ownerType || !['keepers', 'spfs', 'aligned-delegates'].includes(ownerType)) {
    return {
      notFound: true,
    };
  }

  const resourceType = allowedOwnerTypeToResourceType(ownerType as AllowedOwnerType);
  const [snapshotLimitPeriods, compactedBudgetStatements] = await Promise.all([
    getLastSnapshotPeriod(null, resourceType),
    fetchCompactedBudgetStatements(resourceType), // get the budget statements to determine the budget statuses
  ]);

  return {
    props: {
      snapshotLimitPeriods: snapshotLimitPeriods
        ? {
            // serialize the date objects to ISO strings
            earliest: snapshotLimitPeriods.earliest.toISO(),
            latest: snapshotLimitPeriods.latest.toISO(),
          }
        : null,
      compactedBudgetStatements,
    },
  };
};
