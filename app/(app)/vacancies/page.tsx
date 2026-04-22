import { PageHeader } from '@/components/page-header';
import { VacancyForm } from '@/components/forms/vacancy-form';
import { StatusBadge } from '@/components/ui/status-badge';
import { demoData } from '@/lib/data';
import { currency } from '@/lib/utils';

export default function VacanciesPage() {
  return (
    <div>
      <PageHeader title="Vacancies" subtitle="Track turnover status and days vacant." />
      <div className="card mb-6 p-4"><VacancyForm /></div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500"><tr><th className="p-3">Property</th><th>Unit</th><th>Date Vacated</th><th>Days Vacant</th><th>Asking Rent</th><th>Market Rent</th><th>Status</th><th>Notes</th></tr></thead>
          <tbody>
            {demoData.vacancies.map((v) => <tr key={v.id} className="border-t border-slate-100"><td className="p-3">{v.property}</td><td>{v.unit}</td><td>{v.date_vacated}</td><td>{Math.floor((Date.now() - new Date(v.date_vacated).getTime()) / 86400000)}</td><td>{currency(v.asking_rent)}</td><td>{currency(v.market_rent)}</td><td><StatusBadge value={v.status} /></td><td>{v.notes}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
