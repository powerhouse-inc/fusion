import { styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import type { MetricValues } from '@/views/Finances/utils/types';
import { getKeyMetric, getShortNameForMetric } from '@/views/Finances/utils/utils';

interface Props {
  quarterly: string;
  isTotal?: boolean;
  className?: string;
  metrics: Partial<MetricValues>;
  activeMetrics: string[];
}

export const CellQuarterly: React.FC<Props> = ({ metrics, activeMetrics, quarterly, isTotal = false, className }) => (
  <MainContainer isTotal={isTotal} className={className}>
    <ContainerCell>
      <Quarterly>{quarterly}</Quarterly>
      <ContainerMetricsData>
        {activeMetrics?.map((metric, index) => (
          <Metrics key={index}>
            <Name>{getShortNameForMetric(metric)}</Name>
            <Amount>{usLocalizedNumber(metrics?.[getKeyMetric(metric) as keyof MetricValues] ?? 0)}</Amount>
          </Metrics>
        ))}
      </ContainerMetricsData>
    </ContainerCell>
  </MainContainer>
);

export default CellQuarterly;

const MainContainer = styled('div')<{ isTotal: boolean }>(({ theme, isTotal }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flex: 1,
  width: isTotal ? 105 : 96,
  alignItems: 'center',
  padding: isTotal ? '16px 0px 16px 8px' : '16px 4px',
  backgroundColor: isTotal
    ? theme.palette.isLight
      ? theme.palette.colors.gray[200]
      : theme.palette.colors.charcoal[900]
    : 'transparent',

  ...(!isTotal && {
    ':after': {
      content: '""',
      position: 'relative',
      height: 48,
      left: 10,
      borderRight: `1px solid ${
        theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
      }`,

      [theme.breakpoints.up('tablet_768')]: {
        left: 5,
      },
      [theme.breakpoints.up('desktop_1024')]: {
        left: 4,
      },
      [theme.breakpoints.up('desktop_1280')]: {
        left: 0,
      },

      [theme.breakpoints.up('desktop_1440')]: {
        left: 0,
      },
      [theme.breakpoints.up('desktop_1920')]: {
        left: 2,
      },
    },
  }),

  [theme.breakpoints.up('desktop_1024')]: {
    width: isTotal ? 144 : 100,
    padding: isTotal ? '16px 4px 16px' : '16px 4px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: isTotal ? 162 : 190,
    padding: isTotal ? '16px 1px' : '16px 0px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: isTotal ? 197 : 191,
    padding: '16px 0px',
  },

  [theme.breakpoints.up('desktop_1920')]: {
    minWidth: isTotal ? 285 : 284,
  },
}));

const ContainerCell = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Quarterly = styled('div')(({ theme }) => ({
  marginBottom: 8,
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[200],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: '0.4px',
  },
}));

const ContainerMetricsData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('desktop_1024')]: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const Metrics = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 77.5,

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 83.5,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 93.5,
  },

  [theme.breakpoints.up('desktop_1920')]: {
    minWidth: 80,
  },
}));

const Name = styled('div')(({ theme }) => ({
  marginBottom: 4,
  fontSize: 12,
  fontWeight: 500,
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[700],

  [theme.breakpoints.up('desktop_1024')]: {
    fontWeight: 400,
  },
}));

const Amount = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 'normal',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[200],
}));
