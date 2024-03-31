import * as z from 'zod';

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
  profile: z.any(),
  // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  // .refine(
  //   (file) =>
  //     ACCEPTED_IMAGE_TYPES.includes(file.split('.').pop()?.toLowerCase()),
  //   'Only .jpg, .jpeg, .png and .webp formats are supported.'
  // ),
});

export const CommentFormSchema = z.object({
  comment: z
    .string()
    .min(6, { message: 'This comment must have at least 6 characters' }),
});

export const PostFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Must have atleast 2 characters' })
    .max(190, { message: 'Title cannot exceed 190 characters' }),
  url: z
    .string()
    .url('URL must be a valid URL') // Consistent error message
    .startsWith('https://', 'URL must start with https://'), // Specific requirement
  //   image_url: z
  //     .string()
  //     .url('Image URL must be a valid URL') // Consistent error message
  //     .regex(/^https?:\/\//, {
  //       message: 'Image URL must start with http or https',
  //     }),
  description: z.string().superRefine((val, ctx) => {
    if (val.length < 10 && val.length != 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: 10,
        type: 'string',
        inclusive: true,
        message: 'Description must have at least 10 characters',
      });
    }

    if (val.length > 20000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Maximum must have 20,000 characters.`,
      });
    }
  }),
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
