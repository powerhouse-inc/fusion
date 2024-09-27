export interface FeatureFlagsInterface {
  FEATURE_WEB_VITALS: boolean; // enable web vitals tracking
  FEATURE_SITEMAP: boolean;
  FEATURE_AUDIT_REPORTS: boolean; // disable Audit Reports tab in the expense reports tab
  FEATURE_TEMPORARY_ACCOUNTS_SNAPSHOT_PAGE: boolean; // disable Accounts Snapshot page
  FEATURE_ACCOUNT_SNAPSHOT_CURRENCY_PICKER: boolean; // disable Currency Picker in Accounts Snapshot Page/section
  FEATURE_TEAM_PROJECTS: boolean; // disable Team Projects page and related features
  FEATURE_ECOSYSTEM_FINANCES_DASHBOARD_PAGE: boolean; // disable Accounts Finances Page
  FEATURE_ROADMAP_MILESTONES: boolean; // disable roadmap milestones page
  FEATURE_POWERHOUSE_ROADMAP: boolean; // powerhouse roadmap page
  FEATURE_ECOSYSTEM_ACTORS_SCOPES_FILTER: boolean; // disable scopes filter in ecosystem actors page
  FEATURE_ECOSYSTEM_ACTORS_STATUS_AND_CODE: boolean; // disable status filter in ecosystem actors page
}
