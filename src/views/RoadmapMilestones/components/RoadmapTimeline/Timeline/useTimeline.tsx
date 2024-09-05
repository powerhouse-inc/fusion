import { useRef } from 'react';
import type { SwiperRef } from 'swiper/react';

const useTimeline = () => {
  const swiperRef = useRef<SwiperRef>(null);

  return {
    swiperRef,
  };
};

export default useTimeline;
