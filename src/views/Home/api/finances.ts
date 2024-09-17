import request, { gql } from 'graphql-request';
import clone from 'lodash/cloneDeep';
import { GRAPHQL_ENDPOINT } from '@/config/endpoints';
import type { Analytic } from '@/core/models/interfaces/analytic';

const query = gql`
  query Analytics($filter: AnalyticsFilter) {
    analytics {
      series(filter: $filter) {
        period
        rows {
          dimensions {
            path
          }
          value
          sum
          metric
        }
      }
    }
  }
`;

const filter = {
  filter: {
    start: '2021-01-01',
    end: '2025-01-01',
    granularity: 'quarterly',
    metrics: ['Actuals', 'PaymentsOnChain', 'ProtocolNetOutflow', 'PaymentsOffChainIncluded', 'Forecast'],
    dimensions: [
      {
        name: 'budget',
        select: 'atlas',
        lod: 4,
      },
    ],
    currency: 'DAI',
  },
};

export type MetricKey = 'Actuals' | 'PaymentsOnChain' | 'Forecast' | 'OperationalReserves';
export type MetricKeyExtended = MetricKey | 'ProtocolNetOutflow' | 'PaymentsOffChainIncluded';
export type BudgetKey =
  | 'legacyOthers'
  | 'legacyCoreUnits'
  | 'governanceScope'
  | 'stability'
  | 'support'
  | 'protocol'
  | 'accessibility'
  | 'immutable';
export type FormattedFinancesData = Record<MetricKey, Record<BudgetKey, number[]>>;

const pathRegexMap: Record<BudgetKey, RegExp> = {
  legacyOthers: /^atlas\/legacy\/(?!.*core-units).*$/,
  legacyCoreUnits: /^atlas\/legacy\/core-units.*$/,
  governanceScope: /^atlas\/scopes\/GOV.*$/,
  stability: /^atlas\/scopes\/STA.*$/,
  support: /^atlas\/scopes\/SUP.*$/,
  protocol: /^atlas\/scopes\/PRO.*$/,
  accessibility: /^atlas\/scopes\/ACC.*$/,
  immutable: /^atlas\/immutable.*$/,
};

const emptyData: Record<BudgetKey, number[]> = {
  legacyOthers: [] as number[],
  legacyCoreUnits: [] as number[],
  governanceScope: [] as number[],
  stability: [] as number[],
  support: [] as number[],
  protocol: [] as number[],
  accessibility: [] as number[],
  immutable: [] as number[],
};

export const getFinancesData = async (): Promise<FormattedFinancesData> => {
  const analyticsResponse = await request<{
    analytics: Analytic;
  }>(GRAPHQL_ENDPOINT, query, filter);

  const data: Record<MetricKeyExtended, typeof emptyData> = {
    Actuals: clone(emptyData),
    PaymentsOnChain: clone(emptyData),
    Forecast: clone(emptyData),
    ProtocolNetOutflow: clone(emptyData),
    PaymentsOffChainIncluded: clone(emptyData),
    OperationalReserves: clone(emptyData),
  };

  analyticsResponse.analytics.series.forEach((series) => {
    // quarter x
    const year = Number(series.period.split('/')[0]);
    const quarter = Number(series.period.charAt(6));
    series.rows.forEach((row) => {
      const metric = row.metric as MetricKeyExtended;
      Object.keys(pathRegexMap).forEach((key) => {
        if (pathRegexMap[key as BudgetKey].test(row.dimensions[0].path)) {
          const index = (year - 2021) * 4 + quarter - 1;

          if (!data[metric][key as BudgetKey][index]) {
            data[metric][key as BudgetKey][index] =
              (metric === 'PaymentsOffChainIncluded' || metric === 'ProtocolNetOutflow' ? row.sum : row.value) ?? 0;
          } else {
            data[metric][key as BudgetKey][index] +=
              (metric === 'PaymentsOffChainIncluded' || metric === 'ProtocolNetOutflow' ? row.sum : row.value) ?? 0;
          }
        }
      });
    });
  });

  // calculate operational reserves
  // it is ProtocolNetOutflow - PaymentsOffChainIncluded
  data.OperationalReserves = clone(data.ProtocolNetOutflow);
  Object.keys(data.OperationalReserves).forEach((key) => {
    data.OperationalReserves[key as BudgetKey] = data.ProtocolNetOutflow[key as BudgetKey].map(
      (value, index) => Math.abs(value ?? 0) - Math.abs(data.PaymentsOffChainIncluded[key as BudgetKey][index] ?? 0)
    );
  });

  return data;
};
