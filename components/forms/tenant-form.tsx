'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({ first_name: z.string().min(1), last_name: z.string().min(1), email: z.string().email(), phone: z.string().min(7) });

export function TenantForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  return (
    <form onSubmit={handleSubmit(async () => undefined)} className="grid gap-3 md:grid-cols-2">
      <Input placeholder="First name" {...register('first_name')} />
      <Input placeholder="Last name" {...register('last_name')} />
      <Input placeholder="Email" {...register('email')} />
      <Input placeholder="Phone" {...register('phone')} />
      <Button disabled={isSubmitting} className="md:col-span-2">Add Tenant</Button>
    </form>
  );
}
