import { styled } from '@mui/material';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import RoadmapTimeline from '../../RoadmapTimeline/RoadmapTimeline';
import SectionTitle from '../../SectionTitle/SectionTitle';
import type { FC } from 'react';

interface OverviewSectionProps {
  title: string;
  milestones: Milestone[];
}

const OverviewSection: FC<OverviewSectionProps> = ({ title, milestones }) => (
  <Section>
    <SectionTitle
      title={title}
      tooltip="Milestones represent checkpoints on the way to full completion of the roadmap,
      where a well-defined subset of the deliverables is deployed as an intermediate, integrated solution."
    />
    <TimelineContainer>
      <RoadmapTimeline milestones={milestones} />
    </TimelineContainer>
  </Section>
);

export default OverviewSection;

const Section = styled('section')(() => ({
  marginTop: 24,
}));

const TimelineContainer = styled('div')(() => ({
  marginTop: 24,
}));
