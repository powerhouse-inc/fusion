import { styled } from '@mui/material';
import InfoOutlinedIcon from 'public/assets/svg/info_outlined.svg';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import { formatDateStringToQuarter } from '../../utils';

interface StatsDataProps {
  targetDate: string;
}

const StatsData: React.FC<StatsDataProps> = ({ targetDate }) => (
  <OutlinedCard>
    <Row>
      <Label>
        Target Date
        <SESTooltip content="Target dates are meant as internal project management indicators. They are subject to change without notice and offer no guarantee for the delivery time of the milestone">
          <IconWrapper>
            <InfoOutlinedIcon />
          </IconWrapper>
        </SESTooltip>
      </Label>
      <Value>{formatDateStringToQuarter(targetDate, true)}</Value>
    </Row>
  </OutlinedCard>
);

export default StatsData;

const OutlinedCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 16,
  alignSelf: 'stretch',
  padding: '7px 15px',
  borderRadius: 12,
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
  }`,

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 15,
  },
}));

const Row = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 16,
  lineHeight: 'normal',
}));

const Label = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.gray[600],
}));

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  justifyContent: 'flex-start',
  width: 16,
  height: 16,
  marginLeft: 8,
  alignItems: 'center',
  cursor: 'pointer',

  '& svg': {
    width: 10,
    height: 10,
  },

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },
}));

const Value = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  gap: 4,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 'normal',
  },
}));
