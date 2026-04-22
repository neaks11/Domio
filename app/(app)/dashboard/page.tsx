import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { demoData, getDashboardStats, rentRows } from '@/lib/data';
import { currency } from '@/lib/utils';

export default function DashboardPage() {
  const stats = getDashboardStats();
  const actionItems = [
    ...rentRows.filter((r) => r.status === 'Late').map((r) => `Overdue rent: ${r.tenant} (${r.unit})`),
    ...demoData.maintenance.filter((m) => m.priority === 'High' && m.status !== 'Completed').map((m) => `High priority maintenance: ${m.title}`),
    ...demoData.units.filter((u) => u.status !== 'Occupied').map((u) => `Vacant/turnover unit: ${u.property} ${u.unit_label}`)
  ];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Action-oriented portfolio visibility for today." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Units" value={stats.totalUnits} />
        <StatCard title="Occupied Units" value={stats.occupiedUnits} />
        <StatCard title="Vacant Units" value={stats.vacantUnits} />
        <StatCard title="Rent Collected This Month" value={currency(stats.rentCollected)} />
        <StatCard title="Outstanding Rent" value={currency(stats.outstanding)} />
        <StatCard title="Open Maintenance Tickets" value={stats.openMaintenance} />
        <StatCard title="Leases Expiring in 60 Days" value={stats.leasesExpiring60} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="card p-4">
          <h2 className="text-sm font-semibold text-slate-900">Action Required</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {actionItems.length ? actionItems.map((item) => <li key={item}>• {item}</li>) : <li>No urgent actions.</li>}
          </ul>
        </section>

        <section className="card overflow-hidden">
          <h2 className="border-b border-slate-200 p-4 text-sm font-semibold text-slate-900">Rent Snapshot</h2>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs text-slate-500">
              <tr><th className="p-3">Tenant</th><th>Unit</th><th>Monthly</th><th>Paid</th><th>Balance</th><th>Status</th></tr>
            </thead>
            <tbody>
              {rentRows.map((row) => (
                <tr key={row.id} className="border-t border-slate-100"><td className="p-3">{row.tenant}</td><td>{row.unit}</td><td>{currency(row.monthly_rent)}</td><td>{currency(row.amount_paid)}</td><td>{currency(row.balance)}</td><td><StatusBadge value={row.status} /></td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card overflow-hidden">
          <h2 className="border-b border-slate-200 p-4 text-sm font-semibold text-slate-900">Maintenance Snapshot</h2>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs text-slate-500"><tr><th className="p-3">Unit</th><th>Issue</th><th>Priority</th><th>Status</th><th>Assigned</th><th>Opened</th></tr></thead>
            <tbody>
              {demoData.maintenance.map((t) => (
                <tr key={t.id} className="border-t border-slate-100"><td className="p-3">{t.unit}</td><td>{t.title}</td><td><PriorityBadge value={t.priority} /></td><td><StatusBadge value={t.status} /></td><td>{t.assigned_to}</td><td>{t.date_opened}</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card overflow-hidden">
          <h2 className="border-b border-slate-200 p-4 text-sm font-semibold text-slate-900">Vacancy Snapshot</h2>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs text-slate-500"><tr><th className="p-3">Unit</th><th>Asking Rent</th><th>Days Vacant</th><th>Status</th></tr></thead>
            <tbody>
              {demoData.vacancies.map((v) => (
                <tr key={v.id} className="border-t border-slate-100"><td className="p-3">{v.property} {v.unit}</td><td>{currency(v.asking_rent)}</td><td>{Math.floor((Date.now() - new Date(v.date_vacated).getTime()) / 86400000)}</td><td><StatusBadge value={v.status} /></td></tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
