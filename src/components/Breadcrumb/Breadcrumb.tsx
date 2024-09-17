import { styled } from '@mui/material';
import Link from 'next/link';
import AngleRight from 'public/assets/svg/angle_right.svg';
import { useEffect, useId, useMemo, useState } from 'react';
import Container from '@/components/Container/Container';
import DotsSegment from './DotsSegment';

export interface BreadcrumbItem {
  label: string;
  href: string;
  number?: number;
}

interface BreadcrumbItemExtended extends BreadcrumbItem {
  labelWidth: number;
  recommendedWidth: number;
  attachedItems?: BreadcrumbItem[];
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  rightContent?: React.ReactElement;
  withMenusOpened?: boolean; // to manage the menu in the stories
  maxSegmentWidthMobile?: number;
  className?: string;
}

const MAX_ALLOWED_WIDTH = 250;
const MAX_SEGMENT_WIDTH_MOBILE_DEFAULT = 100;
const THREE_DOTS_WIDTH = 60;

const getTextWidth = (text: string, font: string) => {
  // Create a canvas element (this can be done in memory, it doesn't need to be in the DOM)
  if (typeof document === 'undefined') return 0; // it's probably SSR
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) return 0; // Context is null if canvas is not supported

  // Set the font style to match the text style
  context.font = font;

  // Measure the text
  const metrics = context.measureText(text);
  return metrics.width;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  rightContent,
  withMenusOpened = false,
  className,
  maxSegmentWidthMobile = MAX_SEGMENT_WIDTH_MOBILE_DEFAULT,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const contentId = useId();
  const rightPartId = useId();

  useEffect(() => {
    // trigger a re-render to calculate the segments width avoiding undefined document issues
    setMounted(true);
  }, []);

  // adjust the segments width based on the content and right part width
  const [elementWidths, setElementWidths] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const contentElement = document.getElementById(contentId);
    const rightPartElement = document.getElementById(rightPartId);

    // update elementWidths when the window is resized to correctly calculate the segments width
    const getWidths = () => {
      if (contentElement && rightPartElement) {
        setElementWidths([contentElement.offsetWidth, rightPartElement.offsetWidth]);
      }
    };

    // observe the elements to get the width
    const contentObserver = new ResizeObserver(getWidths);
    const rightPartObserver = new ResizeObserver(getWidths);

    if (contentElement && rightPartElement) {
      contentObserver.observe(contentElement);
      rightPartObserver.observe(rightPartElement);
    }

    // Initial width calculation
    getWidths();

    return () => {
      // remove the observers when the component is unmounted
      contentObserver.disconnect();
      rightPartObserver.disconnect();
    };
  }, [contentId, rightPartId]);

  const itemsExtended = useMemo(() => {
    // add labelWidth to each item to display the items properly
    const itemsExtended = items.map((item, index) => {
      const labelWidth = !mounted
        ? MAX_ALLOWED_WIDTH
        : getTextWidth(item.label, `${index === items.length - 1 ? 400 : 600} 16px Inter`) +
          (!Number.isNaN(item.number) ? getTextWidth(`(${item.number})`, '600 16px Inter') + 12 : 0) +
          28; // 28 is the width of the angle right icon + 4px gap,

      return {
        ...item,
        labelWidth,
        recommendedWidth: Math.min(labelWidth, MAX_ALLOWED_WIDTH),
      } as BreadcrumbItemExtended;
    });

    return itemsExtended;
  }, [items, mounted]);

  const groupedItems = useMemo(() => {
    if (itemsExtended.length <= 3) {
      return itemsExtended;
    }
    return [
      itemsExtended[0],
      {
        label: '...',
        href: '',
        labelWidth: 0,
        recommendedWidth: THREE_DOTS_WIDTH,
        attachedItems: itemsExtended.slice(1, itemsExtended.length - 2),
      },
      ...itemsExtended.slice(-2),
    ];
  }, [itemsExtended]);

  const separator = <AngleRight width={24} height={24} />;
  const mobileRecommendedSegmentWidth = mounted
    ? Math.max(10, (elementWidths[0] ?? 0) - (elementWidths[1] ?? 0) - 64 - 16)
    : undefined;

  return (
    <Wrapper className={className}>
      <BreadcrumbCard>
        <Container>
          <Content id={contentId}>
            <MobileAndTablet>
              {itemsExtended.length > 1 && (
                <Segment>
                  <DotsSegment items={items} defaultOpen={withMenusOpened} />
                  {separator}
                </Segment>
              )}

              <Segment maxWidth={mobileRecommendedSegmentWidth} maxSegmentWidthMobile={maxSegmentWidthMobile}>
                <EllipseSegment>{itemsExtended?.[itemsExtended.length - 1]?.label}</EllipseSegment>
              </Segment>
            </MobileAndTablet>
            <Desktop>
              {groupedItems.map((item, index) => (
                <Segment key={item.label} maxWidth={item.recommendedWidth}>
                  {index !== groupedItems.length - 1 ? (
                    item.label === '...' ? (
                      <>
                        <DotsSegment items={item.attachedItems ?? []} defaultOpen={withMenusOpened} />
                        {separator}
                      </>
                    ) : (
                      <>
                        <Link href={item.href}>
                          <EllipseSegment>{item.label}</EllipseSegment>
                          {item.number !== undefined && item.number !== null ? <b>({item.number})</b> : null}
                        </Link>{' '}
                        {separator}
                      </>
                    )
                  ) : (
                    <EllipseSegment>{item.label}</EllipseSegment>
                  )}
                </Segment>
              ))}
            </Desktop>

            <RightContentContainer id={rightPartId}>{rightContent}</RightContentContainer>
          </Content>
        </Container>
      </BreadcrumbCard>
    </Wrapper>
  );
};

