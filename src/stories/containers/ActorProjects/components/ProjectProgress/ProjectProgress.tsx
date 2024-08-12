import { styled } from '@mui/material';
import React from 'react';

interface ProjectProgressProps {
  percentage: number;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({ percentage }) => (
  <ProgressContainer>
    <ProgressBar progress={percentage * 100} />
    <Label>{percentage * 100}%</Label>
  </ProgressContainer>
);

export default ProjectProgress;

const ProgressContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  height: 24,
  width: '100%',
});

const ProgressBar = styled('div')<{ progress: number }>(({ progress, theme }) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  borderRadius: 6,
  overflow: 'hidden',
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.slate[600],
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 6,
    width: `${progress}%`,
    background: theme.palette.colors.blue[700],
  },
}));

const Label = styled('div')(({ theme }) => ({
  width: 44,
  minWidth: 44,
  fontSize: 14,
  lineHeight: 'normal',
  textAlign: 'right',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));
