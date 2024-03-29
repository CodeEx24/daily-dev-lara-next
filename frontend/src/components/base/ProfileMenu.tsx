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
import { useState } from 'react';
import { Button } from '../ui/button';
import myAxios from '@/lib/axios.config';
import { LOGOUT_URL } from '@/lib/apiEndpoints';
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';
import { useToast } from '../ui/use-toast';
import { signOut } from 'next-auth/react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { ProfileUpdateSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from '../ui/form';

export default function ProfileMenu({ user }: { user: CustomUser }) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { toast } = useToast();
  const logoutUser = async () => {
    myAxios
      .post(
        LOGOUT_URL,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
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

  const profileForm = useForm<z.infer<typeof ProfileUpdateSchema>>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      profile: '',
    },
  });
  function onSubmit(values: z.infer<typeof ProfileUpdateSchema>) {
    console.log('ACCEPTED: ', values.profile);
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
                  render={({ field }) => (
                    <FormItem>
                      <Label>Your Profile</Label>
                      <FormControl>
                        <Input
                          placeholder="Profile Image"
                          className="file:text-white"
                          type="file"
                          autoComplete="off"
                          accept="image/png,image/svg,image/jpeg,image/jpg,image/gif,image/webp"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button type="submit" className="">
                  Update Profile
                </Button>{' '}
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
          <UserAvatar />
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
