import { styled, useMediaQuery } from '@mui/material';
import React, { useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { NavigationCard } from '@/views/Finances/utils/types';
import CardNavigationFinance from '../../CardNavigationFinance/CardNavigationFinance';
import type { Theme } from '@mui/material';
import type { SwiperProps, SwiperRef } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

interface Props {
  cardsNavigationInformation: NavigationCard[];
  level: number;
}

const CardsNavigation: React.FC<Props> = ({ cardsNavigationInformation, level }) => {
  const ref = useRef<SwiperRef>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTabletOrDesktop1024 = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between('tablet_768', 'desktop_1280')
  );
  const MAX_ITEMS = isMobile ? 2 : isTabletOrDesktop1024 ? 3 : 5;
  const showSwiper = cardsNavigationInformation.length > MAX_ITEMS;

  const isDeepLevel = level >= 3;

  // Options of Swiper
  const swiperOptions: SwiperProps = {
    pagination: {
      type: 'bullets',
      enabled: true,
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 8,
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: isDeepLevel ? 4 : 3,
        slidesPerGroup: isDeepLevel ? 4 : 3,
        spaceBetween: 8,
      },
      1280: {
        slidesPerView: isDeepLevel ? 6 : 5,
        slidesPerGroup: isDeepLevel ? 6 : 5,
        spaceBetween: 8,
      },
      1440: {
        slidesPerView: isDeepLevel ? 6 : 5,
        slidesPerGroup: isDeepLevel ? 6 : 5,
        spaceBetween: 8,
      },
    },
  };

  return (
    <ContainerCardsNavigation showSwiper={showSwiper}>
      {showSwiper ? (
        <SwiperWrapper>
          <Swiper
            direction="horizontal"
            ref={ref}
            modules={[Pagination, Navigation]}
            centerInsufficientSlides
            pagination={true}
            {...swiperOptions}
          >
            {cardsNavigationInformation.map((coreUnit, index) => (
              <SwiperSlide key={index}>
                <CardWrapper>
                  <CardNavigationFinance
                    href={coreUnit.href}
                    image={coreUnit.image}
                    title={coreUnit.title}
                    description={coreUnit.description || ''}
                    code={coreUnit.code}
                    isCompact={isDeepLevel}
                    key={index}
                  />
                </CardWrapper>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperWrapper>
      ) : (
        cardsNavigationInformation.map((card: NavigationCard, index) => (
          <CardNavigationFinance
            href={card.href}
            image={card.image}
            title={card.title}
            description={card.description || ''}
            code={card.code}
            isCompact={isDeepLevel}
            key={index}
          />
        ))
      )}
    </ContainerCardsNavigation>
  );
};

export default CardsNavigation;

const ContainerCardsNavigation = styled('div')<{ showSwiper: boolean }>(({ theme, showSwiper }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  gap: 16,
  ...(showSwiper && { margin: '0 -8px' }),

  [theme.breakpoints.up('tablet_768')]: {
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
}));

const SwiperWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  marginBottom: 32,
  maxWidth: '100%',
  width: '100%',

  '& .swiper-slide': {
    height: 'auto',
  },

  '& .swiper-pagination-horizontal': {
    position: 'relative',
    marginTop: 24,
  },

  '& .swiper-pagination > .swiper-pagination-bullet': {
    opacity: 1,
  },

  '& .swiper-pagination-bullet': {
    width: 12,
    height: 12,
    backgroundColor: theme.palette.isLight
      ? `${theme.palette.colors.charcoal[100]} !important`
      : `${theme.palette.colors.gray[900]} !important`,
    opacity: '1 !important',

    [theme.breakpoints.up('tablet_768')]: {
      width: 16,
      height: 16,
    },

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

  '& .swiper-slide-active': {
    marginLeft: -8,
  },
}));

const CardWrapper = styled('div')({
  paddingLeft: 16,
  paddingBottom: 4,
  paddingTop: 4,
  display: 'flex',
  flex: '1',
  height: '100%',
});
