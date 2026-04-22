import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { UnitForm } from '@/components/forms/unit-form';
import { StatusBadge } from '@/components/ui/status-badge';
import { demoData } from '@/lib/data';
import { currency } from '@/lib/utils';

export default function UnitsPage() {
  return (
    <div>
      <PageHeader title="Units" subtitle="Portfolio-wide unit operations and pricing." />
      <div className="card mb-6 p-4"><UnitForm /></div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500"><tr><th className="p-3">Property</th><th>Unit</th><th>Bed/Bath</th><th>Status</th><th>Current Rent</th><th>Market Rent</th><th>Tenant</th><th>Lease End</th></tr></thead>
          <tbody>
            {demoData.units.map((u) => <tr key={u.id} className="border-t border-slate-100"><td className="p-3">{u.property}</td><td><Link href={`/units/${u.id}`} className="font-medium text-brand">{u.unit_label}</Link></td><td>{u.bedrooms}/{u.bathrooms}</td><td><StatusBadge value={u.status} /></td><td>{currency(u.current_rent)}</td><td>{currency(u.market_rent)}</td><td>{u.tenant ?? '-'}</td><td>{u.lease_end ?? '-'}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
