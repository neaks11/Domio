import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { demoData, rentRows } from '@/lib/data';
import { currency } from '@/lib/utils';

export default function UnitDetailPage({ params }: { params: { id: string } }) {
  const unit = demoData.units.find((u) => u.id === params.id);
  if (!unit) notFound();
  const maintenance = demoData.maintenance.filter((m) => m.unit === unit.unit_label);
  const vacancy = demoData.vacancies.find((v) => v.unit === unit.unit_label);
  const rent = rentRows.find((r) => r.unit === unit.unit_label);

  return (
    <div>
      <PageHeader title={`Unit ${unit.unit_label}`} subtitle={unit.property} />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-4">Status: <StatusBadge value={unit.status} /></div>
        <div className="card p-4">Current Rent: <strong>{currency(unit.current_rent)}</strong></div>
        <div className="card p-4">Market Rent: <strong>{currency(unit.market_rent)}</strong></div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="card p-4"><h2 className="font-medium">Current Lease / Tenant</h2><p className="mt-2 text-sm text-slate-600">Tenant: {unit.tenant ?? 'No active tenant'}</p><p className="text-sm text-slate-600">Lease End: {unit.lease_end ?? '-'}</p></section>
        <section className="card p-4"><h2 className="font-medium">Rent History</h2><p className="mt-2 text-sm text-slate-600">Latest charge: {rent ? `${currency(rent.rent_due)} (${rent.status})` : 'No charges yet'}</p></section>
        <section className="card p-4"><h2 className="font-medium">Maintenance History</h2><ul className="mt-2 space-y-1 text-sm text-slate-600">{maintenance.length ? maintenance.map((m) => <li key={m.id}>• {m.title} ({m.status})</li>) : <li>No tickets</li>}</ul></section>
        <section className="card p-4"><h2 className="font-medium">Vacancy History</h2><p className="mt-2 text-sm text-slate-600">{vacancy ? `Vacated ${vacancy.date_vacated} (${vacancy.status})` : 'No vacancy record'}</p><p className="mt-3 text-sm text-slate-500">Documents placeholder for future MVP+.</p></section>
      </div>
    </div>
  );
}
