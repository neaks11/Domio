'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur">
      <div>
        <p className="text-sm text-slate-500">Domio | Landlord Control Center</p>
      </div>
      <div className="flex items-center gap-3">
        <Button className="h-9 gap-2 px-3 text-xs">
          <Plus className="h-4 w-4" />
          Quick Add
        </Button>
        <div className="rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600">owner@domio.local</div>
      </div>
    </header>
  );
}
