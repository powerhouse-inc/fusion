import styled from '@emotion/styled';
import Chip from '@mui/material/Chip';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ProjectStatus } from '@ses/core/models/interfaces/projects';
import React, { useMemo } from 'react';
import { getChipColors } from '../../utils/colors';
import type { ProjectStatusChipProps } from '@ses/core/models/interfaces/projects';

const ProjectStatusChip: React.FC<ProjectStatusChipProps> = ({ status, customLabel, isSmall = false }) => {
  const { isLight } = useThemeContext();
  const label = useMemo(() => {
    if (customLabel) {
      return customLabel;
    }
    switch (status) {
      case ProjectStatus.INPROGRESS:
        return 'In Progress';
      case ProjectStatus.FINISHED:
        return 'Finished';
      default:
        return 'To Do';
    }
  }, [customLabel, status]);

  const { color, background } = useMemo(() => getChipColors(status, isLight), [isLight, status]);

  return <StatusChip label={label} textColor={color} background={background} isSmall={isSmall} />;
};

export default ProjectStatusChip;

const StatusChip = styled(Chip)<{ textColor: string; background: string; isSmall: boolean }>(
  ({ textColor, background, isSmall }) => ({
    padding: isSmall ? '4px 8px' : '6.5px 15px',
    borderRadius: 24,
    fontFamily: 'Inter, sans-serif',
    border: `1px solid ${textColor}`,
    background,
    height: 'auto',
    fontWeight: 500,

    '.MuiChip-label': {
      fontSize: isSmall ? 11 : 14,
      color: textColor,
      lineHeight: 'normal',
      padding: 0,
    },
  })
);
