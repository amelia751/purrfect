import { readFile } from 'node:fs/promises';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { findCatByPhotoPath } from '../lib/cats.js';
import { REVIEW_PROMPT, geminiGenerate, loadGeminiKey } from '../lib/gemini.js';

const BUCKET = process.env.FIREBASE_STORAGE_BUCKET || 'purrfect-development-cats';

function ensureAdmin() {
  if (!getApps().length) initializeApp();
  return {
    db: getFirestore(),
    bucket: getStorage().bucket(BUCKET),
  };
}

function parseJson(text) {
  const cleaned = String(text || '').replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Gemini did not return JSON.');
  return JSON.parse(match[0]);
}

export async function reviewCatFeaturesForPath(objectPath, { key, fileBytes, mimeType } = {}) {
  const { db, bucket } = ensureAdmin();
  const cat = await findCatByPhotoPath(db, objectPath);
  if (!cat) return { skipped: true, reason: 'no-cat' };

  const photoId = objectPath.replace(/^cats\//, '').replace(/\.[^.]+$/, '');
  const already = new Set(cat.features?.photoIds || []);
  if (already.has(photoId) && cat.features?.en) {
    return { skipped: true, reason: 'already-reviewed', id: cat.id };
  }

  let bytes = fileBytes;
  let type = mimeType || 'image/png';
  if (!bytes) {
    const [downloaded] = await bucket.file(objectPath).download();
    bytes = downloaded;
    const [metadata] = await bucket.file(objectPath).getMetadata();
    type = metadata.contentType || type;
  }

  const current = cat.features?.en || '';
  const raw = await geminiGenerate({
    key,
    text: `${REVIEW_PROMPT}

Cat: ${cat.fullname || cat.name} (${cat.id})
Species: ${cat.species || 'unknown'}
Gender: ${cat.gender || 'unknown'}
Status: ${cat.status || 'active'}
Current English notes:
${current || '(none yet)'}`,
    images: [{ base64: Buffer.from(bytes).toString('base64'), mimeType: type }],
  });
  const result = parseJson(raw);
  const featuresEn = String(result.featuresEn || current).trim();
  const nextIds = [...already, photoId];

  await db.collection('cats').doc(cat.id).set({
    features: {
      en: featuresEn,
      vi: cat.features?.vi || '',
      updatedAt: FieldValue.serverTimestamp(),
      photoIds: nextIds,
    },
  }, { merge: true });

  return {
    id: cat.id,
    action: result.action === 'keep' ? 'keep' : 'update',
    featuresEn,
  };
}

export async function reviewCatFeaturesHandler(event) {
  const objectPath = event.data?.name;
  if (!objectPath || !objectPath.startsWith('cats/')) return;
  const key = loadGeminiKey();
  return reviewCatFeaturesForPath(objectPath, { key });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const objectPath = process.argv[2];
  if (!objectPath) throw new Error('Usage: node src/triggers/reviewCatFeatures.js cats/<id>.png');
  const { fileURLToPath } = await import('node:url');
  const { dirname, join } = await import('node:path');
  const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');
  const key = (await readFile(join(root, 'secrets/gemini_api_key.txt'), 'utf8')).trim();
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||= join(root, 'secrets/purrfect-development-6b4cf8250b7b.json');
  const result = await reviewCatFeaturesForPath(objectPath, { key });
  process.stdout.write(`${JSON.stringify({ id: result.id, action: result.action, skipped: result.skipped })}\n`);
}
