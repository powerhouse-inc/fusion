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

  const adjustSectionsHeights = () => {
    const titleContainer = document.getElementsByClassName('title-container');
    const latestKeyResultsContainer = document.getElementsByClassName('latest-key-results-container');

    const titles = Array.from(titleContainer);
    for (const titleDiv of titles) {
      (titleDiv as HTMLDivElement).style.height = 'auto';
    }
    const maxTitleDiv = titles.reduce((prevDiv, currentDiv) =>
      prevDiv.getBoundingClientRect().height > currentDiv.getBoundingClientRect().height ? prevDiv : currentDiv
    );
    for (const titleDiv of titles) {
      (titleDiv as HTMLDivElement).style.height = `${maxTitleDiv.getBoundingClientRect().height - 8}px`;
    }

    const latestKeyResults = Array.from(latestKeyResultsContainer);
    for (const latestKeyResultDiv of latestKeyResults) {
      (latestKeyResultDiv as HTMLDivElement).style.height = 'auto';
    }
    const maxLatestKeyResultDiv = latestKeyResults.reduce((prevDiv, currentDiv) =>
      prevDiv.getBoundingClientRect().height > currentDiv.getBoundingClientRect().height ? prevDiv : currentDiv
    );
    for (const latestKeyResultDiv of latestKeyResults) {
      (latestKeyResultDiv as HTMLDivElement).style.height = `${
        maxLatestKeyResultDiv.getBoundingClientRect().height - 16
      }px`;
    }
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
