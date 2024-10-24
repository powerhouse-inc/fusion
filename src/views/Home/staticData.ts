import type { FormattedFinancesData } from './api/finances';

const FinancesPlaceholder = {
  legacyOthers: [],
  legacyCoreUnits: [],
  governanceScope: [],
  stability: [],
  support: [],
  protocol: [],
  accessibility: [],
  immutable: [],
};
export const financesDataMocked: FormattedFinancesData = {
  PaymentsOnChain: {
    legacyOthers: [260, 220, 190, 160, 120, 80, 50],
    legacyCoreUnits: [480, 400, 300, 200, 140, 100, 40],
    governanceScope: [0, 0, 0, 0, 0, 0, 10, 80, 160, 200, 200, 140, 100, 50, 50, 50],
    stability: [0, 0, 0, 0, 0, 0, 10, 80, 160, 200, 200, 140, 100, 50, 50, 50],
    support: [0, 0, 0, 0, 0, 0, 10, 80, 160, 150, 160, 140, 100, 50, 50, 50],
    protocol: [0, 0, 0, 0, 0, 0, 10, 80, 160, 140, 140, 140, 100, 50, 50, 50],
    accessibility: [0, 0, 0, 0, 0, 0, 10, 80, 160, 120, 120, 140, 100, 50, 50, 50],
    immutable: [0, 0, 0, 0, 0, 0, 10, 80, 160, 100, 100, 140, 100, 50, 50, 50],
  },
  Actuals: FinancesPlaceholder,
  Forecast: FinancesPlaceholder,
  OperationalReserves: FinancesPlaceholder,
};
