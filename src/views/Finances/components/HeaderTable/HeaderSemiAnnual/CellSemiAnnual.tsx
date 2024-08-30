import { styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import type { MetricValues } from '@/views/Finances/utils/types';
import { getKeyMetric, getShortNameForMetric } from '@/views/Finances/utils/utils';

interface Props {
  semiannual: string;
  isTotal?: boolean;
  className?: string;
  metrics: Partial<MetricValues>;
  activeMetrics: string[];
}

export const CellSemiAnnual: React.FC<Props> = ({ metrics, semiannual, isTotal = false, className, activeMetrics }) => (
  <MainContainer isTotal={isTotal} className={className}>
    <ContainerCell>
      <Semiannual>{semiannual}</Semiannual>
      <ContainerMetricsData>
        {activeMetrics?.map((metric, index) => (
          <Metrics key={index}>
            <Name>{getShortNameForMetric(metric)}</Name>
            <Amount>{usLocalizedNumber(metrics[getKeyMetric(metric) as keyof MetricValues] ?? 0)}</Amount>
          </Metrics>
        ))}
      </ContainerMetricsData>
    </ContainerCell>
  </MainContainer>
);

export default CellSemiAnnual;

const MainContainer = styled('div')<{ isTotal: boolean }>(({ theme, isTotal }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flex: 1,
  width: isTotal ? 71 : 78,
  alignItems: 'center',
  backgroundColor: isTotal
    ? theme.palette.isLight
      ? theme.palette.colors.gray[200]
      : theme.palette.colors.charcoal[900]
    : 'transparent',

  ...(isTotal && {
    marginTop: -8,
    marginBottom: -8,
  }),

  '&:not(:last-of-type):after': {
    content: '""',
    position: 'relative',
    height: 48,
    borderLeft: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
    }`,
  },
}));

const ContainerCell = styled('div')({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
});

const Semiannual = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  marginBottom: 8,
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[200],
}));

const ContainerMetricsData = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Metrics = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 70,
});

const Name = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 400,
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
  marginBottom: 4,
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[700],
}));

const Amount = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '18px',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[200],
}));
