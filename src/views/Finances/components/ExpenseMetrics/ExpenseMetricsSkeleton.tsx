import { Skeleton, styled, useMediaQuery, useTheme } from '@mui/material';
import { Fragment } from 'react';
import type { Theme } from '@mui/material';
import type { FC } from 'react';

const MakerDAOExpenseMetricsSkeleton: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isDesktop1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const fill = theme.palette.isLight ? '#fff' : '#000';
  const stroke = theme.palette.isLight ? '#D1DEE6' : '#546978';

  const yAxisLabelHeight = isMobile ? 8.75 : 12.25;

  return (
    <SectionContainer>
      <LinesContainer>
        {!isDesktop1024 ? (
          <svg viewBox="0 0 630 295" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.99952 194L61.9995 200.5L116 179.5L170 183.125L224 174L278 158L332 183.125L386 175L440 183L494 177L548 165.5L602 139"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="194" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="62" cy="200" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="116" cy="179" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="170" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="224" cy="174" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="278" cy="158" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="332" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="386" cy="175" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="440" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="494" cy="177" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="548" cy="165" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="601.734" cy="138" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99953 154L61.9995 170.5L116 119.5L170 133.125L224 93.9998L278 128L332 113.125L386 94.9998L440 133L494 147L548 145.5L602 79"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="153" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="62" cy="170" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="116" cy="119" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="170" cy="133" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="224" cy="94" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="278" cy="127" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="332" cy="113" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="386" cy="95" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="440" cy="132" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="494" cy="147" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="548" cy="145" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="601.734" cy="79" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99953 174L61.9995 140.5L116 99.4999L170 93.1249L224 54L278 57.9999L332 93.1249L386 75L440 153L494 107L548 85.5L602 59.0001"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="174" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="62" cy="140" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="116" cy="99" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="170" cy="92" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="224" cy="54" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="278" cy="58" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="332" cy="92" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="386" cy="75" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="440" cy="152" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="494" cy="107" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="548" cy="85" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="601.734" cy="59" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99952 63.9996L61.9995 70.4998L116 49.4997L170 53.1248L224 43.9998L278 27.9998L332 53.1248L386 44.9998L440 52.9998L494 46.9998L548 35.4998L602 8.99998"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="64" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="62" cy="70" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="116" cy="49" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="170" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="224" cy="44" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="278" cy="28" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="332" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="386" cy="45" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="440" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="494" cy="47" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="548" cy="35" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="601.734" cy="8" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M8.00378 286.5L62.0038 276L116.004 280.5L170.004 272L224.004 253.5L278.004 264L332.004 255L386.004 249L440.004 228.5L494.004 240L548.004 231L602.004 235.5"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="170" cy="272" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="224" cy="253" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="278" cy="264" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="332" cy="255" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="386" cy="249" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="440" cy="228" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="494" cy="240" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="548" cy="231" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="602" cy="235" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="8" cy="287" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="62" cy="276" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="116" cy="281" r="4.5" fill={fill} stroke={stroke} />
          </svg>
        ) : (
          <svg viewBox="0 0 668 295" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.99952 194L59.9995 200.5L118 179.5L176 183.125L234 174L292 158L350 183.125L408 175L466 183L524 177L582 165.5L640 139"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="194" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="60" cy="200" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="118" cy="179" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="176" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="234" cy="174" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="292" cy="158" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="350" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="175" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="466" cy="183" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="524" cy="177" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="582" cy="165" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="639.734" cy="138" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99953 154L59.9995 170.5L118 119.5L176 133.125L234 93.9998L292 128L350 113.125L408 94.9998L466 133L524 147L582 145.5L640 79"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="153" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="60" cy="170" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="118" cy="119" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="176" cy="133" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="234" cy="94" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="292" cy="127" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="350" cy="113" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="95" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="466" cy="132" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="524" cy="147" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="582" cy="145" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="639.734" cy="79" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99953 174L59.9995 140.5L118 99.4999L176 93.1249L234 54L292 57.9999L350 93.1249L408 75L466 153L524 107L582 85.5L640 59.0001"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="174" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="60" cy="140" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="118" cy="99" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="176" cy="92" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="234" cy="54" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="292" cy="58" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="350" cy="92" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="75" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="466" cy="152" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="524" cy="107" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="582" cy="85" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="639.734" cy="59" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M7.99952 63.9996L59.9995 70.4998L118 49.4997L176 53.1248L234 43.9998L292 27.9998L350 53.1248L408 44.9998L466 52.9998L524 46.9998L582 35.4998L640 8.99997"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="8" cy="64" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="60" cy="70" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="118" cy="49" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="176" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="234" cy="44" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="292" cy="28" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="350" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="45" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="466" cy="53" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="524" cy="47" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="582" cy="35" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="639.734" cy="8" r="4.5" fill={fill} stroke={stroke} />
            <path
              d="M8.00385 286.5L60.0038 276L118.004 280.5L176.004 272L234.004 253.5L292.004 264L350.004 255L408.004 249L466.004 228.5L524.004 240L582.004 231L640.004 235.5"
              stroke={stroke}
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="176" cy="272" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="234" cy="253" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="292" cy="264" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="350" cy="255" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="408" cy="249" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="466" cy="228" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="524" cy="240" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="582" cy="231" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="640" cy="235" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="8" cy="287" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="60" cy="276" r="4.5" fill={fill} stroke={stroke} />
            <circle cx="118" cy="281" r="4.5" fill={fill} stroke={stroke} />
          </svg>
        )}
      </LinesContainer>
      <ChartCanvas>
        {Array.from({ length: 4 }).map((_, index) => (
          <Fragment key={`HorizontalLineWrapper-${index}`}>
            <HorizontalLineContainer>
              <YAxisLabel>
                <Skeleton variant="rounded" width={isMobile ? 16 : 23} height={yAxisLabelHeight} />
              </YAxisLabel>
              <YLine />
            </HorizontalLineContainer>
            <HorizontalLineContainer>
              <YAxisLabel>
                <Skeleton variant="rounded" width={isMobile ? 25 : 36} height={yAxisLabelHeight} />
              </YAxisLabel>
              <YLine />
            </HorizontalLineContainer>
          </Fragment>
        ))}
        <HorizontalLineContainer>
          <YAxisLabel>
            <Skeleton variant="rounded" width={isMobile ? 16 : 23} height={yAxisLabelHeight} />
          </YAxisLabel>
          <YLine />
        </HorizontalLineContainer>
      </ChartCanvas>
      <XAxisContainer>
        {[5, 6, 9, 7, 9, 5, 5, 7, 6, 7, 7, 7].map((width, index) => (
          <XAxisLabel key={`XAxisLabel-${index}`}>
            <Skeleton variant="rounded" width={width} height={isMobile ? 8 : 12} />
          </XAxisLabel>
        ))}
      </XAxisContainer>
      <YearXAxis>
        <YearBox>
          <Skeleton variant="rounded" width={28} height={13} />
        </YearBox>
      </YearXAxis>
      <LabelsContainer>
        {(isMobile ? [41, 50, 43, 128, 129] : [37, 33, 52, 154, 225]).map((width, index) => (
          <Label key={`LegendLabel-${index}`}>
            <Skeleton variant="circular" width={isMobile ? 12 : 16} height={isMobile ? 12 : 16} />
            <Skeleton variant="rounded" width={width} height={isMobile ? 10.5 : 14} />
          </Label>
        ))}
      </LabelsContainer>
    </SectionContainer>
  );
};

