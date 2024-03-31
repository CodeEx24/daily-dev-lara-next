import Image from 'next/image';
import React from 'react';
import { Input } from '../ui/input';
import { BellIcon, Search } from 'lucide-react';
import { Button } from '../ui/button';
import UserAvatar from '../common/UserAvatar';
import SearchInput from './SearchInput';
import ProfileMenu from './ProfileMenu';
import MobileSidebar from './MobileSidebar';
import { getServerSession } from 'next-auth';
import {
  CustomSession,
  CustomUser,
  authOptions,
} from '@/app/api/auth/[...nextauth]/authOptions';

export default async function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2 px-6 border-b">
      <MobileSidebar />
      <Image src="/logo.svg" width={120} height={120} alt="logo" />
      <SearchInput />
      <div className="flex space-x-3">
        <Button size="icon" variant="secondary">
          <BellIcon className="w-5 h-5" />
        </Button>
        <ProfileMenu />
      </div>
    </nav>
  );
}
