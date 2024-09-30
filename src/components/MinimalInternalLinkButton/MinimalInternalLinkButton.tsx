import { styled } from '@mui/material';
import Link from 'next/link';
import Arrow from 'public/assets/svg/arrow.svg';
import React from 'react';

interface Props {
  href?: string;
  className?: string;
  label: string;
  as?: 'a' | 'div';
}

const MinimalInternalLinkButton: React.FunctionComponent<Props> = ({ href = '', className, label, as = 'a' }) =>
  as === 'a' ? (
    <Link href={href} className={className}>
      <Container>
        <Text>{label}</Text>
        <IconContainer>
          <Arrow />
        </IconContainer>
      </Container>
    </Link>
  ) : (
    <Container className="">
      <Text>{label}</Text>
      <IconContainer>
        <Arrow />
      </IconContainer>
    </Container>
  );
export default MinimalInternalLinkButton;

const Container = styled('div')(({ theme }) => ({
  minHeight: 32,
  display: 'flex',
  borderRadius: 8,
  padding: '4px 0px',
  width: 'fit-content',
  alignItems: 'center',
  gap: 8,
  color: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[800],
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[800],
  },
  ':hover': {
    '& div': {
      color: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.charcoal[900],
    },
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.charcoal[900],
    },
  },
}));

const Text = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[800],
}));

const IconContainer = styled('div')({
  width: 24,
  height: 24,
});
