import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import ProjectFilters from '../ProjectFilters/ProjectFilters';
import type { ProjectFiltersProps } from '../ProjectFilters/ProjectFilters';

const PageSubheader: React.FC<ProjectFiltersProps> = (props) => {
  const { isMobile, isFilterCollapsedOnMobile } = props;

  return (
    <Header>
      {((isMobile && isFilterCollapsedOnMobile) || !isMobile) && <Title>Projects</Title>}

      <ProjectFilters {...props} />
    </Header>
  );
};

export default PageSubheader;

const Header = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 24,
  marginBottom: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignSelf: 'stretch',
    gap: 0,
  },
});

const Title = styled('h1')(({ theme }) => ({
  margin: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '21.6px',
  letterSpacing: 0.4,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
    lineHeight: '24px',
  },
}));
