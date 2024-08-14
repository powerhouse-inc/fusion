import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import FiltersBundle from '@/components/FiltersBundle/FiltersBundle';
import TableEmptyState from '@/components/TableEmptyState/TableEmptyState';
import ActorTable from './components/ActorTable/ActorTable';
import { useEcosystemActorsIndexView } from './useEcosystemActorsIndexView';
import type { Team } from '@ses/core/models/interfaces/team';

interface Props {
  actors: Team[];
  stories?: boolean;
}

const EcosystemActorsIndexView: React.FC<Props> = ({ actors, stories = false }) => {
  const {
    readMore,
    handleRead,
    showTextDesk,
    filtersActive,
    columns,
    onSortClick,
    queryStrings,
    filter,
    canReset,
    onReset,
    searchFilters,
    searchText,
  } = useEcosystemActorsIndexView(actors, stories);

  return (
    <ExtendedPageContainer>
      <SEOHead
        title={'MakerDAO Ecosystem Actors | Endgame Overview'}
        description={
          'MakerDAO Ecosystem Actors provides a centralized directory of ecosystem actors and their roles for a clear understanding of who is involved in the ecosystem'
        }
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
      />
      <Container>
        <ContainerText>
          <Title>Ecosystem Actors</Title>
          <SubTitle>What are Ecosystem Actors? </SubTitle>
          <Description>
            <StyledParagraphOne>
              Ecosystem Actors serve as external entities offering valuable services to both Sky and Stars in the Sky
              Ecosystem.
              <span>
                These actors are further classified into two categories: Advisory Ecosystem Actors and Active Ecosystem
                Actors.
              </span>
            </StyledParagraphOne>
            {showTextDesk && (
              <>
                <StyledParagraph>
                  Active Ecosystem Actors work according to the specifications of Scope Alignment Artifacts to receive
                  funding for performing specific projects such as developing new features, data collection, marketing,
                  growth, and other operational activities that benefit the Sky Ecosystem.
                </StyledParagraph>
                <StyledParagraph>
                  In contrast, Advisory Council Member Ecosystem Actors engage in research and offer guidance to the Sky
                  Ecosystem, contributing to the refinement of Scopes Artifacts and their underlying procedures.
                </StyledParagraph>
              </>
            )}
          </Description>
        </ContainerText>
        <ContainerReadMore>
          <ReadMore onClick={handleRead}>{!readMore ? 'Read more' : 'Read less'}</ReadMore>
        </ContainerReadMore>

        <FilterContainer>
          <FiltersBundle
            filters={filter}
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
        </FilterContainer>

        {filtersActive.length > 0 ? (
          <ContainerList>
            <ActorTable actors={filtersActive} columns={columns} sortClick={onSortClick} queryStrings={queryStrings} />
          </ContainerList>
        ) : (
          <TableEmptyState description="There are no Ecosystem Actors available for this filter." />
        )}
      </Container>
    </ExtendedPageContainer>
  );
};

export default EcosystemActorsIndexView;

const ExtendedPageContainer = styled(PageContainer)(() => ({
  marginTop: 24,
}));

const Title = styled('h1')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: 18,
  lineHeight: '21.6px',
  letterSpacing: '0.4px',
  marginTop: 0,
  marginBottom: 0,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    lineHeight: '28.8px',
  },
}));

const SubTitle = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: ' normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: ' normal',
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 400,
  marginTop: -6,
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
    marginTop: 0,
  },
}));

const ContainerText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 0,
    gap: 8,
  },
});

const ContainerList = styled('div')({
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 4,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
  },
});

const StyledParagraphOne = styled('p')<{ readMore?: boolean }>(() => ({
  width: 343,
  marginTop: 4,

  marginBottom: 0,
  overflow: 'hidden',

  '> span': {
    marginLeft: 4,
  },
  [lightTheme.breakpoints.up(376)]: {
    marginTop: 0,
    marginBottom: 0,
    display: 'inline-block',
    WebkitLineClamp: 'unset',
    width: '100%',
  },
}));

const StyledParagraph = styled('p')({
  marginTop: 22,
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 400,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 18,
  },
});

const ReadMore = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 600,

  cursor: 'pointer',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  marginBottom: 20,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 5,
    marginBottom: 30,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 4,
    marginBottom: 22,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 2,
    marginBottom: 26,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 4,
    marginBottom: 24,
  },
  ':hover': {
    color: theme.palette.isLight ? 'rgba(35, 21, 54, 0.8)' : 'rgba(210, 212, 239, 0.8)',
  },
}));

const ContainerReadMore = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
});

const FilterContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginBottom: 22,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 20,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginBottom: 26,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginBottom: 22,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginBottom: 22,
  },
});
