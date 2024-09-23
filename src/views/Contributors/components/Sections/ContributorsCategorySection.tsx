import { styled } from '@mui/material';
import React from 'react';

import type { FancyTabItem } from '@/components/FancyTabs/FancyTabs';
import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';
import type { Team } from '@/core/models/interfaces/team';
import type { FC } from 'react';

interface Props {
  teams: Team[];
  tabs: FancyTabItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContributorsCategorySection: FC<Props> = ({ teams, tabs, activeTab, onTabChange }) => (
  <ContributorsContainer>
    <ContainerTabs>
      <ShadowWrapper>
        <FancyTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
      </ShadowWrapper>
    </ContainerTabs>
  </ContributorsContainer>
);

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
