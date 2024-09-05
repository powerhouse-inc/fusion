import { DeliverableStatus, type MDeliverable } from '@/core/models/interfaces/deliverables';
import type { DeliverableSet, Milestone, OwnerRef, Progress, Roadmap } from '@/core/models/interfaces/roadmaps';
import { ProgressStatus } from '@/core/models/interfaces/types';

export const exampleOwner: OwnerRef = {
  ref: 'ref-001',
  id: 'owner-001',
  name: 'John Doe',
  code: 'JD123',
  imageUrl: '',
};
export const exampleOwners: OwnerRef[] = [
  {
    ref: 'ref-001',
    id: 'owner-001',
    name: 'Prometheus',
    code: 'JD123',
    imageUrl: '',
  },
  {
    ref: 'ref-001',
    id: 'owner-001',
    name: 'meraki',
    code: 'JD123',
    imageUrl: '',
  },
  {
    ref: 'ref-001',
    id: 'owner-001',
    name: 'meraki',
    code: 'JD123',
    imageUrl: '',
  },
];

export const exampleProgress: Progress = {
  __typename: 'Percentage',
  value: 0.75, // Example of progress based on percentage
};

export const exampleDeliverable: MDeliverable = {
  id: 'deliverable-001',
  code: 'DEL-001',
  title: 'Deliverable 1',
  description: 'This is the description of the first deliverable.',
  owner: exampleOwner,
  workProgress: exampleProgress,
  budgetAnchor: {
    project: {
      code: 'PRJ-001',
      title: 'Project 1',
    },
    workUnitBudget: 1000,
    deliverableBudget: 1000,
  },
  keyResults: [], // Assuming keyResults is an empty array by default
  status: DeliverableStatus.DRAFT,
};

export const exampleDeliverableSet: DeliverableSet = {
  deliverables: [exampleDeliverable], // List of deliverables
  status: ProgressStatus.FINISHED, // Status of the set
  progress: {
    __typename: 'Percentage',
    value: 0.75,
  }, // Could be either Percentage or StoryPoints
  totalDeliverables: 1, // Total number of deliverables
  deliverablesCompleted: 0, // Number of completed deliverables
};

export const exampleMilestone: Milestone = {
  id: 'milestone-001',
  sequenceCode: 'M1',
  code: 'BASE',
  title: 'Exploration Base',
  abstract: 'Abstract of milestone 1',
  description: 'Detailed description of milestone 1',
  targetDate: '2023-Q4',
  scope: exampleDeliverableSet, // Matches the `DeliverableSet` interface
  coordinators: exampleOwners, // List of coordinators
  contributors: [exampleOwner], // List of contributors
};

export const DefaultRoadmap: Roadmap = {
  id: 'default',
  slug: 'default',
  title: 'Phase 1 Progress',
  description: 'Unleashing Potential: MakerDAO’s result-driven roadmap for unlocking tangible results.',
  milestones: [
    { ...exampleMilestone },
    { ...exampleMilestone },
    { ...exampleMilestone },
    { ...exampleMilestone },
    { ...exampleMilestone },
    { ...exampleMilestone },
    { ...exampleMilestone },
    { ...exampleMilestone },
  ],
};
