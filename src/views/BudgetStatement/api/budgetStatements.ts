import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ResourceType } from '@ses/core/models/interfaces/types';

const getCompactedBudgetStatementsQuery = (resource: ResourceType) => ({
  query: gql`
    query BudgetStatements($filter: BudgetStatementFilter) {
      budgetStatements(filter: $filter) {
        month
        status
        ownerType
        budgetStatementWallet {
          id
          address
        }
        forecastExpenses
        actualExpenses
        paymentsOnChain
        paymentsOffChain
        netProtocolOutflow
      }
    }
  `,
  filter: {
    filter: {
      ownerType: resource,
    },
  },
});

export const fetchCompactedBudgetStatements = async (resource: ResourceType): Promise<BudgetStatement[]> => {
  const { query, filter } = getCompactedBudgetStatementsQuery(resource);

  const response = await request<{ budgetStatements: BudgetStatement[] }>(GRAPHQL_ENDPOINT, query, filter);

  return response.budgetStatements ?? [];
};
