import { styled } from '@mui/material';
import React from 'react';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';
import ProjectSupportTooltip from './ProjectSupportTooltip';

interface SupportedTeamsAvatarGroupProps {
  supporters: OwnerRef[];
  isShowName?: boolean;
}

const ProjectSupported: React.FC<SupportedTeamsAvatarGroupProps> = ({ supporters, isShowName }) => (
  <Container>
    {supporters.map((supporter) => (
      <ProjectSupportTooltip support={supporter} key={supporter.id} isShowName={isShowName} />
    ))}
  </Container>
);

export default ProjectSupported;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 16,
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 16,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    gap: 24,
  },
}));
