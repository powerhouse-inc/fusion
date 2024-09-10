import { styled } from '@mui/material';
import CookiesPolicyBanner from '@ses/components/CookiesPolicyBanner/CookiesPolicyBanner';
import { useLayoutEffect } from 'react';
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
      {isShowBanner && themeMode !== undefined && <ContainerOverlay />}
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

const ContainerOverlay = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: zIndexEnum.OVERLAY_MOBILE_TOOLTIP,
  height: 'calc(100vh - 282px)',
  background: 'rgba(52, 52, 66, 0.1)',
  backdropFilter: theme.palette.isLight ? 'blur(2px)' : 'blur(4px)',

  [theme.breakpoints.down('tablet_768')]: {
    height: 'calc(100vh - 458px)',
  },
}));

const PolicyBannerPosition = styled('div')(() => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  position: 'fixed',
  borderRadius: '90px',
  transition: 'all 0.5s ease-in',
}));
