import { styled, useMediaQuery } from '@mui/material';
import MultiUsers from '@ses/components/svg/MultiUsers';
import MultiUsersMobile from '@ses/components/svg/MultiUsersMobile';
import { siteRoutes } from '@ses/config/routes';
import GenericDelegateCard from '@ses/containers/RecognizedDelegates/components/GenericDelegateCard';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { capitalizeSentence } from '@ses/core/utils/string';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useMemo } from 'react';
import CircleAvatarWithIcon from '@/components/CircleAvatar/CircleAvatarWithIcon';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import { AllowedOwnerType } from '@/views/BudgetStatement/types';
import ExpenseReportStatusIndicator from '@/views/CoreUnitBudgetStatement/components/ExpenseReportStatusIndicator/ExpenseReportStatusIndicator';
import LastModifiedActorCoreUnit from '@/views/CoreUnitsIndex/components/LastModifiedActorCoreUnit/LastModifiedActorCoreUnit';
import { getLastActivityDate } from '../../utils/utils';
import type { Theme } from '@mui/material';
import type { AnalyticMetric } from '@ses/core/models/interfaces/analytic';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { FC } from 'react';

interface Props {
  budget: BudgetStatement;
  selectedMetric: AnalyticMetric;
  now?: DateTime;
}

const DelegateExpenseTrendItem: FC<Props> = ({ budget, selectedMetric, now = DateTime.now() }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const lastModified = getLastActivityDate(budget);
  const lastModifiedRelative = capitalizeSentence(
    lastModified?.toRelative({
      base: now,
      unit: 'days',
    }) ?? ''
  );
  const reportMonth = DateTime.fromFormat(budget.month, 'yyyy-LL-dd')?.toFormat('LLL yyyy');
  const isCoreUnitElement = budget.ownerType === 'CoreUnit';

  const link = useMemo(() => {
    switch (budget.ownerType) {
      case 'CoreUnit':
        return `${siteRoutes.coreUnitReports(budget.owner.shortCode)}?viewMonth=${DateTime.fromFormat(
          budget.month,
          'yyyy-LL-dd'
        ).toFormat('LLLyyyy')}`;

      case 'Delegates':
        return `${siteRoutes.recognizedDelegateReport}?viewMonth=${DateTime.fromFormat(
          budget.month,
          'yyyy-LL-dd'
        ).toFormat('LLLyyyy')}`;
      case 'SpecialPurposeFund':
        return `${siteRoutes.budgetStatements(AllowedOwnerType.SPFS)}?viewMonth=${DateTime.fromFormat(
          budget.month,
          'yyyy-LL-dd'
        ).toFormat('LLLyyyy')}`;
      case 'AlignedDelegates':
        return `${siteRoutes.budgetStatements(AllowedOwnerType.ALIGNED_DELEGATES)}?viewMonth=${DateTime.fromFormat(
          budget.month,
          'yyyy-LL-dd'
        ).toFormat('LLLyyyy')}`;
      case 'Keepers':
        return `${siteRoutes.budgetStatements(AllowedOwnerType.KEEPERS)}?viewMonth=${DateTime.fromFormat(
          budget.month,
          'yyyy-LL-dd'
        ).toFormat('LLLyyyy')}`;
    }

    // ecosystem actor by default
    return `${siteRoutes.ecosystemActorReports(budget.owner.shortCode)}?viewMonth=${DateTime.fromFormat(
      budget.month,
      'yyyy-LL-dd'
    ).toFormat('LLLyyyy')}`;
  }, [budget]);

  const value = useMemo(() => {
    switch (selectedMetric) {
      case 'Actuals':
        return budget.actualExpenses ?? 0;
      case 'Forecast':
        return budget.forecastExpenses ?? 0;
      case 'PaymentsOnChain':
        return budget.paymentsOnChain ?? 0;
      case 'ProtocolNetOutflow':
        return budget.netProtocolOutflow ?? 0;
    }
    return NaN;
  }, [budget, selectedMetric]);

  const metricLabel = useMemo(() => {
    switch (selectedMetric) {
      case 'PaymentsOnChain':
        return 'Net On-Chain';
      case 'ProtocolNetOutflow':
        return 'Protocol Outflow';
    }
    return selectedMetric;
  }, [selectedMetric]);

  const elementInDesk = (
    <ContainerInside>
      <ContainerDesk>
        <ContainerMobile>
          <ActorLabel>Ecosystem Actor</ActorLabel>
          <ContainerIconName>
            <CircleAvatarWithIconStyled
              isCoreUnit={isCoreUnitElement}
              name="Image Core Unit or Delegate"
              icon={isMobile ? <MultiUsersMobile /> : <MultiUsers />}
              image={budget.owner.icon}
            />
            <ContainerStatus>
              <TitleCode>
                <Code>{budget.owner.shortCode}</Code>
                <Title>{budget.owner.name}</Title>
              </TitleCode>
              <StatusMobile>
                <ExpenseReportStatusIndicatorMobile budgetStatus={budget.status} showCTA={false} />
              </StatusMobile>
            </ContainerStatus>
          </ContainerIconName>
          <ArrowMobile>
            <InternalLinkButton href={link || ''} buttonType="primary" />
          </ArrowMobile>
        </ContainerMobile>
        <ReportingMonth>
          <LabelDescription>Reporting Month</LabelDescription>
          <StyledDate>{reportMonth}</StyledDate>
        </ReportingMonth>
        <TotalActualsTable>
          <LabelDescription>{metricLabel}</LabelDescription>
          <TotalNumber>{usLocalizedNumber(value)} DAI</TotalNumber>
        </TotalActualsTable>
        <ContainerStatusTable>
          {budget.status && (
            <StatusTable>
              <LabelStatus>Status</LabelStatus>
              <ExpenseReportStatusIndicatorTable budgetStatus={budget.status} showCTA={false} />
            </StatusTable>
          )}
          <ContainerArrow>
            <InternalLinkButton href={link || ''} buttonType="primary" />
          </ContainerArrow>
        </ContainerStatusTable>
        <LastModifiedDesk>
          <LabelLastModifiedText>{lastModifiedRelative}</LabelLastModifiedText>
        </LastModifiedDesk>
        <ViewContainer>
          <InternalLinkButton href={link || ''} buttonType="primary" label="View" />
        </ViewContainer>
      </ContainerDesk>
      <Divider />
      <ContainerCardMobile>
        <ContainerReportingMobile>
          <ReportingMobile>
            <LabelTagMobile>Reporting Month</LabelTagMobile>
            <StyledDate>{reportMonth}</StyledDate>
          </ReportingMobile>
        </ContainerReportingMobile>
        <TotalContainerMobile>
          <Total>{metricLabel}</Total>
          <TotalNumber>{usLocalizedNumber(value)} DAI</TotalNumber>
        </TotalContainerMobile>
      </ContainerCardMobile>
    </ContainerInside>
  );

  return (
    <ExtendedGenericDelegate>
      <Link href={link || ''} legacyBehavior passHref target="_blank">
        <a>{elementInDesk}</a>
      </Link>
      <FooterMobile>
        <LastModifiedStyled href={link || '#'} date={lastModified} />
      </FooterMobile>
    </ExtendedGenericDelegate>
  );
};

