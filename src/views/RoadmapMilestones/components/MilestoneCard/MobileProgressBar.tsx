import { CircularProgress, circularProgressClasses, styled } from '@mui/material';
import { usLocalizedNumber } from '@/core/utils/humanization';

interface MobileProgressBarProps {
  value: number;
}

const MobileProgressBar: React.FC<MobileProgressBarProps> = ({ value }) => (
  <BarContainer>
    <CircularBarBase variant="determinate" size={56} thickness={6} value={100} />
    <CircularBarProgress variant="determinate" dir="rtl" size={56} thickness={6} value={value} />
    <LabelContainer>{usLocalizedNumber(value, 0)}%</LabelContainer>
  </BarContainer>
);

export default MobileProgressBar;

const BarContainer = styled('div')(() => ({
  position: 'relative',
  display: 'inline-flex',
}));

const CircularBarBase = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.isLight ? '#ECF1F3' : '#31424E',
}));

const CircularBarProgress = styled(CircularProgress)(({ theme }) => ({
  animationDuration: '550ms',
  position: 'absolute',
  left: 0,
  color: theme.palette.isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900],

  [`& .${circularProgressClasses.circle}`]: {
    strokeLinecap: 'round',
  },
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
  color: theme.palette.isLight ? '#405361' : '#D2D4EF',
  fontWeight: 700,
  fontSize: 12,
}));
