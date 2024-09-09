import type { Deliverable, KeyResult } from './deliverables';
import type { ProgressStatus } from './types';

export enum BudgetType {
  CONTINGENCY = 'CONTINGENCY',
  OPEX = 'OPEX',
  CAPEX = 'CAPEX',
  OVERHEAD = 'OVERHEAD',
}

export enum ProjectStatus {
  TODO = 'TODO',
  INPROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export enum OwnerType {
  CoreUnit = 'CoreUnit',
  Delegates = 'Delegates',
  SpecialPurposeFund = 'SpecialPurposeFund',
  Project = 'Project',
  EcosystemActor = 'EcosystemActor',
  AlignedDelegates = 'AlignedDelegates',
  Keepers = 'Keepers',
}

export interface Owner {
  ref: OwnerType;
  id: string;
  imgUrl?: string;
  name?: string;
  code?: string;
}

export interface StoryPoints {
  __typename: 'StoryPoints';
  total: number;
  completed: number;
}

export interface Percentage {
  __typename: 'Percentage';
  value: number;
}

export type Progress = StoryPoints | Percentage;

export interface Project {
  __typename: 'Project';
  id: string;
  owner: Owner;
  code: string;
  title: string;
  abstract?: string;
  status: ProgressStatus;
  progress?: Percentage;
  imgUrl?: string;
  budgetType: BudgetType;
  deliverables: Deliverable[];
}

export interface SupportedProjects extends Omit<Project, 'deliverables' | '__typename' | 'owner'> {
  __typename: 'SupportedProjects';
  projectOwner: Owner;
  supportedDeliverables: [Deliverable];
  supportedKeyResults: [KeyResult];
}

export interface ProjectsAndSupportedProjects {
  projects: [Project];
  supportedProjects: [SupportedProjects];
}

export const isProject = (project: Project | SupportedProjects): project is Project => project.__typename === 'Project';

export const isSupportedProjects = (project: Project | SupportedProjects): project is SupportedProjects =>
  project.__typename === 'SupportedProjects';

export interface ProjectStatusChipProps {
  status: ProjectStatus;
  customLabel?: string;
  isSmall?: boolean;
}
