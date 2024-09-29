import { Button, styled, useMediaQuery } from '@mui/material';
import CircleIcon from 'public/assets/svg/circle.svg';
import Information from 'public/assets/svg/info_outlined.svg';
import Card from '@/components/Card/Card';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import { MAKERBURN_URL } from '@/config/externalUrls';
import { siteRoutes } from '@/config/routes';
import FinancesBarChart from '@/views/Home/components/FinancesBarChart/FinancesBarChart';
import type { RevenueAndSpendingRecords } from '../../api/revenueAndSpending';
import type { ButtonProps, Theme } from '@mui/material';
import type { FC } from 'react';

interface StyledButtonProps extends ButtonProps {
  index: number;
}

interface FinancesBarChartCardProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  years: string[];
}

const FinancesBarChartCard: FC<FinancesBarChartCardProps> = ({ revenueAndSpendingData, years }) => {
  const isSmallDesk = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));

  return (
    <Container>
      <Title>Sky Ecosystem Finances</Title>
      <FinancesBarChartContainer>
        <div>
          <FinancesBarChart revenueAndSpendingData={revenueAndSpendingData} years={years} />
        </div>
        <Legends>
          <RevenueLegend>
            <LegendTitle>Revenue</LegendTitle>
            <LegendButtonsContainer>
              <LegendButton index={0} startIcon={<CircleIcon />} disableRipple>
                Fees
              </LegendButton>
              <LegendButton index={1} startIcon={<CircleIcon />} disableRipple>
                Liquidation Income
              </LegendButton>
              <LegendButton index={2} startIcon={<CircleIcon />} disableRipple>
                PSM
              </LegendButton>
            </LegendButtonsContainer>
          </RevenueLegend>
          <SpendingLegend>
            <LegendTitle>Spending</LegendTitle>
            <SpendingLegendFirstSection>
              <LegendSectionTitle>
                <span>{isSmallDesk ? 'Opr Expenses' : 'Operational Expenses'}</span>
                <SESTooltip
                  content={
                    <TooltipContent>
                      <div>
                        <span>USDS/DAI Expensed</span>
                        <p>
                          Operational costs such as salaries, services, and other day-to-day expenses necessary for the
                          running of the Sky Ecosystem.
                        </p>
                      </div>
                      <div>
                        <span>MKR Vesting</span>
                        <p>Governance tokens are allocated to Sky Ecosystem Contributors as a long-term incentive.</p>
                      </div>
                    </TooltipContent>
                  }
                  placement="bottom-start"
                  enterTouchDelay={0}
                  leaveTouchDelay={15000}
                  showAsModal
                >
                  <IconWrapper>
                    <Information />
                  </IconWrapper>
                </SESTooltip>
              </LegendSectionTitle>
              <LegendButtonsContainer>
                <LegendButton index={3} startIcon={<CircleIcon />} disableRipple>
                  USDS/DAI Expensed
                </LegendButton>
                <LegendButton index={4} startIcon={<CircleIcon />} disableRipple>
                  MKR Vesting
                </LegendButton>
              </LegendButtonsContainer>
            </SpendingLegendFirstSection>
            <SpendingLegendSecondSection>
              <LegendSectionTitle>
                <span>Protocol Costs</span>
                <SESTooltip
                  content={
                    <TooltipContent>
                      <div>
                        <span>DSR Cost</span>
                        <p>
                          Represents the total interest paid to DAI holders for locking their DAI in the Dai Savings
                          Rate module.
                        </p>
                      </div>
                    </TooltipContent>
                  }
                  placement="bottom-start"
                  enterTouchDelay={0}
                  leaveTouchDelay={15000}
                  showAsModal
                >
                  <IconWrapper>
                    <Information />
                  </IconWrapper>
                </SESTooltip>
              </LegendSectionTitle>
              <LegendButtonsContainer>
                <LegendButton index={5} startIcon={<CircleIcon />} disableRipple>
                  DSR Cost
                </LegendButton>
              </LegendButtonsContainer>
            </SpendingLegendSecondSection>
          </SpendingLegend>
        </Legends>
      </FinancesBarChartContainer>
      <LinkButtons>
        <StyledExternalLinkButton href={MAKERBURN_URL} wrapText={false}>
          makerburn.com
        </StyledExternalLinkButton>
        <StyledInternalLinkButton href={siteRoutes.finances()} buttonType="primary" label="Details" />
      </LinkButtons>
    </Container>
  );
};

export default FinancesBarChartCard;

const Container = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '8px 8px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 'fit-content',
    padding: '16px 16px 24px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 24px 24px',
  },
}));

const Title = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: 20,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontWeight: 800,
    fontSize: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontWeight: 700,
    fontSize: 20,
  },
}));

const FinancesBarChartContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'column',
    gap: 32,
    marginTop: 42,
  },
}));

const Legends = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginTop: 14,

  [theme.breakpoints.up('tablet_768')]: {
    flex: '1 0 0',
    gap: 24,
    marginTop: 0,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    marginTop: 12,
  },
}));

