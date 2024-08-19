import { styled } from '@mui/material';
import React from 'react';
import SimpleBar from 'simplebar-react';
import type { BreakdownChartSeriesData } from '@/views/Finances/utils/types';
import LegendItemBreakDownChart from './LegendItemBreakDownChart';
import type { FC } from 'react';

interface Props {
  handleToggleSeries: (series: string) => void;
  series: BreakdownChartSeriesData[];
  onLegendItemHover: (legendName: string) => void;
  onLegendItemLeave: (legendName: string) => void;
  // isChecked: boolean;
  // handleChangeSwitch: () => void;
  showLegendValue?: boolean;
}

const LegendBreakDownChart: FC<Props> = ({
  series,
  handleToggleSeries,
  onLegendItemHover,
  onLegendItemLeave,
  showLegendValue,
  // isChecked,
  // handleChangeSwitch,
}) => {
  const showAll = series.length > 15;
  const showScroll = series.length > 15;
  return (
    <>
      <ContainerMobile isLessThanFifteen={showAll}>
        {series.map((element, index) => (
          <LegendItemBreakDownChart
            index={index}
            element={element}
            key={element.name}
            handleToggleSeries={() => handleToggleSeries(element.name)}
            onLegendItemHover={() => onLegendItemHover(element.name)}
            onLegendItemLeave={() => onLegendItemLeave(element.name)}
            showLegendValue={showLegendValue}
          />
        ))}
      </ContainerMobile>

      {showScroll ? (
        <LegendContainer>
          <ContainerSwitch>
            <div
              style={{
                width: 42,
                height: 21,
              }}
            >
              Switch
            </div>
            {/* TODO:Add the component of <SwitchComponent isChecked={false} handleChangeSwitch={() => {}} /> */}
          </ContainerSwitch>
          <ContainerScroll>
            <SimpleBarStyled>
              <ContainerSeries>
                {series.map((element, index) => (
                  <LegendItemBreakDownChart
                    index={index}
                    element={element}
                    key={element.name}
                    handleToggleSeries={() => handleToggleSeries(element.name)}
                    onLegendItemHover={() => onLegendItemHover(element.name)}
                    onLegendItemLeave={() => onLegendItemLeave(element.name)}
                    showLegendValue={showLegendValue}
                  />
                ))}
              </ContainerSeries>
            </SimpleBarStyled>
          </ContainerScroll>
        </LegendContainer>
      ) : (
        <SimpleContainer>
          <SimpleContainerSeries>
            {series.map((element, index) => (
              <LegendItemBreakDownChart
                index={index}
                element={element}
                key={element.name}
                handleToggleSeries={() => handleToggleSeries(element.name)}
                onLegendItemHover={() => onLegendItemHover(element.name)}
                onLegendItemLeave={() => onLegendItemLeave(element.name)}
                showLegendValue={showLegendValue}
              />
            ))}
          </SimpleContainerSeries>
        </SimpleContainer>
      )}
    </>
  );
};

export default LegendBreakDownChart;

const LegendContainer = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 12,
    width: 231,
    minWidth: 231,
    flex: 1,
    gap: 8,
    height: '100%',
    padding: '8px 8px 16px 16px',
    justifyContent: 'center',
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
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

const ContainerMobile = styled('div')<{ isLessThanFifteen?: boolean }>(({ theme, isLessThanFifteen = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  justifyContent: 'center',
  alignItems: 'flex-start',
  marginTop: 16,
  ...(isLessThanFifteen && {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 16,
    columnGap: 8,
  }),
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const ContainerSeries = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',

  justifyContent: 'flex-start',
  alignItems: 'center',
  columnGap: 16,
  rowGap: 16,
  height: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    height: 'none',
  },
}));

const SimpleBarStyled = styled(SimpleBar)<{ isLessThanFifteen?: boolean }>(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '.simplebar-scrollbar::before': {
    width: 4,
    marginLeft: 4,
    height: 128,
    background: theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[700],
    borderRadius: 12,
  },
  [theme.breakpoints.up('tablet_768')]: {
    height: 215,
    maxHeight: 215,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 235,
    maxHeight: 235,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    height: 300,
    maxHeight: 300,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    height: 300,
    maxHeight: 300,
  },
}));

const ContainerScroll = styled('div')(() => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: 4,
  columnGap: 4,
  gap: 4,
}));

const SimpleContainer = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 12,
    width: 231,
    minWidth: 231,
    flex: 1,
    padding: '0px 16px',
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 288,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    height: 353,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    height: 353,
    maxWidth: 392,
  },
}));

const SimpleContainerSeries = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  rowGap: 24,
  height: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    height: 268,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 288,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    height: 353,
  },
}));

const ContainerSwitch = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8,
  },
}));
