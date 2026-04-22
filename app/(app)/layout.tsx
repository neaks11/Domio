import { AppSidebar } from '@/components/app-sidebar';
import { Topbar } from '@/components/topbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <main className="min-w-0 flex-1">
        <Topbar />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