export default MakerDAOExpenseMetricsSkeleton;

const SectionContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  marginTop: 16,

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 'calc(100% - 287px)',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 'calc(100% - 386px)',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 765,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 840,
  },
}));

const LinesContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 0,
  maxWidth: 'calc(100% - 40px)',
  width: '100%',

  '& > svg': {
    width: '100%',
    height: 180,
  },

  [theme.breakpoints.up('tablet_768')]: {
    maxWidth: 'calc(100% - 70px)',

    '& > svg': {
      height: 251,
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    '& > svg': {
      height: 253,
    },
  },
  [theme.breakpoints.up('desktop_1280')]: {
    maxWidth: 'calc(100% - 75px)',
  },
}));

const ChartCanvas = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 17.3,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 23,
  },
}));

const HorizontalLineContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 7,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
}));

const YAxisLabel = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: 29,
  minWidth: 29,
  marginTop: -1.69,

  [theme.breakpoints.up('tablet_768')]: {
    width: 48,
    minWidth: 48,
  },
}));

const YLine = styled('div')(({ theme }) => ({
  width: '100%',
  height: 1,
  background: theme.palette.isLight ? '#ECF1F3' : '#1E2C37',
}));

const XAxisContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 4,
  marginLeft: 36,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 12,
    marginLeft: 64,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: 56,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 63.5,
  },
}));

const XAxisLabel = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: 16,

  [theme.breakpoints.up('tablet_768')]: {
    width: 26,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    width: 38,
  },
}));

const YearXAxis = styled('div')(({ theme }) => {
  const border = `1px solid ${theme.palette.isLight ? '#D1DEE6' : '#1E2C37'}`;

  return {
    position: 'relative',
    marginTop: 8,
    marginLeft: 36,
    minHeight: 11,
    borderLeft: border,
    borderRight: border,
    borderBottom: border,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,

    [theme.breakpoints.up('tablet_768')]: {
      display: 'none',
    },
  };
});

const YearBox = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 4,
  left: 'calc(50% - 26px)',
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto',
  width: 52,
  background: theme.palette.isLight ? '#fff' : '#000',
}));

const LabelsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '20px 24px',
  marginTop: 32,

  [theme.breakpoints.up('tablet_768')]: {
    position: 'absolute',
    top: 0,
    left: 'calc(100% + (100vw - 100% - 96px) / 2 - 118px)',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 60,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 62,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    left: 846,
    marginTop: 60,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    left: 942,
  },
}));

const Label = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
}));
