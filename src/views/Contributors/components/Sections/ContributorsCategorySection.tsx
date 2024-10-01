import { styled } from '@mui/material';
import React from 'react';
import type { FancyTabItem } from '@/components/FancyTabs/FancyTabs';
import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';
import type { Team } from '@/core/models/interfaces/team';
import { currentTeams, legacyTeams } from '../../staticData';
import ContributorsCategoryCard from '../ContributorsCategoryCard';
import { useContributorsCategorySection } from './useContributorsCategorySection';
import type { FC } from 'react';

interface Props {
  teams: Team[];
  tabs: FancyTabItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  subtitleContributors: string;
}

const ContributorsCategorySection: FC<Props> = ({ teams, tabs, activeTab, onTabChange, subtitleContributors }) => {
  const {
    ecosystemActors,

    alignedDelegates,
    keepers,
    coreUnits,
    delegates,
    spfs,
  } = useContributorsCategorySection(teams);
  return (
    <ContributorsContainer>
      <ContainerTabs>
        <ShadowWrapper>
          <FancyTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
          <Title>{subtitleContributors}</Title>
        </ShadowWrapper>
        <ContributorInformation>
          <ContainerScroll>
            {activeTab === '1' && (
              <ContainerContributors>
                <ContributorsCategoryCard
                  description={currentTeams[0].description}
                  teams={ecosystemActors}
                  title={currentTeams[0].name}
                  totalContributors={currentTeams[0].teams}
                  href={currentTeams[0].href}
                  type={currentTeams[0].type === 'team' ? 'Teams' : 'Contributors'}
                />
                <ContributorsCategoryCard
                  description={currentTeams[1].description}
                  teams={alignedDelegates}
                  title={currentTeams[1].name}
                  totalContributors={currentTeams[1].teams}
                  href={currentTeams[1].href}
                  type={currentTeams[1].type === 'team' ? 'Teams' : 'Contributors'}
                />
                <ContributorsCategoryCard
                  description={currentTeams[2].description}
                  teams={keepers}
                  title={currentTeams[2].name}
                  totalContributors={currentTeams[2].teams}
                  href={currentTeams[2].href}
                  type={currentTeams[2].type === 'team' ? 'Teams' : 'Contributors'}
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
                  type={legacyTeams[0].type === 'team' ? 'Teams' : 'Contributors'}
                />
                <ContributorsCategoryCard
                  description={legacyTeams[1].description}
                  teams={delegates}
                  title={legacyTeams[1].name}
                  totalContributors={legacyTeams[1].teams}
                  href={legacyTeams[1].href}
                  type={legacyTeams[2].type === 'team' ? 'Teams' : 'Contributors'}
                />
                <ContributorsCategoryCard
                  description={legacyTeams[2].description}
                  teams={spfs}
                  title={legacyTeams[2].name}
                  totalContributors={legacyTeams[2].teams}
                  href={legacyTeams[2].href}
                  type={legacyTeams[2].type === 'team' ? 'Teams' : 'Contributors'}
                />
              </ContainerContributors>
            )}
          </ContainerScroll>
        </ContributorInformation>
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
  gap: 24,
}));

const ContributorInformation = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
}));

const Title = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  padding: '9px 8px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  borderRadius: '0px 12px 12px 12px',
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '8px 16px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const ContainerContributors = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  flex: 1,
}));

const ContainerScroll = styled('div')({
  display: 'flex',
});
