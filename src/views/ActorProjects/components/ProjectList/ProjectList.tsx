import { styled } from '@mui/material';
import React from 'react';
import ProjectEmptyLoadingState from '@/views/ActorProjects/components/ProjectEmptyLoadingState/ProjectEmptyLoadingState';
import ProjectCard from '../ProjectCard/ProjectCard';
import type { Project, SupportedProjects } from '@ses/core/models/interfaces/projects';

interface ProjectListProps {
  projects: (Project | SupportedProjects)[];
  isSupportedProjects?: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, isSupportedProjects = false }) => (
  <List>
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}

    {projects.length === 0 && (
      <ProjectEmptyLoadingState
        text={isSupportedProjects ? 'No Result Found' : "This Contributor doesn't have any Projects yet."}
      />
    )}
  </List>
);

export default ProjectList;

const List = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});
