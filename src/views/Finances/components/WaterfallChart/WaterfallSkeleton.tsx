import { Skeleton, styled, useMediaQuery } from '@mui/material';
import React from 'react';
import BarWaterfall from './BarWaterfall';
import LegendAxis from './LegendAxis';
import LegendItems from './LegendItems';
import LegendAxisYItem from './LegendYitems';
import type { Theme } from '@mui/material';

const WaterfallSkeleton = () => {
  const arrayLegendAxisY = Array.from({ length: 9 }, () => 0);
  const arrayLegendAxisX = Array.from({ length: 12 }, () => 0);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));

  return (
    <Container>
      <ContainerLegendY>
        <LegendAxisY>
          {arrayLegendAxisY.map((_, index) => (
            <LegendAxisYItemContainer key={index}>
              {
                <LegendAxisYItem
                  height={isMobile ? 4 : isTablet ? 19 : 19}
                  width={isMobile ? 20 : isTablet ? 48 : 48}
                />
              }
            </LegendAxisYItemContainer>
          ))}
        </LegendAxisY>
        <ContainerBarsMobile>
          <BarWaterfall heightInflow={19} heightOutFlow={190} marginBottom={4} isLastOrFirstOutFlow />
          <BarWaterfall heightInflow={42} heightOutFlow={19} marginBottom={120} />
          <BarWaterfall heightInflow={36} heightOutFlow={19} marginBottom={100} />
          <BarWaterfall heightInflow={36} heightOutFlow={19} marginBottom={90} />
          <BarWaterfall heightInflow={19} heightOutFlow={40} marginBottom={110} />
          <BarWaterfall heightInflow={62} heightOutFlow={19} marginBottom={75} />
          <BarWaterfall heightInflow={19} heightOutFlow={19} marginBottom={60} />
          <BarWaterfall heightInflow={19} heightOutFlow={30} marginBottom={45} />
          <BarWaterfall heightInflow={19} heightOutFlow={50} marginBottom={70} />
          <BarWaterfall heightInflow={19} heightOutFlow={50} marginBottom={100} />
          <BarWaterfall heightInflow={36} heightOutFlow={19} marginBottom={60} />
          <BarWaterfall heightInflow={28} heightOutFlow={19} marginBottom={35} />
          <BarWaterfall heightInflow={24} heightOutFlow={19} marginBottom={10} />
          <BarWaterfall heightInflow={19} heightOutFlow={20} marginBottom={2} isLastOrFirstOutFlow />
        </ContainerBarsMobile>

        <ContainerBarsTable>
          <BarWaterfall heightInflow={19} heightOutFlow={190} marginBottom={4} isLastOrFirstOutFlow />
          <BarWaterfall heightInflow={65} heightOutFlow={19} marginBottom={130} />
          <BarWaterfall heightInflow={45} heightOutFlow={19} marginBottom={120} />
          <BarWaterfall heightInflow={45} heightOutFlow={19} marginBottom={130} />
          <BarWaterfall heightInflow={19} heightOutFlow={45} marginBottom={150} />
          <BarWaterfall heightInflow={70} heightOutFlow={19} marginBottom={90} />
          <BarWaterfall heightInflow={19} heightOutFlow={19} marginBottom={80} />
          <BarWaterfall heightInflow={19} heightOutFlow={35} marginBottom={65} />
          <BarWaterfall heightInflow={19} heightOutFlow={55} marginBottom={85} />
          <BarWaterfall heightInflow={19} heightOutFlow={55} marginBottom={120} />
          <BarWaterfall heightInflow={45} heightOutFlow={19} marginBottom={80} />
          <BarWaterfall heightInflow={30} heightOutFlow={19} marginBottom={50} />
          <BarWaterfall heightInflow={25} heightOutFlow={19} marginBottom={25} />
          <BarWaterfall heightInflow={19} heightOutFlow={22} marginBottom={4} isLastOrFirstOutFlow />
        </ContainerBarsTable>

        <ContainerBarsDesk1024>
          <BarWaterfall heightInflow={19} heightOutFlow={190} marginBottom={4} isLastOrFirstOutFlow />
          <BarWaterfall heightInflow={65} heightOutFlow={19} marginBottom={130} />
          <BarWaterfall heightInflow={45} heightOutFlow={19} marginBottom={120} />
          <BarWaterfall heightInflow={45} heightOutFlow={19} marginBottom={130} />
          <BarWaterfall heightInflow={19} heightOutFlow={45} marginBottom={150} />
          <BarWaterfall heightInflow={70} heightOutFlow={19} marginBottom={90} />
          <BarWaterfall heightInflow={19} heightOutFlow={19} marginBottom={80} />
          <BarWaterfall heightInflow={19} heightOutFlow={35} marginBottom={65} />
          <BarWaterfall heightInflow={19} heightOutFlow={55} marginBottom={85} />
          <BarWaterfall heightInflow={19} heightOutFlow={55} marginBottom={120} />
          <BarWaterfall heightInflow={45} heightOutFlow={19} marginBottom={80} />
          <BarWaterfall heightInflow={30} heightOutFlow={19} marginBottom={50} />
          <BarWaterfall heightInflow={25} heightOutFlow={19} marginBottom={25} />
          <BarWaterfall heightInflow={19} heightOutFlow={22} marginBottom={4} isLastOrFirstOutFlow />
        </ContainerBarsDesk1024>
        <ContainerBarsDesk>
          <BarWaterfall heightInflow={19} heightOutFlow={300} marginBottom={4} isLastOrFirstOutFlow />
          <BarWaterfall heightInflow={84} heightOutFlow={19} marginBottom={216} />
          <BarWaterfall heightInflow={48} heightOutFlow={19} marginBottom={183} />
          <BarWaterfall heightInflow={48} heightOutFlow={19} marginBottom={151} />
          <BarWaterfall heightInflow={19} heightOutFlow={52} marginBottom={184} />
          <BarWaterfall heightInflow={78} heightOutFlow={19} marginBottom={106} />
          <BarWaterfall heightInflow={19} heightOutFlow={19} marginBottom={86} />
          <BarWaterfall heightInflow={19} heightOutFlow={36} marginBottom={52} />
          <BarWaterfall heightInflow={19} heightOutFlow={60} marginBottom={87} />
          <BarWaterfall heightInflow={19} heightOutFlow={60} marginBottom={147} />
          <BarWaterfall heightInflow={48} heightOutFlow={19} marginBottom={83} />
          <BarWaterfall heightInflow={37} heightOutFlow={19} marginBottom={47} />
          <BarWaterfall heightInflow={28} heightOutFlow={19} marginBottom={2} />
          <BarWaterfall heightInflow={19} heightOutFlow={26} marginBottom={2} isLastOrFirstOutFlow />
        </ContainerBarsDesk>
      </ContainerLegendY>

      <ContainerAxisX>
        {isMobile ? (
          <ContainerAxisXMobile>
            {arrayLegendAxisX.map((_, index) => (
              <ItemXAxis key={index}>
                <LegendAxis width={16} />
              </ItemXAxis>
            ))}
          </ContainerAxisXMobile>
        ) : (
          <ContainerAxisXDesk>
            <LegendAxis monthWith={40} yearWidth={32} />
            {arrayLegendAxisX.map((_, index) => (
              <LegendAxis monthWith={isTablet ? 32 : isDesk1024 ? 34 : 32} yearWidth={40} key={index} />
            ))}
            <LegendAxis monthWith={40} yearWidth={32} />
          </ContainerAxisXDesk>
        )}
      </ContainerAxisX>

      <LineContainer>
        <SkeletonLineMobileLeft variant="rectangular" width={130} height={11} />
        <CircleElementStyled variant="circular" width={28} height={13} />
        <SkeletonLineMobileRight variant="rectangular" width={130} height={11} />
      </LineContainer>
      <ContainerLegends>
        <LegendItems
          circleDimension={isMobile ? 8 : isTablet ? 12 : 12}
          legendWith={isMobile ? 60 : isTablet ? 154 : 154}
        />
        <LegendItems
          circleDimension={isMobile ? 8 : isTablet ? 12 : 12}
          legendWith={isMobile ? 60 : isMobile ? 45 : isTablet ? 80 : 80}
        />
        <LegendItems
          circleDimension={isMobile ? 8 : isTablet ? 12 : 12}
          legendWith={isMobile ? 60 : isMobile ? 35 : isTablet ? 66 : 66}
        />
      </ContainerLegends>
    </Container>
  );
};

