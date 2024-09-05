import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import { useRouter } from 'next/router';
import Information from 'public/assets/svg/info_outlined.svg';
import LinkIcon from 'public/assets/svg/link.svg';
import React, { useMemo } from 'react';
import CopyIcon from '@/components/CopyIcon/CopyIcon';
import SESTooltip from '@/components/SESTooltip/SESTooltip';

interface SectionTitleProps {
  title: string;
  tooltip: string | React.ReactElement;
  hash?: string;
  year: string;
}

const FinancesTitle: React.FC<SectionTitleProps> = ({ title, tooltip, hash, year }) => {
  const router = useRouter();

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
    <ContainerTitleDate>
      <Container id={hash ?? slugTitle}>
        <Title>{title}</Title>
        <Tooltip>
          <SESTooltip
            content={tooltip}
            placement="bottom-start"
            enterTouchDelay={0}
            leaveTouchDelay={15000}
            showAsModal
          >
            <IconWrapper>
              <Information />
            </IconWrapper>
          </SESTooltip>
        </Tooltip>
        <CopyWrapper>
          <CopyIcon
            defaultTooltip="Copy link"
            tooltipPlacement="bottom-start"
            text={href}
            width={22}
            height={22}
            icon={<LinkIcon width={18} height={18} />}
          />
        </CopyWrapper>
      </Container>
      {year && <Date>{`Jan - Dec ${year}`}</Date>}
    </ContainerTitleDate>
  );
};

export default FinancesTitle;

const ContainerTitleDate = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,

  scrollMarginTop: 150,
});

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 800,
  lineHeight: '24px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontWeight: 700,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 18,
    lineHeight: '24px',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const Tooltip = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  width: 24,
  height: 24,

  '& svg': {
    width: 16,
    height: 16,
  },
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },
  ':hover': {
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
  },
}));

const CopyWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: 22,
  height: 22,
  cursor: 'pointer',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },

  ':hover': {
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: -5,
    marginLeft: 2,
    alignItems: 'baseline',
  },
}));

const Date = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300],
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '19.2px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 18,
    lineHeight: '21.6px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));
