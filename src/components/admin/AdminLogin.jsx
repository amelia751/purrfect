'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ADMIN_EMAIL } from '@/lib/auth';

export function AdminLogin({ busy, error, onSignIn }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md rounded-3xl border-none shadow-[0_16px_40px_rgba(117,102,89,0.12)]">
        <CardHeader className="justify-items-center text-center">
          <img src="/purrfect-logo-white.png" alt="Purrfect Coffee" className="mb-2 size-20 object-contain" />
          <CardTitle className="font-sans text-3xl">Admin</CardTitle>
          <CardDescription className="text-base">
            Sign in with the shop Google account to manage cats, photos, store copy, FAQ, and reviews.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-center text-sm font-semibold text-primary">{ADMIN_EMAIL}</p>
          <Button size="lg" className="h-11 rounded-full" onClick={onSignIn} disabled={busy}>
            {busy ? <Loader2 className="animate-spin" /> : null}
            {busy ? 'Opening Google…' : 'Continue with Google'}
          </Button>
          {error ? <p className="text-center text-sm text-destructive">{error}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
