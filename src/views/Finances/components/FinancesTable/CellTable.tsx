import { styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import LinkCellComponent from '../LinkCellComponent/LinkCellComponent';
import { filterMetricValues } from '../SectionPages/BreakdownTable/utils';
import type { MetricValues } from '../../utils/types';

interface Props {
  metrics: string[];
  value: MetricValues;
  href: string;
  isSummaryRow?: boolean;
}

const CellTable: React.FC<Props> = ({ metrics, value, href, isSummaryRow }) => {
  const element = filterMetricValues(value, metrics as (keyof MetricValues)[]);

  return (
    <Cell>
      <LinkCellComponent href={href} isSummaryRow={isSummaryRow}>
        <SpacedValues>
          {metrics.map((metric, index) => (
            <Span key={index}>{usLocalizedNumber(element[metric as keyof MetricValues] ?? 0, 0)}</Span>
          ))}
        </SpacedValues>
      </LinkCellComponent>
    </Cell>
  );
};

export default CellTable;

const Cell = styled('td')(({ theme }) => ({
  padding: '16px 8px',
  textAlign: 'center',
  fontSize: 12,
  position: 'relative',

  '&:not(:last-of-type)': {
    borderRight: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
    }`,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 20px',
  },
}));

const SpacedValues = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const Span = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[200],
  minWidth: 77.5,
  textAlign: 'center',

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
