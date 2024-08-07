import type { Maybe } from './generics';

export interface MakerburnHistory {
  date: string;
  annual_fees: Maybe<number>;
  annual_fees_sai: Maybe<number>;
  annual_interest_dsr: Maybe<number>;
  annual_mkr_vesting: Maybe<number>;
  crypto_dai: Maybe<number>;
  dai_expenses_1_mth: Maybe<number>;
  dai_expenses_3_mth: Maybe<number>;
  dai_expenses_12_mth: Maybe<number>;
  dai_in_dsr: Maybe<number>;
  eth_price: Maybe<number>;
  expenses_annually: Maybe<number>;
  liq_income_monthly: Maybe<number>;
  liq_profit_1_mth: Maybe<number>;
  liq_profit_3_mth: Maybe<number>;
  liq_profit_12_mth: Maybe<number>;
  mcd_dsr_rate: Maybe<number>;
  mkr_burned: Maybe<number>;
  mkr_price: Maybe<number>;
  mkr_treasury: Maybe<number>;
  mkr_uni_pool: Maybe<number>;
  non_sc_dai: Maybe<number>;
  psm_fees_monthly: Maybe<number>;
  psm_swap_fees_1_mth: Maybe<number>;
  psm_swap_fees_3_mth: Maybe<number>;
  psm_swap_fees_12_mth: Maybe<number>;
  rwa_dai: Maybe<number>;
  sai_cap: Maybe<number>;
  sb: Maybe<number>;
  sc_dai: Maybe<number>;
  surplus: Maybe<number>;
  total_dai_supply: Maybe<number>;
  total_sai_supply: Maybe<number>;
  univ2_fees_1_mth: Maybe<number>;
  univ2_fees_3_mth: Maybe<number>;
  univ2_fees_12_mth: Maybe<number>;
  univ2_profit_1_mth: Maybe<number>;
  univ2_profit_3_mth: Maybe<number>;
  univ2_profit_12_mth: Maybe<number>;
}