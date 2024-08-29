import { styled } from '@mui/material';
import type { MetricValues } from '@/views/Finances/utils/types';
import { filterActiveMetrics } from '@/views/Finances/utils/utils';
import { orderMetrics } from '../utils';
import CellMonthly from './CellMonthly';

interface Props {
  title: string;
  headerTable: MetricValues[];
  activeMetrics: string[];
}

export const HeaderMonthly: React.FC<Props> = ({ title, activeMetrics, headerTable }) => {
  const keysMetrics = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Total'];
  const metricsActive = filterActiveMetrics(activeMetrics, headerTable);

  return (
    <Container>
      <ContainerAnnually>
        <ContainerTitle>
          <Title>{title}</Title>
        </ContainerTitle>
        <ContainerYear>
          <ContainerAnnuallyCell>
            {keysMetrics.map((month, index) => (
              <CellMonthly
                metrics={metricsActive[index]}
                title={month}
                key={month}
                activeMetrics={orderMetrics(undefined, activeMetrics)}
                isTotal={month === 'Total'}
              />
            ))}
          </ContainerAnnuallyCell>
        </ContainerYear>
      </ContainerAnnually>
    </Container>
  );
};

export default HeaderMonthly;

const Container = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-start',
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : '#212630',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.chartsShadows : '1px 4px 15.3px 0px #141921',
  alignItems: 'center',
  whiteSpace: 'pre',
  overflow: 'hidden',
  minHeight: 93,

  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
}));

const ContainerAnnually = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
  },
}));

const ContainerAnnuallyCell = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingTop: 10,
  paddingBottom: 10,
});

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[200],
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
  whiteSpace: 'normal',
  maxWidth: '100%',
  wordWrap: 'break-word',
  paddingRight: 8,
}));

const ContainerTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '16px 0px 16px 32px',
  alignItems: 'center',
  width: 195,
  height: 48,
  paddingTop: 10,
  paddingBottom: 10,

  [theme.breakpoints.up('desktop_1920')]: {
    minWidth: 230,
  },
}));

const ContainerYear = styled('div')({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
});
