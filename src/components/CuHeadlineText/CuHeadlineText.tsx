import { styled } from '@mui/material';

import { MAKER_BURN_LINK } from '@ses/core/utils/const';

import React from 'react';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';

interface CuHeadlineTextProps {
  cuLongCode: string;
  shortCode: string;
  className?: string;
  isCoreUnit?: boolean;
}

const CuHeadlineText: React.FC<CuHeadlineTextProps> = ({ cuLongCode, isCoreUnit = true, shortCode, className }) => {
  const resource = isCoreUnit ? 'Core Unit' : 'Ecosystem Actor';
  return (
    <LinkDescription className={className}>
      <ExternalLinkButtonStyled href={`${MAKER_BURN_LINK}/${cuLongCode}`} wrapText={false}>
        {`${shortCode} ${resource} on-chain transaction history`}
      </ExternalLinkButtonStyled>
    </LinkDescription>
  );
};

export default CuHeadlineText;

export const LinkDescription = styled('div')(() => ({
  display: 'flex',
}));

const ExternalLinkButtonStyled = styled(ExternalLinkButton)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 600,
    padding: '2px 16px 2px 24px',
  },
}));