export default DelegateExpenseTrendItem;

const ExtendedGenericDelegate = styled(GenericDelegateCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  backgroundColor: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],
  border: theme.palette.isLight ? `1px solid ${theme.palette.colors.slate[50]}` : 'none',
  borderRadius: 12,
  boxShadow: theme.palette.isLight ? '2px 4px 7px 0px rgba(107, 122, 150, 0.25)' : '1px 4px 15.3px 0px #141921',

  [theme.breakpoints.up('desktop_1024')]: {
    minHeight: 'revert',
    border: 'none',
    borderRadius: 0,
    boxShadow: theme.palette.isLight ? '0px 2px 12px 0px rgba(37, 42, 52, 0.10)' : '1px 4px 15.3px 0px #141921',
    '&:last-of-type': {
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      '& > a > div': {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      },
    },
  },
}));

const CircleAvatarWithIconStyled = styled(CircleAvatarWithIcon)<{ isCoreUnit: boolean }>(({ isCoreUnit, theme }) => ({
  width: 39,
  height: 38,
  minWidth: 39,
  minHeight: 38,
  marginTop: 6,

  '& div svg path': {
    fill: isCoreUnit ? '#1AAB9B' : '#447AFB',
  },
  '& div svg rect': {
    stroke: isCoreUnit ? '#6EDBD0' : '#85A9FF',
  },
  '& div svg path:nth-of-type(3)': {
    fill: '#fff',
  },
  '& div svg path:nth-of-type(4)': {
    fill: '#fff',
  },
  '& > div:first-of-type': {
    width: 32,
    height: 32,
    minWidth: 32,
    minHeight: 32,
  },
  '& > div:last-of-type': {
    top: 20,
    left: 20,
    width: 20,
    height: 20,
    minWidth: 20,
    minHeight: 20,
    '& > svg': {
      width: 20,
      height: 20,
      minWidth: 20,
      minHeight: 20,
      transform: 'scale(1.6)',
    },
  },

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
  },
}));

