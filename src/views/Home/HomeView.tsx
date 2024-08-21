import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import type { Team } from '@/core/models/interfaces/team';
import ContributorsSection from './components/Contributors/ContributorsSection';
import FinancesSection from './components/FinancesSection/FinancesSection';
import { SectionTitle } from './components/FinancesSectionTitle/FinancesSectionTitle';
import GovernanceSection from './components/GovernanceSection/GovernanceSection';
import HeaderCard from './components/HeaderCard/HeaderCard';
import HomeButton from './components/HomeButton/HomeButton';
import RoadmapSection from './components/RoadmapSection/RoadmapSection';
import { headerCardData, sectionsData } from './staticData';
import type { FormattedFinancesData } from './api/finances';
import type { RevenueAndSpendingRecords } from './api/revenueAndSpending';
import type { FC } from 'react';

export interface HomeViewProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  financesData: FormattedFinancesData;
  teams: Team[];
  governanceProposals: ExtendedExecutiveProposal[];
  roadmaps: Roadmap[];
  hatAddress: string;
}

const HomeView: FC<HomeViewProps> = ({
  revenueAndSpendingData,
  financesData,
  teams,
  governanceProposals,
  roadmaps,
  hatAddress,
}) => (
  <HomeViewContainer>
    <SEOHead
      title="Sky Fusion Dashboard"
      description="Sky Fusion Dashboard"
      image={{
        src: toAbsoluteURL('/assets/img/social-385x200.png'),
        width: 385,
        height: 200,
      }}
      twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
    />

    <Container>
      <section id="home">
        <HeaderCard />
      </section>
      <Section id={headerCardData.buttonTexts[0].toLowerCase()}>
        <FinancesSection revenueAndSpendingData={revenueAndSpendingData} financesData={financesData} />
      </Section>
      <Section id={headerCardData.buttonTexts[1].toLowerCase()}>
        <GovernanceSection governanceProposals={governanceProposals} hatAddress={hatAddress} />
      </Section>
      <Section id={headerCardData.buttonTexts[2].toLowerCase()}>
        <SectionTitle>{sectionsData.titles[2]}</SectionTitle>
        <ContainerMargin>
          <ContributorsSection teams={teams} />
        </ContainerMargin>
      </Section>
      <Section id={headerCardData.buttonTexts[3].toLowerCase()}>
        <SectionTitle>{sectionsData.titles[3]}</SectionTitle>
        <RoadmapSection roadmaps={roadmaps} />
      </Section>
    </Container>
    <HomeButton />
  </HomeViewContainer>
);

export default HomeView;

const HomeViewContainer = styled(PageContainer)(({ theme }) => ({
  marginTop: 24,
  backgroundImage: theme.palette.isLight
    ? 'radial-gradient(35.91% 21.42% at 100% 50%, rgba(236, 96, 221, 0.24) 0%, rgba(253, 180, 255, 0.24) 50%, rgba(253, 180, 255, 0.00) 100%)'
    : 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI4MzgiIHZpZXdCb3g9IjAgMCAxNDQwIDgzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cmVjdCBvcGFjaXR5PSIwLjUiIHdpZHRoPSIxNDQwIiBoZWlnaHQ9IjgzOCIgZmlsbD0idXJsKCNwYWludDBfcmFkaWFsXzY4NzRfOTE2MikiIGZpbGwtb3BhY2l0eT0iMC4yIi8+DQogICAgPGRlZnM+DQogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDBfcmFkaWFsXzY4NzRfOTE2MiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxNDQwIDQxOSkgcm90YXRlKC0xODApIHNjYWxlKDI3My41IDMzMC4yNjgpIj4NCiAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRUM2MEREIiBzdG9wLW9wYWNpdHk9IjAuNCIvPg0KICAgIDxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjRkRCNEZGIiBzdG9wLW9wYWNpdHk9IjAuNCIvPg0KICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZEQjRGRiIgc3RvcC1vcGFjaXR5PSIwIi8+DQogICAgPC9yYWRpYWxHcmFkaWVudD4NCiAgICA8L2RlZnM+DQogICAgPC9zdmc+DQogICAg")',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'right',
  backgroundSize: 'cover',
}));

const Section = styled('section')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 24,
  scrollSnapAlign: 'start',
  scrollMarginTop: 80,

  [theme.breakpoints.up('tablet_768')]: {
    scrollMarginTop: 110,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,
  },
}));

const ContainerMargin = styled('div')({
  marginTop: 24,
});
