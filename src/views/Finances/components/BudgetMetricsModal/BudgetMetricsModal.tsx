import { styled, useTheme } from '@mui/material';
import { Close } from '@ses/components/svg/close';
import { useBudgetMetricsModalContext } from '@ses/core/context/BudgetMetricsModalContext';
import SimpleBar from 'simplebar-react';
import BasicModal from '@/components/AdvancedInnerTable/BasicModal/BasicModal';

const BudgetMetricsModal: React.FC = () => {
  const theme = useTheme();
  const { openModal, handleOpenModal } = useBudgetMetricsModalContext();

  return (
    <BasicModalExtended
      open={openModal}
      handleClose={handleOpenModal}
      slotProps={{
        backdrop: {
          sx: {
            background: theme.palette.isLight ? 'rgba(37, 42, 52, 0.10)' : 'rgba(37, 42, 52, 0.10)',
            backdropFilter: 'blur(2.5px)',
          },
        },
      }}
    >
      <Container>
        <Header>
          <ContainerTitle>
            <ModalTitle>About budget metrics</ModalTitle>
            <ContainerClose>
              <StyledClose onClick={handleOpenModal} />
            </ContainerClose>
          </ContainerTitle>
          <ContainerDescription>
            <Description>An estimate of income and expenditure for a set period.</Description>
          </ContainerDescription>
        </Header>
        <ContainerScroll>
          <SimpleBarStyled>
            <InsideModal>
              <MetricItem>
                <MetricTitle>Budget</MetricTitle>
                <MetricDescription>
                  The maximum amount allocated for a specific budget category or project.
                </MetricDescription>
              </MetricItem>

              <MetricItem>
                <MetricTitle>Forecast</MetricTitle>
                <MetricDescription>
                  The amount forecasted to be spent in a period, as self-reported by the corresponding team.
                </MetricDescription>
              </MetricItem>

              <MetricItem>
                <MetricTitle>Actuals</MetricTitle>
                <MetricDescription>
                  The actual amount spent or received in a period, as self-reported by the corresponding team.
                </MetricDescription>
              </MetricItem>

              <MetricItem>
                <MetricTitle>Payments On-Chain</MetricTitle>
                <MetricDescription>Transactions (expenses) made directly on the blockchain.</MetricDescription>
              </MetricItem>

              <MetricItem>
                <MetricTitle>Payments Off-Chain Included</MetricTitle>
                <MetricDescription>
                  Expense transactions based on the on-chain data combined with self-reported off-chain account
                  balances.
                </MetricDescription>
              </MetricItem>
            </InsideModal>
          </SimpleBarStyled>
        </ContainerScroll>
      </Container>
    </BasicModalExtended>
  );
};

export default BudgetMetricsModal;

const BasicModalExtended = styled(BasicModal)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  height: 'calc(100% - 64px)',
  maxHeight: '100%',
  marginTop: 64,
  marginBottom: 0,
  // This to hidden border in safari
  outline: 'none',
  transform: 'translateX(-50%)',
  width: 'max(100%, 375px)',

  [theme.breakpoints.up('tablet_768')]: {
    width: 'max(90%, 770px)',
    height: 'calc(100% - 128px)',
    marginBottom: 64,
    maxHeight: 532,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 928,
  },
}));

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  height: '100%',
  background: theme.palette.isLight ? '#fff' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  paddingBottom: 16,

  '::-webkit-scrollbar': {
    width: '1px',
  },

  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: '16px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 928,
    paddingBottom: 32,
  },
}));

const Header = styled('div')(({ theme }) => ({
  padding: '16px 16px 19px',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  background: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,

  [theme.breakpoints.up('tablet_768')]: {
    padding: '24px 24px 16px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 40,
    paddingRight: 40,
  },
}));

const ContainerTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 19,

  [theme.breakpoints.up('tablet_768')]: {
    height: 29,
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '17px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    width: 435,
    fontSize: 16,
    lineHeight: '24px',
    alignItems: 'baseline',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 625,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 725,
  },
}));

const ContainerDescription = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 19,
  alignItems: 'flex-end',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
  },
}));

const ContainerClose = styled('div')(({ theme }) => ({
  paddingRight: 3,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 6,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 3,
  },
}));

const StyledClose = styled(Close)(({ theme }) => ({
  width: 14,
  height: 14,

  [theme.breakpoints.up('tablet_768')]: {
    width: 20,
    height: 20,
  },
}));

const SimpleBarStyled = styled(SimpleBar)(({ theme }) => ({
  height: '100%',

  '.simplebar-scrollbar::before': {
    width: 4,
    marginLeft: 4,
    background: theme.palette.isLight ? theme.palette.colors.slate[400] : theme.palette.colors.slate[300],
    borderRadius: 20,
  },

  [theme.breakpoints.up('tablet_768')]: {
    maxHeight: 813,

    '.simplebar-scrollbar::before': {
      width: 6,
    },
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxHeight: 847,
  },
}));

const InsideModal = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  padding: '16px 16px 0',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '32px 40px 0',
  },
}));

const ContainerScroll = styled('div')(() => ({
  height: '100%',
  overflowY: 'auto',

  '::-webkit-scrollbar': {
    width: '1px',
  },
}));

const MetricItem = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

const ModalTitle = styled('div')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '18px',
  fontStyle: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    lineHeight: '120%',
  },
}));

const MetricTitle = styled('div')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '18px',
  fontStyle: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    lineHeight: '120%',
  },
}));

const MetricDescription = styled('div')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '17px',
  fontStyle: 'normal',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));
