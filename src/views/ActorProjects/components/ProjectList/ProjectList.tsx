import { styled } from '@mui/material';
import React from 'react';
import ProjectEmptyLoadingState from '@/views/ActorProjects/components/ProjectEmptyLoadingState/ProjectEmptyLoadingState';
import ProjectCard from '../ProjectCard/ProjectCard';
import type { Project, SupportedProjects } from '@ses/core/models/interfaces/projects';

interface ProjectListProps {
  projects: (Project | SupportedProjects)[];
  isSupportedProjects?: boolean;
  text?: string;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, text = '', isSupportedProjects = false }) => (
  <List>
    {projects.length > 0 ? (
      projects.map((project) => <ProjectCard key={project.id} project={project} />)
    ) : (
      <ProjectEmptyLoadingState text={isSupportedProjects ? '' : text} />
    )}
  </List>
);

export default ProjectList;

const List = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});
