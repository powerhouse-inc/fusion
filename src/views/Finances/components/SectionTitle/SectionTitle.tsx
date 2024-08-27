import { styled } from '@mui/material';
import { ChainLinkIcon } from '@ses/components/svg/Link';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import CopyIcon from '@/components/CopyIcon/CopyIcon';
import Information from '@/components/icons/information';
import SESTooltip from '@/stories/components/SESTooltipLegacy/SESTooltipLegacy';

interface SectionTitleProps {
  title: string;
  tooltip: string | React.ReactElement;
  hash?: string;
}

/**
 * @deprecated should be used FinancesTitle instead
 */
const SectionTitle: React.FC<SectionTitleProps> = ({ title, tooltip, hash }) => {
  const router = useRouter();
  const { isLight } = useThemeContext();
  const slugTitle = useMemo(() => {
    // Convert to lowercase
    let slug = title.toLowerCase();

    // Remove special characters, spaces, and replace with dashes
    slug = slug.replace(/[^\w\s-]/g, ''); // Remove non-word characters except spaces and dashes
    slug = slug.replace(/\s+/g, '-'); // Replace spaces with dashes

    return slug;
  }, [title]);

  const href = useMemo(() => {
    if (typeof window === 'undefined') return '';

    const url = new URL(window.location.href);
    url.hash = hash ?? slugTitle;
    return url.toString();
    // router is used as dependency to update the href when the query changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, slugTitle, router]);

  return (
    <Container id={hash ?? slugTitle}>
      <Title>{title}</Title>
      <Tooltip>
        <SESTooltip content={tooltip} placement="bottom-start" enterTouchDelay={0} leaveTouchDelay={15000} showAsModal>
          <IconWrapper>
            <Information height={18} width={18} />
          </IconWrapper>
        </SESTooltip>
      </Tooltip>
      <CopyWrapper>
        <CopyIcon
          defaultTooltip="Copy link"
          text={href}
          width={22}
          height={22}
          icon={<ChainLinkIcon width={18} height={18} fill={isLight ? '#B6BCC2' : '#787A9B'} />}
        />
      </CopyWrapper>
    </Container>
  );
};

export default SectionTitle;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 6,
  },
  scrollMarginTop: 150,
});

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.75,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    letterSpacing: 0.4,
  },
}));

const Tooltip = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const IconWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  width: 24,
  height: 24,
  paddingLeft: 2,
  marginTop: 2,
  alignItems: 'flex-start',
  cursor: 'pointer',

  [lightTheme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 4,
  },
});

const CopyWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  width: 22,
  height: 22,
  cursor: 'pointer',

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: -5,
    marginLeft: 2,
    alignItems: 'baseline',
  },
});
