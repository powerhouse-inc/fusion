import { Collapse, styled } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { getArrayParam } from '@ses/core/utils/filters';
import { buildQueryString } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import _ from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { filterDataActors } from '@/views/EcosystemActorsIndex/utils/utils';
import BreadcrumbNavigation from '../BreadcrumbNavigation/BreadcrumbNavigation';
import ActorTitleWithDescription from './ActorTitleWithDescription';
import type { Team } from '@ses/core/models/interfaces/team';

interface ActorSummaryProps {
  actors: Team[];
  trailingAddress?: string[];
  breadcrumbTitle?: string;
  showHeader?: boolean;
  className?: string;
}

// TODO: delete this component once it is safe to do it
const ActorSummary = forwardRef<HTMLDivElement, ActorSummaryProps>(
  ({ actors: data = [], breadcrumbTitle, trailingAddress = [], showHeader = true }, ref, className = '') => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams?.get('code');

    // This is for the filter in the page of list actors about
    const filteredCategories = useMemo(() => getArrayParam('filteredCategories', searchParams), [searchParams]);

    const actorAbout = data?.find((actor) => actor.shortCode === code) || ({} as Team);

    const buildCULabel = () => (!_.isEmpty(actorAbout) ? `${actorAbout?.name}` : '');

    const filteredData = useMemo(() => {
      const { filteredCategoryData } = filterDataActors({
        data: data as Team[],
        filteredCategories,
      });
      return filteredCategoryData;
    }, [data, filteredCategories]);

    const page = useMemo(() => filteredData?.findIndex((item) => item.shortCode === code) + 1, [code, filteredData]);

    const queryStrings = buildQueryString({
      ...searchParams,
      filteredCategories,
      code: null, // override the Actors Code code to avoid add it to the query string as Core Unit
    });

    const changeCoreUnitCode = useCallback(
      (direct: -1 | 1) => () => {
        const index = filteredData?.findIndex((item) => item.shortCode === code);
        const newIndex = index + direct;
        if (newIndex >= 0 && newIndex < filteredData?.length) {
          router.push(`${siteRoutes.ecosystemActorAbout(filteredData[newIndex].shortCode)}/${queryStrings}`);
        }
      },
      [code, filteredData, queryStrings, router]
    );

    return (
      <MainContainer ref={ref} className={className}>
        <BreadcrumbNavigationStyled
          descriptionTextPagination="Ecosystem Actors"
          itemActual={page}
          mainUrl={`${siteRoutes.ecosystemActors}/${queryStrings}`}
          labelFirstItemNavigation={{
            label: buildCULabel(),
            url: `${siteRoutes.ecosystemActorAbout(code || '')}/${queryStrings}`,
          }}
          totalElements={filteredData.length}
          onClickLeft={changeCoreUnitCode(-1)}
          onClickRight={changeCoreUnitCode(1)}
          breadcrumbTitleMobile={breadcrumbTitle}
          hasStyleMobileItem={[buildCULabel(), undefined].includes(breadcrumbTitle)}
          trailingAddress={trailingAddress}
        />

        <Collapse in={showHeader} timeout={300} unmountOnExit>
          <ActorTitleWithDescriptionStyled actorAbout={actorAbout} showTextDescription={true} />
          <ContainerResponsiveMobile showHeader={showHeader} />
        </Collapse>
      </MainContainer>
    );
  }
);

export default ActorSummary;
const MainContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 64,
  width: '100%',
  background: theme.palette.isLight ? '#FFFFFF' : '#25273D',
  backgroundSize: 'cover',
  zIndex: 3,
  [lightTheme.breakpoints.between('mobile_375', 'tablet_768')]: {
    borderBottom: theme.palette.isLight ? '1px solid #B6EDE7' : '1px solid #027265',
  },
  [lightTheme.breakpoints.up('tablet_768')]: {
    top: 98,
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    top: 98,
  },
}));

const ContainerResponsiveMobile = styled('div')<{ showHeader: boolean }>(({ theme, showHeader }) => ({
  position: 'relative',
  borderBottom: showHeader ? (theme.palette.isLight ? '1px solid #B6EDE7' : '1px solid #027265') : 'none',
  width: '100%',
  marginTop: showHeader ? '24px' : 0,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: '24px',
  },

  [lightTheme.breakpoints.between('mobile_375', 'tablet_768')]: {
    marginTop: showHeader ? '16px' : '0px',
    borderBottom: 'none',
  },
}));

const BreadcrumbNavigationStyled = styled(BreadcrumbNavigation)({
  marginBottom: 0,
  '> div:first-of-type': {
    marginBottom: 0,
  },
});

const ActorTitleWithDescriptionStyled = styled(ActorTitleWithDescription)({
  paddingTop: 16,
});
