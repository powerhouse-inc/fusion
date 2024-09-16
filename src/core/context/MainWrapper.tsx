import { styled } from '@mui/material';
import { useLayoutEffect } from 'react';
import CookiesPolicyBanner from '@/components/CookiesPolicyBanner/CookiesPolicyBanner';
import { zIndexEnum } from '../enums/zIndexEnum';
import { useScrollLock } from '../hooks/useScrollLock';
import { getPageWrapper } from '../utils/dom';
import { useCookiesContextTracking } from './CookiesContext';
import { useThemeContext } from './ThemeContext';
import type { FC, ReactNode } from 'react';

const MainWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { themeMode } = useThemeContext();
  const { lockScroll, unlockScroll } = useScrollLock();

  const {
    isShowBanner,
    setAnalyticsCheckbox,
    analyticsCheckbox,
    functionalCheckbox,
    handleAcceptCookies,
    handleRejectCookies,
    setFunctionalCheckbox,
  } = useCookiesContextTracking();

  useLayoutEffect(() => {
    if (isShowBanner) {
      setTimeout(() => {
        window.scrollTo(0, 0);
        const pageWrapper = getPageWrapper();
        if (pageWrapper) {
          pageWrapper.style.overflow = 'hidden';
        }
      }, 100);
      lockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [isShowBanner, lockScroll, unlockScroll]);

  return (
    <>
      {children}
      {isShowBanner && themeMode !== undefined && <OverlayContainer />}
      {isShowBanner && themeMode !== undefined && (
        <PolicyBannerPosition>
          <CookiesPolicyBanner
            functionalCheckbox={functionalCheckbox}
            analyticsCheckbox={analyticsCheckbox}
            setFunctionalCheckbox={setFunctionalCheckbox}
            setAnalyticsCheckbox={setAnalyticsCheckbox}
            handleAcceptCookies={handleAcceptCookies}
            handleRejectCookies={handleRejectCookies}
          />
        </PolicyBannerPosition>
      )}
    </>
  );
};

export default MainWrapper;

const OverlayContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  width: '100%',
  height: 'calc(100vh - 318px)',
  background: 'rgba(37, 42, 52, 0.10)',
  backdropFilter: 'blur(2.5px)',
  zIndex: zIndexEnum.HEADER_PAGE + 1,

  [theme.breakpoints.up('tablet_768')]: {
    height: 'calc(100vh - 284px)',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 'calc(100vh - 292px)',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    height: 'calc(100vh - 274px)',
  },
}));

const PolicyBannerPosition = styled('div')(() => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  borderRadius: '6px 6px 0px 0px',
  transition: 'all 0.5s ease-in',
  zIndex: zIndexEnum.HEADER_PAGE + 2,
}));
