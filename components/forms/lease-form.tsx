'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const schema = z.object({ start_date: z.string().min(1), end_date: z.string().min(1), monthly_rent: z.coerce.number().min(0), rent_due_day: z.coerce.number().min(1).max(31), status: z.enum(['Active', 'Expired', 'Upcoming']) });

export function LeaseForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { status: 'Active', rent_due_day: 1 } });
  return (
    <form onSubmit={handleSubmit(async () => undefined)} className="grid gap-3 md:grid-cols-2">
      <Input type="date" {...register('start_date')} />
      <Input type="date" {...register('end_date')} />
      <Input type="number" placeholder="Monthly rent" {...register('monthly_rent')} />
      <Input type="number" placeholder="Due day" {...register('rent_due_day')} />
      <Select {...register('status')}><option>Active</option><option>Upcoming</option><option>Expired</option></Select>
      <Button disabled={isSubmitting} className="md:col-span-2">Save Lease</Button>
    </form>
  );
}
