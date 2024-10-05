import { useWindowWidth } from '@react-hook/window-size';
import { useEffect, useRef, useState } from 'react';

export const useRelativePositioning = (title: string, characterLimit: number) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [shouldPositionBelow, setShouldPositionBelow] = useState(false);
  const isShortTitle = title.length < characterLimit;

  const width = useWindowWidth();
  useEffect(() => {
    const updatePosition = () => {
      if (containerRef.current && titleRef.current && filterRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const titleWidth = titleRef.current.offsetWidth;
        const filterWidth = filterRef.current.offsetWidth;

        setShouldPositionBelow(titleWidth + filterWidth > containerWidth);
      }
    };
    updatePosition();
  }, [title, width]);

  return {
    containerRef,
    titleRef,
    filterRef,
    shouldPositionBelow,
    isShortTitle,
    height: containerRef?.current?.clientHeight,
  };
};
