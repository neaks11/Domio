import { cn } from '@/lib/utils';

const styles: Record<string, string> = {
  Low: 'bg-slate-100 text-slate-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-rose-100 text-rose-700'
};

export function PriorityBadge({ value }: { value: string }) {
  return <span className={cn('inline-flex rounded-full px-2 py-1 text-xs font-medium', styles[value] ?? 'bg-slate-100 text-slate-700')}>{value}</span>;
}
