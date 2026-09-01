'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BilingualField, TextField } from './fields';
import { saveSiteAdmin } from '@/lib/adminContent';
import { runAdminAction } from '@/lib/adminHelpers';

export function StorePanel({ site, setSite }) {
  const [saving, setSaving] = useState(false);
  const set = (key, value) => setSite({ ...site, [key]: value });

  const save = async () => {
    setSaving(true);
    try {
      await runAdminAction(() => saveSiteAdmin(site), 'Store info saved.');
    } finally {
      setSaving(false);
    }
  };

  if (!site) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Store</CardTitle>
          <CardDescription>Store details could not be loaded.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      <Card className="rounded-2xl shadow-[0_8px_24px_rgba(117,102,89,0.06)]">
        <CardHeader>
          <CardTitle>Visit details</CardTitle>
          <CardDescription>Address, phone, and hours shown to guests. English and Vietnamese stay in sync here.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <BilingualField id="address" label="Address" value={site.address} onChange={(value) => set('address', value)} />
          <BilingualField id="phone" label="Phone" value={site.phone} onChange={(value) => set('phone', value)} />
          <BilingualField id="hours" label="Hours" value={site.hours} multiline onChange={(value) => set('hours', value)} />
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-[0_8px_24px_rgba(117,102,89,0.06)]">
        <CardHeader>
          <CardTitle>Tickets & stay</CardTitle>
          <CardDescription>Price copy, ticket amount, and amenities.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <BilingualField id="price" label="Price" value={site.price} multiline onChange={(value) => set('price', value)} />
          <TextField
            id="ticket"
            label="Ticket price (VND)"
            type="number"
            value={site.ticketPriceVnd ?? ''}
            onChange={(value) => set('ticketPriceVnd', Number(value) || 0)}
          />
          <BilingualField id="amenities" label="Amenities" value={site.amenities} multiline onChange={(value) => set('amenities', value)} />
        </CardContent>
      </Card>

      <div>
        <Button size="lg" className="rounded-full" onClick={save} disabled={saving}>
          {saving ? <Loader2 className="animate-spin" /> : null}
          Save store
        </Button>
      </div>
    </div>
  );
}
