import { useWindowWidth } from '@react-hook/window-size';
import { useEffect } from 'react';

const useRoadmapTimeline = () => {
  const width = useWindowWidth();

  useEffect(() => {
    const adjustDownCardWidths = () => {
      const upCards = Array.from(document.getElementsByClassName('overview-up-card-wrapper'));
      const downCards = Array.from(document.getElementsByClassName('overview-down-card-wrapper'));
      if (width > 1023 && upCards.length + downCards.length === 5) {
        for (const downCardDiv of downCards) {
          (downCardDiv as HTMLDivElement).style.width = `${upCards[0].getBoundingClientRect().width}px`;
        }
      }
    };
    adjustDownCardWidths();
  }, [width]);
};

export default useRoadmapTimeline;
