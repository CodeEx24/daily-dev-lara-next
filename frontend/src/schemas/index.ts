import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  // code: z.optional(z.string()),
});

export const ProfileUpdateSchema = z.object({
  profile: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.split('.').pop()?.toLowerCase()),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  username: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .trim()
    .refine((value) => {
      const hasUpperCase = /[A-Z]/.test(value);
      if (!hasUpperCase) {
        return 'Password must contain at least one uppercase letter.';
      }
      return true;
    })
    .refine((value) => {
      const hasLowerCase = /[a-z]/.test(value);
      if (!hasLowerCase) {
        return 'Password must contain at least one lowercase letter.';
      }
      return true;
    })
    .refine((value) => {
      const hasNumber = /\d/.test(value);
      if (!hasNumber) {
        return 'Password must contain at least one number.';
      }
      return true;
    })
    .refine((value) => {
      const hasSpecialChar = /[!@#$%^&*()]/.test(value);
      if (!hasSpecialChar) {
        return 'Password must contain at least one special character.';
      }
      return true;
    }),
  password_confirmation: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum of 6 characters required',
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});

const fileSchema = z.instanceof(File, { message: 'Required' });

export const addSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  priceInCents: z.coerce.number().int().min(1),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
  file: fileSchema,
  image: fileSchema,
});
