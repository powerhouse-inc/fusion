import { styled } from '@mui/material';
import Link from 'next/link';
import Arrow from 'public/assets/svg/arrow.svg';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';
import type { FC } from 'react';

interface Props {
  href: string;
  img: string;
  title: string;
  code: string;
}

const ButtonLinkAvatar: FC<Props> = ({ href, img, title, code }: Props) => (
  <ButtonLinkWrapper href={href}>
    <ContainerDescriptionImage>
      <CircleAvatarExtended name={title} image={img} />

      <CodeTitle>
        <Code>{code}</Code>
        <Title>{title}</Title>
      </CodeTitle>
    </ContainerDescriptionImage>
    <ContainerArrow>
      <Arrow />
    </ContainerArrow>
  </ButtonLinkWrapper>
);

export default ButtonLinkAvatar;

const ButtonLinkWrapper = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 8,
  alignItems: 'center',
  borderRadius: 8,
  textDecoration: 'none',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  padding: '4px 8px 4px 8px',
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[300],
  },

  [theme.breakpoints.up('tablet_768')]: {
    padding: '4px 8px 4px 8px',
  },
  ':hover': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : '#3D4453',
  },
}));

const CodeTitle = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
  alignItems: 'center',
});

const CircleAvatarExtended = styled(CircleAvatar)(({ theme }) => ({
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.shortShadow,
  width: 24,
  height: 24,
  minWidth: 24,
  minHeight: 24,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  fontSize: 10,
}));

const ContainerArrow = styled('div')(({ theme }) => ({
  display: 'flex',
  width: 24,
  height: 24,
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.charcoal[300],
  },
}));

const ContainerDescriptionImage = styled('div')({
  display: 'flex',
  gap: 8,
});

const Title = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',

  width: '100%',

  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 114,
    minWidth: 'revert',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 114,
    minWidth: 'revert',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 130,
  },
}));

const Code = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',

  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
}));
