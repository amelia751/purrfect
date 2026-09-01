'use client';

import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { uniqueCatId } from '@/lib/adminContent';
import { catPhotoUrl } from '@/lib/adminHelpers';
import { CatEditor } from './CatEditor';
import { PhotoLibrary } from './PhotoLibrary';

export function CatsPanel({ cats, setCats }) {
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = [...cats].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    if (!needle) return list;
    return list.filter((cat) =>
      [cat.name, cat.fullname, cat.species, cat.gender].some((value) => String(value || '').toLowerCase().includes(needle)),
    );
  }, [cats, query]);

  const startNew = () => {
    const id = uniqueCatId('newcat', new Set(cats.map((cat) => cat.id)));
    setEditing({
      id,
      isNew: true,
      name: '',
      fullname: '',
      gender: 'male',
      species: '',
      dob: '',
      sortOrder: cats.length,
      showOnHome: true,
      status: 'active',
      profile: null,
      profileUrl: '',
      photos: [],
    });
  };

  const updateEditing = (next) => {
    setEditing(next);
    if (!next?.isNew) {
      setCats(cats.map((cat) => (cat.id === next.id ? next : cat)));
    }
  };

  const replaceEditing = (next) => {
    if (!editing) return;
    if (next == null) {
      setCats(cats.filter((cat) => cat.id !== editing.id));
    } else if (editing.isNew) {
      setCats([...cats, next]);
    } else {
      setCats(cats.map((cat) => (cat.id === next.id ? next : cat)));
    }
    setEditing(next);
  };

  return (
    <div className="grid gap-6">
      <Tabs defaultValue="cats">
        <div className="sticky top-0 z-10 mb-1 flex flex-col gap-3 border-b border-border/80 bg-background/95 py-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="cats">Cats</TabsTrigger>
            <TabsTrigger value="photos">Photo library</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative min-w-0 flex-1 sm:w-64">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search cats" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
            <Button className="rounded-full" onClick={startNew}>
              <Plus />
              Add cat
            </Button>
          </div>
        </div>

        <TabsContent value="cats" className="mt-5">
          {filtered.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setEditing(cat)}
                  className="overflow-hidden rounded-2xl border bg-card text-left shadow-[0_8px_24px_rgba(117,102,89,0.06)] transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="aspect-[4/3] bg-muted">
                    {catPhotoUrl(cat) ? (
                      <img src={catPhotoUrl(cat)} alt={cat.fullname || cat.name} className="size-full object-cover" />
                    ) : (
                      <div className="flex size-full items-center justify-center text-sm text-muted-foreground">No photo</div>
                    )}
                  </div>
                  <div className="grid gap-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">{cat.fullname || cat.name}</p>
                        <p className="text-sm text-muted-foreground">{cat.species || 'Unknown species'}</p>
                      </div>
                      <Badge variant={cat.showOnHome === false ? 'outline' : 'secondary'}>
                        {cat.showOnHome === false ? 'Hidden' : 'Home'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {cat.gender || '—'} · {sortedCount(cat)} photos
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed bg-card px-4 py-12 text-center text-sm text-muted-foreground">
              No cats match that search.
            </p>
          )}
        </TabsContent>

        <TabsContent value="photos" className="mt-5">
          <PhotoLibrary cats={cats} setCats={setCats} />
        </TabsContent>
      </Tabs>

      <CatEditor
        cat={editing}
        cats={cats}
        open={Boolean(editing)}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
        onChange={updateEditing}
        onReplace={replaceEditing}
      />
    </div>
  );
}

function sortedCount(cat) {
  return Array.isArray(cat.photos) ? cat.photos.length : 0;
}
