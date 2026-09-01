import { toast } from 'sonner';

export const emptyPair = { en: '', vi: '' };

export function catPhotoUrl(cat) {
  return cat?.profile?.url || cat?.profileUrl || '';
}

export function sortedPhotos(cat) {
  return [...(cat?.photos || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export function withRenumberedPhotos(photos) {
  return photos.map((photo, sortOrder) => ({ ...photo, sortOrder }));
}

export async function runAdminAction(action, success) {
  try {
    const result = await action();
    if (success) toast.success(success);
    return result;
  } catch (error) {
    toast.error(error.message || 'Something went wrong.');
    throw error;
  }
}
