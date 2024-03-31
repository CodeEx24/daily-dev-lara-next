'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserAvatar from '../common/UserAvatar';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
  FormLabel,
} from '../ui/form';

import { useState } from 'react';
import { Button } from '../ui/button';
import myAxios from '@/lib/axios.config';
import { LOGOUT_URL, UPDATE_PROFILE_URL } from '@/lib/apiEndpoints';
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';
import { useToast } from '../ui/use-toast';
import { signOut, useSession } from 'next-auth/react';

import { ProfileUpdateSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import ButtonwLoading from '../ButtonwLoading';
import { handleErrorResponse } from '@/lib/handleErrorResponse';

export default function ProfileMenu() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data, update } = useSession();
  const session = data?.user as CustomUser;

  const { toast } = useToast();

  const logoutUser = async () => {
    myAxios
      .post(
        LOGOUT_URL,
        {},
        { headers: { Authorization: `Bearer ${session.token}` } }
      )
      .then((res) => {
        signOut({
          callbackUrl: '/login',
          redirect: true,
        });
      })
      .catch((err) => {
        toast({
          variant: 'destructive',
          description: 'Something went wrong. Please try again',
        });
      });
  };

  // PROFILE FORMS
  const [isLoading, setIsLoading] = useState(false);
  const profileForm = useForm<z.infer<typeof ProfileUpdateSchema>>({
    resolver: zodResolver(ProfileUpdateSchema),
  });
  const fileRef = profileForm.register('profile');

  function onSubmit(values: z.infer<typeof ProfileUpdateSchema>) {
    const formData = new FormData();
    formData.append('profile_image', values.profile[0]);

    setIsLoading(true);
    myAxios
      .post(UPDATE_PROFILE_URL, formData, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      })
      .then((res) => {
        const response = res.data;
        update({ profile_image: response.image });
        toast({
          description: 'Profile image updated successfully!',
        });
        setProfileOpen(false);
      })
      .catch((err) => {
        handleErrorResponse({
          err: err,
          toast: toast,
          form: profileForm,
          description: 'Some Desc',
          variant: 'destructive',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action expire your current session and to access home page
              you have to login again.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4">
            <Button variant="destructive" onClick={logoutUser}>
              Yes, Logout!
            </Button>

            <Button onClick={() => setLogoutOpen(false)}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile update dialog */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onSubmit)}
              className="space-y-2"
            >
              <div className="mb-2">
                <FormField
                  control={profileForm.control}
                  name="profile"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            id="profile"
                            placeholder="shadcn"
                            className="file:text-white"
                            {...fileRef}
                            onChange={(event) => {
                              field.onChange(
                                event.target?.files?.[0] ?? undefined
                              );

                              console.log(
                                'THIS IS WHAT HE SET: ',
                                event.target?.files?.[0]
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex justify-end gap-4">
                <ButtonwLoading isLoading={isLoading} name="Update Profile" />

                <Button
                  type="reset"
                  variant={'destructive'}
                  onClick={() => setProfileOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar image={session?.profile_image ?? undefined} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 mt-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setProfileOpen(true)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
