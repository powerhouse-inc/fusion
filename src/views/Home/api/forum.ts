import { BASE_URL, siteRoutes } from '@/config/routes';

export interface Topic {
  id: number;
  created_at: string;
  title: string;
  tags: string[];
  like_count: number;
  posts_count: number;
  slug: string;
  category_id: number;
  // the api returns other fields, but we don't need them
}

export interface TopicList {
  topic_list: {
    topics: Topic[];
  };
}

export const getForumPosts = async (categoryId: number | string): Promise<Topic[]> => {
  const response = await fetch(BASE_URL + siteRoutes.forumApi(categoryId.toString()));
  return await response.json();
};
