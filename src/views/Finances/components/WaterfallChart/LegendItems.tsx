import { Skeleton, styled } from '@mui/material';
import React from 'react';
import type { FC } from 'react';

interface Props {
  circleDimension: number;
  legendWith: number;
}

const LegendItems: FC<Props> = ({ circleDimension, legendWith }) => (
  <ContainerItem>
    <SkeletonIcon variant="circular" circleDimension={circleDimension} />
    <SkeletonValue variant="rectangular" legendWith={legendWith} />
  </ContainerItem>
);

export default LegendItems;

const ContainerItem = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

const SkeletonIcon = styled(Skeleton, { shouldForwardProp: (prop) => prop !== 'circleDimension' })<{
  circleDimension: number;
}>(({ theme, circleDimension }) => ({
  width: circleDimension,
  height: circleDimension,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
}));

const SkeletonValue = styled(Skeleton, { shouldForwardProp: (prop) => prop !== 'legendWith' })<{
  legendWith: number;
}>(({ theme, legendWith }) => ({
  width: legendWith,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
  height: 12,
  borderRadius: 6,
  [theme.breakpoints.up('tablet_768')]: {
    height: 16,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    height: 24,
  },
}));
