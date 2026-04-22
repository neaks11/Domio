import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { demoData, rentRows } from '@/lib/data';
import { currency } from '@/lib/utils';

export default function ReportsPage() {
  const delinquency = rentRows.filter((r) => ['Late', 'Partial', 'Unpaid'].includes(r.status));
  const maintenanceTotal = demoData.maintenance.reduce((sum, m) => sum + (m.actual_cost ?? m.estimated_cost ?? 0), 0);
  return (
    <div>
      <PageHeader title="Reports" subtitle="Lightweight summary views for portfolio health." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Rent Roll" value={currency(rentRows.reduce((s, r) => s + r.rent_due, 0))} />
        <StatCard title="Delinquency Summary" value={`${delinquency.length} tenants`} />
        <StatCard title="Vacant Units" value={demoData.units.filter((u) => u.status !== 'Occupied').length} />
        <StatCard title="Maintenance Cost Summary" value={currency(maintenanceTotal)} />
      </div>
      <div className="card mt-6 p-4 text-sm text-slate-600">CSV export can be added next as a lightweight enhancement.</div>
    </div>
  );
}
