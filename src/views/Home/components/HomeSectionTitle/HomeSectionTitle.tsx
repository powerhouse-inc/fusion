'use client';

import { styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import LinkIcon from 'public/assets/svg/link.svg';
import { useMemo } from 'react';
import CopyIcon from '@/components/CopyIcon/CopyIcon';

interface HomeSectionTitleProps extends React.PropsWithChildren {
  hash: string;
}

const HomeSectionTitle: React.FC<HomeSectionTitleProps> = ({ children, hash }) => {
  const router = useRouter();

  const href = useMemo(() => {
    if (typeof window === 'undefined') return '';

    const url = new URL(window.location.href);
    url.hash = hash;
    return url.toString();
    // router is used as dependency to update the href when the query changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, router]);

  return (
    <Wrapper>
      <SectionTitle>{children}</SectionTitle>
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
    </Wrapper>
  );
};

export default HomeSectionTitle;

const Wrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

export const SectionTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: 24,
  lineHeight: '28.8px',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[300],

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 32,
    lineHeight: '38.4px',
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

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: -5,
    marginLeft: 2,
    alignItems: 'baseline',
  },
}));
