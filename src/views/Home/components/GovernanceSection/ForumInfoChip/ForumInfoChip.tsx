import { styled } from '@mui/material';
import Clock from 'public/assets/svg/clock.svg';
import Comments from 'public/assets/svg/comments.svg';
import Fire from 'public/assets/svg/fire.svg';
import ThumbsUp from 'public/assets/svg/thumbs_up.svg';

interface ForumInfoChipProps {
  value: string | number;
  type: 'likes' | 'replies' | 'date';
  popular?: boolean;
}

const ForumInfoChip: React.FC<ForumInfoChipProps> = ({ value, type, popular = false }) => (
  <Chip>
    <IconContainer>
      {type === 'likes' && <ThumbsUp width={16} height={16} />}
      {type === 'replies' && <Comments width={16} height={16} />}
      {type === 'date' && <Clock width={16} height={16} />}
    </IconContainer>
    <ValueContainer>
      {value} {popular && <Fire width={16} height={16} />}
    </ValueContainer>
  </Chip>
);

export default ForumInfoChip;

const Chip = styled('div')(({ theme }) => ({
  display: 'flex',
  alignSelf: 'center',
  gap: 4,
  overflow: 'hidden',
  borderRadius: 8,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
}));

const IconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 7,
  background: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800],
  lineHeight: 0,

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.charcoal[300],
  },
}));

const ValueContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '4px 7px 4px 0',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  '& path': {
    fill: theme.palette.colors.red[900],
  },
}));
