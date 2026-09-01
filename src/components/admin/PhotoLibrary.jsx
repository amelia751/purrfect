'use client';

import { useMemo, useState } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveCatAdmin } from '@/lib/adminContent';
import { catPhotoUrl, runAdminAction, sortedPhotos, withRenumberedPhotos } from '@/lib/adminHelpers';
import { deleteStoredImage, uploadCatImage } from '@/lib/adminStorage';
import { ConfirmDelete } from './ConfirmDelete';
import { ImageDropzone } from './ImageDropzone';

function libraryItems(cats) {
  return cats.flatMap((cat) => {
    const photos = sortedPhotos(cat);
    const profileUrl = catPhotoUrl(cat);
    const hasProfileInGallery = photos.some((photo) => photo.id === cat.profile?.id || photo.url === profileUrl);
    const extras = [];
    if (profileUrl && !hasProfileInGallery && cat.profile) {
      extras.push({ ...cat.profile, sortOrder: -1 });
    }
    return [...extras, ...photos].map((photo) => ({
      ...photo,
      catId: cat.id,
      catName: cat.fullname || cat.name,
      isProfile: photo.id === cat.profile?.id || photo.url === profileUrl,
    }));
  });
}

export function PhotoLibrary({ cats, setCats }) {
  const [filter, setFilter] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [pendingPhoto, setPendingPhoto] = useState(null);
  const [removing, setRemoving] = useState(false);
  const items = useMemo(() => libraryItems(cats), [cats]);
  const visible = filter === 'all' ? items : items.filter((item) => item.catId === filter);

  const replaceCat = (id, nextCat) => {
    setCats(cats.map((cat) => (cat.id === id ? nextCat : cat)));
    return nextCat;
  };

  const saveCat = async (cat, message) => {
    const { id, ...data } = cat;
    await runAdminAction(() => saveCatAdmin(id, data), message);
  };

  const uploadToCat = async (files) => {
    if (filter === 'all') {
      toast.error('Choose a cat before uploading.');
      return;
    }
    const cat = cats.find((item) => item.id === filter);
    if (!cat) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) uploaded.push(await uploadCatImage(file));
      const photos = [...sortedPhotos(cat), ...uploaded.map((photo, index) => ({ ...photo, sortOrder: sortedPhotos(cat).length + index }))];
      const next = {
        ...cat,
        photos: withRenumberedPhotos(photos),
        profile: cat.profile || uploaded[0],
        profileUrl: cat.profile?.url || cat.profileUrl || uploaded[0].url,
      };
      replaceCat(cat.id, next);
      await saveCat(next, uploaded.length === 1 ? `Added a photo to ${cat.name}.` : `Added ${uploaded.length} photos to ${cat.name}.`);
    } catch (error) {
      toast.error(error.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const setProfile = async (item) => {
    const cat = cats.find((row) => row.id === item.catId);
    if (!cat) return;
    const next = { ...cat, profile: { id: item.id, path: item.path, url: item.url }, profileUrl: item.url };
    replaceCat(cat.id, next);
    await saveCat(next, `${item.catName} profile updated.`);
  };

  const removePhoto = async () => {
    const item = pendingPhoto;
    if (!item) return;
    const cat = cats.find((row) => row.id === item.catId);
    if (!cat) return;
    setRemoving(true);
    try {
      await deleteStoredImage(item.path);
      const photos = sortedPhotos(cat).filter((photo) => photo.id !== item.id);
      const next = { ...cat, photos: withRenumberedPhotos(photos) };
      if (item.isProfile) {
        next.profile = photos[0] || null;
        next.profileUrl = photos[0]?.url || '';
      }
      replaceCat(cat.id, next);
      await saveCat(next, 'Photo deleted.');
      setPendingPhoto(null);
    } catch (error) {
      toast.error(error.message || 'Could not delete photo.');
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">{visible.length} photos</p>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Filter by cat" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cats</SelectItem>
            {cats.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.fullname || cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ImageDropzone
        busy={uploading}
        label={filter === 'all' ? 'Choose a cat above, then drop photos here' : `Upload photos for ${cats.find((cat) => cat.id === filter)?.name || 'this cat'}`}
        onFiles={uploadToCat}
      />
      {visible.length ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {visible.map((item) => (
            <figure key={`${item.catId}-${item.id || item.url}`} className="group relative overflow-hidden rounded-2xl border bg-card">
              <img src={item.url} alt="" className="aspect-square w-full object-cover" />
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                <Badge variant="secondary">{item.catName}</Badge>
                {item.isProfile ? <Badge>Profile</Badge> : null}
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-black/45 p-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                <Button type="button" size="icon-xs" variant="secondary" disabled={item.isProfile} onClick={() => setProfile(item)}>
                  <Star />
                </Button>
                <Button type="button" size="icon-xs" variant="destructive" onClick={() => setPendingPhoto(item)}>
                  <Trash2 />
                </Button>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed bg-card px-4 py-10 text-center text-sm text-muted-foreground">
          No photos in this view yet.
        </p>
      )}

      <ConfirmDelete
        open={Boolean(pendingPhoto)}
        onOpenChange={(open) => {
          if (!open && !removing) setPendingPhoto(null);
        }}
        title="Delete this photo?"
        description={
          pendingPhoto?.isProfile
            ? `This is ${pendingPhoto.catName}'s profile photo. Another gallery photo will be used if one remains.`
            : `This photo will be removed from ${pendingPhoto?.catName || 'this cat'} and deleted from storage.`
        }
        confirmLabel="Delete photo"
        busy={removing}
        previewSrc={pendingPhoto?.url}
        onConfirm={removePhoto}
      />
    </div>
  );
}
