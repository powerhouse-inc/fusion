import { useCookiesContextTracking } from '@ses/core/context/CookiesContext';
import { useEffect, useState } from 'react';

const useHeaderCard = () => {
  const { isFunctionalTrackingAccepted } = useCookiesContextTracking();

  const [isExpandedFromLocalStorage] = useState(() => {
    if (typeof window !== 'undefined') {
      if (!isFunctionalTrackingAccepted) {
        window.localStorage.removeItem('home-header-card-expanded');
        return true;
      }
      const homeHeaderCardExpanded = window.localStorage.getItem('home-header-card-expanded');
      if (homeHeaderCardExpanded === '0') {
        return false;
      }
      return true;
    }
    return undefined;
  });

  const [isExpandedCopy, setIsExpandedCopy] = useState(isExpandedFromLocalStorage);
  const handleIsExpandedCopy = (expandedCopy: boolean | undefined) => {
    setIsExpandedCopy(expandedCopy);
  };

  const [isExpanded, setIsExpanded] = useState<boolean>();
  const handleIsExpanded = (expanded: boolean | undefined) => {
    setIsExpanded(expanded);
  };

  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);
  const handleIsMobileMenuExpanded = (mobileMenuExpanded: boolean) => {
    setIsMobileMenuExpanded(mobileMenuExpanded);
  };

  useEffect(() => {
    if (
      isFunctionalTrackingAccepted ||
      (document.cookie.includes('themeTracking=true') && document.cookie.includes('timestampTracking=true'))
    ) {
      window.localStorage.setItem('home-header-card-expanded', isExpandedCopy ? '1' : '0');
    }
    handleIsExpanded(isExpandedCopy);
  }, [isFunctionalTrackingAccepted, isExpandedFromLocalStorage, isExpandedCopy]);

  useEffect(() => {
    const sections = [
      document.getElementById('finances'),
      document.getElementById('governance'),
      document.getElementById('contributors'),
      document.getElementById('roadmap'),
    ];

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        e.isIntersecting &&
          window.history.replaceState(
            {
              ...window.history.state,
              url: `${window.location.pathname}#${e.target.id}`,
              as: `${window.location.pathname}#${e.target.id}`,
            },
            '',
            `${window.location.pathname}#${e.target.id}`
          );
      });
    }, observerOptions);

    sections?.forEach((s) => {
      s && observer.observe(s);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    isExpanded,
    handleIsExpanded: handleIsExpandedCopy,
    isMobileMenuExpanded,
    handleIsMobileMenuExpanded,
  };
};

export default useHeaderCard;
