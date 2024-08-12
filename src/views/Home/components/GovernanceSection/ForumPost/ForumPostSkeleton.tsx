import { styled } from '@mui/material';
import { BaseSkeleton } from '@/components/AccountsSnapshot/components/BaseSkeleton/BaseSkeleton';
import { DescriptionContainer, PostCard, Tags } from './ForumPost';

const ForumPostSkeleton: React.FC = () => (
  <PostCard>
    <DescriptionContainer>
      <TitleSkeleton />
      <Tags>
        <Tag>
          <BaseSkeleton width={12} height={12} variant="circular" />
          <TagName />
        </Tag>
        <Tag>
          <BaseSkeleton width={12} height={12} variant="circular" />
          <TagName width={35} />
        </Tag>
        <Tag>
          <BaseSkeleton width={12} height={12} variant="circular" />
          <TagName width={70} />
        </Tag>
      </Tags>
    </DescriptionContainer>
    <Stats>
      <BaseSkeleton width={'auto'} height={32} />
      <BaseSkeleton width={'auto'} height={32} />
      <BaseSkeleton width={'auto'} height={32} />

      <BaseSkeleton width={40} height={32} />
    </Stats>
  </PostCard>
);

export default ForumPostSkeleton;

const TitleSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 250,
  height: 18,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    width: 350,
    height: 22,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 400,
    height: 24,
  },
}));

const Tag = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const TagName = styled(BaseSkeleton)(({ theme }) => ({
  width: 70,
  height: 18,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 120,
    height: 22,
  },
}));

const Stats = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 8,
  width: '100%',

  '& > span:first-of-type': {
    minWidth: 94,
  },
  '& > span:not(:last-of-type)': {
    flex: '1 0 0',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 32,
    padding: 15,
  },
}));
