'use client';

import { Cat, HelpCircle, LogOut, Menu, MessageSquareQuote, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export const ADMIN_NAV = [
  { id: 'store', label: 'Store', icon: Store },
  { id: 'cats', label: 'Cats & photos', icon: Cat },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'reviews', label: 'Reviews', icon: MessageSquareQuote },
];

function NavButtons({ tab, onTab, onNavigate }) {
  return (
    <nav className="grid gap-1">
      {ADMIN_NAV.map((item) => {
        const Icon = item.icon;
        const active = tab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onTab(item.id);
              onNavigate?.();
            }}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
              active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-muted',
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export function AdminSidebar({ tab, onTab, email, onSignOut }) {
  return (
    <aside className="hidden min-h-0 w-64 shrink-0 flex-col justify-between self-stretch overflow-y-auto border-r border-sidebar-border bg-sidebar p-5 lg:flex">
      <div>
        <div className="mb-6 flex items-center gap-3 px-1">
          <img src="/purrfect-logo-white.png" alt="" className="size-10 object-contain" />
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">Purrfect Coffee</p>
            <p className="font-semibold">Admin</p>
          </div>
        </div>
        <NavButtons tab={tab} onTab={onTab} />
      </div>
      <div className="pt-6">
        <Separator className="mb-4" />
        <p className="mb-3 truncate px-1 text-xs text-muted-foreground">{email}</p>
        <Button variant="outline" className="w-full justify-start rounded-xl" onClick={onSignOut}>
          <LogOut />
          Sign out
        </Button>
      </div>
    </aside>
  );
}

export function AdminTopbar({ tab, onTab, email, onSignOut, menuOpen, onMenuOpen }) {
  const current = ADMIN_NAV.find((item) => item.id === tab);
  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-card/80 px-4 py-3 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="lg:hidden" onClick={() => onMenuOpen(true)}>
          <Menu />
        </Button>
        <div>
          <p className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">Purrfect Coffee</p>
          <h1 className="text-lg font-semibold">{current?.label || 'Admin'}</h1>
        </div>
      </div>
      <div className="hidden items-center gap-3 sm:flex">
        <span className="max-w-48 truncate text-sm text-muted-foreground">{email}</span>
        <Button variant="ghost" size="sm" onClick={onSignOut}>
          <LogOut />
          Sign out
        </Button>
      </div>
      <Sheet open={menuOpen} onOpenChange={onMenuOpen}>
        <SheetContent side="left" className="flex h-full min-h-0 w-72 flex-col justify-between overflow-y-auto bg-sidebar">
          <div>
            <SheetHeader>
              <SheetTitle>Admin</SheetTitle>
            </SheetHeader>
            <div className="px-2">
              <NavButtons tab={tab} onTab={onTab} onNavigate={() => onMenuOpen(false)} />
            </div>
          </div>
          <div className="px-2 pb-2">
            <Separator className="mb-4" />
            <p className="mb-3 truncate text-xs text-muted-foreground">{email}</p>
            <Button variant="outline" className="w-full justify-start rounded-xl" onClick={onSignOut}>
              <LogOut />
              Sign out
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
