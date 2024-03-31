import {
  LoginSchema,
  ProfileUpdateSchema,
  PostFormSchema,
  CommentFormSchema,
} from '@/schemas';
import { AxiosError } from 'axios';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type ProfileFormType = UseFormReturn<z.infer<typeof ProfileUpdateSchema>>;
type LoginFormType = UseFormReturn<z.infer<typeof LoginSchema>>;
type PostFormType = UseFormReturn<z.infer<typeof PostFormSchema>>;
type CommentFormType = UseFormReturn<z.infer<typeof CommentFormSchema>>;

type ApiErrorResponse = AxiosError & {
  response?: {
    status: number;
    data: {
      errors: Record<string, string[]>;
    };
  };
};

type ErrorResponse = {
  err: ApiErrorResponse;
  form: ProfileFormType | LoginFormType | PostFormType | CommentFormType;
  toast: any;
  description?: string;
  variant?: 'default' | 'destructive';
};

export function handleErrorResponse({
  err,
  toast,
  form,
  variant = 'default',
  description = 'Something went wrong',
}: ErrorResponse) {
  if (err.response) {
    const status = err.response.status;
    if (status === 422) {
      const errors = err.response.data.errors;
      const keys = Object.keys(errors);

      keys.forEach((key: any) => {
        const error = errors[key];
        if (error[0]) {
          form.setError(key, {
            type: 'manual',
            message: error[0],
          });
        }
      });
    } else if (status === 401) {
      toast({
        variant: variant,
        description: description,
      });
    } else {
      toast({
        variant: variant,
        description: 'Something went wrong',
      });
    }
  }
}
