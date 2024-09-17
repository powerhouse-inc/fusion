import { styled, useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { defaultOrder, orderMetrics } from '../HeaderTable/utils';
import LinkCellComponent from '../LinkCellComponent/LinkCellComponent';
import { removePatternAfterSlash } from '../SectionPages/BreakdownTable/utils';
import CellTable from './CellTable';
import type { TableFinances, MetricValues, PeriodicSelectionFilter, ItemRow } from '../../utils/types';
import type { Theme } from '@mui/material';

interface Props {
  className?: string;
  breakdownTable: TableFinances[];
  metrics: string[];
  period: PeriodicSelectionFilter;
}

const FinancesTable: React.FC<Props> = ({ className, breakdownTable, metrics, period }) => {
  const router = useRouter();
  const iteration = period === 'Quarterly' ? 5 : period === 'Monthly' ? 13 : period === 'Annually' ? 1 : 3;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const desk1440 = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1024'));
  const showSemiAnnual = isMobile && period === 'Semi-annual';
  const isAnnual = period === 'Annually';
  const showQuarterly = !isMobile && period === 'Quarterly';
  const showMonthly = desk1440 && period === 'Monthly';
  const arrayMetrics = new Array<number>(iteration).fill(0);
  const newMetricsOrdered = orderMetrics(defaultOrder, metrics);
  const newMetrics = newMetricsOrdered.map((metric) =>
    metric === 'Net Expenses On-Chain'
      ? 'PaymentsOnChain'
      : metric === 'Net Protocol Outflow'
      ? 'ProtocolNetOutflow'
      : metric
  );

  return (
    <>
      {breakdownTable.map((table: TableFinances, index) => (
        <TableContainer className={className} key={index}>
          <TableBody isAnnual={isAnnual}>
            {table.rows.map((row: ItemRow, index) => {
              const href = `${siteRoutes.finances(removePatternAfterSlash(row.codePath ?? '').replace('atlas/', ''))}${
                router.query
                  ? `?${new URLSearchParams(
                      Object.fromEntries(Object.entries(router.query).filter(([key]) => key !== 'path')) as Record<
                        string,
                        string
                      >
                    ).toString()}`
                  : ''
              }`;

              return (
                <TableRow key={index} isMain={row.isMain} isAnnual={isAnnual}>
                  <Headed period={period} isHeader={!!row.isMain} isUncategorized={!!row.isUncategorized}>
                    {row.isSummaryRow || (row.isUncategorized && !row.isMain) ? (
                      row.name
                    ) : (
                      <Link href={href} scroll={false}>
                        {row.name}
                      </Link>
                    )}
                  </Headed>

                  {isAnnual &&
                    newMetrics.map((metric, index) => {
                      // Check if don't have columns to show add cero
                      const value = row.columns.length !== 0;
                      if (!value) {
                        return (
                          <AnnualCell key={index}>
                            <LinkCellComponent
                              href={href}
                              isSummaryRow={row.isSummaryRow || (row.isUncategorized && !row.isMain)}
                            >
                              0
                            </LinkCellComponent>
                          </AnnualCell>
                        );
                      }
                      return (
                        <AnnualCell key={index}>
                          <LinkCellComponent
                            href={href}
                            isSummaryRow={row.isSummaryRow || (row.isUncategorized && !row.isMain)}
                          >
                            {usLocalizedNumber(row.columns[0][metric as keyof MetricValues], 0)}
                          </LinkCellComponent>
                        </AnnualCell>
                      );
                    })}

                  {showQuarterly &&
                    arrayMetrics.map((_, index) => (
                      <CellTable
                        key={index}
                        metrics={newMetrics}
                        value={row.columns[index]}
                        href={href}
                        isSummaryRow={row.isSummaryRow || (row.isUncategorized && !row.isMain)}
                      />
                    ))}
                  {showSemiAnnual &&
                    arrayMetrics.map((_, index) => (
                      <CellTable
                        key={index}
                        metrics={newMetrics}
                        value={row.columns[index]}
                        href={href}
                        isSummaryRow={row.isSummaryRow || (row.isUncategorized && !row.isMain)}
                      />
                    ))}
                  {showMonthly &&
                    arrayMetrics.map((_, index) => (
                      <CellTable
                        key={index}
                        metrics={newMetrics}
                        value={row.columns[index]}
                        href={href}
                        isSummaryRow={row.isSummaryRow || (row.isUncategorized && !row.isMain)}
                      />
                    ))}
                </TableRow>
              );
            })}
          </TableBody>
        </TableContainer>
      ))}
    </>
  );
};

export default FinancesTable;

const TableContainer = styled('table')(({ theme }) => ({
  borderCollapse: 'collapse',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.chartsShadows : '1px 4px 15.3px 0px #141921',
  fontStyle: 'normal',
  tableLayout: 'fixed',
  width: '100%',
  backgroundColor: theme.palette.isLight ? 'white' : theme.palette.colors.charcoal[900],
  borderRadius: 12,
  overflow: 'hidden',
}));

const Headed = styled('th', {
  shouldForwardProp: (prop) => !['period', 'isUncategorized', 'isHeader'].includes(prop as string),
})<{
  period?: PeriodicSelectionFilter;
  isHeader: boolean;
  isUncategorized: boolean;
}>(({ theme, period, isHeader, isUncategorized }) => ({
  borderRight: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  fontSize: 12,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[200],
  width: 87,
  textAlign: 'center',
  verticalAlign: 'center',
  padding: '16px 4px 16px 8px',
  whiteSpace: 'normal',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
  position: 'relative',

  ...(isUncategorized && {
    fontStyle: 'italic',
  }),

  '& .link': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: 'inherit',
    zIndex: 1,
  },

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: isHeader || isUncategorized ? 14 : 12,
    width: 150,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 150,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 220,
    padding: '16px 0px 16px 32px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: period === 'Quarterly' ? 261 : period === 'Annually' ? 200 : 188,
    padding: '16px 0px 16px 32px',
    textOverflow: period === 'Monthly' ? 'ellipsis' : 'revert',
    ...(period === 'Monthly' && {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }),
    ...(period === 'Annually' && {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }),
  },

  [theme.breakpoints.up('desktop_1920')]: {
    width: period === 'Annually' ? 212 : 230,
    padding: period === 'Quarterly' ? '16px 0px 16px 16px' : '16px 0px 16px 32px',
  },
}));

