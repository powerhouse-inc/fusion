import { styled } from '@mui/material';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import type { FC } from 'react';

interface TransactionLinkProps {
  href: string;
  text: string;
}

const TransactionLink: FC<TransactionLinkProps> = ({ href, text }) => (
  <StyledExternalLinkButton href={href} wrapText={false}>
    {text}
  </StyledExternalLinkButton>
);

const StyledExternalLinkButton = styled(ExternalLinkButton)(({ theme }) => ({
  width: 'fit-content',
  padding: '0px 6px 0px 8px',
  lineHeight: '24.8px',
  '& div': {
    width: 16,
    height: 16,
  },

  [theme.breakpoints.up('tablet_768')]: {
    padding: '2px 16px 2px 24px',
    fontSize: 16,
    '& div': {
      width: 20,
      height: 20,
    },
  },
}));

export default TransactionLink;
