import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import React from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import TeamBreadcrumbContent from '@/components/Breadcrumb/CustomContents/TeamBreadcrumbContent';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import TeamHeader from '@/components/TeamHeader/TeamHeader';
import Information from '@/components/icons/information';
import { ResourceType } from '@/core/models/interfaces/types';
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
    projects,
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

            <ProjectList
              projects={filteredProjects}
              text={
                projects.length > 0 && filteredProjects.length === 0
                  ? 'No Result Found'
                  : "This Contributor doesn't have any Projects yet."
              }
            />

            {filteredSupporterProjects.length > 0 ? (
              <>
                <SupportedProjects>
                  <span>Projects supported by {actor.name}</span>
                  <SESTooltip
                    content="Contributory Projects: This highlights the ecosystem actor's role as a contributor rather than the primary owner."
                    enterTouchDelay={0}
                    leaveTouchDelay={15000}
                    placement="bottom-start"
                    fallbackPlacements={['bottom-end']}
                  >
                    <IconContainer>
                      <Information />
                    </IconContainer>
                  </SESTooltip>
                </SupportedProjects>

                <ProjectList projects={filteredSupporterProjects} isSupportedProjects />
              </>
            ) : (
              <div>
                <SupportedProjects>
                  <span>Projects supported by {actor.name}</span>
                  <SESTooltip
                    content="Contributory Projects: This highlights the ecosystem actor's role as a contributor rather than the primary owner."
                    enterTouchDelay={0}
                    leaveTouchDelay={15000}
                    placement="bottom-start"
                    fallbackPlacements={['bottom-end']}
                  >
                    <IconContainer>
                      <Information />
                    </IconContainer>
                  </SESTooltip>
                </SupportedProjects>
                <TextNotFound>No Result Found</TextNotFound>
              </div>
            )}
          </ContainerResponsive>
        </ContainerAllData>
      </Container>
    </PageWrapper>
  );
};

export default ActorProjectsContainer;

const PageWrapper = styled(PageContainer)(() => ({
  paddingTop: 0,
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

const TextNotFound = styled('p')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',

  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

  fontWeight: 700,
  fontSize: 20,
  lineHeight: '24px',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    lineHeight: '28.8px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 32,
    lineHeight: '38.4px',
  },
}));
