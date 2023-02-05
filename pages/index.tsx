import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { CuTable2 } from '@ses/containers/cu-table/cu-table-2';
import { fetchExpenses } from '@ses/containers/finances-overview/api/queries';
import FinancesOverviewContainer from '@ses/containers/finances-overview/finances-overview';
import { ExpenseGranularity } from '@ses/core/models/dto/expenses.dto';
import React from 'react';
import { featureFlags } from '../feature-flags/feature-flags';
import type { ExpenseDto } from '@ses/core/models/dto/expenses.dto';
import type { NextPage } from 'next';

type FinanceOverviewPageProps = {
  quarterExpenses: ExpenseDto[];
};

const FinanceOverviewPage: NextPage<FinanceOverviewPageProps> = ({ quarterExpenses }) => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
    // core unit overview would be the home page if the finances overview is disabled
    return <CuTable2 />;
  }

  return <FinancesOverviewContainer quarterExpenses={quarterExpenses} />;
};

export default FinanceOverviewPage;

export async function getServerSideProps() {
  if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
    const quarterExpenses = await fetchExpenses(ExpenseGranularity.quarterly);

    return {
      props: {
        quarterExpenses,
      },
    };
  }

  return {
    props: {},
  };
}
