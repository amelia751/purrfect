import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { catalogEntry, isRemembranceCat } from '../functions/src/lib/cats.js';
import { IDENTIFY_PROMPT, geminiGenerate } from '../functions/src/lib/gemini.js';

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
const bucket = getStorage().bucket('purrfect-development-cats');
const snapshot = await db.collection('cats').get();
const cats = snapshot.docs.map((doc) => catalogEntry(doc.id, doc.data()));
const byId = Object.fromEntries(snapshot.docs.map((doc) => [doc.id, doc.data()]));

const targets = process.argv.slice(2);
const ids = targets.length ? targets : ['xiu', 'mon', 'thon', 'bow', 'sua', 'soc'];

function parseJson(text) {
  const cleaned = String(text || '').replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const match = cleaned.match(/\{[\s\S]*\}/);
  return JSON.parse(match[0]);
}

for (const id of ids) {
  const data = byId[id];
  if (!data) {
    process.stdout.write(`missing ${id}\n`);
    continue;
  }
  if (isRemembranceCat(data)) {
    process.stdout.write(`skip ${id} remembrance\n`);
    continue;
  }
  const photo = data.photos?.[0] || data.profile;
  if (!photo?.path) {
    process.stdout.write(`no-photo ${id}\n`);
    continue;
  }
  const [bytes] = await bucket.file(photo.path).download();
  const [metadata] = await bucket.file(photo.path).getMetadata();
  const catalog = cats.filter((cat) => !isRemembranceCat(cat)).map((cat) => ({
    id: cat.id,
    name: cat.name,
    species: cat.species,
    gender: cat.gender,
    featuresEn: cat.featuresEn,
  }));
  const raw = await geminiGenerate({
    key,
    text: `${IDENTIFY_PROMPT}

${process.env.IDENTIFY_PROMPT_TEXT || 'I am at Purrfect Coffee. Which cat is this?'}

Catalog:
${JSON.stringify(catalog)}`,
    images: [{ base64: Buffer.from(bytes).toString('base64'), mimeType: metadata.contentType || 'image/png' }],
    maxOutputTokens: 800,
  });
  const guess = parseJson(raw);
  const ok = guess.id === id || String(guess.name || '').toLowerCase().includes(String(data.name || '').toLowerCase());
  process.stdout.write(`${ok ? 'HIT' : 'MISS'} expected=${id} got=${guess.id} conf=${guess.confidence} why=${guess.why || ''}\n`);
}
