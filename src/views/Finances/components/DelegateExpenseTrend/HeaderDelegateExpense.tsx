import { styled, useTheme } from '@mui/material';
import ArrowDown from '@ses/components/svg/arrow-down';
import ArrowUp from '@ses/components/svg/arrow-up';
import { SortEnum } from '@ses/core/enums/sortEnum';
import type { DelegateExpenseTableHeader } from '../../utils/types';
import type { FC, CSSProperties } from 'react';

export interface Props {
  columns: DelegateExpenseTableHeader[];
  sortClick?: (index: number) => void;
}

const HeaderDelegateExpense: FC<Props> = ({ columns, sortClick }) => {
  const theme = useTheme();

  return (
    <TableHeader>
      <TableHeaderRow className="no-select">
        {columns
          .filter((column) => !column.hidden)
          .map((column, i) => (
            <TableHeaderTitle
              key={column.header}
              width={column.width}
              styles={column.styles}
              align={column.align ?? 'left'}
              onClick={() => column.sort !== SortEnum.Disabled && sortClick?.(i)}
            >
              {column.header}
              {column.sort !== SortEnum.Disabled && (
                <Arrows>
                  <ArrowUp
                    fill={
                      theme.palette.isLight
                        ? column.sort === SortEnum.Asc
                          ? theme.palette.colors.gray[900]
                          : theme.palette.colors.slate[100]
                        : column.sort === SortEnum.Asc
                        ? theme.palette.colors.gray[50]
                        : theme.palette.colors.slate[500]
                    }
                    style={{ margin: '4px 0' }}
                  />
                  <ArrowDown
                    fill={
                      theme.palette.isLight
                        ? column.sort === SortEnum.Desc
                          ? theme.palette.colors.gray[900]
                          : theme.palette.colors.slate[100]
                        : column.sort === SortEnum.Desc
                        ? theme.palette.colors.gray[50]
                        : theme.palette.colors.slate[500]
                    }
                  />
                </Arrows>
              )}
            </TableHeaderTitle>
          ))}
      </TableHeaderRow>
    </TableHeader>
  );
};

export default HeaderDelegateExpense;

const TableHeader = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'relative',
  padding: '16px 0px',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : '#212630',
  boxShadow: theme.palette.isLight ? '0px 2px 12px 0px rgba(37, 42, 52, 0.10)' : '1px 4px 15.3px 0px #141921',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'block',
    flex: 1,
  },
}));

const TableHeaderRow = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  flex: 1,
}));

const TableHeaderTitle = styled('div')<{
  width?: string;
  styles?: CSSProperties;
  align: 'left' | 'center' | 'right';
}>(({ width, styles, align, theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '22px',
  color: theme.palette.colors.gray[600],

  textAlign: align,
  ...(width && { width }),

  ...(styles || {}),
}));

const Arrows = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 8px',
  cursor: 'pointer',
  boxSizing: 'unset',
  marginTop: -1.5,
}));
