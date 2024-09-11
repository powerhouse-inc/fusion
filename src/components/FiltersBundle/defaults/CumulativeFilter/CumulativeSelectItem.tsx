import { styled, useTheme } from '@mui/material';
import RadioInputSVG from '@ses/components/svg/RadioInputSVG';

type ItemType = 'relative' | 'absolute';

interface CumulativeSelectItemProps {
  type: ItemType;
  selected: boolean;
  onClick: () => void;
}

interface IconProps {
  isLight: boolean;
}

const RelativeIcon: React.FC<IconProps> = ({ isLight }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line
      x1="1.3999"
      y1="15.5858"
      x2="14.1278"
      y2="2.85786"
      stroke={isLight ? '#6F7A85' : '#5B646D'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="4 4"
    />
    <path d="M1 1L0.999999 17" stroke={isLight ? '#343839' : '#FCFCFC'} strokeWidth="2" strokeLinecap="round" />
    <path d="M1 17L17 17" stroke={isLight ? '#343839' : '#FCFCFC'} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AbsoluteIcon: React.FC<IconProps> = ({ isLight }) => (
  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.11719 8.62109L15.2593 4.29165"
      stroke={isLight ? '#6F7A85' : '#5B646D'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="4 4"
    />
    <path
      d="M1 1.39258L0.999999 16.0002"
      stroke={isLight ? '#343839' : '#FCFCFC'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M1 16L17 16" stroke={isLight ? '#343839' : '#FCFCFC'} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CumulativeSelectItem: React.FC<CumulativeSelectItemProps> = ({ type, selected, onClick }) => {
  const theme = useTheme();

  return (
    <Item type={type} onClick={onClick}>
      <Content>
        <Icon>
          {type === 'relative' ? (
            <RelativeIcon isLight={theme.palette.isLight} />
          ) : (
            <AbsoluteIcon isLight={theme.palette.isLight} />
          )}
        </Icon>
        <TextContainer>
          <Title>{type === 'relative' ? 'Relative' : 'Absolute'} Cumulative</Title>
          <Description>
            {type === 'relative'
              ? 'Aggregated expense metrics relative to the start of the year.'
              : 'A continuous aggregation of expenses over the entire dataset.'}
          </Description>
        </TextContainer>
      </Content>
      <CheckIcon>
        <RadioInput checked={selected} />
      </CheckIcon>
    </Item>
  );
};

export default CumulativeSelectItem;

const Item = styled('div')<{ type: ItemType }>(({ theme, type }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  padding: type === 'relative' ? '24px 16px 20px' : '20px 16px 24px',
  gap: 16,

  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#2b303b',
  '&:hover': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : '#292E39',
  },
}));

const Content = styled('div')({
  display: 'flex',
  gap: 8,
});

const Icon = styled('div')({
  width: 16,
  height: 16,
});

const TextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const Title = styled('div')(({ theme }) => ({
  fontSize: 14,
  lineHeight: '22px',
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const Description = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
  fontWeight: 500,
}));

const CheckIcon = styled('div')(() => ({
  width: 16,
  height: 16,
}));

const RadioInput = styled(RadioInputSVG)(({ theme }) => ({
  '& > circle:first-of-type': {
    stroke: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  },

  '& > circle:nth-child(2)': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  },
}));
