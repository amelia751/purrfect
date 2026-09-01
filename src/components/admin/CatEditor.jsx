'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { addCatAdmin, deleteCatAdmin, saveCatAdmin } from '@/lib/adminContent';
import { catPhotoUrl, runAdminAction, sortedPhotos, withRenumberedPhotos } from '@/lib/adminHelpers';
import { deleteStoredImage, deleteStoredImages, uploadCatImage } from '@/lib/adminStorage';
import { ConfirmDelete } from './ConfirmDelete';
import { ImageDropzone } from './ImageDropzone';
import { TextField } from './fields';

export function CatEditor({ cat, cats, open, onOpenChange, onChange, onReplace }) {
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [pendingCatDelete, setPendingCatDelete] = useState(false);
  const [pendingPhoto, setPendingPhoto] = useState(null);
  const isNew = Boolean(cat?.isNew);

  const update = (patch) => onChange({ ...cat, ...patch });

  const uploadFiles = async (files, asProfile = false) => {
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        uploaded.push(await uploadCatImage(file));
      }
      const photos = [...sortedPhotos(cat)];
      uploaded.forEach((photo) => {
        photos.push({ ...photo, sortOrder: photos.length });
      });
      const next = { ...cat, photos: withRenumberedPhotos(photos) };
      if (asProfile || !catPhotoUrl(cat)) {
        next.profile = uploaded[0];
        next.profileUrl = uploaded[0].url;
      }
      onChange(next);
      toast.success(uploaded.length === 1 ? 'Photo uploaded.' : `${uploaded.length} photos uploaded.`);
    } catch (error) {
      toast.error(error.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!cat.name?.trim()) {
      toast.error('Give this cat a name first.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        slug: cat.id,
        name: cat.name.trim(),
        fullname: cat.fullname || cat.name.trim(),
        gender: cat.gender || '',
        species: cat.species || '',
        dob: cat.dob || '',
        sortOrder: Number(cat.sortOrder) || 0,
        showOnHome: cat.showOnHome !== false,
        status: cat.status || 'active',
        profile: cat.profile || null,
        profileUrl: cat.profile?.url || cat.profileUrl || '',
        photos: withRenumberedPhotos(sortedPhotos(cat)),
      };
      if (isNew) {
        await runAdminAction(() => addCatAdmin(cat.id, payload), `${payload.name} added.`);
        onReplace({ id: cat.id, ...payload });
      } else {
        await runAdminAction(() => saveCatAdmin(cat.id, payload), `Saved ${payload.name}.`);
        onChange({ id: cat.id, ...payload });
      }
    } finally {
      setSaving(false);
    }
  };

  const removeCat = async () => {
    setRemoving(true);
    try {
      const paths = [cat.profile?.path, ...sortedPhotos(cat).map((photo) => photo.path)];
      await deleteStoredImages(paths);
      if (!isNew) await deleteCatAdmin(cat.id);
      toast.success(`${cat.name || 'Cat'} deleted.`);
      onReplace(null);
    } catch (error) {
      toast.error(error.message || 'Could not delete this cat.');
    } finally {
      setRemoving(false);
      setPendingCatDelete(false);
    }
  };

  const movePhoto = (index, direction) => {
    const photos = sortedPhotos(cat);
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= photos.length) return;
    const copy = [...photos];
    [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
    update({ photos: withRenumberedPhotos(copy) });
  };

  const setProfile = (photo) => {
    update({ profile: photo, profileUrl: photo.url });
  };

  const removePhoto = async () => {
    const photo = pendingPhoto;
    if (!photo) return;
    setRemoving(true);
    try {
      await deleteStoredImage(photo.path);
      const photos = sortedPhotos(cat).filter((item) => item.id !== photo.id);
      const next = { photos: withRenumberedPhotos(photos) };
      if (cat.profile?.id === photo.id || cat.profileUrl === photo.url) {
        const fallback = photos[0] || null;
        next.profile = fallback;
        next.profileUrl = fallback?.url || '';
      }
      update(next);
      toast.success('Photo removed.');
      setPendingPhoto(null);
    } catch (error) {
      toast.error(error.message || 'Could not delete photo.');
    } finally {
      setRemoving(false);
    }
  };

  if (!cat) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex h-full min-h-0 w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
          <SheetHeader className="shrink-0 border-b pr-12">
            <SheetTitle>{isNew ? 'Add a cat' : cat.fullname || cat.name}</SheetTitle>
            <SheetDescription>
              Upload a profile photo and gallery, then save. Changes go live on the website after save.
            </SheetDescription>
          </SheetHeader>

          <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-6">
          <div className="grid gap-6">
            <div className="grid gap-6 min-[680px]:grid-cols-[200px_1fr]">
              <div className="grid gap-3">
                <Label>Profile photo</Label>
                <div className="overflow-hidden rounded-2xl border bg-muted">
                  {catPhotoUrl(cat) ? (
                    <img src={catPhotoUrl(cat)} alt={cat.fullname || cat.name} className="aspect-square w-full object-cover" />
                  ) : (
                    <div className="flex aspect-square items-center justify-center text-sm text-muted-foreground">
                      No photo yet
                    </div>
                  )}
                </div>
                <ImageDropzone
                  compact
                  multiple={false}
                  busy={uploading}
                  label="Replace profile"
                  onFiles={(files) => uploadFiles(files.slice(0, 1), true)}
                />
              </div>

              <div className="grid content-start gap-5">
                <div className="grid gap-4 min-[520px]:grid-cols-2">
                  <TextField id="cat-name" label="Short name" value={cat.name} onChange={(name) => update({ name })} />
                  <TextField id="cat-full" label="Display name" value={cat.fullname} onChange={(fullname) => update({ fullname })} />
                  <TextField id="cat-species" label="Species" value={cat.species} onChange={(species) => update({ species })} />
                  <div className="grid gap-2">
                    <Label>Gender</Label>
                    <Select value={cat.gender || undefined} onValueChange={(gender) => update({ gender })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose gender" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="z-[90]">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <TextField
                    id="cat-dob"
                    label="Birthday"
                    value={String(cat.dob || '').replace(/^Born\s+/i, '')}
                    onChange={(dob) => update({ dob: dob.trim() ? `Born ${dob.replace(/^Born\s+/i, '')}` : '' })}
                    placeholder="Dec 19, 2020"
                  />
                  <TextField
                    id="cat-order"
                    label="Display order"
                    type="number"
                    value={cat.sortOrder}
                    onChange={(sortOrder) => update({ sortOrder: Number(sortOrder) || 0 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={cat.status || 'active'}
                    onValueChange={(status) => update({
                      status,
                      showOnHome: status === 'in_remembrance' ? false : cat.showOnHome,
                    })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper" className="z-[90]">
                      <SelectItem value="active">At the cafe</SelectItem>
                      <SelectItem value="in_remembrance">In remembrance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <label className="flex items-center gap-3 text-sm">
                  <Switch
                    checked={cat.status !== 'in_remembrance' && cat.showOnHome !== false}
                    onCheckedChange={(showOnHome) => update({ showOnHome })}
                    disabled={cat.status === 'in_remembrance'}
                  />
                  Show on the homepage
                </label>
                <p className="text-xs text-muted-foreground">ID: {cat.id}</p>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <Label>Gallery</Label>
                  <p className="text-xs text-muted-foreground">These photos appear on the Our Cats page.</p>
                </div>
                <Badge variant="secondary">{sortedPhotos(cat).length} photos</Badge>
              </div>
              <ImageDropzone busy={uploading} onFiles={(files) => uploadFiles(files)} />
              {sortedPhotos(cat).length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {sortedPhotos(cat).map((photo, index) => {
                    const isProfile = cat.profile?.id === photo.id || cat.profileUrl === photo.url;
                    return (
                      <figure key={photo.id || photo.url} className="group relative overflow-hidden rounded-xl border bg-card">
                        <img src={photo.url} alt="" className="aspect-square w-full object-cover" />
                        {isProfile ? (
                          <Badge className="absolute top-2 left-2">Profile</Badge>
                        ) : null}
                        <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-black/45 p-2">
                          <div className="flex gap-1">
                            <Button type="button" size="icon-xs" variant="secondary" onClick={() => movePhoto(index, -1)} disabled={index === 0}>
                              <ChevronLeft />
                            </Button>
                            <Button
                              type="button"
                              size="icon-xs"
                              variant="secondary"
                              onClick={() => movePhoto(index, 1)}
                              disabled={index === sortedPhotos(cat).length - 1}
                            >
                              <ChevronRight />
                            </Button>
                          </div>
                          <div className="flex gap-1">
                            <Button type="button" size="icon-xs" variant="secondary" onClick={() => setProfile(photo)} disabled={isProfile}>
                              <Star />
                            </Button>
                            <Button type="button" size="icon-xs" variant="destructive" onClick={() => setPendingPhoto(photo)}>
                              <Trash2 />
                            </Button>
                          </div>
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              ) : null}
            </div>

          </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t bg-background px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <Button variant="outline" className="text-destructive" onClick={() => setPendingCatDelete(true)}>
              <Trash2 />
              {isNew ? 'Discard' : 'Delete cat'}
            </Button>
            <Button className="rounded-full" onClick={save} disabled={saving}>
              {saving ? <Loader2 className="animate-spin" /> : null}
              {isNew ? 'Create cat' : 'Save cat'}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <ConfirmDelete
        open={pendingCatDelete}
        onOpenChange={setPendingCatDelete}
        title={isNew ? 'Discard this cat?' : `Delete ${cat.name}?`}
        description={
          isNew
            ? 'Uploaded photos for this draft will be removed.'
            : 'This removes the cat and their photos from the website.'
        }
        confirmLabel={isNew ? 'Discard' : 'Delete cat'}
        busy={removing && !pendingPhoto}
        previewSrc={catPhotoUrl(cat)}
        onConfirm={removeCat}
      />
      <ConfirmDelete
        open={Boolean(pendingPhoto)}
        onOpenChange={(open) => {
          if (!open && !removing) setPendingPhoto(null);
        }}
        title="Delete this photo?"
        description={
          cat.profile?.id === pendingPhoto?.id || cat.profileUrl === pendingPhoto?.url
            ? 'This is the profile photo. Another gallery photo will be used if one remains.'
            : 'This photo will be removed from the gallery and deleted from storage.'
        }
        confirmLabel="Delete photo"
        busy={removing && Boolean(pendingPhoto)}
        previewSrc={pendingPhoto?.url}
        onConfirm={removePhoto}
      />
    </>
  );
}
