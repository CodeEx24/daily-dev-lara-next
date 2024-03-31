'use client';
import React, { useState, useEffect } from 'react';
import { Textarea } from '../ui/textarea';
import myAxios from '@/lib/axios.config';
import { COMMENT_URL } from '@/lib/apiEndpoints';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/app/api/auth/[...nextauth]/authOptions';

import UserAvatar from '../common/UserAvatar';
import CommentCard from './CommentCard';
import { useToast } from '../ui/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '../ui/label';
import ButtonwLoading from '../ButtonwLoading';
import { handleErrorResponse } from '@/lib/handleErrorResponse';
import { CommentFormSchema } from '@/schemas';

export default function AddComment({ post_id }: { post_id: number }) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const { data } = useSession();
  const [comments, setComments] = useState<APIResponseType<CommentType>>();
  const customSession = data as CustomSession;

  const commentForm = useForm<z.infer<typeof CommentFormSchema>>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      comment: '',
    },
  });

  // 2. Define a submit handler.
  function onCommentSubmit(values: z.infer<typeof CommentFormSchema>) {
    console.log('VALUES: ', values);

    setLoading(true);
    const payload = {
      comment: values.comment,
      post_id: post_id,
    };
    myAxios
      .post(COMMENT_URL, payload, {
        headers: {
          Authorization: `Bearer ${customSession.user?.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        const response = res.data;
        commentForm.reset();

        toast({
          description: '✅ Commented successfully!',
        });

        setComments((prevState) => {
          if (prevState) {
            if (prevState?.data.length === 0) {
              return {
                ...prevState,
                data: [response.comment],
              };
            } else
              return {
                ...prevState,
                data: [response.comment, ...prevState!.data],
              };
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        handleErrorResponse({
          err: err,
          toast: toast,
          form: commentForm,
          description: 'Invalid email or password.',
          variant: 'destructive',
        });
      });
  }

  // FETCHING COMMENTS
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    myAxios
      .get(`${COMMENT_URL}?post_id=${post_id}`, {
        headers: {
          Authorization: `Bearer ${customSession.user?.token}`,
        },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        toast({
          variant: 'destructive',
          description: 'Something went wrong.while fetching comments',
        });
      });
  };
  return (
    <div>
      <div className="my-4">
        {showBox ? (
          <Form {...commentForm}>
            <form onSubmit={commentForm.handleSubmit(onCommentSubmit)}>
              <FormField
                control={commentForm.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <Label>Your Comment</Label>
                    <FormControl>
                      <Textarea placeholder="Add comments here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mb-2 flex justify-end">
                <ButtonwLoading
                  isLoading={loading}
                  name="Submit Comment"
                  classname="px-4"
                />
              </div>
            </form>
          </Form>
        ) : (
          <div
            className="border rounded-md flex justify-between items-center p-4 cursor-pointer"
            onClick={() => setShowBox(true)}
          >
            <div className="flex space-x-4 items-center">
              <UserAvatar
                image={customSession.user?.profile_image ?? undefined}
              />
              <p className="text-muted-foreground text-sm">
                Share your thoughts
              </p>
            </div>
            <Button variant="outline">Post</Button>
          </div>
        )}
      </div>

      <div className="my-4">
        {comments?.data &&
          comments.data.length > 0 &&
          comments.data.map((item, index) => (
            <CommentCard comment={item} key={index} />
          ))}
      </div>
    </div>
  );
}