const TableRow = styled('tr', { shouldForwardProp: (prop) => prop !== 'isAnnual' && prop !== 'isMain' })<{
  isMain?: boolean;
  isAnnual: boolean;
}>(({ theme, isMain = false, isAnnual }) => ({
  '& th': {
    borderTopLeftRadius: isMain ? 12 : 0,
    borderBottomLeftRadius: isMain ? 12 : 0,
    fontWeight: isMain ? 500 : 400,
    textAlign: 'left',
  },

  '& td:last-of-type': {
    fontWeight: isMain ? 600 : 400,
    borderRight: 'none',
    borderTopRightRadius: isMain ? 12 : 0,
    borderBottomRightRadius: isMain ? 12 : 0,
  },

  '& td': {
    fontWeight: isMain ? 600 : 400,
  },
  ...(!isAnnual && {
    '& td:last-of-type': {
      backgroundColor: theme.palette.isLight
        ? isMain
          ? theme.palette.colors.gray[200] // background cell of the total column header
          : 'inherit'
        : isMain
        ? theme.palette.colors.charcoal[900]
        : 'inherit',
    },
  }),
}));

const TableBody = styled('tbody', { shouldForwardProp: (prop) => prop !== 'isAnnual' })<{ isAnnual: boolean }>(
  ({ theme, isAnnual }) => ({
    '& tr:nth-of-type(odd):not(:first-of-type)': {
      // odd rows
      backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#232832',
      borderRadius: 40,
    },
    '& tr:nth-of-type(even):not(:first-of-type)': {
      // even rows
      backgroundColor: theme.palette.isLight ? '#fff' : theme.palette.colors.charcoal[900],
    },
    '& tr:first-of-type': {
      // header sub-table
      backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : '#212630',
    },

    ...(!isAnnual && {
      '& tr:nth-of-type(odd):not(:first-of-type) td:last-of-type': {
        // odd rows of the totals column
        backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[900],
      },
      '& tr:nth-of-type(even):not(:first-of-type) td:last-of-type': {
        // even rows of the totals column
        backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : '#2C323E',
      },
    }),
  })
);
const AnnualCell = styled('td')(({ theme }) => ({
  padding: '16px 8px',
  textAlign: 'center',
  fontSize: 12,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[200],
  position: 'relative',

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 20px',
  },
}));
