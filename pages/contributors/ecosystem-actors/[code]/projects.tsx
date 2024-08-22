import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import ActorProjectsContainer from '@ses/containers/ActorProjects/ActorProjectsContainer';
import { fetchProjects } from '@ses/containers/ActorProjects/api/query';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { IncrementedDeliverable } from '@/core/models/interfaces/deliverables';
import { fetchActorAbout } from '@/views/EcosystemActorAbout/api/queries';
import { fetchActors } from '@/views/EcosystemActorsIndex/api/queries';
import { getScopeOfWorkState } from '@/views/RoadmapMilestones/api/queries';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

const ProjectsPage: NextPage = ({
  actor,
  actors,
  projectsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <ActorProjectsContainer actors={actors} actor={actor} projectsData={projectsData} />
);

export default ProjectsPage;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_TEAM_PROJECTS) {
    return {
      notFound: true,
    };
  }
  const { query } = context;
  const code = query.code as string;
  const [actors, actor] = await Promise.all([
    fetchActors(ResourceType.EcosystemActor),
    fetchActorAbout(ResourceType.EcosystemActor, code),
  ]);

  if (!actor) {
    return {
      notFound: true,
    };
  }

  const [projectsData, roadmaps] = await Promise.all([fetchProjects(code), getScopeOfWorkState()]);

  // with the milestone id in the deliverables in no enough to identify the milestone and link to the
  // roadmap page, so we need to add the roadmap slug and milestone code to the deliverable
  projectsData.projects.forEach((project) => {
    project.deliverables.forEach((deliverable) => {
      const milestoneId = deliverable.milestone;
      let milestoneOverride = null;
      if (milestoneId?.trim()) {
        roadmaps.forEach((roadmap) => {
          roadmap.milestones.forEach((milestone) => {
            if (milestone.id === milestoneId) {
              milestoneOverride = {
                roadmapSlug: roadmap.slug,
                code: milestone.code,
              };
            }
          });
        });
      }

      (deliverable as IncrementedDeliverable).milestoneOverride = milestoneOverride;
    });
  });

  return {
    props: {
      actors,
      actor,
      projectsData,
    },
  };
};
