import { styled } from '@mui/material';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import MilestoneCard from '@/views/RoadmapMilestones/components/MilestoneCard/MilestoneCard';
import useTimeline from './useTimeline';
import type { FC } from 'react';
import type { SwiperProps } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

interface TimelineProps {
  milestones: Milestone[];
}

const Timeline: FC<TimelineProps> = ({ milestones }) => {
  const { swiperRef } = useTimeline();

  const swiperOptions: SwiperProps = {
    pagination: {
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 8,
      },
    },
  };

  return (
    <Container>
      <SwiperContainer>
        <Swiper ref={swiperRef} modules={[Pagination]} centerInsufficientSlides {...swiperOptions}>
          {milestones.map((milestoneData) => (
            <SwiperSlide key={milestoneData.id}>
              <MilestoneCardContainer>
                <MilestoneCard milestone={milestoneData} />
              </MilestoneCardContainer>
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>
    </Container>
  );
};

export default Timeline;

const Container = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 24,
  },
}));

const SwiperContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  margin: '0px -8px',

  '& .swiper-slide': {
    boxSizing: 'border-box',
    height: 'auto',
    marginBottom: 8,
  },

  '& .swiper-pagination-horizontal': {
    position: 'relative',
    bottom: '0px !important',
    marginTop: 16,
  },

  '& .swiper-pagination-bullet': {
    width: 16,
    height: 16,
    backgroundColor: theme.palette.isLight
      ? `${theme.palette.colors.charcoal[100]} !important`
      : `${theme.palette.colors.gray[900]} !important`,
    opacity: '1 !important',

    '&:first-of-type': {
      borderRadius: '20px 0px 0px 20px',
    },

    '&:last-of-type': {
      borderRadius: '0px 20px 20px 0px',
    },

    '&:not(.swiper-pagination-bullet-active):hover': {
      backgroundColor: theme.palette.isLight
        ? `${theme.palette.colors.charcoal[200]} !important`
        : `${theme.palette.colors.gray[800]} !important`,
    },
  },

  '& .swiper-pagination-bullet-active': {
    backgroundColor: `${theme.palette.colors.sky[1000]} !important`,
  },
}));

const MilestoneCardContainer = styled('div')(() => ({
  height: '100%',
  marginLeft: 8,
  marginRight: 8,
}));
