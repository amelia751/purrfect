import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { reviewCatFeaturesForPath } from '../functions/src/triggers/reviewCatFeatures.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.env.GOOGLE_APPLICATION_CREDENTIALS ||= path.join(root, 'secrets/purrfect-development-6b4cf8250b7b.json');
const key = (await readFile(path.join(root, 'secrets/gemini_api_key.txt'), 'utf8')).trim();

if (!getApps().length) {
  initializeApp({
    credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    storageBucket: 'purrfect-development-cats',
  });
}

const db = getFirestore();
const snapshot = await db.collection('cats').get();
const only = process.argv.slice(2);
let updated = 0;
let skipped = 0;

for (const doc of snapshot.docs) {
  if (only.length && !only.includes(doc.id)) continue;
  const data = doc.data();
  const objectPath = data.profile?.path || data.photos?.[0]?.path;
  if (!objectPath) {
    process.stdout.write(`skip ${doc.id} no-photo\n`);
    skipped += 1;
    continue;
  }
  try {
    const result = await reviewCatFeaturesForPath(objectPath, { key });
    process.stdout.write(`${result.skipped ? 'skip' : result.action} ${doc.id}\n`);
    if (result.skipped) skipped += 1;
    else updated += 1;
  } catch (error) {
    process.stdout.write(`fail ${doc.id} ${error.message}\n`);
  }
}

process.stdout.write(`done updated=${updated} skipped=${skipped}\n`);
