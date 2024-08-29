import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import React from 'react';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import CuFilters from './CuFilters';
import { CustomTable2 } from './components/CustomTable/CustomTable2';
import { useCoreUnitsTableView } from './useCoreUnitsTableView';

interface Props {
  coreUnits: CoreUnit[];
}

const CoreUnitsIndexView: React.FC<Props> = ({ coreUnits }) => {
  const {
    searchText,
    columns,
    tableItems,
    onSortClick,
    headersSort,
    queryStrings,
    filters,
    canReset,
    onReset,
    searchFilters,
  } = useCoreUnitsTableView(coreUnits);

  return (
    <PageContainer>
      <SEOHead
        title="Sky Fusion - Legacy Ecosystem"
        description="Learn about Core Units as legacy contributor teams: their key information, activity, expenditures, FTE numbers, and more."
        canonicalURL={siteRoutes.coreUnitsOverview}
      />
      <Container>
        <Header>
          <CuFilters
            filters={filters}
            searchFilter={{
              value: searchText,

              onChange: searchFilters,
              widthStyles: {
                width: 290,
              },
            }}
            resetFilters={{
              canReset,
              onReset,
            }}
            snapPoints={[610, 400, 250, 0]}
          />
        </Header>
        <CustomTable2
          columns={columns}
          items={tableItems}
          handleSort={onSortClick}
          headersSort={headersSort}
          queryStrings={queryStrings}
        />
      </Container>
    </PageContainer>
  );
};

export default CoreUnitsIndexView;

export const ContainerOverlay = styled('div')<{ isLight: boolean }>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 4,
  height: 'calc(100vh - 282px)',
  background: 'rgba(52, 52, 66, 0.1)',
  backdropFilter: theme.palette.isLight ? 'blur(2px)' : 'blur(4px)',
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    height: 'calc(100vh - 458px)',
  },
}));

export const PolicyBannerPosition = styled('div')({
  bottom: 0,
  zIndex: 4,
  width: '100%',
  position: 'absolute',
  borderRadius: '90px',
  transition: 'all 0.5s ease-in',
});

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: '8px',
  justifyContent: 'flex-end',
  minWidth: '330px',
  [theme.breakpoints.up('mobile_375')]: {
    marginTop: 24,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 24,
  },
}));
