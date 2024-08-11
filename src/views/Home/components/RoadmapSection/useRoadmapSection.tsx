import { useWindowWidth } from '@react-hook/window-size';
import { useEffect, useRef, useState } from 'react';

import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import type { SwiperRef } from 'swiper/react';

const useRoadmapSection = (roadmapsData: Roadmap[]) => {
  const tabs = roadmapsData.map((roadmap) => ({
    id: roadmap.id,
    title: roadmap.title,
  }));

  const activeRoadmapRef = useRef(0);
  const swiperRef = useRef<SwiperRef>(null);
  const isComponentRenderedRef = useRef(false);

  const [activeTab, setActiveTab] = useState(roadmapsData[0]?.id);
  const handleActiveTab = (tabId: string) => {
    activeRoadmapRef.current = roadmapsData.findIndex((roadmap) => roadmap.id === tabId);
    setActiveTab(tabId);
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(0);
    }
  };

  const adjustSectionHeights = () => {
    const titles = Array.from(document.getElementsByClassName('title-container'));
    const latestKeyResults = Array.from(document.getElementsByClassName('latest-key-results-container'));

    for (const titleDiv of titles) {
      (titleDiv as HTMLDivElement).style.minHeight = '0px';
    }
    for (const latestKeyResultDiv of latestKeyResults) {
      (latestKeyResultDiv as HTMLDivElement).style.minHeight = '0px';
    }

    const maxTitleDiv = titles.reduce((prevDiv, currentDiv) =>
      prevDiv.getBoundingClientRect().height > currentDiv.getBoundingClientRect().height ? prevDiv : currentDiv
    );
    const maxLatestKeyResultDiv = latestKeyResults.reduce((prevDiv, currentDiv) =>
      prevDiv.getBoundingClientRect().height > currentDiv.getBoundingClientRect().height ? prevDiv : currentDiv
    );

    for (const titleDiv of titles) {
      (titleDiv as HTMLDivElement).style.minHeight = `${maxTitleDiv.getBoundingClientRect().height}px`;
    }
    for (const latestKeyResultDiv of latestKeyResults) {
      (latestKeyResultDiv as HTMLDivElement).style.minHeight = `${
        maxLatestKeyResultDiv.getBoundingClientRect().height
      }px`;
    }
  };

  const width = useWindowWidth();

  useEffect(() => {
    if (isComponentRenderedRef.current) {
      adjustSectionHeights();
    } else {
      isComponentRenderedRef.current = true;
    }
  }, [width]);

  useEffect(() => {
    adjustSectionHeights();
  });

  return {
    tabs,
    activeRoadmapRef,
    swiperRef,
    activeTab,
    handleActiveTab,
  };
};

export default useRoadmapSection;