const RevenueLegend = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '3.2px 8px',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[700]}`,
  borderRadius: 12,

  [theme.breakpoints.up('tablet_768')]: {
    height: 108,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '13px 16px 13px 32px',
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
    border: 'none',

    [theme.breakpoints.up('desktop_1024')]: {
      height: 129,
      padding: '23.5px 16px 23.5px 32px',
    },
    [theme.breakpoints.up('desktop_1280')]: {
      height: 144,
      flex: '1 0 0',
      padding: '28px 24px',
    },
  },
}));

const SpendingLegend = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 18,

  [theme.breakpoints.up('tablet_768')]: {
    height: 150,
    alignItems: 'flex-start',
    padding: '26px 8px 8px',
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
    borderRadius: 12,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 129,
    flexDirection: 'row',
    gap: 8,
    padding: '34px 8px 8px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    height: 144,
    flexDirection: 'column',
    gap: 18,
    flex: '1 0 0',
    padding: '22px 9px 8px',
  },
}));

const LegendTitle = styled('span')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '24px',
  color: theme.palette.colors.gray[500],

  [theme.breakpoints.up('tablet_768')]: {
    position: 'absolute',
    left: 40,
    top: -10,
    padding: '0px 8px',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[500],
    backgroundColor: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[700],
    borderRadius: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    left: 16,
    top: -14,
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const SpendingLegendFirstSection = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: '11.2px 16px 7.2px',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[700]}`,
  borderRadius: 12,

  [theme.breakpoints.up('tablet_768')]: {
    height: 64,
    alignItems: 'flex-start',
    padding: '5.2px 8px',
    border: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
    }`,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 87,
    padding: '16.7px 8px',
    minWidth: 'fit-content',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    height: 64,
    padding: '3.2px 8px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '3.2px 16px',
  },
}));

const SpendingLegendSecondSection = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: '11.2px 8px 7.2px 23px',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[700]}`,
  borderRadius: 12,

  [theme.breakpoints.up('tablet_768')]: {
    height: 34,
    alignItems: 'flex-start',
    padding: '5.2px 8px',
    border: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
    }`,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    height: 87,
    padding: '3.2px 8px',
    justifyContent: 'center',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    height: 32,
    padding: '3.2px 8px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '3.2px 16px',
  },
}));

const LegendSectionTitle = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 16,
  top: -10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px 4px',
  backgroundColor: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],

  '& > span': {
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '18px',
    color: theme.palette.colors.gray[500],
  },

  [theme.breakpoints.up('tablet_768')]: {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  },
}));

const LegendButtonsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 24,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'column',
    gap: 8,
  },
}));

const LegendButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'index',
})<StyledButtonProps>(({ theme, index }) => ({
  minWidth: 'auto',
  height: 18,
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '18px',
  textTransform: 'none',
  border: 'none',
  borderRadius: 0,
  color: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.slate[50],
  backgroundColor: 'transparent',
  boxShadow: 'none',

  '& .MuiButton-startIcon': {
    width: 8,
    height: 8,
    marginLeft: 0,
    marginRight: 8,

    '& > svg circle': {
      ...(index === 0 && {
        fill: theme.palette.isLight ? theme.palette.colors.green[300] : theme.palette.colors.green[500],
      }),
      ...(index === 1 && {
        fill: theme.palette.isLight ? theme.palette.colors.green[500] : theme.palette.colors.green[700],
      }),
      ...(index === 2 && {
        fill: theme.palette.isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900],
      }),
      ...(index === 3 && {
        fill: theme.palette.isLight ? theme.palette.colors.red[500] : theme.palette.colors.red[700],
      }),
      ...(index === 4 && {
        fill: theme.palette.isLight ? theme.palette.colors.red[700] : theme.palette.colors.red[900],
      }),
      ...(index === 5 && {
        fill: theme.palette.isLight ? theme.palette.colors.orange[700] : theme.palette.colors.orange[900],
      }),
    },
  },

  '&:hover, &:active, &:focus': {
    backgroundColor: 'transparent',
  },

  [theme.breakpoints.up('tablet_768')]: {
    width: 'fit-content',
    height: 22,
    fontSize: 14,
    lineHeight: '22px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    height: 24,
    fontSize: 16,
    lineHeight: '24px',
    width: 'max-content',
    '& .MuiButton-startIcon': {
      transform: 'scale(1.5)',
    },
  },
}));

const LinkButtons = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 24,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 24,
  },
}));

const StyledExternalLinkButton = styled(ExternalLinkButton)(() => ({
  padding: '2px 16px 2px 24px',
  fontSize: 16,
  '& > div': {
    width: 21,
    height: 21,
  },
}));

const StyledInternalLinkButton = styled(InternalLinkButton)(() => ({
  padding: '3px 16px 3px 24px',
  '&:hover': {
    padding: '3px 8px 3px 24px',
  },
}));

const TooltipContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  span: {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '21.6px',
  },
  p: {
    margin: 0,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  width: 12,
  height: 12,
  marginLeft: 7,
  marginRight: 3,

  '& svg': {
    width: 12,
    height: 12,
  },
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },
  '&:hover': {
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
  },

  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
  },
}));
