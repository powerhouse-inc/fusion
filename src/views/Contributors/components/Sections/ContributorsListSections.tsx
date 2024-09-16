import { styled } from '@mui/material';
import React from 'react';
import SimpleBar from 'simplebar-react';
import Card from '@/components/Card/Card';
import type { FancyTabItem } from '@/components/FancyTabs/FancyTabs';
import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';
import type { ScopeSizeVariant } from '@/components/ScopeChip/ScopeChip';
import type { Team } from '@/core/models/interfaces/team';
import type { CustomStyles } from '@/views/Home/components/Contributors/ContributorsItem';
import ContributorsItem from '@/views/Home/components/Contributors/ContributorsItem';
import type { FC } from 'react';

interface Props {
  teams: Team[];
  tabs: FancyTabItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  subTitle: string;
  textDefault?: boolean;
  hasDefaultColors?: boolean;
  customStyles?: CustomStyles;
  sizeScope?: ScopeSizeVariant;
}

const ContributorsListSections: FC<Props> = ({
  teams,
  tabs,
  activeTab,
  onTabChange,
  subTitle,
  textDefault,
  hasDefaultColors,
  customStyles,
  sizeScope,
}) => (
  <ContributorsContainer>
    <ContainerTabs>
      <ShadowWrapper>
        <FancyTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

        <ContributorInformation>
          <Title>{subTitle}</Title>
          <ContainerScroll>
            <SimpleBarStyled>
              <ContainerContributors>
                {teams.map((team) => (
                  <ContributorsItem
                    key={team.id}
                    contributor={team}
                    textDefault={textDefault}
                    hasDefaultColors={hasDefaultColors}
                    customStyles={customStyles}
                    sizeScope={sizeScope}
                  />
                ))}
              </ContainerContributors>
            </SimpleBarStyled>
          </ContainerScroll>
        </ContributorInformation>
      </ShadowWrapper>
    </ContainerTabs>
  </ContributorsContainer>
);

export default ContributorsListSections;

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

const ContainerContributors = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 8,
  flex: 1,
});
const SimpleBarStyled = styled(SimpleBar)(({ theme }) => ({
  height: '100%',
  width: '100%',

  '.simplebar-scrollbar::before': {
    width: 4,
    marginLeft: 4,
    height: 128,
    background: theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[700],
    borderRadius: 12,
  },

  [theme.breakpoints.up('tablet_768')]: {
    height: 480,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 540,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    height: 550,
  },
}));

const ContainerScroll = styled('div')({
  display: 'flex',
  marginRight: 4,
});
