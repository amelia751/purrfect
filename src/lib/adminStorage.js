import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firebaseConfig, getFirebaseStorage } from './firebase';

const MAX_BYTES = 8 * 1024 * 1024;
const TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

function extensionFor(file) {
  if (file.type === 'image/jpeg') return 'jpg';
  if (file.type === 'image/webp') return 'webp';
  if (file.type === 'image/gif') return 'gif';
  return 'png';
}

export function publicStorageUrl(path) {
  return `https://storage.googleapis.com/${firebaseConfig.storageBucket}/${path}`;
}

export async function uploadCatImage(file, { catId } = {}) {
  if (!TYPES.has(file.type)) {
    throw new Error('Use a JPG, PNG, WEBP, or GIF image.');
  }
  if (file.size > MAX_BYTES) {
    throw new Error('Images must be smaller than 8 MB.');
  }

  const id = crypto.randomUUID();
  const path = `cats/${id}.${extensionFor(file)}`;
  const storageRef = ref(getFirebaseStorage(), path);
  await uploadBytes(storageRef, file, {
    contentType: file.type,
    cacheControl: 'public, max-age=31536000, immutable',
    customMetadata: catId ? { catId } : undefined,
  });

  let url = publicStorageUrl(path);
  try {
    url = await getDownloadURL(storageRef);
  } catch {
    // Public GCS URL still works when the bucket allows object reads.
  }

  return { id, path, url };
}

export async function deleteStoredImage(path) {
  if (!path || !String(path).startsWith('cats/')) return;
  try {
    await deleteObject(ref(getFirebaseStorage(), path));
  } catch (error) {
    if (error.code !== 'storage/object-not-found') throw error;
  }
}

export async function deleteStoredImages(paths) {
  const unique = [...new Set((paths || []).filter(Boolean))];
  await Promise.all(unique.map((path) => deleteStoredImage(path)));
}
