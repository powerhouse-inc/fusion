import { styled, useTheme } from '@mui/material';
import ArrowNavigationForCards from '@ses/components/svg/ArrowNavigationForCards';
import { siteRoutes } from '@ses/config/routes';
import Link from 'next/link';

interface MilestoneLinkProps {
  roadmapSlug: string;
  code: string;
}

const MilestoneLink: React.FC<MilestoneLinkProps> = ({ roadmapSlug, code }) => {
  const isLight = useTheme().palette.isLight;

  return (
    <LinkCard href={`${siteRoutes.roadmapMilestones(roadmapSlug)}#${code}`}>
      <TextBox>
        <Milestone>Milestone</Milestone>
        <Code>{code}</Code>
      </TextBox>
      <ArrowContainer>
        <ArrowNavigationForCards width={24} height={24} fill={isLight ? '#434358' : '#B7A6CD'} />
      </ArrowContainer>
    </LinkCard>
  );
};

export default MilestoneLink;

const LinkCard = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  overflow: 'hidden',
  borderRadius: 6,
  background: theme.palette.isLight ? '#fff' : '#31424E',
  boxShadow: theme.palette.isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 5px 10px 0px rgba(219, 227, 237, 0.40)'
    : '10px 0px 20px 6px rgba(20, 0, 141, 0.10)',
}));

const TextBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 8,
});

const Milestone = styled('div')(({ theme }) => ({
  position: 'relative',
  color: theme.palette.isLight ? '#B6BCC2' : '#787A9B',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 1,
  textTransform: 'uppercase',
  paddingRight: 9,

  '&:after': {
    content: '""',
    background: theme.palette.isLight ? '#D4D9E1' : '#787A9B',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 1,
  },
}));

const Code = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? '#434358' : '#787A9B',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 'normal',
}));

const ArrowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.isLight ? 'rgba(236, 239, 249, 0.50)' : 'rgba(124, 107, 149, 0.30)',
  alignItems: 'center',
  overflow: 'hidden',
  justifyContent: 'center',
  width: 32,
  height: 34,
}));
