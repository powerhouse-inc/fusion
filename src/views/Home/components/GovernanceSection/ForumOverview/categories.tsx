import { styled } from '@mui/material';
import Fire from 'public/assets/svg/fire.svg';
import BulletIcon from '@/components/FancyTabs/BulletIcon';

const FireIcon = styled(Fire)(({ theme }) => ({
  '& path': {
    fill: theme.palette.colors.red[900],
  },
}));

export interface ForumCategory {
  id: number;
  category: string;
  categorySlug: string;
  tabLabel: string;
  icon: React.ReactNode;
}

export const ForumCategories: ForumCategory[] = [
  {
    id: 89,
    category: 'General Discussion',
    categorySlug: 'general-discussion',
    tabLabel: 'Popular',
    icon: <FireIcon width={16} height={16} />,
  },
  {
    id: 68,
    category: 'New to MakerDAO',
    categorySlug: 'welcome',
    tabLabel: 'Onboarding',
    icon: <BulletIcon color="charcoal" />,
  },
  {
    id: 92,
    category: 'Maker Core',
    categorySlug: 'maker-core',
    tabLabel: 'Finances',
    icon: <BulletIcon color="green" />,
  },
  {
    id: 78,
    category: 'Alignment Conservers',
    categorySlug: 'alignment-conserver',
    tabLabel: 'Governance',
    icon: <BulletIcon color="purple" />,
  },
  {
    id: 101,
    category: 'Governance AI Tools',
    categorySlug: 'gait',
    tabLabel: 'Atlas',
    icon: <BulletIcon color="orange" />,
  },
];
