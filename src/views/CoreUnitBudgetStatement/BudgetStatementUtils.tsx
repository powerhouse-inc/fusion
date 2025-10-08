import { styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';

import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { useScrollLock } from '@ses/core/hooks/useScrollLock';
import { getPageWrapper } from '@ses/core/utils/dom';

import MobileDetect from 'mobile-detect';
import Expand from 'public/assets/svg/expand.svg';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NumberCell } from '@/components/AdvancedInnerTable/NumberCell/NumberCell';
import { TextCell } from '@/components/AdvancedInnerTable/TextCell/TextCell';
import ModalSheetValueContent from '@/components/BudgetStatement/BudgetStatementTransferRequest/components/ModalSheet/ModalSheetValueContent';
import { WalletTableCell } from '@/components/WalletTableCell/WalletTableCell';
import Information from '@/components/icons/information';
import ArrowPopoverTargetValueComponent from '@/views/CoreUnitBudgetStatement/components/ArrowPopoverTargetValue/ArrowPopoverTargetValueComponent';
import { formatAddressForOutput } from '../../core/utils/string';
import { CustomLink } from '../../stories/components/CustomLink/CustomLink';
import type { BudgetStatementWalletDto } from '../../core/models/dto/coreUnitDTO';
import type { Theme } from '@mui/material';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';

export const renderWallet = (wallet: BudgetStatementWalletDto) => (
  <WalletTableCell
    key={wallet.address}
    name={wallet.name}
    wallet={formatAddressForOutput(wallet.address)}
    address={wallet.address}
  />
);

export const renderLinks = (address: string) => (
  <TextCell key={6} responsivePadding="0">
    <CustomLink
      fontFamily={'Inter, sans-serif'}
      href={`https://etherscan.io/address/${address}`}
      style={{ marginRight: '16px' }}
      fontSize={16}
      fontSizeMobile={14}
      fontWeight={500}
    >
      Etherscan
    </CustomLink>
    <CustomLink
      fontFamily={'Inter, sans-serif'}
      href={`https://app.safe.global/home?safe=eth:${address}`}
      fontSize={16}
      fontSizeMobile={14}
      fontWeight={500}
    >
      Gnosis
    </CustomLink>
  </TextCell>
);

export const renderLinksWithToken = (address: string) => (
  <TextCell key={6} responsivePadding="0">
    <CustomLink
      fontFamily={'Inter, sans-serif'}
      href={`https://etherscan.io/address/${address}#tokentxns`}
      style={{ marginRight: '16px' }}
      fontSize={16}
      fontSizeMobile={14}
      fontWeight={500}
    >
      Etherscan
    </CustomLink>
  </TextCell>
);

export interface WithClick {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const RenderNumberWithIcon = (data: TargetBalanceTooltipInformation) => {
  const [isOpen, setIsOpen] = useState(false);
  const hrefPopoverElement = useRef<HTMLDivElement>(null);
  const [marginTopPopoverPosition, setMarginTopPopoverPosition] = useState<boolean>(false);
  const handleShowPopoverWhenNotSpace = (value: boolean) => {
    setMarginTopPopoverPosition(value);
  };

  const isMobileResolution = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const { lockScroll, unlockScroll } = useScrollLock();
  const showIconToolTip = !!(data.description && data.link);

  let md;
  if (typeof window !== 'undefined') {
    md = new MobileDetect(window.navigator?.userAgent);
  }
  const isMobileDevice = !!md?.mobile();

