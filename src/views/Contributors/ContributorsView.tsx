import { styled } from '@mui/material';
import SimpleBar from 'simplebar-react';
import Card from '@/components/Card/Card';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';
import type { Team } from '@/core/models/interfaces/team';
import { SEOHead } from '@/stories/components/SEOHead/SEOHead';
import { useContributorsSection } from '../Home/components/Contributors/useContributorsSection';

interface Props {
  teams: Team[];
}

const ContributorsView: React.FC<Props> = ({ teams }) => {
  const {
    activeDetailTab,
    handleActiveDetailTab,

    teamDetailsTabs,
    subTitle,
  } = useContributorsSection(teams);
  return (
    <ContributorsPageContainer>
      <SEOHead
        title="Sky Fusion - Ecosystem Contributors"
        description="Learn about the current and legacy contributor teams and individuals in the Sky Ecosystem: Ecosystem Actors, Aligned Delegates, Keepers, and more."
      />
      <Container>
        <SectionsContainer>
          <DescriptionContainer>DescriptionContainer</DescriptionContainer>
          <ContributorsContainer>
            <ContainerTabs>
              <ShadowWrapper>
                <FancyTabs
                  tabs={teamDetailsTabs}
                  activeTab={activeDetailTab}
                  onTabChange={(tab: string) => {
                    handleActiveDetailTab(tab);
                  }}
                />

                <ContributorInformation>
                  <Title>{subTitle}</Title>
                  <ContainerScroll>
                    <SimpleBarStyled>
                      <ContainerContributors>ContainerContributors</ContainerContributors>
                    </SimpleBarStyled>
                  </ContainerScroll>
                </ContributorInformation>
              </ShadowWrapper>
            </ContainerTabs>
          </ContributorsContainer>
        </SectionsContainer>
      </Container>
    </ContributorsPageContainer>
  );
};

export default ContributorsView;

const ContributorsPageContainer = styled(PageContainer)(() => ({}));

const SectionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  marginTop: 24,
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));
const DescriptionContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  border: '1px solid',
  height: 300, // Delete this
}));

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
  width: 'calc(100%-8px)', // Reduces the width of the container to make space for the scrollbar margin
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
