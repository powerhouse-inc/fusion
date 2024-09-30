'use client';

import { styled } from '@mui/material';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import type { Team } from '@/core/models/interfaces/team';
import { SEOHead } from '@/stories/components/SEOHead/SEOHead';
import { useContributorsSection } from '../Home/components/Contributors/useContributorsSection';
import ContributorsCategorySection from './components/Sections/ContributorsCategorySection';
import ContributorsListSections from './components/Sections/ContributorsListSections';

interface Props {
  teams: Team[];
}

const ContributorsView: React.FC<Props> = ({ teams }) => {
  const {
    activeDetailTab,
    handleActiveDetailTab,
    contributors,
    teamDetailsTabs,
    subTitle,
    textDefault,
    hasDefaultColors,
    customStyles,
    sizeScopeLargeSmall,
    activeCategoryTab,
    handleActiveCategoryTab,
    teamCategoriesTabs,
    subtitleContributors,
  } = useContributorsSection(teams);

  return (
    <PageContainer>
      <SEOHead
        title="Sky Fusion - Ecosystem Contributors"
        description="Learn about the current and legacy contributor teams and individuals in the Sky Ecosystem: Ecosystem Actors, Aligned Delegates, Keepers, and more."
      />
      <Container>
        <SectionsContainer>
          <ContributorsCategorySection
            teams={teams}
            activeTab={activeCategoryTab}
            onTabChange={handleActiveCategoryTab}
            tabs={teamCategoriesTabs}
            subtitleContributors={subtitleContributors}
          />

          <ContributorsListSections
            activeTab={activeDetailTab}
            onTabChange={handleActiveDetailTab}
            subTitle={subTitle}
            tabs={teamDetailsTabs}
            teams={contributors}
            textDefault={textDefault}
            hasDefaultColors={hasDefaultColors}
            customStyles={customStyles}
            sizeScope={sizeScopeLargeSmall}
          />
        </SectionsContainer>
      </Container>
    </PageContainer>
  );
};

export default ContributorsView;

const SectionsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  marginTop: 24,
}));
