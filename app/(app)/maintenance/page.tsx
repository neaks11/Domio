import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { MaintenanceForm } from '@/components/forms/maintenance-form';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { demoData } from '@/lib/data';
import { currency } from '@/lib/utils';

export default function MaintenancePage() {
  return (
    <div>
      <PageHeader title="Maintenance" subtitle="Simple, fast ticket workflow for building issues." />
      <div className="card mb-6 p-4"><MaintenanceForm /></div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500"><tr><th className="p-3">Property</th><th>Unit</th><th>Issue Type</th><th>Title</th><th>Priority</th><th>Status</th><th>Assigned</th><th>Opened</th><th>Est Cost</th><th>Actual Cost</th></tr></thead>
          <tbody>
            {demoData.maintenance.map((m) => <tr key={m.id} className="border-t border-slate-100"><td className="p-3">{m.property}</td><td>{m.unit}</td><td>{m.issue_type}</td><td><Link href={`/maintenance/${m.id}`} className="font-medium text-brand">{m.title}</Link></td><td><PriorityBadge value={m.priority} /></td><td><StatusBadge value={m.status} /></td><td>{m.assigned_to}</td><td>{m.date_opened}</td><td>{currency(m.estimated_cost ?? 0)}</td><td>{m.actual_cost ? currency(m.actual_cost) : '-'}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
