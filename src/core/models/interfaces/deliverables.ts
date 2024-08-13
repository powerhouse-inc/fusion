import type { Maybe } from './generics';
import type { OwnerRef, Progress } from './roadmaps';

export interface KeyResult {
  id: string;
  title: string;
  link: string;
  parentIdRef: string;
}

export enum DeliverableStatus {
  WONT_DO = 'WONT_DO',
  DRAFT = 'DRAFT',
  TODO = 'TODO',
  BLOCKED = 'BLOCKED',
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
}

export interface BProject {
  code: string;
  title: string;
}

export interface BudgetAnchorProject {
  project: BProject;
  workUnitBudget: number;
  deliverableBudget: number;
}

export interface MDeliverable {
  id: string;
  title: string;

  code: string;
  description: string;
  keyResults: KeyResult[];

  status: DeliverableStatus;
  workProgress: Progress;

  owner: OwnerRef;
  budgetAnchor: BudgetAnchorProject;
}

export interface Deliverable {
  id: string;
  title: string;

  code: string;
  description: string;
  keyResults: KeyResult[];

  status: DeliverableStatus;
  progress: Progress;

  owner: OwnerRef;
  milestone: string;
}

export interface IncrementedDeliverable extends Deliverable {
  milestoneOverride: Maybe<{
    roadmapSlug: string;
    code: string;
  }>;
}

export const isMDeliverable = (deliverable: Deliverable | MDeliverable): deliverable is MDeliverable =>
  'workProgress' in deliverable;
