import { cn } from '@/lib/utils';

const styles: Record<string, string> = {
  Paid: 'bg-emerald-100 text-emerald-700',
  Partial: 'bg-amber-100 text-amber-700',
  Unpaid: 'bg-slate-100 text-slate-700',
  Late: 'bg-rose-100 text-rose-700',
  Occupied: 'bg-emerald-100 text-emerald-700',
  Vacant: 'bg-amber-100 text-amber-700',
  Turnover: 'bg-indigo-100 text-indigo-700',
  Active: 'bg-emerald-100 text-emerald-700',
  Expired: 'bg-rose-100 text-rose-700',
  Upcoming: 'bg-blue-100 text-blue-700',
  Open: 'bg-rose-100 text-rose-700',
  Scheduled: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-amber-100 text-amber-700',
  Waiting: 'bg-slate-100 text-slate-700',
  Completed: 'bg-emerald-100 text-emerald-700'
};

export function StatusBadge({ value }: { value: string }) {
  return <span className={cn('inline-flex rounded-full px-2 py-1 text-xs font-medium', styles[value] ?? 'bg-slate-100 text-slate-700')}>{value}</span>;
}