export default Breadcrumb;

const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  top: 64,
  zIndex: 1000,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : '#1B1E24',

  [theme.breakpoints.up('tablet_768')]: {
    top: 98,
  },
}));

const BreadcrumbCard = styled('div')(({ theme }) => ({
  width: 'calc(100% - 32px)',

  [theme.breakpoints.down('tablet_768')]: {
    borderRadius: 12,
    background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900],
    margin: '0 16px',
  },

  [theme.breakpoints.up('tablet_768')]: {
    width: '100%',
    background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(25, 29, 36, 1)',
    borderBottom: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[900]
    }`,
  },
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  justifyContent: 'space-between',
  padding: '8px 0',

  [theme.breakpoints.down('tablet_768')]: {
    // recover 8px form container padding on mobile
    margin: '0 -8px',
  },
}));

const SegmentsContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  width: '100%',
}));

const MobileAndTablet = styled(SegmentsContainer)(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const Desktop = styled(SegmentsContainer)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
}));

const Segment = styled('div', {
  shouldForwardProp: (prop) => !['maxWidth', 'maxSegmentWidthMobile'].includes(prop as string),
})<{ maxWidth?: number; maxSegmentWidthMobile?: number }>(({ theme, maxWidth, maxSegmentWidthMobile }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.charcoal[100],
  maxWidth: maxWidth || maxSegmentWidthMobile || MAX_SEGMENT_WIDTH_MOBILE_DEFAULT,

  '& a': {
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300],
    textDecoration: 'none',
    fontWeight: 400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  '& b': {
    fontWeight: 600,
    lineHeight: '21px',
    marginLeft: 4,
  },

  '& svg': {
    minWidth: 24,
  },

  '&:hover': {
    a: {
      color: theme.palette.colors.slate[200],
    },

    b: {
      color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },

    'svg path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[300] : theme.palette.colors.slate[200],
    },
  },
}));

const EllipseSegment = styled('span')(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const RightContentContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));
