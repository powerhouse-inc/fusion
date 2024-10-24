import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { siteRoutes } from '@/config/routes';
import type { Theme } from '@mui/material';

const LOCAL_STORAGE_KEY = 'home-header-card-expanded';

const useHeaderCard = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  const [isExpanded, setIsExpanded] = useState<boolean | undefined>(true);

  useEffect(() => {
    // restore `isExpanded` from localStorage
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue !== null) {
      setIsExpanded(storedValue !== '0');
    }
  }, []);

  const handleIsExpanded = (value: boolean) => {
    setIsExpanded(value);
    localStorage.setItem(LOCAL_STORAGE_KEY, value ? '1' : '0');
  };

  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);

  useEffect(() => {
    const sectionIds = ['finances', 'governance', 'contributors', 'roadmap'];
    const sections = sectionIds.map((id) => document.getElementById(id));

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    };

    const updateUrlHash = (sectionId: string) => {
      const newUrl = sectionId === 'finances' ? siteRoutes.home : `${siteRoutes.home}#${sectionId}`;
      window.history.replaceState(
        {
          ...window.history.state,
          url: newUrl,
          as: newUrl,
        },
        '',
        newUrl
      );
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateUrlHash(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    isMobile,
    isExpanded,
    handleIsExpanded,
    isMobileMenuExpanded,
    handleIsMobileMenuExpanded: setIsMobileMenuExpanded,
  };
};

export default useHeaderCard;
