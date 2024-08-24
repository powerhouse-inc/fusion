import { Skeleton, styled } from '@mui/material';
import React from 'react';

const ItemLegendValues: React.FC = () => (
  <ContainerItem>
    <ItemLegendCircle variant="circular" />
    <SkeletonItemRectangular variant="rectangular" />
    <SkeletonItemValue variant="rectangular" />
  </ContainerItem>
);

export default ItemLegendValues;

const ContainerItem = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
});

const SkeletonItemRectangular = styled(Skeleton)(({ theme }) => ({
  height: 10.5,
  borderRadius: 6,
  width: 85,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.slate[400],
  [theme.breakpoints.up('tablet_768')]: {
    height: 14,
    width: 109,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 14,
    width: 106,
  },
}));

const ItemLegendCircle = styled(Skeleton)(({ theme }) => ({
  width: 12,
  height: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.slate[400],
  [theme.breakpoints.up('tablet_768')]: {
    width: 16,
    height: 16,
  },
}));

const SkeletonItemValue = styled(Skeleton)(({ theme }) => ({
  width: 15,
  height: 10.5,
  borderRadius: 6,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.slate[400],
}));
