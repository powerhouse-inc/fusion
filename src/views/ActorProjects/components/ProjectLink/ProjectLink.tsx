import { styled } from '@mui/material';
import Link from 'next/link';
import ArrowRight from 'public/assets/svg/arrow.svg';

interface ProjectLinkProps {
  href?: string;
  code: string;
  name: string;
}

const ProjectLink: React.FC<ProjectLinkProps> = ({ href, code, name }) => (
  <LinkCard as={href ? 'a' : 'div'} href={href ?? ''}>
    <TextBox>
      <ProjectLabel>Project</ProjectLabel>
      <NameBox addLimit={!!href}>
        <Code>{code}</Code>
        <Name addLimit={!!href}>{name}</Name>
      </NameBox>
    </TextBox>
    {href && (
      <ArrowContainer>
        <Arrow width={24} height={24} />
      </ArrowContainer>
    )}
  </LinkCard>
);

export default ProjectLink;

const LinkCard = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  overflow: 'hidden',
  borderRadius: 8,
  background: theme.palette.isLight ? '#fff' : theme.palette.colors.charcoal[800],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.chartsShadows : 'none',
}));

const TextBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '4px 4px 4px 8px',
  maxWidth: 'calc(100% - 40px)',
  width: '100%',
});

const ProjectLabel = styled('div')(({ theme }) => ({
  position: 'relative',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  textTransform: 'uppercase',
  paddingRight: 9,

  '&:after': {
    content: '""',
    background: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.slate[200],
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 1,
  },
}));

const NameBox = styled('div')<{ addLimit: boolean }>(({ addLimit }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 4,
  width: `calc(100% - ${addLimit ? '50px' : '40px'})`,
}));

const Code = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
}));

const Name = styled('span')<{ addLimit: boolean }>(({ theme, addLimit }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: `calc(100% - ${addLimit ? '55px' : '0px'})`,
}));

const ArrowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[700],
  alignItems: 'center',
  overflow: 'hidden',
  justifyContent: 'center',
  width: 32,
  height: 32,
}));

const Arrow = styled(ArrowRight)(({ theme }) => ({
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[300],
  },

  '&:hover path': {
    fill: theme.palette.colors.sky[1000],
  },
}));
