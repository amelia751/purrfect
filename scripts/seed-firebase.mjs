import { randomUUID } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  || path.join(root, 'secrets/purrfect-development-6b4cf8250b7b.json');
const bucketName = process.env.FIREBASE_STORAGE_BUCKET || 'purrfect-development-cats';
const publicBase = `https://storage.googleapis.com/${bucketName}`;

if (!existsSync(keyPath)) {
  throw new Error('Missing GCP service account key. Set GOOGLE_APPLICATION_CREDENTIALS.');
}

const { catsInfo } = await import(path.join(root, 'src/data/cats.js'));
const { localReviews } = await import(path.join(root, 'src/data/reviews.js'));
const en = JSON.parse(readFileSync(path.join(root, 'src/i18n/en.json'), 'utf8'));
const vi = JSON.parse(readFileSync(path.join(root, 'src/i18n/vi.json'), 'utf8'));
const reviewsOnly = process.argv.includes('--reviews-only');

initializeApp({
  credential: cert(keyPath),
  storageBucket: bucketName,
});

const db = getFirestore();
const bucket = getStorage().bucket(bucketName);

function parseBornAt(dob) {
  const parsed = Date.parse(String(dob || '').replace(/^Born\s+/i, ''));
  if (Number.isNaN(parsed)) return null;
  return new Date(parsed).toISOString().slice(0, 10);
}

function imagePath(id) {
  return `cats/${id}.png`;
}

function publicUrl(destination) {
  return `${publicBase}/${destination}`;
}

const uuidFile = /^cats\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.png$/i;

async function storeImage(localPath, previousPath) {
  if (!existsSync(localPath)) return null;
  if (previousPath && uuidFile.test(previousPath)) {
    const [exists] = await bucket.file(previousPath).exists();
    if (exists) {
      const id = previousPath.slice('cats/'.length, -'.png'.length);
      return { id, path: previousPath, url: publicUrl(previousPath) };
    }
  }
  const id = randomUUID();
  const destination = imagePath(id);
  if (previousPath && previousPath !== destination) {
    const previous = bucket.file(previousPath);
    const [exists] = await previous.exists();
    if (exists) {
      await previous.copy(bucket.file(destination));
      return { id, path: destination, url: publicUrl(destination) };
    }
  }
  await bucket.upload(localPath, {
    destination,
    resumable: false,
    metadata: {
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000, immutable',
    },
  });
  return { id, path: destination, url: publicUrl(destination) };
}

async function seedCats() {
  let uploaded = 0;
  let missing = 0;
  const keep = new Set();

  for (const [index, cat] of catsInfo.entries()) {
    const slug = cat.name.toLowerCase();
    const existing = await db.collection('cats').doc(slug).get();
    const previous = existing.exists ? existing.data() : {};
    const previousPhotos = new Map(
      (previous.photos || []).map((photo) => [photo.sourceId || photo.id, photo.path]),
    );

    const profileLocal = path.join(root, 'public', cat.profile.replace(/^\//, ''));
    const profile = await storeImage(
      profileLocal,
      previous.profile?.path || previous.profilePath || `cats/${slug}/profile.png`,
    );
    if (profile) {
      uploaded += 1;
      keep.add(profile.path);
    } else {
      missing += 1;
    }

    const photos = [];
    for (const [sortOrder, imageId] of (cat.imageIds || []).entries()) {
      const local = path.join(root, 'public/album/ourcats', slug, `${imageId}.png`);
      const stored = await storeImage(
        local,
        previousPhotos.get(imageId) || `cats/${slug}/gallery/${imageId}.png`,
      );
      if (stored) {
        uploaded += 1;
        keep.add(stored.path);
        photos.push({ ...stored, sortOrder, sourceId: imageId });
      } else {
        missing += 1;
      }
    }

    await db.collection('cats').doc(slug).set({
      slug,
      name: cat.name,
      fullname: cat.fullname,
      gender: cat.gender,
      species: cat.species,
      dob: cat.DOB,
      bornAt: parseBornAt(cat.DOB),
      status: 'active',
      sortOrder: index,
      showOnHome: true,
      profile: profile || null,
      profileUrl: profile?.url || '',
      photos,
    });
    process.stdout.write(`seeded ${slug} (${photos.length} photos)\n`);
  }

  const [files] = await bucket.getFiles({ prefix: 'cats/' });
  let removed = 0;
  for (const file of files) {
    if (!keep.has(file.name)) {
      await file.delete({ ignoreNotFound: true });
      removed += 1;
    }
  }

  return { uploaded, missing, removed };
}

async function seedFaq() {
  const sections = [
    {
      id: 'store-rules',
      sortOrder: 0,
      title: { en: en.storerules, vi: vi.storerules },
      items: [
        ['SqA', 'SaA'],
        ['SqB', 'SaB'],
        ['SqC', 'SaC'],
        ['SqD', 'SaD'],
        ['SqE', 'SaE'],
        ['SqF', 'SaF'],
      ],
    },
    {
      id: 'about-cats',
      sortOrder: 1,
      title: { en: en.aboutcats, vi: vi.aboutcats },
      items: [
        ['CqA', 'CaA'],
        ['CqB', 'CaB'],
        ['CqD', 'CaD'],
        ['CqE', 'CaE'],
      ],
    },
  ];

  const batch = db.batch();
  for (const section of sections) {
    batch.set(db.collection('faqSections').doc(section.id), {
      sortOrder: section.sortOrder,
      title: section.title,
    });
    section.items.forEach(([questionKey, answerKey], index) => {
      const id = `${section.id}-${index + 1}`;
      batch.set(db.collection('faqItems').doc(id), {
        sectionId: section.id,
        sortOrder: index,
        question: { en: en[questionKey], vi: vi[questionKey] },
        answer: { en: en[answerKey], vi: vi[answerKey] },
      });
    });
  }
  await batch.commit();
}

async function seedReviews() {
  const batch = db.batch();
  for (const review of localReviews) {
    batch.set(db.collection('reviews').doc(review.id), {
      author: review.author,
      star: review.star,
      sortOrder: review.sortOrder,
      text: review.text,
    });
  }
  await batch.commit();
}

async function seedSite() {
  await db.collection('site').doc('settings').set({
    ticketPriceVnd: 99000,
    address: { en: en.addressDescription, vi: vi.addressDescription },
    phone: { en: en.phoneNumberDescription, vi: vi.phoneNumberDescription },
    hours: { en: en.businessHoursDescription, vi: vi.businessHoursDescription },
    price: { en: en.priceDescription, vi: vi.priceDescription },
    amenities: { en: en.amenitiesDescription, vi: vi.amenitiesDescription },
  });
}

if (reviewsOnly) {
  await seedReviews();
  process.stdout.write(`done. seeded ${localReviews.length} reviews\n`);
} else {
  const cats = await seedCats();
  await seedFaq();
  await seedSite();
  await seedReviews();
  process.stdout.write(
    `done. stored ${cats.uploaded} images, missing ${cats.missing}, removed ${cats.removed} old files, seeded ${localReviews.length} reviews\n`,
  );
}
