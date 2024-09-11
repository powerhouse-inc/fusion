import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { siteRoutes } from '@/config/routes';
import { useAuthContext } from '@/core/context/AuthContext';
import { useThemeContext } from '@/core/context/ThemeContext';
import { CONNECT } from '@/core/utils/const';
import type { SelectItem } from '@/stories/components/SingleItemSelect/SingleItemSelect';
import type { MenuType, RouteOnHeader } from './types';
import type { Theme } from '@mui/material';

const menuItems = {} as Record<RouteOnHeader, MenuType>;

export const useTopBarNavigation = () => {
  const isSelectShow = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
  const { clearCredentials, permissionManager } = useAuthContext();
  const { themeMode, toggleTheme, isLight } = useThemeContext();
  const router = useRouter();
  const handleGoLogin = () => {
    router.push('/login');
  };

  const handleOnClickLogOut = () => {
    clearCredentials?.();
    router.push(siteRoutes.login);
  };

  menuItems.home = {
    title: 'Home',
    link: '/',
  };

  menuItems.contributors = {
    title: 'Contributors',
    link: '/contributors',
  };

  menuItems.finances = {
    title: 'Finances',
    link: siteRoutes.finances(),
  };

  menuItems.roadmap = {
    title: 'Roadmap',
    link: siteRoutes.roadmapMilestones('ph-2024'),
  };

  menuItems.endgame = {
    title: 'Endgame',
    link: siteRoutes.endgame,
  };

  menuItems.connect = {
    title: 'Connect',
    link: CONNECT,
  };

  const getMenusAvailable = useMemo(() => {
    if (isSelectShow) {
      return menuItems;
    } else {
      return Object.values(menuItems).filter((filter) => filter.title !== 'Home');
    }
  }, [isSelectShow]);

  const activeMenuItem: MenuType = useMemo(() => {
    if (router.pathname.startsWith('/contributors')) {
      return menuItems.contributors;
    } else if (router.pathname.startsWith(siteRoutes.finances())) {
      return menuItems.finances;
    } else if (router.pathname.startsWith('/roadmaps')) {
      return menuItems.roadmap;
    } else if (router.pathname.startsWith(siteRoutes.endgame)) {
      return menuItems.endgame;
    } else {
      if (router.pathname.startsWith('/core-unit') || router.pathname.startsWith('/ecosystem-actors')) {
        return menuItems.contributors;
      } else {
        return menuItems.home;
      }
    }
  }, [router.pathname]);
  const filter: SelectItem[] = useMemo(
    () =>
      Object.values(menuItems).map((value) => ({
        label: value.title,
        value: value.title,
      })),

    []
  );

  const activeItem = useMemo(() => activeMenuItem.title, [activeMenuItem]);
  const handleChangeRoute = (value: string | string[]) => {
    if (typeof value === 'string') {
      const find = Object.values(menuItems).find((menu) => menu.title === value);
      router.push(find?.link || '/');
    }
  };

  const shouldHaveBlur = useMemo(() => {
    if (router.asPath === '/') {
      return true;
    } else {
      return false;
    }
  }, [router.asPath]);

  return {
    shouldHaveBlur,
    filter,
    themeMode,
    toggleTheme,
    isLight,
    activeItem,
    handleGoLogin,
    handleChangeRoute,
    handleOnClickLogOut,
    permissionManager,
    getMenusAvailable,
  };
};
