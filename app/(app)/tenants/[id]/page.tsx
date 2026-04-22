import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { demoData, rentRows } from '@/lib/data';
import { currency } from '@/lib/utils';

export default function TenantDetailPage({ params }: { params: { id: string } }) {
  const tenant = demoData.tenants.find((t) => t.id === params.id);
  if (!tenant) notFound();
  const rent = rentRows.find((r) => r.tenant === tenant.name);

  return (
    <div>
      <PageHeader title={tenant.name} subtitle={`${tenant.property} • Unit ${tenant.unit}`} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-4 text-sm space-y-2"><p>Email: {tenant.email}</p><p>Phone: {tenant.phone}</p><p>Emergency Contact: Not provided</p></div>
        <div className="card p-4 text-sm space-y-2"><p>Lease: {tenant.lease_start} to {tenant.lease_end}</p><p>Monthly Rent: {currency(tenant.monthly_rent)}</p><p>Security Deposit: {currency(tenant.monthly_rent)}</p></div>
      </div>
      <div className="mt-6 card p-4 text-sm"><h2 className="mb-3 font-medium">Payment History</h2>{rent ? <div className="flex items-center gap-3">Latest Month Balance: {currency(rent.balance)} <StatusBadge value={rent.status} /></div> : <p>No history</p>}</div>
    </div>
  );
}
