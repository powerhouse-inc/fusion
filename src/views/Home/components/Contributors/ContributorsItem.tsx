import { styled, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Card from '@/components/Card/Card';
import CategoryChip from '@/components/CategoryChip/CategoryChip';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import RoleChip from '@/components/RoleChip/RoleChip';
import type { ScopeSizeVariant } from '@/components/ScopeChip/ScopeChip';
import ScopeChip from '@/components/ScopeChip/ScopeChip';

import { siteRoutes } from '@/config/routes';
import { getFTEsFromCoreUnit } from '@/core/businessLogic/coreUnits';
import type { TeamRole } from '@/core/enums/teamRole';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import type { Team } from '@/core/models/interfaces/team';

import { ResourceType, type TeamCategory } from '@/core/models/interfaces/types';
import { getProfileUpdate } from '../../utils/utils';
import GroupScopesContributors from './GroupScopesContributors';
import Profile from './Profile';
import ProfileUpdated from './ProfileUpdated';
import type { Theme } from '@mui/material';
import type { FC } from 'react';

export interface CustomStyles {
  container?: React.CSSProperties;
  profile?: React.CSSProperties;
  scopes?: React.CSSProperties;
  role?: React.CSSProperties;
  category?: React.CSSProperties;
  ftes?: React.CSSProperties;
  lastModified?: React.CSSProperties;
}

interface Props {
  contributor: Team;
  className?: string;
  hasDefaultColors?: boolean;
  textDefault?: boolean;
  sizeScope?: ScopeSizeVariant;
  // Add new props for customization
  customStyles?: CustomStyles;
}
const ContributorsItem: FC<Props> = ({
  contributor,
  className,
  hasDefaultColors = true,
  textDefault,
  customStyles,
  sizeScope,
}) => {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isEcosystemActor = contributor.type === ResourceType.EcosystemActor;

  return (
    <LinkStyled
      href={
        isEcosystemActor
          ? siteRoutes.ecosystemActorAbout(contributor.shortCode)
          : siteRoutes.coreUnitAbout(contributor.shortCode)
      }
    >
      <Container className={className} customStyles={customStyles}>
        <ContainerData>
          <ProfileArrow>
            <ProfileStyled
              contributor={contributor}
              type={contributor.type}
              textDefault={textDefault ?? false}
              customStyles={customStyles}
            />
            <ArrowContainerMobile>
              <InternalLinkButtonStyled showIcon isLink={false} />
            </ArrowContainerMobile>
          </ProfileArrow>
          <Line />
          <ContainerScopeRoleMobile>
            {contributor.type === ResourceType.EcosystemActor ? (
              <>
                <Scopes>
                  {contributor.scopes?.map((item, index) => (
                    <ScopeChip
                      scope={item}
                      key={index}
                      size={isTablet && contributor.scopes.length < 2 ? 'large' : 'small'}
                    />
                  ))}
                </Scopes>
                <RoleMobileContainer>
                  <RoleChipStyled
                    type={contributor.type}
                    status={(contributor.category?.[0] ?? '') as TeamRole}
                    hasDefaultColors={hasDefaultColors}
                    textDefault={textDefault}
                  />
                </RoleMobileContainer>
              </>
            ) : (
              <>
                <ContainerCategoryMobile>
                  {!textDefault && <Label>Category</Label>}
                  <ContainerCategories>
                    {contributor.category?.map((category) => (
                      <CategoryChip key={category} category={category as TeamCategory} />
                    ))}
                  </ContainerCategories>
                </ContainerCategoryMobile>
                {textDefault ? (
                  <RoleChipDeskStyled
                    status={contributor.category?.[0] as TeamRole}
                    hasDefaultColors={hasDefaultColors}
                    textDefault={textDefault}
                    type={contributor.type}
                  />
                ) : (
                  <ContainerFTEsMobile>
                    <Label>FTS</Label>
                    <FTS>{getFTEsFromCoreUnit(contributor as unknown as CoreUnit)}</FTS>
                  </ContainerFTEsMobile>
                )}
              </>
            )}
          </ContainerScopeRoleMobile>
        </ContainerData>

        {contributor.type === ResourceType.EcosystemActor ? (
          <>
            <ScopesDesk customStyles={customStyles}>
              {contributor?.scopes?.length > 1 ? (
                <GroupScopesContributors items={contributor.scopes} />
              ) : contributor?.scopes?.length === 0 || contributor.scopes === null ? (
                <PlaceHolderEcosystemActor />
              ) : (
                contributor?.scopes?.map((item, index) => <ScopeChip scope={item} key={index} size={sizeScope} />)
              )}
            </ScopesDesk>
            <RoleDesk customStyles={customStyles} type={contributor.type}>
              <RoleChipDeskStyled
                status={contributor.category?.[0] as TeamRole}
                hasDefaultColors={hasDefaultColors}
                textDefault={textDefault}
                type={contributor.type}
              />
            </RoleDesk>
          </>
        ) : textDefault ? (
          <>
            <ScopesDesk customStyles={customStyles}>
              {contributor.type === ResourceType.CoreUnit ? (
                // New code for Core Unit categories
                <ContainerCategories customStyles={customStyles}>
                  {contributor?.category?.length > 2 ? (
                    <GroupScopesContributors items={contributor.category as TeamCategory[]} />
                  ) : contributor?.category?.length === 0 || contributor.category === null ? (
                    <PlaceHolderEcosystemActor />
                  ) : (
                    contributor?.category?.map((item, index) => (
                      <CategoryChip category={item as TeamCategory} key={index} />
                    ))
                  )}
                </ContainerCategories>
              ) : contributor?.scopes?.length > 1 ? (
                <GroupScopesContributors items={contributor.scopes} />
              ) : contributor?.scopes?.length === 0 || contributor.scopes === null ? (
                <PlaceHolderEcosystemActor />
              ) : (
                contributor?.scopes?.map((item, index) => <ScopeChip scope={item} key={index} size={sizeScope} />)
              )}
            </ScopesDesk>
            <RoleDesk customStyles={customStyles} type={contributor.type}>
              <RoleChipDeskStyled
                status={contributor.category?.[0] as TeamRole}
                hasDefaultColors={hasDefaultColors}
                textDefault={textDefault}
                type={contributor.type}
              />
            </RoleDesk>
          </>
        ) : (
          <>
            <ContainerCategoryDesk customStyles={customStyles}>
              <Label>Category</Label>
              <ContainerCategories>
                {contributor?.category?.length > 2 ? (
                  <GroupScopesContributors items={contributor.category as TeamCategory[]} />
                ) : contributor?.category?.length === 0 || contributor.category === null ? (
                  <PlaceHolderEcosystemActor />
                ) : (
                  contributor?.category?.map((item, index) => (
                    <CategoryChip category={item as TeamCategory} key={index} />
                  ))
                )}
              </ContainerCategories>
            </ContainerCategoryDesk>
            <ContainerFTEsDesk customStyles={customStyles}>
              <LabelFTs>FTES</LabelFTs>
              <FTS>{getFTEsFromCoreUnit(contributor as unknown as CoreUnit)}</FTS>
            </ContainerFTEsDesk>
          </>
        )}

        <DateUpdated customStyles={customStyles}>
          <ProfileUpdated date={getProfileUpdate(contributor)} type={contributor.type} />
        </DateUpdated>
        <ArrowContainerDesk>
          <InternalLinkButtonStyled showIcon isLink={false} />
        </ArrowContainerDesk>
      </Container>
    </LinkStyled>
  );
};

export default ContributorsItem;

const ContainerData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '8px 6px 0px 8px',
  gap: 8,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    padding: 0,
    width: 'revert',
  },
}));

