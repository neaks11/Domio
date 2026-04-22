'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const schema = z.object({ date_vacated: z.string().min(1), asking_rent: z.coerce.number().min(0), status: z.enum(['Needs Repair', 'Cleaning', 'Ready', 'Listed', 'Showing', 'Approved Applicant', 'Leased']), notes: z.string().optional() });

export function VacancyForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { status: 'Needs Repair' } });
  return (
    <form onSubmit={handleSubmit(async () => undefined)} className="grid gap-3 md:grid-cols-2">
      <Input type="date" {...register('date_vacated')} />
      <Input type="number" placeholder="Asking rent" {...register('asking_rent')} />
      <Select {...register('status')}><option>Needs Repair</option><option>Cleaning</option><option>Ready</option><option>Listed</option><option>Showing</option><option>Approved Applicant</option><option>Leased</option></Select>
      <Input placeholder="Notes" {...register('notes')} />
      <Button disabled={isSubmitting} className="md:col-span-2">Add Vacancy</Button>
    </form>
  );
}
