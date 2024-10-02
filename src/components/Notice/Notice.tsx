import { styled } from '@mui/material';
import DAICircle from 'public/assets/svg/dai_circle.svg';
import USDSCircle from 'public/assets/svg/usds_circle.svg';

const Notice: React.FC = () => (
  <NoticeContainer>
    <CoinWrapper>
      <USDSCircle />
      <DAICircle />
    </CoinWrapper>
    <Text>All values are aggregated DAI/USDS numbers</Text>
  </NoticeContainer>
);

export default Notice;

const NoticeContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
}));

const CoinWrapper = styled('div')(() => ({
  lineHeight: 0,

  '& svg': {
    width: 20,
    height: 20,
  },

  '& svg:last-of-type': {
    marginLeft: -4,
  },
}));

const Text = styled('span')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.colors.slate[200],
}));
