import { useRef, useState } from 'react';

import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import type { SwiperRef } from 'swiper/react';

const useRoadmapSection = (roadmapsData: Roadmap[]) => {
  const tabs = roadmapsData.map((roadmap) => ({
    id: roadmap.id,
    title: roadmap.title,
  }));

  const activeRoadmapRef = useRef(0);
  const swiperRef = useRef<SwiperRef>(null);

  const [activeTab, setActiveTab] = useState(roadmapsData[0]?.id);
  const handleActiveTab = (tabId: string) => {
    activeRoadmapRef.current = roadmapsData.findIndex((roadmap) => roadmap.id === tabId);
    setActiveTab(tabId);
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(0);
    }
  };

  const adjustSectionsHeights = (timeout: number, isInit: boolean) => {
    const titleContainer = document.getElementsByClassName('title-container');
    const latestKeyResultsContainer = document.getElementsByClassName('latest-key-results-container');

    const titles = Array.from(titleContainer);
    const latestKeyResults = Array.from(latestKeyResultsContainer);

    for (const titleDiv of titles) {
      (titleDiv as HTMLDivElement).style.height = 'auto';
    }
    for (const latestKeyResultDiv of latestKeyResults) {
      (latestKeyResultDiv as HTMLDivElement).style.height = 'auto';
    }

    setTimeout(() => {
      titles.sort(
        (prevDiv, nextDiv) => nextDiv.getBoundingClientRect().height - prevDiv.getBoundingClientRect().height
      );
      latestKeyResults.sort(
        (prevDiv, nextDiv) => nextDiv.getBoundingClientRect().height - prevDiv.getBoundingClientRect().height
      );

      for (const titleDiv of titles) {
        (titleDiv as HTMLDivElement).style.height = `${titles[0].getBoundingClientRect().height}px`;
      }
      for (const latestKeyResultDiv of latestKeyResults) {
        (latestKeyResultDiv as HTMLDivElement).style.height = `${latestKeyResults[0].getBoundingClientRect().height}px`;
      }

      if (isInit && document.readyState !== 'complete') {
        adjustSectionsHeights(250, true);
      }
    }, timeout);
  };

  return {
    tabs,
    activeRoadmapRef,
    swiperRef,
    activeTab,
    handleActiveTab,
    adjustSectionsHeights,
  };
};

export default useRoadmapSection;
