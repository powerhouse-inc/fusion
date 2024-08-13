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
}

const HomeView: FC<HomeViewProps> = ({
  revenueAndSpendingData,
  financesData,
  teams,
  governanceProposals,
  roadmaps,
}) => (
  <HomeViewContainer>
    <SEOHead
      title="Homepage"
      description="Homepage description"
      image={{
        src: toAbsoluteURL('/assets/img/social-385x200.png'),
        width: 385,
        height: 200,
      }}
      twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
    />

    <Container>
      <HeaderCard />
      <Section id={headerCardData.buttonTexts[0].toLowerCase()}>
        <FinancesSection revenueAndSpendingData={revenueAndSpendingData} financesData={financesData} />
      </Section>
      <Section id={headerCardData.buttonTexts[1].toLowerCase()}>
        <GovernanceSection governanceProposals={governanceProposals} />
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
  </HomeViewContainer>
);

export default HomeView;

const HomeViewContainer = styled(PageContainer)(({ theme }) => ({
  marginTop: 24,
  backgroundImage: theme.palette.isLight
    ? 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI4MzgiIHZpZXdCb3g9IjAgMCAxNDQwIDgzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cmVjdCBvcGFjaXR5PSIwLjUiIHdpZHRoPSIxNDQwIiBoZWlnaHQ9IjgzOCIgZmlsbD0idXJsKCNwYWludDBfcmFkaWFsXzY4OTNfMjQzMjQpIiBmaWxsLW9wYWNpdHk9IjAuNCIvPg0KICAgIDxkZWZzPg0KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF82ODkzXzI0MzI0IiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE0NDAgNDE5KSByb3RhdGUoLTE4MCkgc2NhbGUoNjI4IDYxMS43NTQpIj4NCiAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRUM2MEREIiBzdG9wLW9wYWNpdHk9IjAuNiIvPg0KICAgIDxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjRkRCNEZGIiBzdG9wLW9wYWNpdHk9IjAuNiIvPg0KICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZEQjRGRiIgc3RvcC1vcGFjaXR5PSIwIi8+DQogICAgPC9yYWRpYWxHcmFkaWVudD4NCiAgICA8L2RlZnM+DQogICAgPC9zdmc+DQogICAg")'
    : 'url("data:image/svg+xml;base64,DQo8c3ZnIHdpZHRoPSIxNDQwIiBoZWlnaHQ9IjgzOCIgdmlld0JveD0iMCAwIDE0NDAgODM4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KICAgIDxyZWN0IG9wYWNpdHk9IjAuMiIgd2lkdGg9IjE0NDAiIGhlaWdodD0iODM4IiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfNjg3NF85MTYyKSIgZmlsbC1vcGFjaXR5PSIwLjYiLz4NCiAgICA8ZGVmcz4NCiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9yYWRpYWxfNjg3NF85MTYyIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE0NDAgNDE5KSByb3RhdGUoMTgwKSBzY2FsZSg0ODUgNTg1LjY2NykiPg0KICAgIDxzdG9wIHN0b3AtY29sb3I9IiNFQzYwREQiIHN0b3Atb3BhY2l0eT0iMC40Ii8+DQogICAgPHN0b3Agb2Zmc2V0PSIwLjUiIHN0b3AtY29sb3I9IiNGREI0RkYiIHN0b3Atb3BhY2l0eT0iMC40Ii8+DQogICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkRCNEZGIiBzdG9wLW9wYWNpdHk9IjAiLz4NCiAgICA8L3JhZGlhbEdyYWRpZW50Pg0KICAgIDwvZGVmcz4NCiAgICA8L3N2Zz4=")',
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
