import { styled } from '@mui/material';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import type { Team } from '@/core/models/interfaces/team';
import { SEOHead } from '@/stories/components/SEOHead/SEOHead';
import { useContributorsSection } from '../Home/components/Contributors/useContributorsSection';
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
    </ContributorsPageContainer>
  );
};

export default ContributorsView;

const ContributorsPageContainer = styled(PageContainer)(() => ({}));

const SectionsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  marginTop: 24,
}));
const DescriptionContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  border: '1px solid',
  height: 300, // Delete this
}));
