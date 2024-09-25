import { styled } from '@mui/material';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import type { FC } from 'react';

interface TransactionLinkProps {
  href: string;
  text: string;
}

const TransactionLink: FC<TransactionLinkProps> = ({ href, text }) => (
  <StyledExternalLinkButton href={href}>{text}</StyledExternalLinkButton>
);

const StyledExternalLinkButton = styled(ExternalLinkButton)(({ theme }) => ({
  padding: '0px 6px 0px 8px',
  alignItems: 'center',
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  '&:hover': {
    border: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
    }`,
  },
  '& div': {
    width: 16,
    height: 16,
  },

  [theme.breakpoints.up('tablet_768')]: {
    padding: '3px 16px 3px 24px',
    fontSize: 16,
    '& div': {
      width: 20,
      height: 20,
    },
  },
}));

export default TransactionLink;