const Container = styled(Card)<{ customStyles?: CustomStyles }>(({ theme, customStyles }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  ':hover': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#292E38',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    padding: '8px 12px',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 80,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '12px 16px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    flexDirection: 'row',
    padding: '13px 16px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ...customStyles?.container,
}));
const Line = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  borderTop: `1px solid ${theme.palette.isLight ? '#D4D9E1' : theme.palette.colors.charcoal[800]}`,
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)({
  padding: '2px 8px 2px 8px',
  width: 40,
  height: 32,
  ':hover': {
    padding: '2px 8px 2px 8px',
  },
});

const ProfileArrow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const LinkStyled = styled(Link)({
  display: 'flex',
});

const Scopes = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 4,
});
const RoleMobileContainer = styled('div')({});
const ScopesDesk = styled('div')<{ customStyles?: CustomStyles }>(({ theme, customStyles }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    minWidth: 80,
  },
  ...customStyles?.scopes,
}));
const RoleDesk = styled('div')<{ customStyles?: CustomStyles; type?: ResourceType }>(({ theme, customStyles }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    width: 170,

    flexDirection: 'row',
  },
  ...customStyles?.role,
}));

const DateUpdated = styled('div')<{ customStyles?: CustomStyles }>(({ theme, customStyles }) => ({
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    minWidth: 120,
  },
  ...customStyles?.lastModified,
}));
const ArrowContainerDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
}));
const ArrowContainerMobile = styled('div')(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const ContainerScopeRoleMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 6,
  marginTop: -2,
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const ProfileStyled = styled(Profile)<{ type: ResourceType; textDefault: boolean; customStyles?: CustomStyles }>(
  ({ theme, type, textDefault, customStyles }) => ({
    width: 180,

    [theme.breakpoints.up('desktop_1024')]: {
      width: 185,
    },
    [theme.breakpoints.up('desktop_1280')]: {
      width: 230,
    },
    [theme.breakpoints.up('desktop_1440')]: {
      width: type === ResourceType.EcosystemActor ? 250 : 292,
      ...(textDefault && {
        width: 252,
      }),
    },
    ...(customStyles?.profile || {}),
  })
);

const ContainerCategories = styled('div', {
  shouldForwardProp: (prop) => prop !== 'customStyles',
})<{ customStyles?: CustomStyles }>(({ theme, customStyles }) => ({
  display: 'flex',
  gap: 4,
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'column',
  },
  ...customStyles?.category,
}));

