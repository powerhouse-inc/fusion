import { styled, useMediaQuery, useTheme } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import type { TeamCategory, TeamStatus } from '@/core/models/interfaces/types';
import { CircleAvatar } from '@/stories/components/CircleAvatar/CircleAvatar';
import { CustomPopover } from '@/stories/components/CustomPopover/CustomPopover';
import { SummaryToolTip } from '../components/ToolTips/SummaryToolTip';
import ToolTipsCU from '../components/ToolTips/ToolTips';
import { ColumnSummarySkeleton } from './CuTableColumnSummarySkeleton';
import type { Theme } from '@mui/material';

interface CuTableColumnSummaryProps {
  title?: string;
  imageUrl?: string;
  status?: TeamStatus;
  statusModified?: Date | null;
  onClick?: () => void;
  mipUrl?: string;
  code?: string;
  logoDimension?: string;
  isLoading?: boolean;
  hasPopup?: boolean;
  style?: React.CSSProperties;
  categories?: string[];
  isCard?: boolean;
}

interface PopupWrapperProps {
  children: JSX.Element;
  hasPopup: boolean;
  title?: JSX.Element;
  code?: string;
}

const PopupWrapper = ({ children, title, code, hasPopup = false }: PopupWrapperProps) => {
  if (!hasPopup) {
    return children;
  }

  return (
    <CustomPopover
      popupStyle={{
        padding: 0,
        border: 'none',
      }}
      popoverStyle={{
        border: 'none',
        background: 'none',
        borderRadius: 'none',
        boxShadow: 'none',
      }}
      sxProps={{
        fontSize: 14,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      title={title}
      id={code || ''}
    >
      {children}
    </CustomPopover>
  );
};

export const CuTableColumnSummary = ({
  logoDimension = '48px',
  isLoading = false,
  hasPopup = true,
  ...props
}: CuTableColumnSummaryProps) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;

  const phoneAndTableDevices = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
  const hiddenPopOverSmallDevices = hasPopup && !phoneAndTableDevices;
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.between('mobile_375', 'tablet_768'));

  if (isLoading) {
    return <ColumnSummarySkeleton />;
  }

  return (
    <Container onClick={props.onClick} style={props.style}>
      <ContainerSummary>
        <CircleContainer>
          <PopupWrapper
            hasPopup={hiddenPopOverSmallDevices}
            code={props.code}
            title={
              <PopupSummaryWrapper>
                <SummaryToolTip
                  categories={props.categories as TeamCategory[]}
                  code={props.code ?? ''}
                  href={props.mipUrl ?? ''}
                  imageUrl={props.imageUrl ?? ''}
                  name={props.title ?? ''}
                  status={props.status as TeamStatus}
                  statusModified={props.statusModified ?? null}
                />
              </PopupSummaryWrapper>
            }
          >
            <CircleAvatar
              width={logoDimension}
              border="none"
              height={logoDimension}
              name={props.title || 'Core Unit'}
              image={props.imageUrl}
              style={{
                border: 'none',
                boxShadow: isLight ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : '2px 4px 7px rgba(26, 171, 155, 0.25)',
              }}
            />
          </PopupWrapper>
        </CircleContainer>
        <Content>
          <TitleWrapper>
            <Code>{props.code}</Code>
            <Title longCode={(props.code?.length ?? 0) > 3}>{props.title}</Title>
          </TitleWrapper>

          <Row>
            <StatusChipStyled status={props.status as TeamStatus} />
            {props.statusModified && props.mipUrl && (
              <SESTooltipStyled content={<ToolTipsCU>Go to MIPs Portal</ToolTipsCU>} placement="bottom-end">
                <div>
                  <ExternalLinkButtonStyled href={props.mipUrl ?? ''} showArrow wrapText>
                    {`${isMobile ? '' : 'Since'} ${DateTime.fromJSDate(props.statusModified)
                      .toFormat('d-MMM-y')
                      .toUpperCase()}`}
                  </ExternalLinkButtonStyled>
                </div>
              </SESTooltipStyled>
            )}
          </Row>
        </Content>
      </ContainerSummary>
    </Container>
  );
};

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',

  alignItems: 'stretch',
  boxSizing: 'border-box',
  textDecoration: 'none',
});

const CircleContainer = styled('div')(({ theme }) => ({
  marginRight: 8,
  marginTop: 6,

  [theme.breakpoints.up('tablet_768')]: {
    marginRight: '8px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 0,
  },
}));

const Content = styled('section')({
  display: 'flex',
  flexDirection: 'column',
});

const Code = styled('span')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  textTransform: 'uppercase',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : '#546978',
  marginRight: '5px',
  whiteSpace: 'nowrap',
}));

const TitleWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const Title = styled('div')<{ longCode: boolean }>(({ theme, longCode = false }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontStyle: 'normal',
  alignItems: 'center',
  fontWeight: 600,
  width: 'fit-content',
  maxWidth: longCode ? 140 : 150,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : '#FFFFFF',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 'revert',
  },
}));

const Row = styled('section')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  marginBottom: 6,
  marginTop: -2,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 6,
    marginTop: -4,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 0,
    marginTop: 0,
    gap: 4,
  },
}));

const PopupSummaryWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('tablet_768')]: {
    padding: '24px 16px',
  },

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    padding: '0 16px',
  },
}));

const ExternalLinkButtonStyled = styled(ExternalLinkButton)(({ theme }) => ({
  padding: '0px 1px 0px 2px',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '24px',
  alignItems: 'center',
  border: `1.5px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,

  ':hover': {
    border: `1.5px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
    }`,
  },

  '& svg': {
    width: 16,
    height: 16,
    alignItems: 'center',
  },
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 1,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    marginTop: 0,
    padding: '0px 4px 2px 8px',
  },
}));

const StatusChipStyled = styled(StatusChip)(({ theme }) => ({
  padding: '1px 8px 1px 8px',
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '1px 16px 1px 16px',
  },
}));

const ContainerSummary = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 6,
  },
}));

const SESTooltipStyled = styled(SESTooltip)({
  padding: 0,
  width: 'fit-content',
  '& div': {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '24px',
  },
});
