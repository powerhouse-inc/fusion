import { styled } from '@mui/material';
import type { MetricValues } from '@/views/Finances/utils/types';
import { filterActiveMetrics } from '@/views/Finances/utils/utils';
import { orderMetrics } from '../utils';
import CellAnnually from './CellAnnually';

interface Props {
  year: string;
  title: string;
  headerTable: MetricValues[];
  activeMetrics: string[];
}

export const HeaderAnnually: React.FC<Props> = ({ year, title, activeMetrics, headerTable }) => {
  const metricsActive = filterActiveMetrics(activeMetrics, headerTable);

  return (
    <Container>
      <ContainerAnnually>
        <ContainerTitle>
          <Title>{title}</Title>
        </ContainerTitle>
        <ContainerYear>
          <Year>{year}</Year>
          <ContainerAnnuallyCell>
            <CellAnnually metrics={metricsActive[0]} activeMetrics={orderMetrics(undefined, activeMetrics)} />
          </ContainerAnnuallyCell>
        </ContainerYear>
      </ContainerAnnually>
    </Container>
  );
};

export default HeaderAnnually;

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

const ContainerAnnually = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 8,
  flex: 1,
  whiteSpace: 'break-spaces',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '16px 8px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 32px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
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

const ContainerTitle = styled('div')(({ theme }) => ({
  width: 78,
  minWidth: 78,
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'break-spaces',

  [theme.breakpoints.up('tablet_768')]: {
    width: 140,
    height: 48,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 190,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 170,
  },

  [theme.breakpoints.up('desktop_1920')]: {
    width: 195,
  },
}));

const Year = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  marginBottom: 8,
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[200],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 20,
    lineHeight: 'normal',
    letterSpacing: '0.4px',
  },
}));

const ContainerAnnuallyCell = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
}));

const ContainerYear = styled('div')({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
});
