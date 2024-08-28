import type { AllowedOwnerType } from '@/views/BudgetStatement/types';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://expenses.makerdao.network';

export const siteRoutes = {
  home: '/',
  ecosystemActors: '/contributors/ecosystem-actors',
  ecosystemActorAbout: (code: string) => `/contributors/ecosystem-actors/${code}`,
  ecosystemActorReports: (code: string) => `/contributors/ecosystem-actors/${code}/budget-statements`,
  ecosystemActorProjects: (code: string) => `/contributors/ecosystem-actors/${code}/projects`,
  coreUnitsOverview: '/contributors/core-units',
  // TODO: remove this route as this page was removed
  financesOverview: '/',
  finances: (path?: string) => `/finances${path ? `/${path}` : ''}`,
  coreUnitAbout: (shortCode: string) => `/contributors/core-units/${shortCode}`,
  coreUnitReports: (shortCode: string) => `/contributors/core-units/${shortCode}/budget-statements`,
  coreUnitActivityFeed: (shortCode: string) => `/contributors/core-units/${shortCode}/activity-feed`,
  globalActivityFeed: '/activity-feed',
  cookiesPolicy: '/cookies-policy',
  recognizedDelegateReport: '/contributors/recognized-delegates/budget-statements',
  recognizedDelegate: '/contributors/recognized-delegates',
  endgame: '/endgame',
  roadmapMilestones: (slug: string) => `/roadmaps/${slug}`,
  contributors: '/contributors',
  budgetStatements: (ownerType: AllowedOwnerType) => `/budget-statements/${ownerType}`,
  // auth
  login: '/login',
  manageAccounts: '/auth/manage/accounts',
  adminProfile: '/auth/manage/my-profile',
  userProfile: '/auth/user-profile',
  // TODO: add the accounts routes

  // local api
  forumApi: (id: string) => `/api/forum?id=${id}`,
};
