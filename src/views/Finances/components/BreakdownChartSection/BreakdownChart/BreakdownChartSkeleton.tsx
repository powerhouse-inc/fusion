import { Skeleton, styled } from '@mui/material';
import React from 'react';
import BarSkeletonItems from './BreakdownChartSkeletonUtils/BarSkeletonItem';
import ItemLegendDesk from './BreakdownChartSkeletonUtils/ItemLegendDesk';
import ItemLegendValues from './BreakdownChartSkeletonUtils/ItemLegendValues';
import LegendAxisYItems from './BreakdownChartSkeletonUtils/LegendAxisYComponent';

const BreakdownChartSkeleton = () => {
  const arrayLegendAxisX = Array.from({ length: 12 }, () => 0);

  return (
    <Wrapper>
      <ChartContainer>
        <ContainerLegendsDesk>
          <ContainerLegendY>
            <LegendAxisYItems />
            <BarSkeletonItems />
          </ContainerLegendY>

          <DeskAxisLegend>
            {arrayLegendAxisX.map((_, index) => (
              <ContainerAxisXNotMobile key={index}>
                <SkeletonLegendXAxis variant="rectangular" width={12} height={19} />
              </ContainerAxisXNotMobile>
            ))}
          </DeskAxisLegend>
        </ContainerLegendsDesk>
        <ContainerAxisX>
          <Mobile>
            {arrayLegendAxisX.map((_, index) => (
              <ItemXAxis key={index}>
                <Skeleton variant="circular" width={8} height={8} sx={{ borderRadius: 4 }} />
              </ItemXAxis>
            ))}
          </Mobile>
        </ContainerAxisX>

        <LineContainer>
          <SkeletonLineMobileLeft variant="rectangular" width={130} height={11} />
          <CircleElementStyled variant="circular" width={28} height={13} />
          <SkeletonLineMobileRight variant="rectangular" width={130} height={11} />
        </LineContainer>
        <ContainerLegends>
          <ItemLegendValues />
          <ItemLegendValues />
          <ItemLegendValues />
        </ContainerLegends>
      </ChartContainer>

      <LegendDesk>
        <ItemLegendSquare>
          <ItemLegendDesk widthName={116} widthValue={50} />
          <ItemLegendDesk widthName={126} widthValue={51} />
          <ItemLegendDesk widthName={143} widthValue={44} />
        </ItemLegendSquare>
      </LegendDesk>
    </Wrapper>
  );
};

export default BreakdownChartSkeleton;

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    alignItems: 'revert',
    justifyContent: 'space-between',
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));
const ChartContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 'calc(100% - 287px)',
    height: 268,

    marginTop: 0,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    height: 288,

    width: '100%',
    maxWidth: 'calc(100% - 416px)',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    height: 356,
    paddingLeft: 0,
    maxWidth: 'calc(100% - 387px)',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 'calc(100% - 450px)',
    height: 356,
  },
}));

const LegendDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 12,
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],

    gap: 24,
    alignItems: 'center',
    width: 265,
    height: 268,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    width: 362,
    height: 288,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    width: 355,
    height: 353,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    width: 392,
    height: 353,
  },
}));

const ContainerLegendY = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  position: 'relative',

  gap: 8,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
    justifyContent: 'revert',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    gap: 24,
  },
}));

const ContainerAxisX = styled('div')(({ theme }) => ({
  paddingLeft: 35,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
    paddingLeft: 90,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
}));
const ContainerAxisXNotMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4.5,
  alignItems: 'center',
  width: 38,

  [theme.breakpoints.up('tablet_768')]: {
    width: 23,
    height: 19,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 30,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 40,
  },
}));

const ItemXAxis = styled('div')({
  width: 16,
  paddingTop: 4,
  textAlign: 'center',
});

const LineContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  gap: 4,
  paddingLeft: 32,
  marginBottom: 8,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const ContainerLegends = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 24,
  rowGap: 16,
  marginLeft: 32,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const SkeletonLineMobileLeft = styled(Skeleton)(({ theme }) => ({
  borderLeft: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.slate[400]
  }`,
  flex: 1,
  borderBottom: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.slate[400]
  }`,
  backgroundColor: 'transparent',
}));

const CircleElementStyled = styled(Skeleton)(({ theme }) => ({
  borderRadius: 12.5,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[400],
  marginLeft: 12,
  marginRight: 12,
  marginTop: 4,
}));

const SkeletonLineMobileRight = styled(Skeleton)(({ theme }) => ({
  borderBottomLeftRadius: 3,
  borderBottomRightRadius: 3,

  flex: 1,
  borderRight: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.slate[400]
  }`,
  borderBottom: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.slate[400]
  }`,
  backgroundColor: 'transparent',
}));

const Mobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  alignItems: 'flex-end',
  marginBottom: 12,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const DeskAxisLegend = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',

    paddingLeft: 56,
    marginTop: 8,

    width: '100%',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 62,
    marginTop: 12,
    gap: 8,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 70,
  },
}));

const ContainerLegendsDesk = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const SkeletonLegendXAxis = styled(Skeleton)(({ theme }) => ({
  background: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
  borderRadius: 4,
}));

const ItemLegendSquare = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  height: '100%',
  justifyContent: 'center',
}));
