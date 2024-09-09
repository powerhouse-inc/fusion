import { CircularProgress, styled, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';

interface PercentageProgressBarProps {
  value: number;
}

const PercentageProgressBar: React.FC<PercentageProgressBarProps> = ({ value }) => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1024'));
  const size = isDesktop ? 160 : 96;
  const thickness = 11;

  return (
    <BarContainer>
      <CircularBarBase variant="determinate" size={size} thickness={thickness} value={100} />
      <CircularBarProgress variant="determinate" dir="rtl" size={size} thickness={thickness} value={value} />
      <LabelContainer>{Math.round(value)}%</LabelContainer>
    </BarContainer>
  );
};

export default PercentageProgressBar;

const BarContainer = styled('div')(() => ({
  position: 'relative',
  display: 'inline-flex',
}));

const CircularBarBase = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.slate[600],
}));

const CircularBarProgress = styled(CircularProgress)(({ theme }) => ({
  animationDuration: '550ms',
  position: 'absolute',
  left: 0,
  color: theme.palette.isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900],
}));

const LabelContainer = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '120%',
  },
}));
