import styled from '@emotion/styled';
import React from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import { Close } from '../svg/close';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  hasIcon?: boolean;
  labelMobile?: string;
}

const ResetButton: React.FC<Props> = ({ onClick, disabled, label = 'Reset Filters', hasIcon = true, labelMobile }) => (
  <>
    <Under834>
      <ResponsiveButton onClick={onClick} hasIcon={hasIcon}>
        {hasIcon ? (
          <Close width={10} height={10} fill={!disabled ? '#231536' : '#D1DEE6'} />
        ) : (
          <CustomButton
            label={labelMobile || label}
            style={{
              border: 'none',
              background: 'none',
              padding: '0px',
            }}
            onClick={onClick}
            disabled={disabled}
          />
        )}
      </ResponsiveButton>
    </Under834>
    <Over834>
      <CustomButton
        label={label}
        style={{
          width: '114px',
          border: 'none',
          background: 'none',
        }}
        onClick={onClick}
        disabled={disabled}
      />
    </Over834>
  </>
);

export default ResetButton;

const Under834 = styled.div({
  display: 'flex',
  '@media (min-width: 834px)': {
    display: 'none',
  },
});

const Over834 = styled.div({
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
});

const ResponsiveButton = styled.div<{ hasIcon: boolean }>(({ hasIcon = true }) => ({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  width: hasIcon ? '34px' : 'fit-content',
  height: '34px',
  border: hasIcon ? '1px solid #D4D9E1' : 'none',
  borderRadius: hasIcon ? '50%' : 'none',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (min-width: 834px)': {
    display: 'none',
  },
}));