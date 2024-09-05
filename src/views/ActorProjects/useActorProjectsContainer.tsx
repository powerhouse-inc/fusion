import { useMediaQuery } from '@mui/material';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { ProjectStatus } from '@ses/core/models/interfaces/projects';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import type { Filter, SelectOption } from '@/components/FiltersBundle/types';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import type { DeliverableSetStatus } from '@/core/models/interfaces/roadmaps';
import type { Team } from '@/core/models/interfaces/team';
import type { TeamStatus } from '@/core/models/interfaces/types';
import { useBreadcrumbTeamPager } from '@/views/EcosystemActorAbout/hooks';
import CustomItemAll from '@/views/EcosystemActorsIndex/components/ActorCustomItem/CustomItemAll';
import ProjectStatusChipFilter from './components/ProjectFilters/ProjectStatusChipFilter';
import type { Theme } from '@mui/material';
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
      value: ProjectStatus.TODO,
      label: 'To Do',
      extra: {
        count: `${projectsData.projects.filter((project) => project.status === ProjectStatus.TODO).length}`,
      },
    },
    {
      value: ProjectStatus.INPROGRESS,
      label: 'In Progress',
      extra: {
        count: `${projectsData.projects.filter((project) => project.status === ProjectStatus.INPROGRESS).length}`,
      },
    },
    {
      value: ProjectStatus.FINISHED,
      label: 'Delivered',
      extra: {
        count: `${projectsData.projects.filter((project) => project.status === ProjectStatus.FINISHED).length}`,
      },
    },
  ] as SelectOption[];

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

  const filters: Filter[] = [
    {
      type: 'select',
      id: 'status',
      label: 'Status',
      selected: activeStatuses,
      multiple: true,
      onChange: (value: string | number | (string | number)[]) => {
        setActiveStatuses(value as string[]);
      },
      options: statuses,

      customOptionsRender: (option: SelectOption, isActive: boolean) => (
        <ProjectStatusChipFilter
          status={option.value as DeliverableSetStatus}
          count={option.extra?.count}
          isActive={isActive}
        />
      ),
      withAll: true,
      customOptionsRenderAll: (isActive: boolean) => (
        <CustomItemAll isActive={isActive} total={projectsData.projects.length || 0}>
          <StatusChip status={'All' as TeamStatus} />
        </CustomItemAll>
      ),

      widthStyles: {
        width: 'fit-content',
        menuWidth: 350,
      },
    },
  ];

  const canReset = activeStatuses.length > 0 || searchQuery.length > 0;
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
    canReset,
    filters,
  };
};

export default useActorProjectsContainer;
