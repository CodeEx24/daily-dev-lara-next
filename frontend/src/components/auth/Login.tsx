'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '../ui/tabs';
import { LoginSchema } from '@/schemas';
import myAxios from '@/lib/axios.config';
import { CHECK_CREDENTIALS_URL, LOGIN_URL } from '@/lib/apiEndpoints';
import { useState } from 'react';
import ButtonwLoading from '../ButtonwLoading';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';
import { handleErrorResponse } from '@/lib/handleErrorResponse';
import FormInput from '../base/FormInput';

export default function Login() {
  const [loginLoading, setLoginLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoginLoading(true);
    myAxios
      .post(CHECK_CREDENTIALS_URL, values)
      .then((res) => {
        const response = res.data;
        if (response.status === 200) {
          signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: true,
            callbackUrl: '/',
          });
          toast({
            title: '✅ Logged in successfully',
            description: 'There was a problem with your request.',
          });
        }
      })
      .catch((err) => {
        handleErrorResponse({
          err: err,
          toast: toast,
          form: form,
          description: 'Invalid email or password.',
          variant: 'destructive',
        });
      })
      .finally(() => {
        setLoginLoading(false);
      });
  }

  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormInput
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                type="text"
                classname=""
                form={form}
              />

              <FormInput
                name="password"
                label="Password"
                placeholder="********"
                type="password"
                classname=""
                form={form}
              />
              <ButtonwLoading isLoading={loginLoading} name="Login" />
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
