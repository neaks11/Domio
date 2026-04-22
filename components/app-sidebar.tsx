import Link from 'next/link';

const nav = [
  ['Dashboard', '/dashboard'],
  ['Properties', '/properties'],
  ['Units', '/units'],
  ['Tenants', '/tenants'],
  ['Rent', '/rent'],
  ['Maintenance', '/maintenance'],
  ['Vacancies', '/vacancies'],
  ['Reports', '/reports'],
  ['Settings', '/settings']
];

export function AppSidebar() {
  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 lg:block">
      <div className="mb-8 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white">Domio</div>
      <nav className="space-y-1">
        {nav.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
