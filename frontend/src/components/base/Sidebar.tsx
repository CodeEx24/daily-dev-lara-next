import Link from 'next/link';
import UserAvatar from '../common/UserAvatar';
import { ArrowBigUp, Flame, LinkIcon, Search } from 'lucide-react';
import SidebarLinks from './SidebarLinks';
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';

export default function Sidebar() {
  return (
    <div className="hidden lg:block w-[260px] border-r p-4 h-full">
      <SidebarLinks />
    </div>
  );
}
