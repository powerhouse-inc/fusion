import { styled } from '@mui/material';
import { DateTime } from 'luxon';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import BulletIcon from '@/components/FancyTabs/BulletIcon';
import type { Topic } from '@/views/Home/api/forum';
import ForumInfoChip from '../ForumInfoChip/ForumInfoChip';
import { ForumCategories } from '../ForumOverview/categories';

interface ForumPostProps {
  post: Topic;
  isPopular?: boolean;
}

const ForumPost: React.FC<ForumPostProps> = ({ post, isPopular = false }) => {
  const date = DateTime.utc().diff(DateTime.fromISO(post.created_at), 'days').days;
  const category = ForumCategories.find((category) => category.id === post.category_id);

  return (
    <PostCard>
      <DescriptionContainer>
        <Title>{post.title}</Title>
        <Tags>
          {category && (
            <Tag>
              {category.id !== ForumCategories[0].id ? category.icon : <BulletIcon color="red" />} {category.category}
            </Tag>
          )}
          {post.tags.map((tag) => (
            <Tag key={tag}>
              <BulletIcon color="gray" /> {tag}
            </Tag>
          ))}
        </Tags>
      </DescriptionContainer>
      <Stats>
        <ForumInfoChip type="likes" value={post.like_count} popular={isPopular} />
        <ForumInfoChip type="replies" value={post.posts_count - 1} />
        <ForumInfoChip type="date" value={`${Math.floor(date)}d`} />

        <ExternalLinkButton href={`https://forum.makerdao.com/t/${post.slug}/${post.id}`} />
      </Stats>
    </PostCard>
  );
};

export default ForumPost;

export const PostCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 12,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    boxShadow: 'unset',
    flexDirection: 'row',
    borderRadius: 12,
    border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  },
}));

export const DescriptionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 8,
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  padding: 7,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 8,
    border: 'unset',
    minWidth: 340,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '15px 7px',
    minWidth: 510,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: 15,
    minWidth: 702,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 806,
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

export const Tags = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
}));

const Tag = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.colors.gray[600],

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  },
}));

const Stats = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 8,
  width: '100%',

  '& > div:first-of-type': {
    minWidth: 94,
  },
  '& > div': {
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
