import { styled } from '@mui/material';
import React from 'react';

import type { TeamType } from '@/views/Contributors/components/TeamsSections/TeamsSections';
import ContributorDescription from './ContributorsDescription';
import type { FC } from 'react';

interface Props {
  contributorsDescription: TeamType[];
  isLegacy: boolean;
}

const TabDescriptions: FC<Props> = ({ contributorsDescription, isLegacy }) => (
  <Container>
    <TitleSection>
      {isLegacy
        ? 'These Teams contributed to the MakerDAO, later rebranded to Sky Ecosystem.'
        : 'These are the Current Contributors in the Sky Ecosystem.'}
    </TitleSection>

    <ContainerData isLegacy={isLegacy}>
      {contributorsDescription.map((contributor) => (
        <ContributorDescription contributor={contributor} isLegacy={isLegacy} key={contributor.name} />
      ))}
    </ContainerData>
  </Container>
);

export default TabDescriptions;

const Container = styled('div')<{ isLegacy?: boolean }>(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  height: '100%',
  padding: 0,
  backgroundColor: 'transparent',
}));

const TitleSection = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  padding: '8px 16px',
  borderTopRightRadius: 12,
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
}));

const ContainerData = styled('div')<{ isLegacy: boolean }>(({ theme, isLegacy = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginBottom: isLegacy ? 8 : 16,
  height: '100%',
  ...(isLegacy && {
    marginLeft: 8,
    marginTop: 4,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  }),

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: isLegacy ? 8 : 16,
    gap: 8,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: isLegacy ? 8 : 32,
    gap: 48,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginBottom: isLegacy ? 8 : 32,
    gap: 64,
  },
}));
