import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import React from 'react';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import PageHeader from './components/PageHeader/PageHeader';
import DetailsSection from './components/sections/DetailsSection/DetailsSection';
import OverviewSection from './components/sections/OverviewSection/OverviewSection';
import useRoadmapMilestonesView from './useRoadmapMilestonesView';

interface RoadmapMilestonesViewProps {
  roadmap: Roadmap;
}

const RoadmapMilestonesView: React.FC<RoadmapMilestonesViewProps> = ({ roadmap }) => {
  const { isMinimalist, titles } = useRoadmapMilestonesView();

  return (
    <PageContainer>
      <SEOHead
        title="Powerhouse Roadmap 2024"
        description="Powerhouse Ecosystem Actor team roadmap for the year 2024."
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
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
        <PageHeader title={roadmap.title} subtitle={roadmap.description} />

        <SectionsContainer>
          <OverviewSection title={titles.overview} milestones={roadmap.milestones} />
          <DetailsSection title={titles.details} minimal={isMinimalist} milestones={roadmap.milestones} />
        </SectionsContainer>
      </ContainerWithMargin>
    </PageContainer>
  );
};

export default RoadmapMilestonesView;

const SectionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 48,
  },
}));

const ContainerWithMargin = styled(Container)({
  marginTop: 64,
});
