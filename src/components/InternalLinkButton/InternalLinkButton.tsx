import { styled } from '@mui/material';
import Link from 'next/link';
import Arrow from 'public/assets/svg/arrow.svg';
import React from 'react';
import type { PropsWithChildren } from 'react';

interface Props {
  label?: string;
  showIcon?: boolean;
  href?: string;
  className?: string;
  buttonType?: 'primary' | 'secondary';
  isLink?: boolean;
  replaceHistory?: boolean;
}

const InternalLinkButton: React.FunctionComponent<Props> = ({
  label,
  showIcon = true,
  href,
  className,
  buttonType = 'primary',
  isLink = true,
  replaceHistory = false,
}) => {
  const WrapperComponent = isLink
    ? ({ children }: PropsWithChildren) => (
        <ContainerLink
          href={href ?? ''}
          className={className}
          buttonType={buttonType}
          label={!!label}
          showIcon={showIcon}
          replace={replaceHistory}
        >
          {children}
        </ContainerLink>
      )
    : ({ children }: PropsWithChildren) => (
        <ContainerDiv className={className} buttonType={buttonType} label={!!label} showIcon={showIcon}>
          {children}
        </ContainerDiv>
      );

  return (
    <WrapperComponent>
      {label && <Text>{label}</Text>}
      {showIcon && (
        <IconContainer>
          <Arrow />
        </IconContainer>
      )}
    </WrapperComponent>
  );
};

export default InternalLinkButton;

const ContainerLink = styled(Link, {
  shouldForwardProp: (prop) => !['buttonType', 'label', 'showIcon'].includes(prop as string),
})<{ buttonType?: string; showIcon: boolean; label: boolean }>(
  ({ theme, buttonType = 'primary', label, showIcon }) => ({
    minHeight: 32,
    display: 'flex',
    borderRadius: 8,
    padding: '4px 16px 4px 16px',
    width: 'fit-content',
    alignItems: 'center',
    background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
    gap: 8,
    border: '1px solid transparent',

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[300],
    },

    ':hover': {
      gap: 16,
      padding: '4px 8px 4px 16px',
      border: '1px solid transparent',
      '& div': {
        color: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.charcoal[100],
      },
      '& path': {
        fill: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.charcoal[100],
      },
    },
    ':active': {
      padding: '4px 16px 4px 16px',
      border: theme.palette.isLight
        ? `1px solid ${theme.palette.colors.sky[400]}`
        : `1px solid ${theme.palette.colors.charcoal[700]}`,
      '& div': {
        color: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[100],
      },
      '& path': {
        fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[100],
      },
    },
    ...(buttonType === 'secondary' && {
      background: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.charcoal[800],

      '& div': {
        color: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[300],
        fontWeight: 600,
      },

      '& path': {
        fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[300],
      },
      ':hover': {
        padding: '4px 8px 4px 16px',
        background: theme.palette.isLight ? theme.palette.colors.gray[800] : theme.palette.colors.charcoal[800],
        border: theme.palette.isLight
          ? `1px solid ${theme.palette.colors.sky[900]}`
          : `1px solid ${theme.palette.colors.charcoal[600]}`,
        '& div': {
          color: theme.palette.isLight ? theme.palette.colors.sky[900] : theme.palette.colors.charcoal[200],
          fontWeight: 600,
        },
        '& path': {
          fill: theme.palette.isLight ? theme.palette.colors.sky[900] : theme.palette.colors.charcoal[200],
        },
      },
      ':active': {
        background: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.charcoal[700],
        border: theme.palette.isLight
          ? `1px solid ${theme.palette.colors.sky[700]}`
          : `1px solid ${theme.palette.colors.charcoal[500]}`,
        '& div': {
          color: theme.palette.isLight ? theme.palette.colors.sky[100] : theme.palette.colors.charcoal[300],
        },
        '& path': {
          fill: theme.palette.isLight ? theme.palette.colors.sky[100] : theme.palette.colors.charcoal[300],
        },
      },
    }),
    ...(!label &&
      showIcon && {
        display: 'flex',
        width: 56,
        height: 32,
        padding: '4px 16px 4px 16px',
        backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
        ':hover': {
          padding: '4px 8px 4px 24px',
          '& path': {
            fill: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.charcoal[100],
          },
        },
        ':active': {
          padding: '4px 16px 4px 16px',
          background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
          border: theme.palette.isLight
            ? `1px solid ${theme.palette.colors.sky[400]}`
            : `1px solid ${theme.palette.colors.charcoal[700]}`,

          '& path': {
            fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[100],
          },
        },
      }),
  })
);

