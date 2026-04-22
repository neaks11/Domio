'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const schema = z.object({
  unit_label: z.string().min(1),
  bedrooms: z.coerce.number().min(0),
  bathrooms: z.coerce.number().min(0),
  status: z.enum(['Occupied', 'Vacant', 'Turnover']),
  current_rent: z.coerce.number().min(0)
});

export function UnitForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { status: 'Vacant' } });
  return (
    <form onSubmit={handleSubmit(async () => undefined)} className="grid gap-3 md:grid-cols-2">
      <Input placeholder="Unit label" {...register('unit_label')} />
      <Input type="number" placeholder="Bedrooms" {...register('bedrooms')} />
      <Input type="number" step="0.5" placeholder="Bathrooms" {...register('bathrooms')} />
      <Select {...register('status')}><option>Occupied</option><option>Vacant</option><option>Turnover</option></Select>
      <Input type="number" placeholder="Current rent" {...register('current_rent')} />
      <Button disabled={isSubmitting} className="md:col-span-2">Add Unit</Button>
    </form>
  );
}