const ContainerInside = styled('div')(({ theme }) => ({
  padding: '16px 16px 8px',
  cursor: 'pointer',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '8px 8px 4px 16px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '12px 16px',
    '&:hover': {
      backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(41, 46, 56, 1)',
    },
  },
}));

const ContainerIconName = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 4,
  height: 46,
  minHeight: 46,

  [theme.breakpoints.up('tablet_768')]: {
    height: 'unset',
    alignItems: 'center',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    minHeight: 'revert',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 8,
  },
}));

const TitleCode = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  width: 200,
  fontFamily: 'Inter, sans-serif',

  [theme.breakpoints.up('desktop_1024')]: {
    width: 237,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 256,
  },
}));

const Code = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  textTransform: 'uppercase',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 12,
    lineHeight: '18px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
}));

const Title = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
}));

const StyledDate = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 12,
    lineHeight: '18px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
}));

const Divider = styled('div')(({ theme }) => ({
  width: '100%',
  borderBottom: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#405361'}`,
  opacity: 0.5,
  marginTop: 8,
  marginBottom: 8,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const TotalContainerMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const Total = styled('div')(({ theme }) => ({
  display: 'flex',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
}));

const TotalNumber = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 12,
    lineHeight: '18px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
}));

const FooterMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  '& > div': {
    flex: 1,
  },
  '& > a': {
    flex: 1,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const ActorLabel = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    width: '100%',
    display: 'flex',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
  },
}));

const ReportingMonth = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginLeft: 0,
    minWidth: 130,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 0,
    marginLeft: 8,
    width: 120,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: -16,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: -35,
  },
}));

const TotalActualsTable = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginLeft: -6,
    minWidth: 120,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 0,
    marginLeft: 0,
    width: 130,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 2,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: 20,
  },
}));

const StatusTable = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: 99,
    '& > div:nth-last-of-type(1)': {
      marginLeft: 0,
    },
    height: 60,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 0,
    '& > div:nth-last-of-type(1)': {
      marginLeft: 0,
    },
    minWidth: 120,
    marginLeft: 0,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 150,
    marginLeft: 0,
    paddingLeft: 0,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: 10,
    '& div:nth-of-type(2)': {
      marginLeft: 0,
    },
  },
}));

const LabelDescription = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
  },
}));

const LabelStatus = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
  },
}));

const LastModifiedDesk = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    width: 130,
    marginLeft: 0,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 0,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 20,
  },
}));

const ViewContainer = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'block',
    alignSelf: 'center',
    height: 'fit-content',
    '& > a': {
      padding: '4px 16px 4px 24px',
    },
  },
}));

const ContainerDesk = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.up('desktop_1024')]: {
    height: 38,
  },
}));

const LabelLastModifiedText = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
}));

const ContainerArrow = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'block',
    '& > a': {
      padding: '4px 16px',
      '&:hover': {
        padding: '4px 16px',
      },
    },
  },
}));

const ArrowMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'flex-start',
  '& > a': {
    padding: '4px 8px',
    '&:hover': {
      padding: '4px 8px',
    },
  },

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const ContainerMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 'unset',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 'revert',
  },
}));

const ContainerCardMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 24,
  paddingRight: 24,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const ContainerReportingMobile = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const LabelTagMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
}));

const ExpenseReportStatusIndicatorMobile = styled(ExpenseReportStatusIndicator)({
  marginTop: 0,
});

const ExpenseReportStatusIndicatorTable = styled(ExpenseReportStatusIndicator)(({ theme }) => ({
  marginTop: 0,

  [theme.breakpoints.up('tablet_768')]: {
    '& > div': {
      marginLeft: 0,
    },
  },
}));

const StatusMobile = styled('div')(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const ContainerStatus = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ContainerStatusTable = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 22,
  marginLeft: -2,
}));

const ReportingMobile = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

const LastModifiedStyled = styled(LastModifiedActorCoreUnit)(({ theme }) => ({
  padding: '4px 16px',
  '& > div:first-of-type': {
    marginTop: 0,
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[400],
  },
  '& > div:last-of-type': {
    fontSize: 14,
    lineHeight: '22px',
    color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[300],
  },

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    padding: '4px 10px',
    '& > div:first-of-type': {
      fontSize: 12,
      lineHeight: '18px',
      color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[400],
    },
    '& > div:last-of-type': {
      color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[300],
    },
  },
}));
