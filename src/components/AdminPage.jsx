'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { AdminSidebar, AdminTopbar } from './admin/AdminChrome';
import { AdminLogin } from './admin/AdminLogin';
import { CatsPanel } from './admin/CatsPanel';
import { FaqPanel } from './admin/FaqPanel';
import { ReviewsPanel } from './admin/ReviewsPanel';
import { StorePanel } from './admin/StorePanel';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { signInAdmin, signOutAdmin, watchAdminUser } from '@/lib/auth';
import { loadCatsAdmin, loadFaqAdmin, loadReviewsAdmin, loadSiteAdmin } from '@/lib/adminContent';

const TABS = new Set(['store', 'cats', 'faq', 'reviews']);

function AdminPage() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('store');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cats, setCats] = useState([]);
  const [faq, setFaq] = useState({ sections: [], items: [] });
  const [reviews, setReviews] = useState([]);
  const [site, setSite] = useState(null);

  useEffect(() => watchAdminUser(setUser), []);

  useEffect(() => {
    const fromHash = window.location.hash.replace('#', '');
    if (TABS.has(fromHash)) setTab(fromHash);
  }, []);

  useEffect(() => {
    if (!user) return undefined;
    let cancelled = false;
    setLoading(true);
    Promise.all([loadCatsAdmin(), loadFaqAdmin(), loadReviewsAdmin(), loadSiteAdmin()])
      .then(([nextCats, nextFaq, nextReviews, nextSite]) => {
        if (cancelled) return;
        setCats(nextCats);
        setFaq(nextFaq);
        setReviews(nextReviews);
        setSite(nextSite);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          toast.error(err.message || 'Could not load admin data.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const goTab = (id) => {
    setTab(id);
    window.location.hash = id;
  };

  const signIn = async () => {
    setBusy(true);
    setError('');
    try {
      await signInAdmin();
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setBusy(false);
    }
  };

  if (!user) {
    return (
      <TooltipProvider>
        <AdminLogin busy={busy} error={error} onSignIn={signIn} />
        <Toaster />
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="admin-root flex min-h-dvh bg-background font-sans text-foreground">
        <AdminSidebar tab={tab} onTab={goTab} email={user.email} onSignOut={() => signOutAdmin()} />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar
            tab={tab}
            onTab={goTab}
            email={user.email}
            onSignOut={() => signOutAdmin()}
            menuOpen={menuOpen}
            onMenuOpen={setMenuOpen}
          />
          <main className="flex-1 px-4 py-6 lg:px-8">
            {loading ? (
              <div className="grid gap-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            ) : null}
            {!loading && tab === 'store' ? <StorePanel site={site} setSite={setSite} /> : null}
            {!loading && tab === 'cats' ? <CatsPanel cats={cats} setCats={setCats} /> : null}
            {!loading && tab === 'faq' ? <FaqPanel faq={faq} setFaq={setFaq} /> : null}
            {!loading && tab === 'reviews' ? <ReviewsPanel reviews={reviews} setReviews={setReviews} /> : null}
          </main>
        </div>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default AdminPage;
