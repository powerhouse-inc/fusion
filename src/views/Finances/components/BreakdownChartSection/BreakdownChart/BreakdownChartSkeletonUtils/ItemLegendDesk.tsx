import { Skeleton, styled } from '@mui/material';
import React from 'react';
import type { FC } from 'react';

interface Props {
  widthName: number;
  widthValue: number;
}

const ItemLegendDesk: FC<Props> = ({ widthName, widthValue }) => (
  <Container>
    <SkeletonStyled variant="circular" width={16} height={16} />
    <SkeletonStyled variant="rectangular" width={widthName} height={24} style={{ borderRadius: 6 }} />
    <SkeletonStyled variant="rectangular" width={widthValue} height={24} style={{ borderRadius: 6 }} />
  </Container>
);

export default ItemLegendDesk;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  height: 'fit-content',
});

const SkeletonStyled = styled(Skeleton)(({ theme }) => ({
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.charcoal[700],
}));
