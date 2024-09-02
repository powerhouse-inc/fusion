import { styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import type { MetricValues } from '@/views/Finances/utils/types';
import { getKeyMetric, getShortNameForMetric } from '@/views/Finances/utils/utils';

interface Props {
  metrics: Partial<MetricValues>;
  activeMetrics: string[];
}

export const CellAnnually: React.FC<Props> = ({ metrics, activeMetrics }) => (
  <ContainerCell activeMetrics={activeMetrics.length}>
    {activeMetrics?.map((metric, index) => (
      <Metrics key={index}>
        <Name>{getShortNameForMetric(metric)}</Name>
        <Amount>{usLocalizedNumber(metrics[getKeyMetric(metric) as keyof MetricValues] ?? 0)}</Amount>
      </Metrics>
    ))}
  </ContainerCell>
);

export default CellAnnually;

const ContainerCell = styled('div')<{ activeMetrics: number }>(({ theme, activeMetrics }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  fontWeight: 500,

  ...(activeMetrics === 3 && {
    '& > div:nth-of-type(3)': {
      ':after': {
        left: 4,
      },
    },
  }),

  ...(activeMetrics === 2 && {
    '& > div:nth-of-type(2)': {
      ':after': {
        left: 2,
        bottom: -6,
        height: 42,
      },
    },
  }),

  [theme.breakpoints.up('desktop_1440')]: {
    gap: 60,
    paddingLeft: 20,
  },
}));

const Metrics = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 80,
  flex: 1,
  position: 'relative',
  padding: 0,

  ':after': {
    content: '""',
    position: 'absolute',
    height: 48,
    bottom: 10,
    borderRight: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
    }`,
  },

  [theme.breakpoints.up('tablet_768')]: {
    ':after': {
      display: 'none',
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 192,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 78,
  },
}));

const Name = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 400,
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
  marginBottom: 4,
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[700],

  [theme.breakpoints.up('desktop_1024')]: {
    textAlign: 'center',
  },

  [theme.breakpoints.up('desktop_1920')]: {
    marginBottom: 2,
  },
}));

const Amount = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '18px',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[200],
}));
