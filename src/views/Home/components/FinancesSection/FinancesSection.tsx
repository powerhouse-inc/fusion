import { styled } from '@mui/material';
import Notice from '@/components/Notice/Notice';
import { getYearsForChart } from '../../utils/utils';
import FinancesBarChartCard from '../FinancesBarChartCard/FinancesBarChartCard';
import FinancesLineChartCard from '../FinancesLineChartCard/FinancesLineChartCard';
import HomeSectionTitle from '../HomeSectionTitle/HomeSectionTitle';
import Section from '../Section/Section';
import type { FormattedFinancesData } from '../../api/finances';
import type { RevenueAndSpendingRecords } from '../../api/revenueAndSpending';

interface FinancesSectionProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  financesData: FormattedFinancesData;
}

const FinancesSection: React.FC<FinancesSectionProps> = ({ revenueAndSpendingData, financesData }) => (
  <Section id="finances">
    <TitleContainer>
      <HomeSectionTitle hash="finances">Finances</HomeSectionTitle>
      <Notice />
    </TitleContainer>
    <Finances>
      <FinancesBarChartCard
        revenueAndSpendingData={revenueAndSpendingData}
        years={getYearsForChart(revenueAndSpendingData)}
      />
      <FinancesLineChartCard financesData={financesData} years={getYearsForChart(revenueAndSpendingData)} />
    </Finances>
  </Section>
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
