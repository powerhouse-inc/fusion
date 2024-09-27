'use client';

import { styled } from '@mui/material';
import { headerCardData } from '../../staticData';
import { getYearsForChart } from '../../utils/utils';
import FinancesBarChartCard from '../FinancesBarChartCard/FinancesBarChartCard';
import FinancesLineChartCard from '../FinancesLineChartCard/FinancesLineChartCard';
import HomeSectionTitle from '../HomeSectionTitle/HomeSectionTitle';
import Notice from './Notice';
import type { FormattedFinancesData } from '../../api/finances';
import type { RevenueAndSpendingRecords } from '../../api/revenueAndSpending';

interface FinancesSectionProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  financesData: FormattedFinancesData;
}

const FinancesSection: React.FC<FinancesSectionProps> = ({ revenueAndSpendingData, financesData }) => (
  <>
    <TitleContainer>
      <HomeSectionTitle hash={headerCardData.buttonTexts[0].toLowerCase()}>Finances</HomeSectionTitle>
      <Notice />
    </TitleContainer>
    <Finances>
      <FinancesBarChartCard
        revenueAndSpendingData={revenueAndSpendingData}
        years={getYearsForChart(revenueAndSpendingData)}
      />
      <FinancesLineChartCard financesData={financesData} years={getYearsForChart(revenueAndSpendingData)} />
    </Finances>
  </>
);

export default FinancesSection;

const Finances = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 8,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    gap: 32,
  },
}));

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