const ContainerCategoryMobile = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

const ContainerCategoryDesk = styled('div')<{ customStyles?: CustomStyles }>(({ theme, customStyles }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    width: 145,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 168,
  },
  ...customStyles?.category,
}));
const ContainerFTEsDesk = styled('div')<{ customStyles?: CustomStyles }>(({ theme, customStyles }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    width: 54,
    padding: '4px 8px',
    paddingRight: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  ...customStyles?.ftes,
}));

const ContainerFTEsMobile = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});
const Label = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[500],
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));
const LabelFTs = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  [theme.breakpoints.up('desktop_1024')]: {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const FTS = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  [theme.breakpoints.up('desktop_1024')]: {
    justifyContent: 'flex-start',
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],

    lineHeight: '24px',
  },
}));

const PlaceHolderEcosystemActor = styled('div')(({ theme }) => ({
  width: 32,
  [theme.breakpoints.up('desktop_1280')]: {
    width: 45,
  },
}));

const RoleChipStyled = styled(RoleChip)(() => ({
  '& div': {
    fontSize: 14,
  },
}));

const RoleChipDeskStyled = styled(RoleChip)(({ theme }) => ({
  [theme.breakpoints.up('desktop_1024')]: {
    '& div': {
      fontSize: 12,
      lineHeight: '18px',
    },
  },
  [theme.breakpoints.up('desktop_1280')]: {
    '& div': {
      fontSize: 14,
      lineHeight: '22px',
    },
  },
}));
