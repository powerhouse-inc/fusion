import { styled } from '@mui/material';
import React from 'react';

interface Props {
  className?: string;
  title: string;
  color: string;
}

const LegendItemWaterfall: React.FC<Props> = ({ className, title, color }) => (
  <Container className={className}>
    <ContainerIcon color={color}>
      <Circle color={color} />
    </ContainerIcon>

    <Title>{title}</Title>
  </Container>
);

export default LegendItemWaterfall;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
}));
const ContainerIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  width: 12,
  height: 12,

  [theme.breakpoints.up('tablet_768')]: {
    width: 12,
    height: 12,
  },
}));

const Circle = styled('div', { shouldForwardProp: (prop) => prop !== 'color' })<{ color: string }>(
  ({ color, theme }) => ({
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: color,
    [theme.breakpoints.up('tablet_768')]: {
      width: 12,
      height: 12,
    },
  })
);

const Title = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));
