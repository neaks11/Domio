import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { PropertyForm } from '@/components/forms/property-form';
import { demoData } from '@/lib/data';

export default function PropertiesPage() {
  return (
    <div>
      <PageHeader title="Properties" subtitle="Manage addresses and occupancy at a glance." />
      <div className="card mb-6 p-4"><PropertyForm /></div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs text-slate-500"><tr><th className="p-3">Name</th><th>Address</th><th>Unit Count</th><th>Occupied</th><th>Vacant</th><th>Occupancy</th></tr></thead>
          <tbody>
            {demoData.properties.map((p) => {
              const vacant = p.units - p.occupied;
              return <tr key={p.id} className="border-t border-slate-100"><td className="p-3"><Link href={`/properties/${p.id}`} className="font-medium text-brand">{p.name}</Link></td><td>{p.address}</td><td>{p.units}</td><td>{p.occupied}</td><td>{vacant}</td><td>{Math.round((p.occupied / p.units) * 100)}%</td></tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
