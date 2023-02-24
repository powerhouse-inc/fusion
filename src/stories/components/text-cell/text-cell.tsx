import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import type { CSSProperties } from 'react';

interface TableCellProps {
  negative?: boolean;
  children?: string | JSX.Element | JSX.Element[];
  style?: CSSProperties;
  fontFamily?: string;
  responsivePadding?: string;
  bold?: boolean;
  isHeader?: boolean;
  paddingUpTable?: string;
}

export const TextCell = ({ responsivePadding = '10px 16px', ...props }: TableCellProps) => {
  const { isLight } = useThemeContext();
  return (
    <Container
      bold={!!props.bold}
      isLight={isLight}
      fontFamily={props.fontFamily}
      style={props.style}
      negative={props.negative}
      responsivePadding={responsivePadding}
      isHeader={props.isHeader}
      paddingUpTable={props.paddingUpTable}
    >
      {props.children}
    </Container>
  );
};

const Container = styled.div<{
  bold: boolean;
  negative?: boolean;
  fontFamily?: string;
  responsivePadding?: string;
  isLight: boolean;
  isHeader?: boolean;
  paddingUpTable?: string;
}>(({ negative = false, fontFamily = 'Inter, sans-serif', isLight, bold, isHeader, paddingUpTable }) => ({
  fontFamily,
  fontWeight: bold ? 700 : 400,
  lineHeight: '19px',
  display: 'flex',
  alignItems: 'center',
  padding: isHeader ? 16 : 0,
  textAlign: isHeader ? 'left' : 'right',
  fontSize: '14px',
  paddingLeft: 16,
  color:
    isLight && negative ? '#F75524' : isLight && !negative ? '#231536' : !isLight && negative ? '#F75524' : '#D2D4EF',
  '> b': {
    fontWeight: 700,
  },
  '@media (min-width: 834px)': {
    padding: paddingUpTable ?? '16px',
    lineHeight: '19px',
    fontSize: '16px',
    textAlign: 'left',
  },
}));
