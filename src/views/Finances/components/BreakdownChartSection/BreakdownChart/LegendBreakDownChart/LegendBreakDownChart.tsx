import { styled } from '@mui/material';
import React from 'react';
import BigButton from '@/views/CoreUnitAbout/components/Button/BigButton/BigButton';
import type { BreakdownChartSeriesData } from '@/views/Finances/utils/types';
// import SwitchComponent from '../SwitchComponent/SwitchComponent';
import LegendItemBreakDownChart from './LegendItemBreakDownChart';
import type { FC } from 'react';

interface Props {
  handleToggleSeries: (series: string) => void;
  series: BreakdownChartSeriesData[];
  onLegendItemHover: (legendName: string) => void;
  onLegendItemLeave: (legendName: string) => void;
  // isChecked: boolean;
  // handleChangeSwitch: () => void;
}

const LegendBreakDownChart: FC<Props> = ({
  series,
  handleToggleSeries,
  onLegendItemHover,
  onLegendItemLeave,
  // isChecked,
  // handleChangeSwitch,
}) => {
  const showAll = series.length > 15;
  // const turnOff = series.length < 15;
  return (
    <LegendContainer>
      {/* {turnOff && (
        <ContainerSwitch>
          <SwitchComponent isChecked={isChecked} handleChangeSwitch={handleChangeSwitch} />
        </ContainerSwitch>
      )} */}
      {series.map((element, index) => (
        <LegendItemBreakDownChart
          element={element}
          key={index}
          handleToggleSeries={() => handleToggleSeries(element.name)}
          onLegendItemHover={() => onLegendItemHover(element.name)}
          onLegendItemLeave={() => onLegendItemLeave(element.name)}
        />
      ))}
      {showAll && (
        <ButtonContainer>
          <LineStyledBorder />
          <BigButtonStyled title="View All" />
          <LineStyledBorder />
        </ButtonContainer>
      )}
    </LegendContainer>
  );
};

export default LegendBreakDownChart;

const LegendContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  position: 'relative',
  margin: '0 auto',
  flexWrap: 'wrap',
  rowGap: 16,
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 12,
    flex: 1,
    padding: '0 16px',
    width: 263,
    minWidth: 263,
    margin: 'revert',
    justifyContent: 'center',

    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : 'red',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 362,
    minWidth: 362,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 355,
    minWidth: 355,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 392,
    minWidth: 392,
  },
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('desktop_1024')]: {
    marginBottom: '32px',
  },
  ':hover': {
    '& > div:nth-of-type(1) , div:nth-of-type(2)': {
      borderTop: `1px solid ${
        theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
      }`,
    },
    '& > button': {
      background: 'none',
      border: `1px solid ${
        theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
      }`,
      color: theme.palette.isLight ? theme.palette.colors.slate[300] : theme.palette.colors.charcoal[600],
    },
  },
}));

const LineStyledBorder = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  borderTop: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
}));

const BigButtonStyled = styled(BigButton)({
  minWidth: 'fit-content',
});

// const ContainerSwitch = styled('div')(({ theme }) => ({
//   display: 'none',
//   [theme.breakpoints.up('tablet_768')]: {
//     position: 'absolute',
//     top: 16,
//     right: 16,
//   },
// }));
