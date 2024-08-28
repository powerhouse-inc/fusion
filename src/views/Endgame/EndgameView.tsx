import { Box, styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import KeyChangesBudgetTransitionStatusImportantLink from '@/views/Endgame/components/KeyChangesBudgetTransitionStatusImportantLink/KeyChangesBudgetTransitionStatusImportantLink';
import BudgetStructureSection from './components/BudgetStructureSection/BudgetStructureSection';
import BudgetTransitionStatusSection from './components/BudgetTransitionStatusSection/BudgetTransitionStatusSection';
import EndgameIntroductionBanner from './components/EndgameIntroductionBanner/EndgameIntroductionBanner';
import IntroductoryHeadline from './components/IntroductoryHeadline/IntroductoryHeadline';
import KeyChangesSections from './components/KeyChangesSections/KeyChangesSections';
import LatestUpdatesSection from './components/LatestUpdatesSection/LatestUpdatesSection';
import NavigationTabs from './components/NavigationTabs/NavigationTabs';
import useEndgameView, { NavigationTabEnum } from './useEndgameView';
import type { Analytic } from '@ses/core/models/interfaces/analytic';
import type { FC } from 'react';

interface EndgameViewProps {
  budgetTransitionAnalytics: Analytic;
  yearsRange: string[];
  initialYear: string;
}

const EndgameView: FC<EndgameViewProps> = ({ budgetTransitionAnalytics, yearsRange, initialYear }) => {
  const {
    sectionRefs,
    activeTab,
    transitionDataSelected,
    handleTransitionDateSelectedChange,
    budgetStructureData,
    isLoadingBudgetStructure,
    selectedYear,
    selectYearsRange,
    handleYearChange,
    transitionStatusData,
  } = useEndgameView(budgetTransitionAnalytics, yearsRange, initialYear);

  return (
    <EndgamePageContainer>
      <SEOHead
        title="Sky Fusion - Sky Endgame Overview"
        description="Sky Endgame page provides a comprehensive overview of the transition from legacy MakerDAO: governance, operations, token upgrades and budget structure changes."
      />
      <Container>
        <IntroductoryHeadline />
      </Container>

      <NavigationTabs activeTab={activeTab} />

      <Box ref={sectionRefs.current[NavigationTabEnum.LATESTS_UPDATES]} id={NavigationTabEnum.LATESTS_UPDATES}>
        <Container>
          <LatestUpdatesSection />
        </Container>
      </Box>

      <Box ref={sectionRefs.current[NavigationTabEnum.KEY_CHANGES]} id={NavigationTabEnum.KEY_CHANGES}>
        <BannerContainer id="section-key-changes">
          <EndgameIntroductionBanner isKeyChanges />
        </BannerContainer>
        <Container>
          <KeyChangesSections />
        </Container>
      </Box>

      <Container>
        <LastSectionSpace>
          <SectionSpacing>
            <Box ref={sectionRefs.current[NavigationTabEnum.BUDGET_STRUCTURE]} id={NavigationTabEnum.BUDGET_STRUCTURE}>
              <BudgetStructureSection
                totalBudgetCap={budgetStructureData.totalBudgetCap}
                averageCapUtilization={budgetStructureData.averageCapUtilization}
                endgameBudgets={budgetStructureData.endgameBudgets}
                legacyBudgets={budgetStructureData.legacyBudgets}
                scopes={budgetStructureData.scopes.budget}
                immutable={budgetStructureData.immutable.budget}
                legacy={budgetStructureData.legacy.budget}
                isLoading={isLoadingBudgetStructure}
                yearsRange={selectYearsRange}
                selectedYear={selectedYear}
                handleYearChange={handleYearChange}
              />
            </Box>
            <Box
              ref={sectionRefs.current[NavigationTabEnum.BUDGET_TRANSITION_STATUS]}
              id={NavigationTabEnum.BUDGET_TRANSITION_STATUS}
            >
              <BudgetTransitionStatusSection
                selected={transitionDataSelected}
                handleChange={handleTransitionDateSelectedChange}
                data={transitionStatusData}
              />
            </Box>
          </SectionSpacing>
          <KeyChangesBudgetTransitionStatusImportantLink />
        </LastSectionSpace>
      </Container>
    </EndgamePageContainer>
  );
};

export default EndgameView;

const EndgamePageContainer = styled(PageContainer)(() => ({
  marginTop: 24,
}));

const BannerContainer = styled('div')(({ theme }) => ({
  marginTop: 32,
  marginBottom: 32,
  scrollMarginTop: 110,
  paddingLeft: 16,
  paddingRight: 16,
  width: '100%',
  maxWidth: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 12000,
  },
}));

const SectionSpacing = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 40,
  },
}));

const LastSectionSpace = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
}));
