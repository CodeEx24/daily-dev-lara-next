import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

export default function UserAvatar({
  image = '',
  alt = 'Image',
  width = 40,
  height = 40,
}: {
  image?: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div>
      {image ? (
        <Image
          src={getImageUrl(image)}
          width={width}
          height={height}
          alt={alt}
        />
      ) : (
        <Image src="/avatar.png" width={width} height={height} alt={alt} />
      )}
    </div>
  );
}
