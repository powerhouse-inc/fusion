import { Avatar, styled } from '@mui/material';
import Link from 'next/link';
import { siteRoutes } from '@/config/routes';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';

interface ContributorsProps {
  contributors: OwnerRef[];
}

const Contributors: React.FC<ContributorsProps> = ({ contributors }) => (
  <ContributorsBox>
    <Title>Contributor(s)</Title>

    <ActorList>
      {contributors.map((contributor) => (
        <Actor key={contributor.id} href={siteRoutes.ecosystemActorAbout(contributor.code)}>
          <ActorAvatar src={contributor.imageUrl} />
          <ActorName>{contributor.name}</ActorName>
        </Actor>
      ))}
    </ActorList>
  </ContributorsBox>
);

export default Contributors;

const ContributorsBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '7px 15px',
  borderRadius: 12,
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
  }`,

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '7px 15px 15px',
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.gray[600],
}));

const ActorList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const Actor = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

const ActorAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : '1.167px 4.667px 17.85px 0px #141921',
}));

const ActorName = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[100],
}));
