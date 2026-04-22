'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const schema = z.object({ amount: z.coerce.number().positive(), payment_date: z.string().min(1), payment_method: z.enum(['Cash', 'Zelle', 'ACH', 'Check', 'Other']), notes: z.string().optional() });

export function PaymentForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { payment_method: 'ACH' } });
  return (
    <form onSubmit={handleSubmit(async () => undefined)} className="grid gap-3 md:grid-cols-2">
      <Input type="number" step="0.01" placeholder="Amount" {...register('amount')} />
      <Input type="date" {...register('payment_date')} />
      <Select {...register('payment_method')}><option>Cash</option><option>Zelle</option><option>ACH</option><option>Check</option><option>Other</option></Select>
      <Input placeholder="Notes" {...register('notes')} />
      <Button disabled={isSubmitting} className="md:col-span-2">Record Payment</Button>
    </form>
  );
}
