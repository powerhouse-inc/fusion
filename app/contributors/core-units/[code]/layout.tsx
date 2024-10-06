import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import TeamBreadcrumbContent from '@/components/Breadcrumb/CustomContents/TeamBreadcrumbContent';
import PageContainer from '@/components/Container/PageContainer';
import TeamHeader from '@/components/TeamHeader/TeamHeader';
import { siteRoutes } from '@/config/routes';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType } from '@/core/models/interfaces/types';
import { fetchCoreUnits } from '@/stories/components/CoreUnitSummary/CoreUnitSummaryApi';
import { fetchCoreUnitByCode } from '@/views/CoreUnitAbout/cuAboutAPI';

export default async function Layout({ children, params }: { children: React.ReactNode; params: { code: string } }) {
  const { code } = params;
  const [coreUnit, coreUnits] = await Promise.all([fetchCoreUnitByCode(code), fetchCoreUnits()]);

  const currentPage = coreUnits.findIndex((cu) => cu.shortCode === code) + 1;

  return (
    <PageContainer>
      <Breadcrumb
        items={[
          {
            label: 'Contributors',
            href: siteRoutes.contributors,
          },
          {
            label: 'Core Units',
            href: siteRoutes.coreUnitsOverview,
            number: coreUnits.length,
          },
          {
            label: coreUnit.name,
            href: siteRoutes.coreUnitAbout(coreUnit.shortCode),
          },
          {
            label: 'Budget Statements',
            href: '#',
          },
        ]}
        rightContent={
          <TeamBreadcrumbContent
            team={ResourceType.CoreUnit}
            currentPage={currentPage}
            totalPages={coreUnits.length}
            pagerProps={{
              hasNext: currentPage < coreUnits.length,
              hasPrevious: currentPage > 1,
            }}
          />
        }
      />
      <TeamHeader team={coreUnit as unknown as Team} withDescription={false} />

      {children}
    </PageContainer>
  );
}
