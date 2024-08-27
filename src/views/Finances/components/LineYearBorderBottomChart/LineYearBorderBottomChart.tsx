import { styled } from '@mui/material';
import React from 'react';

interface Props {
  year: string;
}

const LineYearBorderBottomChart: React.FC<Props> = ({ year }) => (
  <YearXAxis>
    <YearText>{year}</YearText>
  </YearXAxis>
);

export default LineYearBorderBottomChart;

const YearXAxis = styled('div')(({ theme }) => {
  const border = `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
  }`;

  return {
    position: 'absolute',
    bottom: 33,
    left: 40,
    right: 5,
    height: 11,
    borderLeft: border,
    borderRight: border,
    borderBottom: border,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  };
});

const YearText = styled('div')(({ theme }) => ({
  fontSize: 11,
  lineHeight: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[800],
  position: 'absolute',
  bottom: -6,
  width: 52,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  textAlign: 'center',
}));
