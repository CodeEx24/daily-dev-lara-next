'use client';
import React, { useEffect } from 'react';
import PostCard from './PostCard';
import { useImmer } from 'use-immer';

import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';

import ShowPost from './ShowPost';

import { useToast } from '../ui/use-toast';
import { laraEcho } from '@/lib/echo.config';

export default function Posts({
  data,
  user,
}: {
  data: APIResponseType<PostApiType>;
  user: CustomUser;
}) {
  const { toast } = useToast();

  const [posts, setPosts] = useImmer<APIResponseType<PostApiType>>(data);

  useEffect(() => {
    // const pvtLaraEcho = pvtlaraEcho(user.token!);
    // pvtLaraEcho
    //   .private(`App.Models.User.${user.id}`)
    //   .listen('TestEvent', (event: any) => {
    //     console.log('The private real time data event is', event);
    //   });

    laraEcho
      .channel('post-broadcast')
      .listen('PostBroadCastEvent', (event: any) => {
        // console.log('The public data is ', event);

        const post: PostApiType = event.post;
        // setPosts((prevState) => {
        //   prevState.data = [post, ...prevState.data];
        // });
      })
      .listen('PostCommentCountEvent', (event: any) => {
        // console.log('The comment count increment ', event);

        setPosts((prev) => {
          const index = prev.data.findIndex(
            (item) => item.id === event.post_id
          );

          if (index != -1) {
            prev.data[index].comment_count += 1;
          }
        });
      });

    // * Comment channel

    return () => {
      laraEcho.leave(`post-broadcast`);
    };
  }, []);
  return (
    <div
      className="pt-4 p-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pb-32"
      style={{ height: '90vh' }}
    >
      {posts.data.length > 0 &&
        posts.data.map((item, index) => (
          <ShowPost post={item} key={index}>
            <PostCard post={item} key={index} />
          </ShowPost>
        ))}
    </div>
  );
}
