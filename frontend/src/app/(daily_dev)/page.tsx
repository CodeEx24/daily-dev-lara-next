import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Navbar from '@/components/base/Navbar';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1>This is home</h1>
    </>
  );
}
