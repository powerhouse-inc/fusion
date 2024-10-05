import { styled } from '@mui/material';
import React from 'react';
import type { CardSpacingSize, ItemType } from '../types';

interface Props {
  header: JSX.Element | string;
  headers: (JSX.Element | string)[];
  items?: JSX.Element[];
  separators?: boolean[];
  footer?: JSX.Element | string;
  // TODO: Type this to avoid lower and uppercase error
  itemType: ItemType;
  cardSpacingSize?: CardSpacingSize;
  subHeader: string;
  showSubHeader: boolean;
  category?: string;
  spaceEachCards?: number;
}

export const TransparencyCard: React.FC<Props> = ({
  cardSpacingSize = 'large',
  header,
  headers,
  itemType,
  subHeader,
  footer,
  items,
  separators,
  showSubHeader,
  spaceEachCards = 16,
  category = 'General',
}) => {
  if (itemType === 'section') return null;

  return (
    <Container
      spaceEachCards={spaceEachCards}
      className={`advance-table--transparency-card ${
        itemType === 'total' ? 'advance-table--transparency-card_total' : 'advance-table--transparency_item'
      }`}
    >
      <HeaderWrapper showSubHeader={showSubHeader}>
        {showSubHeader && <Category>{category}</Category>}
        {showSubHeader && <SubHeader>{subHeader}</SubHeader>}
      </HeaderWrapper>
      {header}

      {headers.map((header, i) => {
        const titleReactComponent = (header as JSX.Element).props?.title || '';
        const totalsStyle = header === 'Totals' || titleReactComponent === 'Totals';

        return (
          <ContainerData key={`${header.toString()}-${i}`} spacing={cardSpacingSize}>
            <Row hasIcon={header !== 'Target Balance' || (header === 'Target Balance' && itemType === 'total')}>
              <Label isTotal={totalsStyle}>{header}</Label>
              <div
                style={{
                  display: itemType === 'total' ? 'flex' : undefined,
                  justifyContent: itemType ? 'flex-end' : undefined,
                  width:
                    header === 'Target Balance' || (header === 'Target Balance' && itemType !== 'total')
                      ? '100%'
                      : undefined,
                }}
              >
                {(items && items[i]) ?? ''}
              </div>
            </Row>
            {separators?.[i] && <ContainerLine />}
          </ContainerData>
        );
      })}

      {footer && <FooterWrapper>{footer}</FooterWrapper>}
    </Container>
  );
};

const Container = styled('div')<{ spaceEachCards?: number }>(({ theme, spaceEachCards }) => ({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
  background: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  marginBottom: spaceEachCards,
  borderRadius: '12px',
  [theme.breakpoints.down('tablet_768')]: {
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  paddingBottom: 8,
}));

const HeaderWrapper = styled('div')<{ showSubHeader: boolean }>(({ theme, showSubHeader }) => ({
  backgroundColor: !showSubHeader
    ? 'none'
    : theme.palette.isLight
    ? theme.palette.colors.slate[50]
    : theme.palette.colors.charcoal[800],
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  paddingTop: 8,
}));

const FooterWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  borderTop: theme.palette.isLight ? '1px solid #D4D9E1' : '1px solid #405361',
  marginTop: '16px',
  padding: '8px 0 0',
}));

const Row = styled('div')<{ hasIcon?: boolean }>(({ hasIcon = false, theme }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: hasIcon ? 'space-between' : undefined,
  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
}));

const Label = styled('div')<{ height?: string; isTotal: boolean }>(({ isTotal, theme }) => ({
  display: 'flex',
  fontFamily: 'Inter, sans-serif',
  alignItems: 'center',
  color: theme.palette.isLight
    ? isTotal
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.slate[100]
    : isTotal
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.slate[200],
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '24px',
  height: '37px',
  minWidth: 132,
}));

const ContainerLine = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  borderTop: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  marginBottom: 6,
  marginTop: 6,
}));

const ContainerData = styled('div')<{ spacing: CardSpacingSize }>(({ spacing }) => ({
  padding: spacing === 'large' ? '20px 24px 10px' : '0px 24px 0px',

  '& .advanced-table__cell-row--category--comments': {
    padding: 0,
    textAlign: 'end',
    '& div': {
      width: 0,
      height: 0,
    },
  },
}));

const SubHeader = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 8,
  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 16,
  },
}));

const Category = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 8,
  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 16,
  },
}));
