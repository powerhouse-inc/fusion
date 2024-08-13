import { styled } from '@mui/material';
import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import Card from '@/components/Card/Card';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import FancyTabs from '@/components/FancyTabs/FancyTabs';
import ShadowWrapper from '@/components/FancyTabs/ShadowWrapper';
import type { Topic } from '@/views/Home/api/forum';
import { getForumPosts } from '@/views/Home/api/forum';
import ForumPost from '../ForumPost/ForumPost';
import ForumPostSkeleton from '../ForumPost/ForumPostSkeleton';
import { ForumCategories } from './categories';

const ForumOverview = () => {
  const [activeTab, setActiveTab] = useState<string>(ForumCategories[0].id.toString());
  const { isLoading, data } = useSWRImmutable<Topic[]>(['forum', activeTab], ([, id]) => getForumPosts(id as string));

  const posts = data?.slice(0, 5);
  const biggerLikes = posts?.reduce((acc, post) => (post.like_count > acc ? post.like_count : acc), 0);

  return (
    <ShadowWrapper>
      <FancyTabs
        tabs={ForumCategories.map((category) => ({
          id: category.id.toString(),
          title: category.tabLabel,
          icon: category.icon,
        }))}
        activeTab={activeTab}
        onTabChange={(tab: string) => setActiveTab(tab)}
      />
      <ForumCard>
        <HeaderTop>
          <Text>
            <span>Sky Forum:</span> Decision-making frameworks, including proposal discussions, voting mechanisms, and
            policy updates.
          </Text>
          <ExternalLinkButton href="https://forum.makerdao.com/">Go to Forum</ExternalLinkButton>
        </HeaderTop>

        <PostList>
          {isLoading && (
            <>
              <ForumPostSkeleton />
              <ForumPostSkeleton />
              <ForumPostSkeleton />
              <ForumPostSkeleton />
              <ForumPostSkeleton />
            </>
          )}
          {posts?.map((post) => (
            <ForumPost key={post.id} post={post} isPopular={!!biggerLikes && post.like_count === biggerLikes} />
          ))}
        </PostList>
      </ForumCard>
    </ShadowWrapper>
  );
};

export default ForumOverview;

const ForumCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  overflow: 'hidden',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,

  [theme.breakpoints.up('tablet_768')]: {
    borderTopRightRadius: 12,
  },
}));

const HeaderTop = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '8px 16px',
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& a': {
      whiteSpace: 'nowrap',
      height: 'fit-content',
    },
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
}));

const Text = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  '& span': {
    color: theme.palette.colors.gray[600],
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
  },
}));

const PostList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 8,
}));
