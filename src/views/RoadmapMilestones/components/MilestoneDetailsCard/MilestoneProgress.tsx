import { styled } from '@mui/material';
import type { DeliverableSet } from '@/core/models/interfaces/roadmaps';
import { isPercentage } from '@/core/models/interfaces/roadmaps';
import { percentageRespectTo } from '@/core/utils/math';
import PercentageProgressBar from './PercentageProgressBar';

interface MilestoneProgressProps {
  data: Omit<DeliverableSet, 'deliverables'>;
}

const MilestoneProgress: React.FC<MilestoneProgressProps> = ({ data }) => {
  const progress = data?.progress
    ? isPercentage(data.progress)
      ? data.progress.value * 100
      : percentageRespectTo(data.progress.completed, data.progress.total)
    : 0;

  return (
    <Content>
      <PercentageProgressBar value={progress} />

      <TextProgress>
        <span>{data?.deliverablesCompleted}</span>/<span>{data?.totalDeliverables}</span> Deliverables Completed
      </TextProgress>
    </Content>
  );
};

export default MilestoneProgress;

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
  alignSelf: 'stretch',
  paddingTop: 8,
  borderRadius: 6,

  [theme.breakpoints.up('desktop_1024')]: {
    paddingTop: 8,
  },
}));

const TextProgress = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  '& span:nth-child(1)': {
    color: theme.palette.isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900],
  },

  '& span:nth-child(2)': {
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
    fontWeight: 700,
  },
}));
