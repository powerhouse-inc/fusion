import { styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import type { FC } from 'react';

interface Props {
  width: number;
  height: number;
}

const LegendAxisYItem: FC<Props> = ({ width, height }) => (
  <SkeletonStyled variant="rectangular" width={width} height={height} />
);

export default LegendAxisYItem;

const SkeletonStyled = styled(Skeleton)(({ theme }) => ({
  borderRadius: 6,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
}));
