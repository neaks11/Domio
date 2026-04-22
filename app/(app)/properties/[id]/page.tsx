import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { demoData } from '@/lib/data';
import { currency } from '@/lib/utils';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = demoData.properties.find((p) => p.id === params.id);
  if (!property) notFound();
  const units = demoData.units.filter((u) => u.property === property.name);

  return (
    <div>
      <PageHeader title={property.name} subtitle={property.address} />
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="card p-4 text-sm">Units: <strong>{property.units}</strong></div>
        <div className="card p-4 text-sm">Occupied: <strong>{property.occupied}</strong></div>
        <div className="card p-4 text-sm">Vacant: <strong>{property.units - property.occupied}</strong></div>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500"><tr><th className="p-3">Unit</th><th>Status</th><th>Current Rent</th><th>Market Rent</th><th>Tenant</th><th>Lease End</th></tr></thead>
          <tbody>
            {units.map((u) => <tr key={u.id} className="border-t border-slate-100"><td className="p-3">{u.unit_label}</td><td><StatusBadge value={u.status} /></td><td>{currency(u.current_rent)}</td><td>{currency(u.market_rent)}</td><td>{u.tenant ?? '-'}</td><td>{u.lease_end ?? '-'}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
