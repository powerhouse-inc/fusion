import { styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CookiesPolicyBanner from '@/components/CookiesPolicyBanner/CookiesPolicyBanner';
import { siteRoutes } from '@/config/routes';
import { zIndexEnum } from '../enums/zIndexEnum';
import { useScrollLock } from '../hooks/useScrollLock';
import { useCookiesContextTracking } from './CookiesContext';
import { useThemeContext } from './ThemeContext';
import type { FC, ReactNode } from 'react';

const MainWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { themeMode } = useThemeContext();
  const { lockScroll, unlockScroll } = useScrollLock();
  const router = useRouter();

  const {
    isShowBanner,
    setAnalyticsCheckbox,
    analyticsCheckbox,
    functionalCheckbox,
    handleAcceptCookies,
    handleRejectCookies,
    setFunctionalCheckbox,
  } = useCookiesContextTracking();

  useEffect(() => {
    if (isShowBanner && !router.pathname.startsWith(siteRoutes.cookiesPolicy)) {
      lockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [isShowBanner, router.pathname, lockScroll, unlockScroll]);

  return (
    <>
      {children}
      {isShowBanner && themeMode !== undefined && !router.pathname.startsWith(siteRoutes.cookiesPolicy) && (
        <OverlayContainer />
      )}
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

const OverlayContainer = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(37, 42, 52, 0.10)',
  backdropFilter: 'blur(2.5px)',
  zIndex: zIndexEnum.MAIN_OVERLAY,
}));

const PolicyBannerPosition = styled('div')(() => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  borderRadius: '6px 6px 0px 0px',
  transition: 'all 0.5s ease-in',
  zIndex: zIndexEnum.COOKIE_POLICY_BANNER,
}));
