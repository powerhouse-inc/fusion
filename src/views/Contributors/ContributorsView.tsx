import { styled } from '@mui/material';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import { SEOHead } from '@/stories/components/SEOHead/SEOHead';
import TeamsSections from './components/TeamsSections/TeamsSections';
import { currentTeams, legacyTeams } from './staticData';

const ContributorsView: React.FC = () => (
  <ContributorsPageContainer>
    <SEOHead
      title="Sky Fusion - Ecosystem Contributors"
      description="Learn about the current and legacy contributor teams and individuals in the Sky Ecosystem: Ecosystem Actors, Aligned Delegates, Keepers, and more."
    />
    <Container>
      <SectionsContainer>
        <TeamsSections
          sectionName="Current Contributors"
          teams={currentTeams}
          subTitle="These are the Current Contributors in the Sky Ecosystem."
        />

        <TeamsSections
          sectionName="Legacy Contributors"
          teams={legacyTeams}
          subTitle="These Teams contributed to the MakerDAO, later rebranded to Sky Ecosystem."
        />
      </SectionsContainer>
    </Container>
  </ContributorsPageContainer>
);

export default ContributorsView;

const ContributorsPageContainer = styled(PageContainer)(() => ({}));

const SectionsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  marginTop: 24,
}));
