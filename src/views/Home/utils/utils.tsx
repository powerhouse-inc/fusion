import { DateTime } from 'luxon';
import type { Team } from '@/core/models/interfaces/team';
import { usLocalizedNumber } from '@/core/utils/humanization';
import type { BarChartSeries } from '@/views/Finances/utils/types';
import type { RevenueAndSpendingRecords } from '../api/revenueAndSpending';
import type { Theme } from '@mui/material';

export const getProfileUpdate = (contributor: Team) => {
  if (contributor.lastActivity?.update_at) {
    return DateTime.fromISO(contributor.lastActivity?.update_at);
  }
  if (contributor.lastActivity?.created_at) {
    return DateTime.fromISO(contributor.lastActivity?.created_at);
  }
  return undefined;
};

const tooltipLabels: { [key: string]: string } = {
  psm: 'PSM',
  liquidationIncome: 'Liquidation Income',
  fees: 'Fees',
  daiSpent: 'DAI Spent',
  mkrVesting: 'MKR Vesting',
};

export const getCorrectLabelForToolTip = (label: string): string => tooltipLabels[label] || '';

export const createTooltipFormatter =
  (theme: Theme, isMobile: boolean) => (params: BarChartSeries[] | BarChartSeries) => {
    const gap = 8;
    const isArray = Array.isArray(params);
    const shortAmount = isArray ? params.length > 10 : false;
    const flexDirection = shortAmount ? 'row' : 'column';

    if (isArray) {
      return `
  <div style="background-color:${
    theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800]
  };box-shadow:${
        theme.palette.isLight ? theme.fusionShadows.graphShadow : 'none'
      };padding:8px 16px 8px 16px;min-width:194px;overflow:auto;border-radius:12px; font-family:Inter ,sans-serif">
    <div style="margin-bottom:8px;font-size:16px;font-weight:600;color:${
      theme.palette.colors.charcoal[400]
    }";line-height:24px;>${params?.[0]?.name}</div>
    <div style="display:flex;flex-direction:${flexDirection};gap:${gap}px;min-width:194px;max-width:450px;flex-wrap:wrap;">
      ${params
        ?.reverse()
        ?.map(
          (item) =>
            `<div style="display: flex;align-items:center;gap: 4px">
          <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
              isMobile ? 13 : 16
            }" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="4" fill="${item.color}" />
          </svg>
          <span style="font-size:14px;font-weight:600;line-height:22px;color:${
            theme.palette.isLight ? theme.palette.colors.charcoal[300] : '#B6BCC2'
          };max-width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"> ${getCorrectLabelForToolTip(
              item.seriesName
            )}:</span>
          <span style="font-size:14px;margin-left:4px;font-weight:600;line-height:22px;color:${
            theme.palette.isLight ? theme.palette.colors.charcoal[900] : '#EDEFFF'
          };">${usLocalizedNumber(item.value, 2)}</span>
        </div>`
        )
        .join('')}
    </div>
  </div>
  `;
    } else {
      return `
    <div style="background-color:${
      theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800]
    };box-shadow:${
        theme.palette.isLight ? theme.fusionShadows.graphShadow : 'none'
      };padding:8px 16px;min-width:194px;overflow:auto;border-radius:12px;font-family:Inter, sans-serif">
      <div style="display:flex;flex-direction:column;gap:8px;min-width:194px;max-width:450px;flex-wrap:wrap;">
        
        <div style="display: flex;gap: 4px;justify-content: space-between;border:2px solid red">  
          <div style="display:flex;flex-direction:row;align-items:center"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="${isMobile ? 13 : 16}" height="${
        isMobile ? 13 : 16
      }" viewBox="0 0 13 13" fill="none">
                 <circle cx="6.5" cy="6.5" r="4" fill="${params?.color}" />
           </svg>
            <span style="font-size:14px;font-weight:600;line-height:22px;color:${
              theme.palette.isLight ? theme.palette.colors.charcoal[300] : '#B6BCC2'
            };max-width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${getCorrectLabelForToolTip(
        params.seriesName
      )}:
           </span>
          </div>

          <span style="font-size:14px;font-weight:600;line-height:22px;color:${
            theme.palette.isLight ? theme.palette.colors.gray[900] : '#EDEFFF'
          };">30%</span>
        </div>


            <div style="display: flex;gap: 4px;justify-content;border:2px solid blue">  
          <div style="display:flex;flex-direction:row;align-items:center"> 
        
            <span style="font-size:14px;font-weight:600;line-height:22px;color:${
              theme.palette.isLight ? theme.palette.colors.charcoal[300] : '#B6BCC2'
            };max-width:350px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Total
        
    
           </span>
          </div>

          <span style="font-size:14px;font-weight:600;line-height:22px;color:${
            theme.palette.isLight ? theme.palette.colors.charcoal[900] : '#EDEFFF'
          };">${usLocalizedNumber(params.value, 2)}</span>
        </div>


        
      </div>
    </div>
  `;
    }
  };

export const getYearsLineBarChart = (revenueAndSpendingData: RevenueAndSpendingRecords) =>
  Object.keys(revenueAndSpendingData)
    // limit the years to 2021-2024 as there's no UI space for more years
    .filter((year) => Number(year) >= 2021 && Number(year) <= 2024)
    .sort((a, b) => Number(a) - Number(b));
