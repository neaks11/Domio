import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0);
}

export function calculateRentStatus(amountDue: number, amountPaid: number, dueDate: string) {
  if (amountPaid >= amountDue) return 'Paid';
  if (amountPaid > 0) return 'Partial';
  const today = new Date();
  return today > new Date(dueDate) ? 'Late' : 'Unpaid';
}
