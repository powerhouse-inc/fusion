import { styled } from '@mui/material';
import type { MetricValues, PeriodicSelectionFilter } from '@/views/Finances/utils/types';
import { filterActiveMetrics } from '@/views/Finances/utils/utils';
import { orderMetrics } from '../utils';
import CellSemiAnnual from './CellSemiAnnual';

interface Props {
  title: string;
  className?: string;
  period: PeriodicSelectionFilter;
  headerTable: MetricValues[];
  activeMetrics: string[];
  year: string;
}

const HeaderSemiAnnual: React.FC<Props> = ({ title, className, activeMetrics, headerTable, year }) => {
  const keysMetrics = [`H${1}'${year.substring(2, 4)}`, `H${2}'${year.substring(2, 4)}`, 'Total'];
  const metricsActive = filterActiveMetrics(activeMetrics, headerTable);

  return (
    <Container className={className}>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>

      <ContainerCell>
        {keysMetrics?.map((period, index) => (
          <CellSemiAnnual
            metrics={metricsActive[index]}
            semiannual={period}
            key={index}
            activeMetrics={orderMetrics(undefined, activeMetrics)}
            isTotal={period === 'Total'}
          />
        ))}
      </ContainerCell>
    </Container>
  );
};

export default HeaderSemiAnnual;

const Container = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-start',
  borderRadius: 12,
  paddingTop: 8,
  paddingBottom: 8,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : '#212630',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.chartsShadows : '1px 4px 15.3px 0px #141921',
  alignItems: 'center',
  whiteSpace: 'pre',
  overflow: 'hidden',
  minHeight: 83,

  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[200],
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 'normal',
  whiteSpace: 'break-spaces',
  maxWidth: '100%',
  wordWrap: 'break-word',
  paddingRight: 8,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    whiteSpace: 'revert',
  },
}));

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: 48,
  borderRight: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[800]
  }`,
  width: 85,
  minWidth: 85,
  padding: '16px 0px 16px 8px',
  whiteSpace: 'normal',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
}));

const ContainerCell = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',

  '& > div:last-of-type': {
    minHeight: 83,
  },
});
