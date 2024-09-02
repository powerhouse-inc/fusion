import { Skeleton, styled, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';

const DelegateExpenseTrendItemSkeleton = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  const avatar = (
    <AvatarContainer>
      <Skeleton variant="circular" width={32} height={32} />
      <IconSkeleton variant="circular" width={20} height={20} />
    </AvatarContainer>
  );

  const footer = (
    <FooterContainer>
      <Skeleton variant="rounded" width={78} height={18} />
      <Skeleton variant="rounded" width={84} height={22} />
    </FooterContainer>
  );

  return (
    <ItemContainer>
      {isMobile && (
        <ContentContainer>
          <DataContainer>
            {avatar}
            <MobileNameContainer>
              <NameContainer>
                <Skeleton variant="rounded" width={27} height={18} />
                <Skeleton variant="rounded" width={176} height={18} />
              </NameContainer>
              <Skeleton variant="rounded" width={67} height={24} />
            </MobileNameContainer>
            <ViewButton>
              <Skeleton variant="rounded" width={40} height={32} />
            </ViewButton>
          </DataContainer>
          <Divider />
          <ValuesContainer>
            <ValueSet>
              <Skeleton variant="rounded" width={97} height={18} />
              <Skeleton variant="rounded" width={82} height={22} />
            </ValueSet>
            <ValueSet>
              <Skeleton variant="rounded" width={43} height={18} />
              <Skeleton variant="rounded" width={97} height={22} />
            </ValueSet>
          </ValuesContainer>
          {footer}
        </ContentContainer>
      )}
      {isTablet && (
        <ContentContainer>
          <DataContainer>
            <ContributorContainer>
              <Skeleton variant="rounded" width={98} height={18} />
              <ContributorInfo>
                {avatar}
                <NameContainer>
                  <Skeleton variant="rounded" width={27} height={22} />
                  <Skeleton variant="rounded" width={167} height={22} />
                </NameContainer>
              </ContributorInfo>
            </ContributorContainer>
            <ValueSet>
              <Skeleton variant="rounded" width={97} height={18} />
              <Skeleton variant="rounded" width={82} height={22} />
            </ValueSet>
            <ValueSet>
              <Skeleton variant="rounded" width={43} height={18} />
              <Skeleton variant="rounded" width={97} height={17} />
            </ValueSet>
            <StatusContainer>
              <Skeleton variant="rounded" width={38} height={18} />
              <Skeleton variant="rounded" width={67} height={24} />
            </StatusContainer>
            <ViewButton>
              <Skeleton variant="rounded" width={56} height={32} />
            </ViewButton>
          </DataContainer>
          {footer}
        </ContentContainer>
      )}
      {!isMobile && !isTablet && (
        <ContentContainer>
          <ContributorInfo>
            {avatar}
            <NameContainer>
              <Skeleton variant="rounded" width={27} height={22} />
              <Skeleton variant="rounded" width={168} height={22} />
            </NameContainer>
          </ContributorInfo>
          <ReportingMonthContainer>
            <Skeleton variant="rounded" width={82} height={17} />
          </ReportingMonthContainer>
          <ValueContainer>
            <Skeleton variant="rounded" width={97} height={17} />
          </ValueContainer>
          <StatusContainer>
            <Skeleton variant="rounded" width={67} height={24} />
          </StatusContainer>
          <LastUpdateContainer>
            <Skeleton variant="rounded" width={84} height={17} />
          </LastUpdateContainer>
          <ViewButton>
            <Skeleton variant="rounded" width={110} height={32} />
          </ViewButton>
        </ContentContainer>
      )}
    </ItemContainer>
  );
};

export default DelegateExpenseTrendItemSkeleton;

const ItemContainer = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flex: 1,
  padding: '16px 16px 0',
  border: theme.palette.isLight ? `1px solid ${theme.palette.colors.slate[50]}` : 'none',
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? '2px 4px 7px 0px rgba(107, 122, 150, 0.25)' : '1px 4px 15.3px 0px #141921',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '8px 8px 0px 16px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '12px 16px',
    border: 'none',
    borderRadius: 0,
    boxShadow: theme.palette.isLight ? '0px 2px 12px 0px rgba(37, 42, 52, 0.10)' : '1px 4px 15.3px 0px #141921',
    '&:last-of-type': {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
  },
}));

const ContentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  '& .MuiSkeleton-root': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],
  },
  '& .MuiSkeleton-rounded': {
    borderRadius: 6,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 0,
  },
}));

const DataContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
}));

const AvatarContainer = styled('div')(() => ({
  position: 'relative',
  minWidth: 39,
  width: 39,
  height: 38,
}));

const IconSkeleton = styled(Skeleton)(({ theme }) => ({
  position: 'absolute',
  bottom: 2,
  right: 2,
  boxShadow: theme.palette.isLight ? '2px 4px 7px 0px rgba(107, 122, 150, 0.25)' : '0px 1px 4px 0px #141921',
}));

const MobileNameContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  width: '100%',
}));

const NameContainer = styled('div')(() => ({
  display: 'flex',
  gap: 4,
}));

const ViewButton = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'flex-start',

  [theme.breakpoints.up('desktop_1024')]: {
    alignSelf: 'center',
  },
}));

const ValuesContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0 24px',
}));

const ValueSet = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 12,
  },
}));

const FooterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 'calc(100% + 32px)',
  padding: '4px 16px',
  borderTop: `1px solid ${theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.slate[500]}`,

  [theme.breakpoints.up('tablet_768')]: {
    width: 'calc(100% + 24px)',
    marginLeft: -8,
    padding: '4px 10px 4px 10px',
  },
}));

const ContributorContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

const ContributorInfo = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const StatusContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,

  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 16,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingRight: 50,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    paddingRight: 77,
  },
}));

const ReportingMonthContainer = styled('div')(({ theme }) => ({
  paddingLeft: 12,

  [theme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 0,
    paddingRight: 30,
  },
}));

const ValueContainer = styled('div')(({ theme }) => ({
  paddingLeft: 4,

  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 6,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 0,
    paddingRight: 16,
  },
}));

const LastUpdateContainer = styled('div')(({ theme }) => ({
  paddingRight: 14,

  [theme.breakpoints.up('desktop_1280')]: {
    paddingRight: 16,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    paddingRight: 2,
  },
}));

const Divider = styled('div')(({ theme }) => ({
  width: '100%',
  borderBottom: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#405361'}`,
  opacity: 0.5,
}));