  useEffect(() => {
    if (isMobileDevice) {
      if (isOpen) {
        const pageWrapper = getPageWrapper();
        if (pageWrapper) {
          pageWrapper.style.overflow = 'hidden';
        }

        lockScroll();
      }
    }
    return () => {
      unlockScroll();
    };
  }, [isMobileDevice, isOpen, lockScroll, unlockScroll]);

  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    },
    [isOpen]
  );

  const handleOnclose = () => {
    setIsOpen(false);
  };
  return (
    <BiggerContainer>
      <PopoverContainer>
        {!isMobileResolution && (
          <Container>
            {showIconToolTip && (
              <ExtendedCustomPopover
                onClose={handleOnclose}
                handleShowPopoverWhenNotSpace={handleShowPopoverWhenNotSpace}
                refElementShowPopover={hrefPopoverElement}
                sxProps={{
                  '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
                    overflowX: 'unset',
                    overflowY: 'unset',
                    marginTop: marginTopPopoverPosition ? 3 : -3,
                  },
                }}
                widthArrow
                hasSpacePositionArrow={marginTopPopoverPosition}
                id="information"
                popupStyle={{
                  padding: 10,
                }}
                title={
                  <ArrowPopoverTargetValueComponent
                    toolTipData={{
                      link: data.link,
                      description: data.description,
                      mipNumber: data.mipNumber,
                    }}
                    name={data.name}
                  />
                }
                leaveOnChildrenMouseOut
              >
                <ContainerInfoIcon onClick={handleOnClick}>
                  <IconPosition />
                </ContainerInfoIcon>
              </ExtendedCustomPopover>
            )}
            <ContainerInformation>
              <ContainerNumberCell value={data.balance} />
              <ContainerStyleMonths>{data.months}</ContainerStyleMonths>
            </ContainerInformation>
          </Container>
        )}
        {isMobileResolution && !isMobileDevice && (
          <Container>
            {showIconToolTip && (
              <ExtendedCustomPopover
                widthArrow
                handleShowPopoverWhenNotSpace={handleShowPopoverWhenNotSpace}
                refElementShowPopover={hrefPopoverElement}
                hasSpacePositionArrow={marginTopPopoverPosition}
                alignArrow="center"
                sxProps={{
                  '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
                    overflowX: 'unset',
                    overflowY: 'unset',
                    left: '0px!important',
                    marginLeft: '36px',
                    marginTop: marginTopPopoverPosition ? 1.5 : -3,
                  },
                }}
                id="information"
                popupStyle={{
                  padding: 10,
                }}
                title={
                  <ArrowPopoverTargetValueComponent
                    toolTipData={{
                      link: data.link,
                      description: data.description,
                      mipNumber: data.mipNumber,
                    }}
                    name={data.name}
                  />
                }
                leaveOnChildrenMouseOut
              >
                <ContainerInfoIcon onClick={handleOnClick}>
                  <IconPosition />
                </ContainerInfoIcon>
              </ExtendedCustomPopover>
            )}
            <ContainerInformation onClick={handleOnClick}>
              <ContainerNumberCell value={data.balance} />
              <ContainerStyleMonths>{data.months}</ContainerStyleMonths>
            </ContainerInformation>
          </Container>
        )}
      </PopoverContainer>
      {isMobileResolution && (
        <PopoverContainer>
          {isMobileResolution && isMobileDevice && (
            <Container>
              {showIconToolTip && (
                <ContainerInfoIcon onClick={handleOnClick}>
                  <IconPosition />
                </ContainerInfoIcon>
              )}

              <ContainerInformation onClick={handleOnClick}>
                <ContainerNumberCell value={data.balance} />
                <ContainerStyleMonths>{data.months}</ContainerStyleMonths>
              </ContainerInformation>
            </Container>
          )}
        </PopoverContainer>
      )}
      {isMobileResolution && isOpen && isMobileDevice && (
        <ModalSheet>
          <ModalSheetValueContent
            toolTipData={{
              description: data.description,
              link: data.link,
              mipNumber: data.mipNumber,
            }}
            name={data.name}
          />
        </ModalSheet>
      )}
      {isMobileResolution && isOpen && isMobileDevice && <ContainerOverlay onClick={handleOnclose} />}
    </BiggerContainer>
  );
};

const ContainerOverlay = styled('div')<WithClick>(({ onClick, theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: theme.palette.isLight ? 'rgba(52, 52, 66, 0.1)' : 'rgba(0, 22, 78, 0.1);',
  backdropFilter: theme.palette.isLight ? 'blur(2px)' : 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: zIndexEnum.OVERLAY_MOBILE_TOOLTIP,
  cursor: onClick ? 'default' : undefined,
}));

const ModalSheet = styled('div')({
  width: '100%',
  zIndex: 5,
  textAlign: 'left',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
});

const PopoverContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
}));
const Container = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: -8,
  [theme.breakpoints.up('tablet_768')]: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginLeft: 0,
    marginTop: 0,
  },
}));

export const ContainerInfoIcon = styled('div')({
  position: 'relative',
});

const IconPosition = styled(Information)(({ theme }) => ({
  position: 'absolute',
  top: -14,
  left: -14,
  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
    top: -8,
    left: -10,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    alignItems: 'center',

    top: -8,
    left: 4,
  },
}));

const ContainerInformation = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end',

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    alignItems: 'flex-end',
    marginRight: 14,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    alignItems: 'flex-end',
    marginRight: 14,
  },
}));

const ContainerNumberCell = styled(NumberCell)({
  paddingBottom: 2,
  paddingTop: 0,
  '@media (min-width: 834px)': {
    paddingBottom: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
});

const ContainerStyleMonths = styled('div')(({ theme }) => ({
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#546978',
  [theme.breakpoints.up('tablet_768')]: {
    whiteSpace: 'nowrap',
  },
}));

export const TotalTargetBalance = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'flex-end',
  textAlign: 'center',
  fontWeight: 700,
  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 16,
  },
}));

const BiggerContainer = styled('div')({
  width: '100%',
});

const ExtendedCustomPopover = styled(CustomPopover)<{ hasSpacePositionArrow?: boolean }>(
  ({ hasSpacePositionArrow, theme }) => ({
    '& > div': {
      [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
        marginLeft: -45,
        marginTop: 16,
      },
      [theme.breakpoints.up('desktop_1024')]: {
        marginLeft: -32,
        marginTop: hasSpacePositionArrow ? -18 : 18,
      },
    },
  })
);

interface Props {
  name: string;
  handleOpenModal?: () => void;
  className?: string;
}

export const OpenModalTransparency: React.FC<Props> = ({ name, handleOpenModal, className }) => (
  <CategoryRowInsideColumn className={className}>
    {name}
    <ContainerIcon onClick={handleOpenModal}>
      <Expand />
    </ContainerIcon>
  </CategoryRowInsideColumn>
);

const CategoryRowInsideColumn = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

const ContainerIcon = styled('div')(({ theme }) => ({
  height: 20,
  width: 20,
  cursor: 'pointer',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  ':hover': {
    '& rect': {
      stroke: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
    '& line': {
      stroke: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
    '& mask': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
    color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
  },
}));
