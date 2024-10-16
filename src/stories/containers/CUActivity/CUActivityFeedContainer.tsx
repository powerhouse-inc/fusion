import { styled } from '@mui/material';
import ActivityTable from '@ses/components/CUActivityTable/ActivityTable';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import TeamBreadcrumbContent from '@/components/Breadcrumb/CustomContents/TeamBreadcrumbContent';
import PageContainer from '@/components/Container/PageContainer';
import TeamHeader from '@/components/TeamHeader/TeamHeader';
import { siteRoutes } from '@/config/routes';
import type { ChangeTrackingEvent } from '@/core/models/interfaces/activity';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import type { Team } from '@/core/models/interfaces/team';
import { ResourceType } from '@/core/models/interfaces/types';
import { useCuActivity } from './useCuActivity';

interface CUActivityContainerProps {
  coreUnit: CoreUnit;
  coreUnits: CoreUnit[];
  activities: ChangeTrackingEvent[];
}

const CUActivityFeedContainer: React.FC<CUActivityContainerProps> = ({ coreUnit, coreUnits, activities }) => {
  const { columns, onSortClick, pager } = useCuActivity(coreUnit, coreUnits);

  return (
    <PageContainer>
      <SEOHead
        title={`Sky Fusion - ${coreUnit.name} Activity Feed`}
        description={`Learn about ${coreUnit.name}'s Activity Feed: including previous modifications that the Core Unit has made to their Expense Reports, FTEs, and more.`}
        canonicalURL={siteRoutes.coreUnitActivityFeed(coreUnit.shortCode)}
      />
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
            label: 'Activity Feed',
            href: '#',
          },
        ]}
        rightContent={
          <TeamBreadcrumbContent
            team={ResourceType.CoreUnit}
            currentPage={pager.currentPage}
            totalPages={pager.totalPages}
            pagerProps={{
              hasNext: pager.hasNext,
              hasPrevious: pager.hasPrevious,
              onNext: pager.onNext,
              onPrevious: pager.onPrevious,
            }}
          />
        }
      />
      <TeamHeader team={coreUnit as unknown as Team} withDescription={false} />
      <Container>
        <InnerPage>
          <TableWrapper>
            <ActivityTable
              columns={columns}
              shortCode={coreUnit.shortCode}
              activityFeed={activities.map((activity) => ({
                activityFeed: activity,
              }))}
              sortClick={onSortClick}
            />
          </TableWrapper>
          <Title>Additional Notes</Title>
          <Paragraph>
            The table below reflects the activity regarding the {coreUnit.shortCode} Core Unit. Here you will be able to
            see all previous modifications that the Core Unit has made to their Expense Reports, FTEs, and more.
          </Paragraph>
        </InnerPage>
      </Container>
    </PageContainer>
  );
};

export default CUActivityFeedContainer;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  paddingTop: 24,
  paddingBottom: 24,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.background.dm,

  [theme.breakpoints.up('tablet_768')]: {
    paddingTop: 32,
  },
}));

const InnerPage = styled('div')(({ theme }) => ({
  width: '100%',
  margin: '0px auto',
  paddingRight: 16,
  paddingLeft: 16,

  [theme.breakpoints.up('tablet_768')]: {
    paddingRight: 32,
    paddingLeft: 32,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingRight: 48,
    paddingLeft: 48,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

export const Title = styled('div', {
  shouldForwardProp: (prop) => !['marginBottom', 'fontSize', 'responsiveMarginBottom'].includes(prop as string),
})<{
  marginBottom?: number;
  fontSize?: string;
  responsiveMarginBottom?: number;
}>(({ marginBottom = 16, fontSize = 20, responsiveMarginBottom, theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize,
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  marginBottom,
  marginTop: 64,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: '24px',
    marginBottom: `${responsiveMarginBottom || marginBottom}px`,
  },
}));

export const Paragraph = styled('p')(({ theme }) => ({
  marginBottom: 0,
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },
}));

const TableWrapper = styled('div')({
  maxWidth: 928,
  width: '100%',
  margin: '0px auto',
});
