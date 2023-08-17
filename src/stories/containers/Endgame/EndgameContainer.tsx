import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BudgetTransitionStatusSection from './components/BudgetTransitionStatusSection/BudgetTransitionStatusSection';
import EndgameIntroductionBanner from './components/EndgameIntroductionBanner/EndgameIntroductionBanner';
import IntroductoryHeadline from './components/IntroductoryHeadline/IntroductoryHeadline';
import KeyChangesSections from './components/KeyChangesSections/KeyChangesSections';
import NavigationTabs from './components/NavigationTabs/NavigationTabs';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const EndgameContainer: React.FC = () => {
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();

  return (
    <EndgamePageContainer isLight={isLight}>
      <SEOHead
        title="MakerDAO Endgame | Endgame Overview"
        description="MakerDAO Endgame provides a comprehensive overview of Endgame governance, operations, token upgrades and budget structure."
        image={{
          src: toAbsoluteURL('/assets/img/endgame/endgame-social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/endgame/endgame-social-1200x630.png')}
      />
      <Container>
        <IntroductoryHeadline />
      </Container>
      {isEnabled('FEATURE_ENDGAME_NAVIGATION_SECTION') && <NavigationTabs />}

      <BannerContainer>
        <EndgameIntroductionBanner isKeyChanges />
      </BannerContainer>

      <Container>
        <KeyChangesSections />
        <BudgetTransitionStatusSection />
      </Container>
    </EndgamePageContainer>
  );
};

export default EndgameContainer;

const EndgamePageContainer = styled(PageContainer)<WithIsLight>(({ isLight }) => ({
  marginTop: 32,
  background: isLight ? 'white' : 'linear-gradient(180deg, #001020 0%, #000 100%)',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 40,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 64,
  },
}));

const BannerContainer = styled.div({
  marginTop: 48,
  marginBottom: 48,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 64,
    marginBottom: 64,
  },
});