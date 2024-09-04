import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import FiltersBundle from '@/components/FiltersBundle/FiltersBundle';
import type { FiltersBundleOptions } from '@/components/FiltersBundle/types';

interface Props {
  isMobile: boolean;
  isFilterCollapsedOnMobile: boolean;
  searchText: string;
  searchFilters: (value: string) => void;
  canReset: boolean;
  onReset: () => void;
}

const PageSubheader: React.FC<FiltersBundleOptions & Props> = (props) => {
  const { isMobile, isFilterCollapsedOnMobile, filters, searchText, searchFilters, canReset, onReset } = props;

  return (
    <Header>
      {((isMobile && isFilterCollapsedOnMobile) || !isMobile) && <Title>Projects</Title>}

      <FiltersBundle
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
        filters={filters}
        snapPoints={[330, 250, 0]}
      />
    </Header>
  );
};

export default PageSubheader;

const Header = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 24,
  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignSelf: 'stretch',
    gap: 0,
  },
});

const Title = styled('h1')(({ theme }) => ({
  margin: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '21.6px',
  letterSpacing: 0.4,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
    lineHeight: '24px',
  },
}));
