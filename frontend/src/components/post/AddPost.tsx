'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Link as LinkIcon } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { isValidUrl } from '@/lib/utils';
import axios from 'axios';
import { Textarea } from '../ui/textarea';
import Image from 'next/image';
import { Button } from '../ui/button';
import { POST_URL } from '@/lib/apiEndpoints';
import myAxios from '@/lib/axios.config';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/app/api/auth/[...nextauth]/authOptions';
import { useToast } from '../ui/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonwLoading from '../ButtonwLoading';
import FormTextArea from '../base/FormTextArea';
import FormInput from '../base/FormInput';
import { handleErrorResponse } from '@/lib/handleErrorResponse';
import { PostFormSchema } from '@/schemas';

export default function AddPost() {
  const { toast } = useToast();

  const { data } = useSession();
  const userSession = data as CustomSession;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image_url, setImage_url] = useState('');

  const postForm = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      title: '',
      url: '',
      description: '',
    },
  });

  const onSubmit = (value: z.infer<typeof PostFormSchema>) => {
    setLoading(true);
    myAxios
      .post(
        POST_URL,
        { ...value, image_url: image_url },
        {
          headers: {
            Authorization: `Bearer ${userSession.user?.token}`,
          },
        }
      )
      .then((res) => {
        setOpen(false);
        toast({
          description: 'Post added successfully',
        });
      })
      .catch((err) => {
        handleErrorResponse({
          err: err,
          toast: toast,
          form: postForm,
          description: 'Something went wrong.please try again!',
          variant: 'destructive',
        });
        // if (err.response?.status == 422) {
        //   setErrors(err.response?.data?.errors);
        // } else {
        //   toast.error('Something went wrong.please try again!');
        // }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadPreview = async (value: string) => {
    console.log('LOADING PREVIEW');
    if (isValidUrl(value)) {
      setLoading(true);
      axios
        .post('/api/image-preview', { url: value })
        .then(async (res) => {
          setLoading(false);
          const response: ImagePreviewResType = res.data?.data;
          const img = response.images.length
            ? response.images[0]
            : 'https://ei7sbsqceej.exactdn.com/wp-content/uploads/2023/01/Property-Does-Not-Exist-on-Type-Step-by-Step-Solution-Guide.jpg';

          setImage_url(img);
        })
        .catch((err) => {
          setLoading(false);
          //   toast.error('Something went wrong while fetching data from url!');
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="flex space-x-3 items-center mb-4 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <LinkIcon className="w-5 h-5" />
          <p>Submit article</p>
        </div>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="overflow-y-auto max-h-screen"
      >
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
        </DialogHeader>
        <Form {...postForm}>
          <form
            onSubmit={postForm.handleSubmit(onSubmit)}
            className="space-y-2"
          >
            {image_url && (
              <Image
                src={image_url}
                width={400}
                height={300}
                className="object-contain w-full rounded-xl my-2"
                alt="preview_img"
              />
            )}
            <FormField
              control={postForm.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <Label>Link</Label>
                  <FormControl>
                    <Input
                      placeholder="Enter your link"
                      type="text"
                      {...field}
                      onBlur={(e) => {
                        field.onBlur(); // Triggering field's onChange
                        // Additional code to handle change events for the 'url' field
                        loadPreview(
                          e.target.value
                            ? e.target.value
                            : 'https://www.youtube.com/watch?v=erLbbextvlY'
                        );
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormInput
              name="title"
              label="Title"
              placeholder="Enter the article title"
              type="text"
              classname=""
              form={postForm}
            />

            <FormTextArea
              name="description"
              label="Description"
              placeholder="Enter the article description"
              classname="h-40"
              form={postForm}
            />

            <ButtonwLoading isLoading={loading} name="Submit" />
          </form>
        </Form>

        {/* <form onSubmit={handleSubmit}>
          {postState.image_url && (
            <Image
              src={postState?.image_url}
              width={400}
              height={300}
              className="object-contain w-full rounded-xl my-2"
              alt="preview_img"
            />
          )}
          <div className="mb-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              type="url"
              placeholder="Enter your link"
              value={postState.url}
              onChange={(e) =>
                setPostState({ ...postState, url: e.target.value })
              }
              onBlur={() => loadPreview()}
            />
            <span className="text-xs text-yellow-400">
              Make sure you put correct URL
            </span>
            <div>
              <span className="text-red-400">{errors.url?.[0]}</span>
            </div>
          </div>
          <div className="mb-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your title.."
              value={postState.title}
              onChange={(e) =>
                setPostState({ ...postState, title: e.target.value })
              }
            />
            <span className="text-red-400">{errors.title?.[0]}</span>
          </div>
          <div className="mb-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter your description.."
              value={postState.description}
              rows={10}
              onChange={(e) =>
                setPostState({ ...postState, description: e.target.value })
              }
            />
            <span className="text-red-400">{errors.description?.[0]}</span>
          </div>
          <div className="mb-2">
            <Button className="w-full" disabled={loading}>
              {loading ? 'Processing..' : 'Submit'}
            </Button>
          </div>
        </form> */}
      </DialogContent>
    </Dialog>
  );
}
