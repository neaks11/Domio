import { ReactNode } from 'react';

export function StatCard({ title, value, hint }: { title: string; value: ReactNode; hint?: string }) {
  return (
    <div className="card p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}
