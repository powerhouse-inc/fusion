import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import React from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import TeamBreadcrumbContent from '@/components/Breadcrumb/CustomContents/TeamBreadcrumbContent';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import TeamHeader from '@/components/TeamHeader/TeamHeader';
import Information from '@/components/icons/information';
import { ResourceType } from '@/core/models/interfaces/types';
import SESTooltipLegacy from '@/stories/components/SESTooltipLegacy/SESTooltipLegacy';
import PageSubheader from './components/PageSubheader/PageSubheader';
import ProjectList from './components/ProjectList/ProjectList';
import useActorProjectsContainer from './useActorProjectsContainer';
import type { ProjectsAndSupportedProjects } from '@ses/core/models/interfaces/projects';
import type { Team } from '@ses/core/models/interfaces/team';

interface ActorProjectsContainerProps {
  actors: Team[];
  actor: Team;
  projectsData: ProjectsAndSupportedProjects;
}

const ActorProjectsContainer: React.FC<ActorProjectsContainerProps> = ({ actor, actors, projectsData }) => {
  const {
    isMobile,
    isFilterCollapsedOnMobile,
    filteredProjects,
    filteredSupporterProjects,
    pager,
    filters,
    canReset,
    searchQuery,
    handleResetFilters,
    handleSearchChange,
  } = useActorProjectsContainer(projectsData, actors, actor);

  return (
    <PageWrapper>
      <SEOHead
        title={`Sky Fusion - ${actor.name} Ecosystem Contributor Projects`}
        description={`Learn about ${actor.name} Ecosystem Contributor's Project work: scope, deliverables, targets, resources, and key results for owned & supported projects.`}
        canonicalURL={siteRoutes.ecosystemActorProjects(actor.shortCode)}
      />
      <Breadcrumb
        items={[
          {
            label: 'Contributors',
            href: siteRoutes.contributors,
          },
          {
            label: 'Ecosystem Actors',
            href: siteRoutes.ecosystemActors,
            number: actors.length,
          },
          {
            label: actor.name,
            href: siteRoutes.ecosystemActorAbout(actor.shortCode),
          },
          {
            label: 'Projects',
            href: siteRoutes.ecosystemActorAbout(actor.shortCode),
          },
        ]}
        rightContent={
          <TeamBreadcrumbContent
            team={ResourceType.EcosystemActor}
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
      <TeamHeader team={actor} withDescription={false} />
      <Container>
        <ContainerAllData>
          <ContainerResponsive>
            <PageSubheader
              searchFilters={handleSearchChange}
              searchText={searchQuery}
              filters={filters}
              isMobile={isMobile}
              canReset={canReset}
              onReset={handleResetFilters}
              isFilterCollapsedOnMobile={isFilterCollapsedOnMobile}
            />

            <ProjectList projects={filteredProjects} />

            {/* TODO: instead of `projects.length` it should be `supportedProjects.length` once it is integrated with the API */}
            {(filteredProjects.length > 0 || filteredSupporterProjects.length > 0) && (
              <>
                <SupportedProjects>
                  <span>Projects supported by {actor.name}</span>
                  <SESTooltipLegacy
                    content="Contributory Projects: This highlights the ecosystem actor's role as a contributor rather than the primary owner."
                    enterTouchDelay={0}
                    leaveTouchDelay={15000}
                    placement="bottom-start"
                    fallbackPlacements={['bottom-end']}
                  >
                    <IconContainer>
                      <Information />
                    </IconContainer>
                  </SESTooltipLegacy>
                </SupportedProjects>

                <ProjectList projects={filteredSupporterProjects} isSupportedProjects />
              </>
            )}
          </ContainerResponsive>
        </ContainerAllData>
      </Container>
    </PageWrapper>
  );
};

export default ActorProjectsContainer;

const PageWrapper = styled(PageContainer)(({ theme }) => ({
  paddingTop: 0,
  backgroundImage: theme.palette.isLight
    ? 'radial-gradient(35.91% 21.42% at 100% 50%, rgba(236, 96, 221, 0.24) 0%, rgba(253, 180, 255, 0.24) 50%, rgba(253, 180, 255, 0.00) 100%)'
    : 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI4MzgiIHZpZXdCb3g9IjAgMCAxNDQwIDgzOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICA8cmVjdCBvcGFjaXR5PSIwLjUiIHdpZHRoPSIxNDQwIiBoZWlnaHQ9IjgzOCIgZmlsbD0idXJsKCNwYWludDBfcmFkaWFsXzY4NzRfOTE2MikiIGZpbGwtb3BhY2l0eT0iMC4yIi8+DQogICAgPGRlZnM+DQogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDBfcmFkaWFsXzY4NzRfOTE2MiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxNDQwIDQxOSkgcm90YXRlKC0xODApIHNjYWxlKDI3My41IDMzMC4yNjgpIj4NCiAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRUM2MEREIiBzdG9wLW9wYWNpdHk9IjAuNCIvPg0KICAgIDxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjRkRCNEZGIiBzdG9wLW9wYWNpdHk9IjAuNCIvPg0KICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZEQjRGRiIgc3RvcC1vcGFjaXR5PSIwIi8+DQogICAgPC9yYWRpYWxHcmFkaWVudD4NCiAgICA8L2RlZnM+DQogICAgPC9zdmc+DQogICAg")',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'right',
  backgroundSize: 'cover',
}));

const ContainerAllData = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  zIndex: -1,
  marginTop: 24,
}));

const ContainerResponsive = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('desktop_1024')]: {
    width: '100%',
  },

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
  },
}));

const SupportedProjects = styled('h2')(({ theme }) => ({
  margin: '32px 0 16px',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  display: 'flex',
  justifyContent: 'space-between',

  '& .MuiTooltip-tooltip': {
    marginLeft: 0,
    marginRight: 0,
  },

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'normal',
    alignItems: 'flex-end',
    gap: 8,
    fontSize: 24,
    margin: '56px 0 32px',
  },
}));

const IconContainer = styled('span')({
  cursor: 'pointer',
  padding: 4.5,
  width: 24,
  height: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
