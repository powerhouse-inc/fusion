import { styled } from '@mui/material';
import type { MetricValues } from '@/views/Finances/utils/types';
import { filterActiveMetrics } from '@/views/Finances/utils/utils';
import { orderMetrics } from '../utils';
import CellQuarterly from './CellQuarterly';

interface Props {
  title: string;
  className?: string;
  headerTable: MetricValues[];
  activeMetrics: string[];
  year: string;
}

const HeaderQuarterly: React.FC<Props> = ({ title, className, headerTable, year, activeMetrics }) => {
  const keysMetrics = [...[1, 2, 3, 4].map((quarter) => `Q${quarter} ${year}`), 'Total'];
  const metricsActive = filterActiveMetrics(activeMetrics, headerTable);

  return (
    <Container className={className}>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>

      <ContainerCell>
        {keysMetrics?.map((quarterly, index) => (
          <CellQuarterly
            metrics={metricsActive[index]}
            quarterly={quarterly}
            key={index}
            activeMetrics={orderMetrics(undefined, activeMetrics)}
            isTotal={quarterly === 'Total'}
          />
        ))}
      </ContainerCell>
    </Container>
  );
};

export default HeaderQuarterly;

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
  minHeight: 83,

  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[200],
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  whiteSpace: 'break-spaces',
  maxWidth: '100%',
  wordWrap: 'break-word',
  paddingRight: 8,

  [theme.breakpoints.up('desktop_1024')]: {
    fontWeight: 700,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
}));

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: 48,
  borderRight: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[800]
  }`,
  width: 145,
  padding: '16px 8px 16px 8px',

  [theme.breakpoints.up('desktop_1024')]: {
    width: 148,
    padding: '16px 0px 16px 8px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 220,
    padding: '16px 0px 16px 32px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 260,
    padding: '16px 8px 16px 32px',
  },

  [theme.breakpoints.up('desktop_1920')]: {
    width: 228,
    padding: '16px 0px 16px 16px',
  },
}));

const ContainerCell = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
});
