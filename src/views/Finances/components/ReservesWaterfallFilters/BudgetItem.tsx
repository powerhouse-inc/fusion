import { Box, styled } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import type { ReactElement } from 'react';

interface Props {
  label: string | ReactElement;
  image: string;
  isActive?: boolean;
}

const BudgetItem: React.FC<Props> = ({ image, label, isActive }) => (
  <Container>
    <ImageContainer>
      <Image src={image ?? ''} alt="Budget Icon" fill={true} unoptimized />
    </ImageContainer>
    <Title isActive={isActive}>{label}</Title>
  </Container>
);

export default BudgetItem;

const Container = styled(Box)(() => ({
  gap: 16,
  display: 'flex',
  position: 'relative',
  height: '100%',
}));

const ImageContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FCFCFC',
  borderRadius: '50%',
  overflow: 'hidden',
  filter: theme.palette.isLight
    ? 'filter: drop-shadow(1.524px 3.048px 5.333px rgba(25, 144, 255, 0.20))'
    : 'filter: drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))',
}));

const Title = styled('div')<{ isActive?: boolean }>(({ theme, isActive }) => ({
  color: theme.palette.isLight
    ? isActive
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.gray[600]
    : isActive
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.gray[50],
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  display: 'flex',
  flexWrap: 'wrap',
  width: 200,
}));
