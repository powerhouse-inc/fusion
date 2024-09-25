import { styled } from '@mui/material';
import { siteRoutes } from '@/config/routes';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType } from '@/core/models/interfaces/types';
import ButtonLinkAvatar from '@/views/Home/components/ButtonLinkAvatar/ButtonLinkAvatar';
import type { FC } from 'react';

interface Props {
  teams: Team[];
  totalContributors: number;
}

const TeamCard: FC<Props> = ({ teams, totalContributors }) => (
  <Card>
    <Title>Teams {totalContributors}</Title>

    <TeamList>
      {teams.map((team) => (
        <ButtonLinkAvatar
          code={team.shortCode}
          href={
            team.type === ResourceType.CoreUnit
              ? siteRoutes.coreUnitAbout(team.shortCode)
              : team?.type === ResourceType.AlignedDelegates
              ? siteRoutes.finances('immutable/aligned-delegates?year=2024')
              : team.type === ResourceType.Keepers
              ? siteRoutes.finances('scopes/PRO/KPRS?year=2024')
              : team.type === ResourceType.Delegates
              ? siteRoutes.recognizedDelegate
              : siteRoutes.ecosystemActorAbout(team.shortCode)
          }
          img={team.image}
          title={team.name}
          key={team.id}
        />
      ))}
    </TeamList>
  </Card>
);

export default TeamCard;

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#2b303b',
  borderRadius: 6,

  gap: 8,
  [theme.breakpoints.up('tablet_768')]: {
    padding: 0,
  },
}));

const Title = styled('div')(({ theme }) => ({
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  padding: '2px 0px 2px 8px',

  borderRadius: '12px 12px 0px 0px',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  [theme.breakpoints.up('tablet_768')]: {
    padding: '2px 0px 2px 16px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '2px 12px',
  },
}));

const TeamList = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'repeat(3, 1fr)',
  gridColumnGap: 8,
  gridRowGap: 8,
  padding: '0px 8px 8px 8px',
  [theme.breakpoints.up('tablet_768')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gridColumnGap: 8,
    gridRowGap: 8,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '0px 8px 8px 6px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    padding: '0px 8px 0px 6px',
  },
}));
