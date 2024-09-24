import { styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import type { FancyTabItem } from '@/components/FancyTabs/FancyTabs';
import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';
import type { Team } from '@/core/models/interfaces/team';
import ContributorsCategoryCard from '@/views/Contributors/components/ContributorsCategoryCard';
import { useContributorsCategorySection } from '@/views/Contributors/components/Sections/useContributorsCategorySection';
import { currentTeams, legacyTeams } from '@/views/Contributors/staticData';
import type { FC } from 'react';

interface Props {
  teams: Team[];
  tabs: FancyTabItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ContributorsCategorySection: FC<Props> = ({ teams, tabs, activeTab, onTabChange }) => {
  const { ecosystemActors, subtitleContributors, alignedDelegates, keepers, coreUnits } =
    useContributorsCategorySection(teams);
  return (
    <ContributorsContainer>
      <ContainerTabs>
        <ShadowWrapper>
          <FancyTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

          <ContributorInformation>
            <Title>{subtitleContributors}</Title>
            <ContainerScroll>
              {activeTab === '1' && (
                <ContainerContributors>
                  <ContributorsCategoryCard
                    description={currentTeams[0].description}
                    teams={ecosystemActors}
                    title={currentTeams[0].name}
                    totalContributors={currentTeams[0].teams}
                    href={currentTeams[0].href}
                  />
                  <ContributorsCategoryCard
                    description={currentTeams[1].description}
                    teams={alignedDelegates}
                    title={currentTeams[1].name}
                    totalContributors={currentTeams[1].teams}
                    href={currentTeams[1].href}
                  />
                  <ContributorsCategoryCard
                    description={currentTeams[2].description}
                    teams={keepers}
                    title={currentTeams[2].name}
                    totalContributors={currentTeams[2].teams}
                    href={currentTeams[2].href}
                  />
                </ContainerContributors>
              )}
              {activeTab === '2' && (
                <ContainerContributors>
                  <ContributorsCategoryCard
                    description={legacyTeams[0].description}
                    teams={coreUnits}
                    title={legacyTeams[0].name}
                    totalContributors={legacyTeams[0].teams}
                    href={legacyTeams[0].href}
                  />
                  <ContributorsCategoryCard
                    description={legacyTeams[1].description}
                    teams={coreUnits}
                    title={legacyTeams[1].name}
                    totalContributors={legacyTeams[1].teams}
                    href={legacyTeams[1].href}
                  />
                  <ContributorsCategoryCard
                    description={legacyTeams[2].description}
                    teams={coreUnits}
                    title={legacyTeams[2].name}
                    totalContributors={legacyTeams[2].teams}
                    href={legacyTeams[2].href}
                  />
                </ContainerContributors>
              )}
            </ContainerScroll>
          </ContributorInformation>
        </ShadowWrapper>
      </ContainerTabs>
    </ContributorsContainer>
  );
};

export default ContributorsCategorySection;

const ContributorsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const ContainerTabs = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ContributorInformation = styled(Card)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '0px 12px 12px 12px',
  overFlow: 'hidden',
}));

const Title = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  padding: '9px 16px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',

  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: '0px 12px 0px 0px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const ContainerContributors = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 8,
  flex: 1,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 12,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 8,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    padding: '6px 8px 8px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '6px 8px 8px',
    gap: 7,
  },
}));

const ContainerScroll = styled('div')({
  display: 'flex',
  marginRight: 4,
});
