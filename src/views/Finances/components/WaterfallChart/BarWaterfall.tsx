import { Skeleton, styled } from '@mui/material';
import React from 'react';
import type { FC } from 'react';

interface Props {
  heightInflow: number;
  heightOutFlow: number;
  marginBottom?: number;
  isLastOrFirstInflow?: boolean;
  isLastOrFirstOutFlow?: boolean;
}

const BarWaterfall: FC<Props> = ({
  heightInflow,
  heightOutFlow,
  marginBottom = 0,
  isLastOrFirstOutFlow = false,
  isLastOrFirstInflow = false,
}) => (
  <ContainerBar marginBottom={marginBottom}>
    <SkeletonBarStyleInflow
      heightInflow={heightInflow}
      variant="rectangular"
      isLastOrFirstInflow={isLastOrFirstInflow}
    />
    <SkeletonBarStyleOutFlow
      heightOutFlow={heightOutFlow}
      variant="rectangular"
      isLastOrFirstOutFlow={isLastOrFirstOutFlow}
    />
  </ContainerBar>
);

export default BarWaterfall;

const ContainerBar = styled('div')<{ isLast?: boolean; marginBottom?: number }>(({ theme, marginBottom }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: 3,
  width: 16,
  height: 'fit-content',
  marginBottom,
  [theme.breakpoints.up('tablet_768')]: {
    width: 32,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 44,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 48,
  },
}));

const SkeletonBarStyleInflow = styled(Skeleton)<{ heightInflow: number; isLastOrFirstInflow?: boolean }>(
  ({ theme, heightInflow, isLastOrFirstInflow }) => ({
    display: 'flex',
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],

    height: heightInflow,
    width: 16,
    borderRadius: isLastOrFirstInflow ? '4px 4px 0px 0px' : 4,
    [theme.breakpoints.up('tablet_768')]: {
      width: 32,
      borderRadius: isLastOrFirstInflow ? '8px 8px 0px 0px' : 8,
    },
    [theme.breakpoints.up('desktop_1024')]: {
      width: 44,
    },
    [theme.breakpoints.up('desktop_1280')]: {
      width: 48,
    },
  })
);
const SkeletonBarStyleOutFlow = styled(Skeleton)<{ heightOutFlow: number; isLastOrFirstOutFlow?: boolean }>(
  ({ theme, heightOutFlow, isLastOrFirstOutFlow }) => ({
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
    height: heightOutFlow,
    borderRadius: isLastOrFirstOutFlow ? '4px 4px 0px 0px' : 4,

    width: 16,
    [theme.breakpoints.up('tablet_768')]: {
      width: 32,
      borderRadius: isLastOrFirstOutFlow ? '8px 8px 0px 0px' : 8,
    },
    [theme.breakpoints.up('desktop_1024')]: {
      width: 44,
    },
    [theme.breakpoints.up('desktop_1280')]: {
      width: 48,
    },
  })
);
