'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string().min(2),
  address_line_1: z.string().min(4),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().min(5)
});

type FormValues = z.infer<typeof schema>;

export function PropertyForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 md:grid-cols-2">
      <Input placeholder="Property name" {...register('name')} />
      <Input placeholder="Address" {...register('address_line_1')} />
      <Input placeholder="City" {...register('city')} />
      <Input placeholder="State" {...register('state')} />
      <Input placeholder="ZIP" {...register('zip')} />
      <Button disabled={isSubmitting} className="md:col-span-2">Add Property</Button>
      {Object.values(errors)[0]?.message ? <p className="md:col-span-2 text-xs text-rose-600">{Object.values(errors)[0]?.message}</p> : null}
    </form>
  );
}
