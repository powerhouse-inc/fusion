import { styled } from '@mui/material';

import React from 'react';
import Card from '@/components/Card/Card';

import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import type { Team } from '@/core/models/interfaces/team';

import TeamCard from './TeamCard';
import type { FC } from 'react';

interface Props {
  description: string;
  teams: Team[];
  title: string;
  totalContributors: number;
}

const ContributorsCategoryCard: FC<Props> = ({ description, teams, title, totalContributors }) => (
  <Container>
    <ContainerHeaderDescription>
      <Header>
        <Title>{title}</Title>
        <LinkMobile>
          <InternalLinkButton isLink />
        </LinkMobile>
        <LinkTable>
          <InternalLinkButton isLink label="View" />
        </LinkTable>
      </Header>
      <Description>{description}</Description>
      <LinkDesk>
        <InternalLinkButton isLink label="View" />
      </LinkDesk>
    </ContainerHeaderDescription>
    <Content>
      <TeamCard teams={teams} totalContributors={totalContributors} />
    </Content>
  </Container>
);

export default ContributorsCategoryCard;

const Container = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: 'none',
  flex: 1,
  padding: 8,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : 'red'}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'red',
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'column',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    gap: 24,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 32,
  [theme.breakpoints.up('tablet_768')]: {
    height: 'revert',
  },
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',
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
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : 'red',
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 8,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 0,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: 16,
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 0,
    width: 452,
    flex: 1,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 465,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 512,
    flex: 'revert',
  },
}));

const ContainerHeaderDescription = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 2,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 8,
    gap: 6,
    paddingTop: 4,
    width: 444,
    flex: 1,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 679,
    flex: 1.44,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 728,
    flex: 1,
  },
}));

const LinkDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    marginTop: 2,
    marginBottom: 6,
  },
}));
const LinkMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const LinkTable = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
  },
}));
