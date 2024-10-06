import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import { fetchExpenseCategories } from '@ses/containers/FinancesOverview/api/queries';
import { TeamContextProvider } from '@ses/core/context/TeamContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import request from 'graphql-request';
import { notFound } from 'next/navigation';
import { CORE_UNIT_REQUEST, getLastSnapshotPeriod } from '@/views/CoreUnitBudgetStatement/BudgetStatementAPI';
import CoreUnitBudgetStatementView from '@/views/CoreUnitBudgetStatement/CoreUnitBudgetStatementView';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { Team } from '@ses/core/models/interfaces/team';

export async function generateMetadata({ params }: { params: { code: string } }) {
  const { query: gqlQuery, filter } = CORE_UNIT_REQUEST(params.code);
  const data = await request(GRAPHQL_ENDPOINT, gqlQuery, filter);
  const cu = data.coreUnits[0];

  if (!cu) {
    notFound();
  }

  return {
    title: `Sky Fusion - ${cu.name} Budget Statements`,
    description: `View budget statements for ${cu.name} Core Unit.`,
  };
}

export default async function Transparency({ params }: { params: { code: string } }) {
  const code = params.code;
  const { query: gqlQuery, filter } = CORE_UNIT_REQUEST(code);

  const [data, expenseCategories] = await Promise.all([
    request(GRAPHQL_ENDPOINT, gqlQuery, filter),
    fetchExpenseCategories(),
  ]);

  if (data?.coreUnits?.length === 0 || code === 'DEL') {
    notFound();
  }

  const cu = data.coreUnits[0];

  const snapshotLimitPeriods = await getLastSnapshotPeriod(cu.id, ResourceType.CoreUnit);

  return (
    <TeamContextProvider currentTeam={cu as unknown as Team} teams={[]}>
      <CoreUnitBudgetStatementView
        coreUnit={cu as CoreUnit}
        expenseCategories={expenseCategories as ExpenseCategory[]}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        snapshotLimitPeriods={
          snapshotLimitPeriods
            ? {
                earliest: snapshotLimitPeriods.earliest.toJSDate().toISOString(),
                latest: snapshotLimitPeriods.latest.toJSDate().toISOString(),
              }
            : undefined
        }
      />
    </TeamContextProvider>
  );
}
