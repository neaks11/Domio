import { PageHeader } from '@/components/page-header';
import { PaymentForm } from '@/components/forms/payment-form';
import { StatusBadge } from '@/components/ui/status-badge';
import { rentRows } from '@/lib/data';
import { currency } from '@/lib/utils';

export default function RentPage() {
  return (
    <div>
      <PageHeader title="Rent Ledger" subtitle="Track paid, partial, late, and unpaid balances by month." />
      <div className="card mb-6 p-4"><h2 className="mb-3 text-sm font-semibold">Record Payment</h2><PaymentForm /></div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500"><tr><th className="p-3">Tenant</th><th>Unit</th><th>Rent Due</th><th>Amount Paid</th><th>Balance</th><th>Due Date</th><th>Status</th><th>Payment Date(s)</th></tr></thead>
          <tbody>
            {rentRows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100"><td className="p-3">{r.tenant}</td><td>{r.unit}</td><td>{currency(r.rent_due)}</td><td>{currency(r.amount_paid)}</td><td>{currency(r.balance)}</td><td>{r.due_date}</td><td><StatusBadge value={r.status} /></td><td>{r.payment_dates.join(', ') || '-'}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
