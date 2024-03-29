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
import { AnySchema, RegisterSchema } from '@/schemas';
import FormInput from './FormInput';
import myAxios from '@/lib/axios.config';
import { REGISTER_URL } from '@/lib/apiEndpoints';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import ButtonwLoading from '../ButtonwLoading';
import { signIn } from 'next-auth/react';

export default function Register() {
  const [registerLoading, setRegisterLoading] = useState(false);
  const { toast } = useToast();

  const registerForm = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      name: '',
      password_confirmation: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmitRegister(values: z.infer<typeof RegisterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('VALUES SUBMIT: ', values);
    console.log(registerForm);
    setRegisterLoading(true);
    myAxios
      .post(REGISTER_URL, values)
      .then((res) => {
        const response = res.data;

        toast({
          description: `✅ ${response.message}`,
        });

        signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: true,
          callbackUrl: '/',
        });
        // Clea all input error empty
      })
      .catch((err) => {
        if (err.response?.status === 422) {
          const errors = err.response?.data.errors;
          const keys = Object.keys(errors);

          keys.forEach((key: any) => {
            const error = errors[key];
            if (error[0]) {
              registerForm.setError(key, {
                type: 'manual',
                message: error[0],
              });
            }
          });
        }
      })
      .finally(() => {
        setRegisterLoading(false);
      });
  }

  return (
    <TabsContent value="register">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(onSubmitRegister)}
              className="space-y-2"
            >
              <FormInput
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
                classname=""
                form={registerForm}
              />
              <FormInput
                name="username"
                label="Username"
                placeholder="Your username"
                type="text"
                classname=""
                form={registerForm}
              />
              <FormInput
                name="email"
                label="Email"
                placeholder="Your email"
                type="text"
                classname=""
                form={registerForm}
              />
              <FormInput
                name="password"
                label="Password"
                placeholder="Your Password"
                type="password"
                classname=""
                form={registerForm}
              />
              <FormInput
                name="password_confirmation"
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                classname=""
                form={registerForm}
              />
              <ButtonwLoading isLoading={registerLoading} name="Register" />
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
