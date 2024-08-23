import { Skeleton, styled } from '@mui/material';
import React from 'react';

interface Props {
  width: number;
}

const ItemLegendAxisValues: React.FC<Props> = ({ width }) => <ContainerSkeleton variant="rectangular" width={width} />;

export default ItemLegendAxisValues;

const ContainerSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: 6,
  height: 8,
  background: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 6,
    height: 19,
  },
}));
