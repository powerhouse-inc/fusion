import { Skeleton, styled } from '@mui/material';
import Card from '@/components/Card/Card';

const FirstSectionCardSkeleton = () => (
  <Container>
    <FirstContainer>
      <Header>
        <Skeleton variant="rounded" width={32} height={24} />
        <Skeleton variant="rounded" width="100%" height={24} />
        <Skeleton variant="rounded" width={60} height={24} />
      </Header>
      <Bars>
        <Skeleton variant="rounded" width={290} height={12} />
        <Skeleton variant="rounded" width={229} height={12} />
        <Skeleton variant="rounded" width={311} height={12} />
        <Skeleton variant="rounded" width={44} height={12} />
      </Bars>
    </FirstContainer>
    <SecondContainer>
      <Progress>
        <ProgressFirstContainer>
          <ProgressFirstContainerDiv>
            <Skeleton variant="rounded" width={51} height={18} />
            <Skeleton variant="circular" width={16} height={16} />
          </ProgressFirstContainerDiv>
          <Skeleton variant="rounded" width={109} height={24} />
        </ProgressFirstContainer>
        <ProgressSecondContainer>
          <Skeleton variant="rounded" width={187} height={16} />
          <Skeleton variant="rounded" width={34} height={14} />
        </ProgressSecondContainer>
      </Progress>
      <KeyResults>
        <Skeleton variant="rounded" width={82} height={18} />
        <KeyResultsSecondContainer>
          <KeyResultsSecondContainerDivOne>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="rounded" width={114} height={16} />
          </KeyResultsSecondContainerDivOne>
          <KeyResultsSecondContainerDivTwo>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="circular" width={24} height={24} />
          </KeyResultsSecondContainerDivTwo>
        </KeyResultsSecondContainer>
        <KeyResultsItemContainer>
          <KeyResultsItem>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="rounded" width={102} height={16} />
          </KeyResultsItem>
          <KeyResultsItem>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="rounded" width={51} height={16} />
          </KeyResultsItem>
          <KeyResultsItem>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="rounded" width={73} height={16} />
          </KeyResultsItem>
          <KeyResultsItem>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="rounded" width={90} height={16} />
          </KeyResultsItem>
        </KeyResultsItemContainer>
      </KeyResults>
    </SecondContainer>
  </Container>
);

export default FirstSectionCardSkeleton;

const Container = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 38,
  width: '100%',
  padding: '8px 16px 16px',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800]}`,
  boxShadow: 'none',
}));

const FirstContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 13,
  width: '100%',
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 8,
  width: '100%',

  '& .MuiSkeleton-rounded:last-of-type': {
    display: 'none',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    '& .MuiSkeleton-rounded:nth-of-type(2)': {
      width: '229px !important',
    },
    '& .MuiSkeleton-rounded:last-of-type': {
      display: 'block',
      marginLeft: 'auto',
    },
  },
}));

const Bars = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  width: '100%',

  '& .MuiSkeleton-rounded': {
    borderRadius: 4,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    '& .MuiSkeleton-rounded:first-of-type': {
      width: '415px !important',
    },
    '& .MuiSkeleton-rounded:nth-of-type(2)': {
      width: '354px !important',
    },
    '& .MuiSkeleton-rounded:nth-of-type(3)': {
      width: '100% !important',
    },
    '& .MuiSkeleton-rounded:last-of-type': {
      width: '87px !important',
    },
  },
  [theme.breakpoints.up('desktop_1280')]: {
    '& .MuiSkeleton-rounded:first-of-type': {
      width: '531px !important',
    },
    '& .MuiSkeleton-rounded:nth-of-type(2)': {
      width: '470px !important',
    },
    '& .MuiSkeleton-rounded:last-of-type': {
      width: '37px !important',
    },
  },
  [theme.breakpoints.up('desktop_1440')]: {
    '& .MuiSkeleton-rounded:first-of-type': {
      width: '587px !important',
    },
    '& .MuiSkeleton-rounded:nth-of-type(2)': {
      width: '526px !important',
    },
    '& .MuiSkeleton-rounded:last-of-type': {
      width: '93px !important',
    },
  },
}));

const SecondContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
}));

const Progress = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
  padding: 8,
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800]}`,
}));

const ProgressFirstContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

const ProgressFirstContainerDiv = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const ProgressSecondContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingRight: 4,
  borderRadius: 4,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],

  '& .MuiSkeleton-rounded': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.charcoal[700],

    '&:first-of-type': {
      borderRadius: '4px 0px 0px 4px',
    },
    '&:last-of-type': {
      marginTop: 1,
    },

    [theme.breakpoints.up('desktop_1024')]: {
      '&:first-of-type': {
        width: '266px !important',
      },
    },
    [theme.breakpoints.up('desktop_1280')]: {
      '&:first-of-type': {
        width: '340px !important',
      },
    },
    [theme.breakpoints.up('desktop_1440')]: {
      '&:first-of-type': {
        width: '375px !important',
      },
      '&:last-of-type': {
        width: '40px !important',
      },
    },
  },
}));

const KeyResults = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
  padding: 8,
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800]}`,
}));

const KeyResultsSecondContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',

  [theme.breakpoints.up('desktop_1280')]: {
    display: 'none',
  },
}));

const KeyResultsSecondContainerDivOne = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,

  '& .MuiSkeleton-rounded': {
    borderRadius: 4,
  },
}));

const KeyResultsSecondContainerDivTwo = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
}));

const KeyResultsItemContainer = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    gap: 24,
    width: '100%',
  },
}));

const KeyResultsItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,

  [theme.breakpoints.up('desktop_1440')]: {
    '&:first-of-type .MuiSkeleton-rounded': {
      width: '114px !important',
    },
    '&:nth-of-type(2) .MuiSkeleton-rounded': {
      width: '57px !important',
    },
    '&:nth-of-type(3) .MuiSkeleton-rounded': {
      width: '82px !important',
    },
    '&:last-of-type .MuiSkeleton-rounded': {
      width: '101px !important',
    },
  },
}));
