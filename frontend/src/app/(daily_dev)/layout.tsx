import Navbar from '@/components/base/Navbar';
import Sidebar from '@/components/base/Sidebar';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import {
  CustomSession,
  authOptions,
} from '../api/auth/[...nextauth]/authOptions';

export const metadata: Metadata = {
  title: 'Daily Dev || Enhance Development Through Insightful Articles',
  description: 'Daily Dev || Enhance Development Through Insightful Articles',
};

export default async function DailyDevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-y-hidden">
      <Navbar />
      <div className="flex ">
        <Sidebar />
        <div className="flex justify-center items-center overflow-y-scroll w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
