import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { TenantForm } from '@/components/forms/tenant-form';
import { LeaseForm } from '@/components/forms/lease-form';
import { demoData, rentRows } from '@/lib/data';
import { currency } from '@/lib/utils';

export default function TenantsPage() {
  return (
    <div>
      <PageHeader title="Tenants & Leases" subtitle="Active residents, lease dates, and balances." />
      <div className="mb-6 grid gap-6 lg:grid-cols-2"><div className="card p-4"><h2 className="mb-3 text-sm font-semibold">Add Tenant</h2><TenantForm /></div><div className="card p-4"><h2 className="mb-3 text-sm font-semibold">Add Lease</h2><LeaseForm /></div></div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500"><tr><th className="p-3">Tenant</th><th>Unit</th><th>Property</th><th>Phone</th><th>Email</th><th>Monthly Rent</th><th>Lease Start</th><th>Lease End</th><th>Current Balance</th></tr></thead>
          <tbody>
            {demoData.tenants.map((t) => {
              const rent = rentRows.find((r) => r.tenant === t.name);
              return <tr key={t.id} className="border-t border-slate-100"><td className="p-3"><Link href={`/tenants/${t.id}`} className="font-medium text-brand">{t.name}</Link></td><td>{t.unit}</td><td>{t.property}</td><td>{t.phone}</td><td>{t.email}</td><td>{currency(t.monthly_rent)}</td><td>{t.lease_start}</td><td>{t.lease_end}</td><td>{currency(rent?.balance ?? 0)}</td></tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
