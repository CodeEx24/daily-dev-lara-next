import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { ArrowBigUp, Link as LinkIcon, MessageSquare } from 'lucide-react';
import { formatDate, trimString } from '@/lib/utils';

import UserAvatar from '../common/UserAvatar';
import { useToast } from '../ui/use-toast';

export default function PostCard({ post }: { post: PostApiType }) {
  const { toast } = useToast();

  const copyUrl = () => {
    navigator.clipboard.writeText(post.url!);
    toast({
      description: 'Link copied successfully!',
    });
  };
  return (
    <div>
      <Card className="w-full md:w-[330px] md:h-[450px] bg-muted">
        <CardHeader>
          <UserAvatar image={post.user.profile_image} />
          <CardTitle className="text-2xl font-bold line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-1">
          <p className="text-sm mb-2 px-4">{formatDate(post.created_at)}</p>
          <figure className="px-4">
            <Image
              src={post.image_url}
              width={250}
              height={250}
              className="w-full h-40 object-cover rounded-lg"
              alt="post_img"
            />
          </figure>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <ArrowBigUp size={25} />
          <div className="flex space-x-2 items-center">
            <MessageSquare size={20} />
            {post.comment_count > 0 && <span>{post.comment_count}</span>}
          </div>

          <LinkIcon size={20} onClick={copyUrl} className="cursor-pointer" />
        </CardFooter>
      </Card>
    </div>
  );
}
