import React from 'react';
import { Textarea } from '../ui/textarea';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '../ui/label';

type FormTextAreaProps = {
  name: string;
  label: string;
  placeholder: string;
  classname: string;
  form: any;
};

export default function FormTextArea({
  name,
  label,
  placeholder,
  classname = '',
  form,
}: FormTextAreaProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label>{label}</Label>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={classname}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
