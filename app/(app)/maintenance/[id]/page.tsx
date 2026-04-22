import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { demoData } from '@/lib/data';
import { currency } from '@/lib/utils';

export default function MaintenanceDetailPage({ params }: { params: { id: string } }) {
  const ticket = demoData.maintenance.find((m) => m.id === params.id);
  if (!ticket) notFound();
  return (
    <div>
      <PageHeader title={ticket.title} subtitle={`${ticket.property} • Unit ${ticket.unit}`} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-4 text-sm space-y-2"><p>Issue type: {ticket.issue_type}</p><p>Priority: <PriorityBadge value={ticket.priority} /></p><p>Status: <StatusBadge value={ticket.status} /></p><p>Assigned to: {ticket.assigned_to}</p></div>
        <div className="card p-4 text-sm space-y-2"><p>Date opened: {ticket.date_opened}</p><p>Estimated cost: {currency(ticket.estimated_cost ?? 0)}</p><p>Actual cost: {ticket.actual_cost ? currency(ticket.actual_cost) : '-'}</p><p>Description: Manual note placeholder for MVP.</p></div>
      </div>
    </div>
  );
}
