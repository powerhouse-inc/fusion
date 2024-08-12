import { ForumCategories } from '@/views/Home/components/GovernanceSection/ForumOverview/categories';
import type { NextApiRequest, NextApiResponse } from 'next';

// This endpoint work as a proxy to the MakerDAO Forum Discourse API
// If we fetch the data directly from the client, we get a CORS error
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const id = req.query.id as string;
    const slug = ForumCategories.find((category) => category.id.toString() === id)?.categorySlug;
    if (!slug) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    const response = await fetch(`https://forum.makerdao.com/c/${slug}/${id}/l/latest.json`);
    const data = await response.json();

    // Send the data as a JSON response
    res.status(200).json(data.topic_list.topics);
  } else {
    // Handle other HTTP methods if needed (e.g., POST, PUT, DELETE)
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
