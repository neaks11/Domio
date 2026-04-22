'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const schema = z.object({ title: z.string().min(3), issue_type: z.string().min(2), priority: z.enum(['Low', 'Medium', 'High']), status: z.enum(['Open', 'Scheduled', 'In Progress', 'Waiting', 'Completed']) });

export function MaintenanceForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { priority: 'Medium', status: 'Open' } });
  return (
    <form onSubmit={handleSubmit(async () => undefined)} className="grid gap-3 md:grid-cols-2">
      <Input placeholder="Issue title" {...register('title')} />
      <Input placeholder="Issue type" {...register('issue_type')} />
      <Select {...register('priority')}><option>Low</option><option>Medium</option><option>High</option></Select>
      <Select {...register('status')}><option>Open</option><option>Scheduled</option><option>In Progress</option><option>Waiting</option><option>Completed</option></Select>
      <Button disabled={isSubmitting} className="md:col-span-2">Create Ticket</Button>
    </form>
  );
}
