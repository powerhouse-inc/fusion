import { Box, Skeleton, styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import KeyResultCard from './KeyResultCard';
import RectangleSkeleton from './RectangleSkeleton';

const SkeletonEmptyCard = () => (
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
      <ContainerLine>
        <LinkItem variant="rectangular" width={69} height={18} />
        <LinkItem variant="rectangular" width={36} height={22} />
        <VerticalLine />
      </ContainerLine>

      <LinkItem variant="rectangular" width={31} height={22} />
      <LinkItemAbsolute />
    </LinkButtonSection>

    <KeyResultCard />
  </Container>
);

export default SkeletonEmptyCard;

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

const LinkButtonSection = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  marginTop: 16,
  borderRadius: 8,
  background: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
  height: 32,
  padding: '4px 4px 4px 8px',
}));

const ContainerLine = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
}));

const LinkItem = styled(Skeleton)(({ theme }) => ({
  borderRadius: 6,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],
}));
const LinkItemAbsolute = styled(Skeleton)(({ theme }) => ({
  width: 32,
  height: 54,
  position: 'absolute',
  borderRadius: '0px 8px 8px 0px',
  right: 0,
  top: -12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],
}));

const VerticalLine = styled('div')(({ theme }) => ({
  display: 'flex',
  borderTop: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800]}`,
  marginTop: 4,
  marginBottom: 4,
  width: '22px',
  transform: 'rotate(90deg)',
}));
