import { useRouter } from 'next/router';

const POWERHOUSE_ROADMAP_SLUG = 'ph-2024';

const useRoadmapMilestonesView = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const titles = {
    overview: slug === POWERHOUSE_ROADMAP_SLUG ? 'Roadmap Milestones' : 'Milestones Roadmap Overview',
    details: slug === POWERHOUSE_ROADMAP_SLUG ? 'Milestones Details' : 'Milestones Roadmap Details',
  };

  return {
    titles,
  };
};

export default useRoadmapMilestonesView;