const ContainerDiv = styled('div', {
  shouldForwardProp: (prop) => !['buttonType', 'label', 'showIcon'].includes(prop as string),
})<{ buttonType?: string; showIcon: boolean; label: boolean }>(
  ({ theme, buttonType = 'primary', label, showIcon }) => ({
    minHeight: 32,
    display: 'flex',
    borderRadius: 8,
    padding: '4px 16px 4px 16px',
    width: 'fit-content',
    alignItems: 'center',
    background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
    gap: 8,
    border: '1px solid transparent',
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.slate[100],
    },

    ':hover': {
      gap: 16,
      padding: '4px 8px 4px 16px',
      border: '1px solid transparent',
      '& div': {
        color: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.charcoal[100],
      },
      '& path': {
        fill: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.charcoal[100],
      },
    },
    ':active': {
      padding: '4px 16px 4px 16px',
      border: theme.palette.isLight
        ? `1px solid ${theme.palette.colors.sky[400]}`
        : `1px solid ${theme.palette.colors.charcoal[700]}`,
      '& div': {
        color: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[100],
      },
      '& path': {
        fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[100],
      },
    },
    ...(buttonType === 'secondary' && {
      background: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.charcoal[800],

      '& div': {
        color: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[300],
        fontWeight: 600,
      },

      '& path': {
        fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[300],
      },
      ':hover': {
        padding: '4px 8px 4px 16px',
        background: theme.palette.isLight ? theme.palette.colors.gray[800] : theme.palette.colors.charcoal[800],
        border: theme.palette.isLight
          ? `1px solid ${theme.palette.colors.sky[900]}`
          : `1px solid ${theme.palette.colors.charcoal[600]}`,
        '& div': {
          color: theme.palette.isLight ? theme.palette.colors.sky[900] : theme.palette.colors.charcoal[200],
          fontWeight: 600,
        },
        '& path': {
          fill: theme.palette.isLight ? theme.palette.colors.sky[900] : theme.palette.colors.charcoal[200],
        },
      },
      ':active': {
        background: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.charcoal[700],
        border: theme.palette.isLight
          ? `1px solid ${theme.palette.colors.sky[700]}`
          : `1px solid ${theme.palette.colors.charcoal[500]}`,
        '& div': {
          color: theme.palette.isLight ? theme.palette.colors.sky[100] : theme.palette.colors.charcoal[300],
        },
        '& path': {
          fill: theme.palette.isLight ? theme.palette.colors.sky[100] : theme.palette.colors.charcoal[300],
        },
      },
    }),
    ...(!label &&
      showIcon && {
        display: 'flex',
        width: 56,
        height: 32,

        padding: '4px 16px 4px 16px',
        backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
        ':hover': {
          padding: '4px 8px 4px 24px',
          '& path': {
            fill: theme.palette.isLight ? theme.palette.colors.sky['+100'] : theme.palette.colors.charcoal[300],
          },
        },
        ':active': {
          padding: '4px 16px 4px 16px',
          background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
          border: theme.palette.isLight
            ? `1px solid ${theme.palette.colors.sky[400]}`
            : `1px solid ${theme.palette.colors.charcoal[700]}`,

          '& path': {
            fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[100],
          },
        },
      }),
  })
);

const Text = styled('div')(({ theme }) => ({
  fontWeight: 600,
  size: 16,
  flexDirection: 'row',
  lineHeight: '24px',
  letterSpacing: '-0.32px',
  color: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[300],
}));

const IconContainer = styled('div')({
  width: 24,
  height: 24,
});
