import { Skeleton, styled } from '@mui/material';
import React from 'react';
import type { FC } from 'react';

interface Props {
  widthFirstItem: number;
}

const KeyResultItem: FC<Props> = ({ widthFirstItem }) => (
  <Container>
    <Circle variant="circular" />
    <RectangleContainer>
      <SkeletonItem variant="rectangular" width={widthFirstItem} height={18} />
      <SkeletonItem variant="rectangular" width={16} height={17} />
    </RectangleContainer>
  </Container>
);

export default KeyResultItem;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  alignItems: 'center',
});

const RectangleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 4,
});

const Circle = styled(Skeleton)(({ theme }) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],
}));

const SkeletonItem = styled(Skeleton)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],
}));
