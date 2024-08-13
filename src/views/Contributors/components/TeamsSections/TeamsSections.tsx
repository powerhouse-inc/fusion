import { styled } from '@mui/material';
import TeamTypeCard from '../TeamTypeCard/TeamTypeCard';
import type { CardType } from '../TeamTypeCard/TeamTypeCard';

export interface TeamType {
  type: CardType;
  name: string;
  teams: number;
  href: string;
  description: string;
}

interface TeamsSectionsProps {
  sectionName: string;
  subTitle: string;
  teams: TeamType[];
}

const TeamsSections: React.FC<TeamsSectionsProps> = ({ sectionName, teams, subTitle }) => (
  <SectionContainer>
    <TitleSubtitleContainer>
      <Title>{sectionName}</Title>

      <SubTitle>{subTitle}</SubTitle>
    </TitleSubtitleContainer>

    {teams.map((team) => (
      <TeamTypeCard
        key={team.name}
        name={team.name}
        teams={team.teams}
        href={team.href}
        description={team.description}
        cardType={team.type}
      />
    ))}
  </SectionContainer>
);

export default TeamsSections;

const SectionContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const Title = styled('h2')(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: 18,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const SubTitle = styled('div')(({ theme }) => ({
  fontSize: 18,
  lineHeight: '21.6px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
}));

const TitleSubtitleContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));
