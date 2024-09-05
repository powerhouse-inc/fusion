import styled from '@emotion/styled';
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ClipBoard from '../../stories/components/svg/ClipBoard';
import SESTooltip from '../SESTooltip/SESTooltip';
import type { TooltipProps } from '@mui/material';

interface CopyIconProps {
  text: string;
  className?: string;
  defaultTooltip?: string;
  defaultCopyTooltip?: string;
  width?: number;
  height?: number;
  icon?: React.ReactNode;
  tooltipPlacement?: TooltipProps['placement'];
}

const CopyIcon: React.FC<CopyIconProps> = ({
  className,
  text,
  height,
  width,
  defaultTooltip = 'Copy',
  defaultCopyTooltip = 'Copied!',
  icon,
  tooltipPlacement = 'top',
}) => {
  const [tooltipText, setTooltipText] = useState<string>(defaultTooltip);

  const handleOnClose = () => {
    setTimeout(() => setTooltipText(defaultTooltip), 100);
  };

  return (
    <IconContainer className={className}>
      <SESTooltip content={tooltipText} onClose={handleOnClose} placement={tooltipPlacement} className="custom-tooltip">
        <div>
          <CopyToClipboard text={text} onCopy={() => setTooltipText(defaultCopyTooltip)}>
            {icon || <ClipBoard width={width} height={height} onClick={(e: React.MouseEvent) => e.stopPropagation()} />}
          </CopyToClipboard>
        </div>
      </SESTooltip>
    </IconContainer>
  );
};

export default CopyIcon;

const IconContainer = styled.div({
  display: 'flex',
  cursor: 'pointer',

  '> div': {
    display: 'flex',
  },
});
