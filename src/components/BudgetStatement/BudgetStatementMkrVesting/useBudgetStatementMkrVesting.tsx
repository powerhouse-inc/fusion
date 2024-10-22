import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import first from 'lodash/first';
import orderBy from 'lodash/orderBy';
import sumBy from 'lodash/sumBy';
import { useMemo } from 'react';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import ToolTipMkrVesting from './ToolTipMkrVesting';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { DateTime } from 'luxon';

export const useTransparencyMkrVesting = (currentMonth: DateTime, budgetStatements: BudgetStatement[] | undefined) => {
  const currentBudgetStatement = useMemo(
    () => budgetStatements?.find((bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
    [currentMonth, budgetStatements]
  );

  const mkrVestings = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) {
      return [];
    }
    return currentBudgetStatement?.budgetStatementMKRVest ?? [];
  }, [currentMonth, budgetStatements, currentBudgetStatement?.budgetStatementMKRVest]);

  const totalAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) {
      return [];
    }

    return sumBy(currentBudgetStatement?.budgetStatementMKRVest ?? [], (mkr) => mkr.mkrAmount);
  }, [currentMonth, budgetStatements, currentBudgetStatement?.budgetStatementMKRVest]);

  const totalOldAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) {
      return [];
    }

    return sumBy(currentBudgetStatement?.budgetStatementMKRVest ?? [], (mkr) => mkr.mkrAmountOld);
  }, [currentMonth, budgetStatements, currentBudgetStatement?.budgetStatementMKRVest]);

  const fTEs = useMemo(
    () => first(currentBudgetStatement?.budgetStatementFTEs)?.ftes ?? 'N/A',
    [currentBudgetStatement?.budgetStatementFTEs]
  );

  const mainTableColumns = useMemo(() => {
    const mainTableColumns: InnerTableColumn[] = [
      {
        header: 'Vesting Date',
        isCardHeader: true,
        hasBorderBottomOnCard: true,
      },
      {
        header: 'MKR Amount',
        type: 'number',
        align: 'right',
        hasBorderBottomOnCard: true,
      },
      {
        header: 'Last month',
        type: 'number',
        align: 'right',
        hasBorderBottomOnCard: true,
      },
      {
        header: <ToolTipMkrVesting title="Difference" />,
        type: 'number',
        align: 'right',
        hasBorderBottomOnCard: true,
      },
      {
        header: 'Reason(s)',
        type: 'text',
      },
    ];
    return mainTableColumns;
  }, []);

  const mainTableItems: InnerTableRow[] = useMemo(() => {
    const result: InnerTableRow[] = [];

    const mkrVestingsOrdered = orderBy(mkrVestings, 'vestingDate', 'asc');

    mkrVestingsOrdered.forEach((mkrVesting) => {
      result.push({
        borderBottom: true,
        type: 'category',
        items: [
          {
            value: mkrVesting.vestingDate,
            column: mainTableColumns[0],
          },
          {
            value: mkrVesting.mkrAmount,
            column: mainTableColumns[1],
          },
          {
            value: mkrVesting.mkrAmountOld,
            column: mainTableColumns[2],
          },
          {
            value: Number(mkrVesting.mkrAmount) - Number(mkrVesting.mkrAmountOld),
            column: mainTableColumns[3],
          },
          {
            value: mkrVesting.comments,
            column: mainTableColumns[4],
          },
        ],
      });
    });

    if (result.length > 0) {
      result.push({
        type: 'total',
        items: [
          {
            value: 'Total',
            column: mainTableColumns[0],
          },
          {
            value: totalAmount,
            column: mainTableColumns[1],
          },
          {
            value: totalOldAmount,
            column: mainTableColumns[2],
          },
          {
            value: Number(totalAmount) - Number(totalOldAmount),
            column: mainTableColumns[3],
          },
          {
            value: '',
            column: mainTableColumns[4],
          },
        ],
      });
    }

    return result;
  }, [mkrVestings, mainTableColumns, totalAmount, totalOldAmount]);

  return {
    mainTableColumns,
    mainTableItems,
    fTEs,
  };
};
