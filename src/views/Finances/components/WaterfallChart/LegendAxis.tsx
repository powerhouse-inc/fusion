import { styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import type { FC } from 'react';

interface Props {
  width?: number;
  monthWith?: number;
  yearWidth?: number;
}
const LegendAxis: FC<Props> = ({ width = 7, monthWith, yearWidth }) => (
  <>
    <ItemContainer>
      <SkeletonStyledMobile variant="rectangular" width={width} height={7.75} sx={{ borderRadius: 4 }} />
    </ItemContainer>
    <ContainerDesk>
      <SkeletonStyledDesk variant="rectangular" width={monthWith} />
      <SkeletonStyledDesk variant="rectangular" width={yearWidth} />
    </ContainerDesk>
  </>
);
export default LegendAxis;

const SkeletonStyledMobile = styled(Skeleton)(({ theme }) => ({
  borderRadius: 2,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
}));

const SkeletonStyledDesk = styled(Skeleton)(({ theme }) => ({
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 4,
    height: 8,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    borderRadius: 6,
    height: 19,
  },
}));

const ItemContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const ContainerDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 37,
    gap: 3,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 48,
  },
}));