export default WaterfallSkeleton;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    height: '100%',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: '100%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '100%',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    height: '100%',

    width: '100%',
  },
}));

const ContainerLegendY = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: 8,
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
    height: '100%',
  },
  [theme.breakpoints.up('desktop_1024')]: {},
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 24,
  },
}));

const LegendAxisY = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const ContainerAxisX = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 8,
  paddingLeft: 30,
  marginTop: 6,
  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 60,
    gap: 10,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
    paddingLeft: 65,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
    marginTop: 12,
    paddingLeft: 70,
  },
}));

const ItemXAxis = styled('div')({
  width: 16,
  display: 'flex',
  textAlign: 'center',
});

// const LineContainer = styled('div')({
//   display: 'flex',
//   flexDirection: 'row',
//   width: '100%',
// });

const ContainerLegends = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 31,
  justifyContent: 'center',
  marginTop: 24,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 64,
  },
}));

const LineContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  gap: 4,
  paddingLeft: 32,
  marginBottom: 8,
  marginTop: 4,
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const LegendAxisYItemContainer = styled('div')({});

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

const ContainerBarsMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'end',

  justifyContent: 'space-between',
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const ContainerBarsTable = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'end',
  },
}));
const ContainerBarsDesk1024 = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'end',
  },
}));
const ContainerBarsDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'end',
  },
}));

const ContainerAxisXMobile = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}));

const ContainerAxisXDesk = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}));
