import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';

type FormInputProps = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  classname: string;
  form: any;
};

export default function FormInput({
  name,
  label,
  placeholder,
  type,
  classname = '',
  form,
}: FormInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={classname}>
          <Label>{label}</Label>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              autoComplete="off"
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
