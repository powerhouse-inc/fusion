import { useMemo } from 'react';
import { ProgressStatus } from '@/core/models/interfaces/types';

const useMilestoneCard = (status: ProgressStatus) => {
  const statusLabel = useMemo(() => {
    switch (status) {
      case ProgressStatus.FINISHED:
        return 'Finished';
      case ProgressStatus.IN_PROGRESS:
        return 'In Progress';
      case ProgressStatus.DRAFT:
        return 'Draft';
      case ProgressStatus.TODO:
        return 'To do';
      default:
        return '';
    }
  }, [status]);

  return {
    statusLabel,
  };
};

export default useMilestoneCard;
