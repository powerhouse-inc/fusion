import { styled } from '@mui/material';
import React from 'react';
import TableEmptyState from '@/components/TableEmptyState/TableEmptyState';
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

    {projects.length === 0 &&
      (isSupportedProjects ? (
        <NoResults>No results found</NoResults>
      ) : (
        <TableEmptyState description="There are no Projects available with this combination of filters." />
      ))}
  </List>
);

export default ProjectList;

const List = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

const NoResults = styled('div')(({ theme }) => ({
  color: '#546978',
  fontSize: 18,
  fontWeight: 500,
  textAlign: 'center',
  fontStyle: 'italic',
  margin: '32px 0',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
  },
}));
