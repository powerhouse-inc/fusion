import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import type { IntersectionOptions } from 'react-intersection-observer';

export enum NavigationTabEnum {
  KEY_CHANGES = 'key-changes',
  BUDGET_STRUCTURE = 'endgame-budget-structure',
  BUDGET_TRANSITION_STATUS = 'budget-transition-status',
}

const INTERSECTION_OPTIONS: IntersectionOptions = {
  threshold: 0.7,
  fallbackInView: false,
  rootMargin: '130px 0px 0px 0px',
};

const useEndgameContainer = () => {
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();
  const [pauseUrlUpdate, setPauseUrlUpdate] = useState<boolean>(false);

  useEffect(() => {
    // scroll into a section on page load
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash === NavigationTabEnum.BUDGET_STRUCTURE) {
        document.getElementById(`section-${NavigationTabEnum.BUDGET_STRUCTURE}`)?.scrollIntoView({
          behavior: 'smooth',
        });
      } else if (hash === NavigationTabEnum.BUDGET_TRANSITION_STATUS) {
        document.getElementById(`section-${NavigationTabEnum.BUDGET_TRANSITION_STATUS}`)?.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const handlePauseUrlUpdate = useCallback(() => {
    setPauseUrlUpdate(true);
    // un pause the updating after the scroll has ended
    setTimeout(() => setPauseUrlUpdate(false), 700);
  }, []);

  const { ref: keyChangesRef, inView: keyInView } = useInView(INTERSECTION_OPTIONS);
  const { ref: structureRef, inView: structureInView } = useInView(INTERSECTION_OPTIONS);
  const { ref: transitionStatusRef, inView: transitionInView } = useInView(INTERSECTION_OPTIONS);

  const [activeTab, setActiveTab] = useState<NavigationTabEnum>(NavigationTabEnum.KEY_CHANGES);
  useEffect(() => {
    const updateUrl = (hash?: string) => {
      if (typeof window !== 'undefined') {
        if (hash) {
          window.location.hash = hash;
        } else {
          history.replaceState(null, '', window.location.pathname);
        }
      }
    };

    const activate = (tab: NavigationTabEnum) => {
      setActiveTab(tab);

      if (pauseUrlUpdate) {
        // it's scrolling, don't update the url yet
        return;
      }
      updateUrl(tab === NavigationTabEnum.KEY_CHANGES ? undefined : tab);
    };

    if (transitionInView) {
      activate(NavigationTabEnum.BUDGET_TRANSITION_STATUS);
    } else if (structureInView) {
      activate(NavigationTabEnum.BUDGET_STRUCTURE);
    } else {
      activate(NavigationTabEnum.KEY_CHANGES);
    }
  }, [structureInView, transitionInView, keyInView, pauseUrlUpdate]);

  return {
    isLight,
    isEnabled,
    handlePauseUrlUpdate,
    keyChangesRef,
    structureRef,
    transitionStatusRef,
    activeTab,
  };
};

export default useEndgameContainer;
