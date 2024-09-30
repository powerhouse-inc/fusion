import { styled } from '@mui/material';
import React from 'react';
import MinimalInternalLinkButton from '@/components/MinimalInternalLinkButton/MinimalInternalLinkButton';
import type { Team } from '@/core/models/interfaces/team';
import TeamCard from './TeamCard';
import type { FC } from 'react';

interface Props {
  description: string;
  teams: Team[];
  title: string;
  totalContributors: number;
  href: string;
  type: string;
}

const ContributorsCategoryCard: FC<Props> = ({ description, teams, title, totalContributors, href, type }) => (
  <Container>
    <ContainerHeaderLink>
      <Header>
        <Title>{title}</Title>
        <LinkDesk>
          <MinimalInternalLinkButton label="Details" href={href} />
        </LinkDesk>
      </Header>
    </ContainerHeaderLink>
    <ContainerCardDescriptions>
      <ContainerDescription>
        <Description>{description}</Description>
      </ContainerDescription>
      <Content>
        <TeamCard teams={teams} totalContributors={totalContributors} type={type} />
      </Content>
    </ContainerCardDescriptions>
  </Container>
);

export default ContributorsCategoryCard;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  borderRadius: '12px 12px 12px 12px',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'column',
  },
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 40,
  overflow: 'hidden',
  padding: '4px 8px 4px 24px',
  borderRadius: '12px 12px 0px 0px',
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  display: 'flex',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 0,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('tablet_768')]: {
    flex: 1,
    width: 271,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    flex: 1,
    width: 464,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 512,
    flex: 1.3,
  },
}));

const ContainerDescription = styled('div')(({ theme }) => ({
  borderRadius: 12,
  padding: 8,
  display: 'flex',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
    flex: 1.36,
    width: 401,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: 16,
    flex: 0.93,
    width: 464,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 656,
    flex: 1.6,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 768,
    flex: 1.87,
  },
}));

const ContainerHeaderLink = styled('div')(() => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
}));

const LinkDesk = styled('div')(({ theme }) => ({
  display: 'flex',
  '& div': {
    color: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.slate[100],
  },
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.sky[1000],
  },
  ':hover': {
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.sky[1000],
    },
    '& div': {
      color: theme.palette.isLight ? theme.palette.colors.sky[1000] : theme.palette.colors.sky[1000],
    },
  },
}));

const ContainerCardDescriptions = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 8,
  gap: 8,
  borderRadius: '0px 0px 12px 12px',

  backgroundColor: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    flex: 1,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    flex: 1,
    gap: 16,
  },
}));
