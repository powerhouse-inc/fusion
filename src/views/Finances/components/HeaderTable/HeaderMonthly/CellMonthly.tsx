import { styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import type { MetricValues } from '@/views/Finances/utils/types';
import { getKeyMetric, getShortNameForMetric } from '@/views/Finances/utils/utils';

interface Props {
  title: string;
  isTotal?: boolean;
  className?: string;
  metrics: Partial<MetricValues>;
  activeMetrics: string[];
}

export const CellMonthly: React.FC<Props> = ({ metrics, title, isTotal = false, className, activeMetrics }) => (
  <ContainerCell isTotal={isTotal} className={className}>
    <Month>{title}</Month>
    {activeMetrics?.map((metric, index) => (
      <Metrics key={index}>
        <Name>{getShortNameForMetric(metric)}</Name>
        <Amount>{usLocalizedNumber(metrics[getKeyMetric(metric) as keyof MetricValues] ?? 0)}</Amount>
      </Metrics>
    ))}
  </ContainerCell>
);

export default CellMonthly;

const ContainerCell = styled('div')<{ isTotal: boolean }>(({ theme, isTotal }) => ({
  position: 'relative',
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 87,
  fontWeight: 500,
  backgroundColor: isTotal
    ? theme.palette.isLight
      ? theme.palette.colors.gray[200]
      : theme.palette.colors.charcoal[900]
    : 'transparent',

  ...(isTotal && {
    padding: '16px 0px 16px 0px',
    marginTop: -16,
    marginBottom: -16,
  }),

  ...(!isTotal && {
    ':after': {
      content: '""',
      position: 'absolute',
      height: 48,
      left: 0,
      borderRight: `1px solid ${
        theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
      }`,
    },
  }),

  [theme.breakpoints.up('desktop_1920')]: {
    minWidth: 80,
  },
}));

const Month = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: 20,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[200],
  marginBottom: 8,
}));

const Metrics = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: 70.5,
});

const Name = styled('div')(({ theme }) => ({
  marginBottom: 4,
  fontSize: 12,
  fontWeight: 400,
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[700],
}));

const Amount = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[200],
}));
