'use client';
import { ArrowBigUp, Flame, LinkIcon, Menu, Search } from 'lucide-react';
import Link from 'next/link';
import UserAvatar from '../common/UserAvatar';
import { useSession } from 'next-auth/react';
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';
import AddPost from '../post/AddPost';

export default function SidebarLinks() {
  const { data } = useSession();
  const user = data?.user as CustomUser;
  return (
    <>
      <Link href="/" className="flex gap-4 items-center">
        <UserAvatar image={user?.profile_image ?? undefined} /> <p>Feed</p>
      </Link>
      <p className="my-2 font-bold text-muted-foreground">Discover</p>
      <ul>
        <li>
          <Link href="/popular" className="flex gap-3 items-center mb-4">
            <Flame className="w-5 h-5" />
            <p>Popular</p>
          </Link>
        </li>
        <li>
          <Link href="/search" className="flex gap-3 items-center mb-4">
            <Search className="w-5 h-5" />
            <p>Popular</p>
          </Link>
        </li>
        <li>
          <Link href="/most-voted" className="flex gap-3 items-center mb-4">
            <ArrowBigUp className="w-5 h-5" />
            <p>Most Voted</p>
          </Link>
        </li>
      </ul>
      <p className="my-2 font-bold text-muted-foreground">Contributed</p>
      <ul>
        <li>
          <AddPost />
        </li>
      </ul>
    </>
  );
}
