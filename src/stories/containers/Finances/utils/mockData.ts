// TODO:  Add builder for this mock data when Api is ready
export interface BudgetData {
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  total: number;
}

export interface QuarterlyBudget {
  name: string;
  isMain?: boolean;
  budget: BudgetData;
  actual: BudgetData;
  'Net Expenses On-chain': BudgetData;
  'Net Expenses Off-chain': BudgetData;
  forecast: BudgetData;
}

export interface MockData {
  [key: string]: QuarterlyBudget[];
}
export const mockDataTableQuarterly: MockData = {
  EndgameAtlasBudgets: [
    {
      name: 'Atlas Immutable AA Budgets',
      isMain: true,
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      budget: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      actual: {
        q1: 1123,
        q2: 4546,
        q3: 12312,
        q4: 1223,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2341,
        q2: 23435,
        q3: 4653,
        q4: 676878,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
    {
      name: 'Aligned Voter Committees',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      budget: {
        q1: 4546676,
        q2: 2208889,
        q3: 4546676,
        q4: 1223232,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
    {
      name: 'Aligned Delegates',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      budget: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
    {
      name: 'SubDAOs',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      budget: {
        q1: 999999999,
        q2: 2208889,
        q3: 999999999,
        q4: 2208889,
        total: 454545,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
  ],
  EndgameScopeBudgets: [
    {
      name: 'Atlas Immutable AA Budgets',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      isMain: true,
      budget: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
    {
      name: 'Support Scope (SUP)',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      budget: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
    {
      name: 'Stability Scope (STA)',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      budget: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
    {
      name: 'Governance Scope (GOV)',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      budget: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
    {
      name: 'Protocol Scope (PRO)',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      budget: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
    {
      name: 'Accessibility Scope (ACC)',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      budget: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
    {
      name: 'Accessibility Scope (ACC)',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      budget: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
  ],
  MakerDAOLegacyBudgets: [
    {
      name: 'Core Units',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      isMain: true,
      budget: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
    {
      name: 'Core Units',
      forecast: {
        q1: 1234567,
        q2: 123,
        q3: 3455,
        q4: 345436,
        total: 34354,
      },
      budget: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
    {
      name: 'Recognized Delegates',
      forecast: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      budget: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      actual: {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses On-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
      'Net Expenses Off-chain': {
        q1: 2208889,
        q2: 2208889,
        q3: 2208889,
        q4: 2208889,
        total: 34354,
      },
    },
  ],
};