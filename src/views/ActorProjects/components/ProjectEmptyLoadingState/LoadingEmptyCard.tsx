import { Box, Skeleton, styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import KeyResultCard from './KeyResultCard';
import RectangleSkeleton from './RectangleSkeleton';

const LoadingEmptyCard = () => (
  <Container>
    <HeaderSkeleton alignItems="center" justifyContent="space-between">
      <SkeletonStyledMainRectangle variant="rectangular" />
      <SkeletonStyledCircle variant="circular" />
    </HeaderSkeleton>

    <TitleContainer>
      <RectangleSkeleton width={75} height={24} />
    </TitleContainer>

    <Description>
      <RectangleSkeleton width={311} height={12} />
      <RectangleSkeleton width={288} height={12} />
      <RectangleSkeleton width={268} height={12} />
      <RectangleSkeleton width={297} height={12} />
      <RectangleSkeleton width={154} height={12} />
    </Description>

    <LinkButtonSection>
      <Skeleton variant="rectangular" width={260} height={20} sx={{ borderRadius: 6 }} />
    </LinkButtonSection>

    <KeyResultCard />
  </Container>
);

export default LoadingEmptyCard;

const Container = styled(Card)(() => ({
  padding: 16,
  minWidth: 343,
}));

const HeaderSkeleton = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  marginBottom: 8,
}));
const SkeletonStyledMainRectangle = styled(Skeleton)(({ theme }) => ({
  width: 24,
  display: 'flex',
  flex: 1,
  height: 24,
  borderRadius: 6,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],
}));

const SkeletonStyledCircle = styled(Skeleton)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],
}));

const TitleContainer = styled('div')(() => ({
  marginBottom: 13,
}));

const Description = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}));

const LinkButtonSection = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
  marginTop: 16,
}));
