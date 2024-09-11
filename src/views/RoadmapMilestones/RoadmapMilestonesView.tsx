import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import PageHeader from './components/PageHeader/PageHeader';
import DetailsSection from './components/sections/DetailsSection/DetailsSection';
import OverviewSection from './components/sections/OverviewSection/OverviewSection';
import useRoadmapMilestonesView from './useRoadmapMilestonesView';
import type { FC } from 'react';

interface RoadmapMilestonesViewProps {
  roadmap: Roadmap;
}

const RoadmapMilestonesView: FC<RoadmapMilestonesViewProps> = ({ roadmap }) => {
  const { titles } = useRoadmapMilestonesView();

  return (
    <PageContainer>
      <SEOHead
        title="Sky Fusion - Powerhouse Roadmap 2024 Roadmap"
        description="Learn about Powerhouse Roadmap 2024 Roadmap work: scope, milestones, deliverables, targets, resources, and key results."
      />
      <Breadcrumb
        items={[
          {
            label: 'Roadmaps',
            href: '#',
          },
          {
            label: roadmap.title,
            href: siteRoutes.roadmapMilestones(roadmap.slug),
          },
        ]}
      />
      <ContainerWithMargin>
        <PageHeader title={roadmap.title} />
        <SectionsContainer>
          <OverviewSection title={titles.overview} milestones={roadmap.milestones} />
          <DetailsSection title={titles.details} milestones={roadmap.milestones} />
        </SectionsContainer>
      </ContainerWithMargin>
    </PageContainer>
  );
};

export default RoadmapMilestonesView;

const ContainerWithMargin = styled(Container)(() => ({
  marginTop: 64,
}));

const SectionsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
}));
