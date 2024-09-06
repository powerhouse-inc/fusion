import { styled } from '@mui/material';
import React from 'react';
import { isProject, type Project, type SupportedProjects } from '@/core/models/interfaces/projects';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';
import ProjectOwner from './ProjectOwner';
import ProjectSupported from './ProjectSupported';

import type { FC } from 'react';

interface Props {
  project: Project | SupportedProjects;
  supporters: OwnerRef[];
  isShowName?: boolean;
}

const ProjectParticipants: FC<Props> = ({ project, supporters, isShowName }) => (
  <CoordinatorsContainer>
    <CoordinatorsTitle>Contributor(s)</CoordinatorsTitle>
    <Participants>
      <ProjectOwner owner={isProject(project) ? project.owner : project.projectOwner} />
      {supporters.length > 0 && <ProjectSupported supporters={supporters} isShowName={isShowName} />}
    </Participants>
  </CoordinatorsContainer>
);

export default ProjectParticipants;

const CoordinatorsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 8,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const CoordinatorsTitle = styled('div')(({ theme }) => ({
  margin: 0,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
}));

const Participants = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  [theme.breakpoints.up('desktop_1280')]: {
    justifyContent: 'flex-start',
    gap: 16,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    justifyContent: 'flex-start',

    gap: 14,
  },
}));
