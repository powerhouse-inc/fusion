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
        <NoResults>No Result Found</NoResults>
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
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  fontSize: 18,
  fontWeight: 700,
  textAlign: 'center',
  fontFamily: 'Inter, sans-serif',
  margin: '32px 0',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
  },
}));
