import { API_URL, POST_URL } from '@/lib/apiEndpoints';

export async function fetchPosts(token: string) {
  const res = await fetch(API_URL + POST_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('RESL res ', res);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
