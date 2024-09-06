import { Skeleton, styled } from '@mui/material';
import React from 'react';
import type { FC } from 'react';

interface Props {
  height: number;
  width: number;
}

const RectangleSkeleton: FC<Props> = ({ height, width }) => (
  <StyledSkeleton variant="rectangular" width={width} height={height} />
);

export default RectangleSkeleton;

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: 6,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],
}));
