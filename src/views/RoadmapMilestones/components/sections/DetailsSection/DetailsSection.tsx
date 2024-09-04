import { styled } from '@mui/material';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import MilestoneDetailsCard from '../../MilestoneDetailsCard/MilestoneDetailsCard';
import SectionTitle from '../../SectionTitle/SectionTitle';
import type { FC } from 'react';

interface DetailsSectionProps {
  title: string;
  minimal?: boolean;
  milestones: Milestone[];
}

const DetailsSection: FC<DetailsSectionProps> = ({ title, minimal, milestones }) => (
  <Section>
    <SectionTitle title={title} />
    <MilestonesDetails>
      {milestones.map((milestone) => (
        <MilestoneDetailsCard key={milestone.id} minimal={minimal} milestone={milestone} />
      ))}
    </MilestonesDetails>
  </Section>
);

export default DetailsSection;

const Section = styled('section')(({ theme }) => ({
  '& > div:first-of-type > h2': {
    fontSize: 18,
    lineHeight: '22px',

    [theme.breakpoints.up('tablet_768')]: {
      fontSize: 20,
      lineHeight: '24px',
    },
    [theme.breakpoints.up('desktop_1280')]: {
      fontSize: 24,
      lineHeight: '29px',
    },
  },
}));

const MilestonesDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  marginTop: 24,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 32,
    marginTop: 32,
  },
}));
