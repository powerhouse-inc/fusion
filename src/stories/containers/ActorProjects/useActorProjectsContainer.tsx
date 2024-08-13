import { useMediaQuery } from '@mui/material';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { ProjectStatus } from '@ses/core/models/interfaces/projects';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import type { Team } from '@/core/models/interfaces/team';
import { useBreadcrumbTeamPager } from '@/views/EcosystemActorAbout/hooks';
import ProjectStatusChip from './components/ProjectStatusChip/ProjectStatusChip';
import type { Theme } from '@mui/material';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { ProjectsAndSupportedProjects } from '@ses/core/models/interfaces/projects';

const useActorProjectsContainer = (projectsData: ProjectsAndSupportedProjects, actors: Team[], actor: Team) => {
  const pager = useBreadcrumbTeamPager(actor, actors);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { height, showHeader } = useHeaderSummary(ref, router.query.code as string);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  const [isFilterCollapsedOnMobile, setIsFilterCollapsedOnMobile] = useState<boolean>(true);
  const handleToggleFilterOnMobile = () => setIsFilterCollapsedOnMobile((prev) => !prev);

  const statuses = [
    {
      id: ProjectStatus.TODO,
      content: <ProjectStatusChip status={ProjectStatus.TODO} isSmall />,
      count: projectsData.projects.filter((project) => project.status === ProjectStatus.TODO).length,
    },
    {
      id: ProjectStatus.INPROGRESS,
      content: <ProjectStatusChip status={ProjectStatus.INPROGRESS} isSmall />,
      count: projectsData.projects.filter((project) => project.status === ProjectStatus.INPROGRESS).length,
    },
    {
      id: ProjectStatus.FINISHED,
      content: <ProjectStatusChip status={ProjectStatus.FINISHED} isSmall />,
      count: projectsData.projects.filter((project) => project.status === ProjectStatus.FINISHED).length,
    },
  ] as MultiSelectItem[];

  const [activeStatuses, setActiveStatuses] = useState<string[]>([]);
  const handleStatusChange = (items: string[]) => {
    setActiveStatuses(items);
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleResetFilters = () => {
    setActiveStatuses([]);
    setSearchQuery('');
  };

  const filteredProjects = useMemo(
    () =>
      projectsData.projects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (activeStatuses.length === 0 || activeStatuses.includes(project.status))
      ),
    [activeStatuses, projectsData, searchQuery]
  );

  const filteredSupporterProjects = useMemo(
    () =>
      projectsData.supportedProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (activeStatuses.length === 0 || activeStatuses.includes(project.status))
      ),
    [activeStatuses, projectsData, searchQuery]
  );

  return {
    ref,
    height,
    showHeader,
    isMobile,
    isFilterCollapsedOnMobile,
    handleToggleFilterOnMobile,
    statuses,
    activeStatuses,
    handleStatusChange,
    searchQuery,
    handleSearchChange,
    handleResetFilters,
    filteredProjects,
    filteredSupporterProjects,
    pager,
  };
};

export default useActorProjectsContainer;
