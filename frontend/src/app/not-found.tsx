import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <Image
        src="/404.svg"
        alt="404"
        width={500}
        height={500}
        className="object-contain"
      />

      <Link href={'/'}>Back to Home</Link>
    </div>
  );
}
