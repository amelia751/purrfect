import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { localCats } from '@/data/cats';
import { getDb } from './firebase';

function localized(value, language) {
  if (!value || typeof value !== 'object') return value || '';
  return value[language] || value.en || value.vi || '';
}

function mapCat(id, data) {
  const profile = data.profile && typeof data.profile === 'object' ? data.profile : null;
  const photos = Array.isArray(data.photos) ? [...data.photos] : [];
  photos.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  return {
    id,
    slug: data.slug || id,
    name: data.name || id,
    fullname: data.fullname || data.name || id,
    gender: data.gender || '',
    species: data.species || '',
    dob: data.dob || '',
    sortOrder: data.sortOrder ?? 0,
    showOnHome: data.showOnHome !== false,
    profileUrl: profile?.url || data.profileUrl || '',
    photos,
  };
}

export async function fetchCats() {
  try {
    const snapshot = await getDocs(query(collection(getDb(), 'cats'), orderBy('sortOrder')));
    const cats = snapshot.docs.map((item) => mapCat(item.id, item.data()));
    return cats.length ? cats : localCats;
  } catch {
    return localCats;
  }
}

export async function fetchFaq(language) {
  try {
    const db = getDb();
    const [sectionsSnap, itemsSnap] = await Promise.all([
      getDocs(query(collection(db, 'faqSections'), orderBy('sortOrder'))),
      getDocs(query(collection(db, 'faqItems'), orderBy('sortOrder'))),
    ]);

    const itemsBySection = {};
    itemsSnap.docs.forEach((item) => {
      const data = item.data();
      const sectionId = data.sectionId;
      if (!itemsBySection[sectionId]) itemsBySection[sectionId] = [];
      itemsBySection[sectionId].push({
        id: item.id,
        question: localized(data.question, language),
        answer: localized(data.answer, language),
        isOpen: false,
      });
    });

    return sectionsSnap.docs.map((section) => {
      const data = section.data();
      return {
        id: section.id,
        title: localized(data.title, language),
        items: itemsBySection[section.id] || [],
      };
    });
  } catch {
    return [];
  }
}

export async function fetchSiteSettings(language) {
  try {
    const snapshot = await getDoc(doc(getDb(), 'site', 'settings'));
    if (!snapshot.exists()) return null;
    const data = snapshot.data();
    return {
      address: localized(data.address, language),
      phone: localized(data.phone, language),
      hours: localized(data.hours, language),
      price: localized(data.price, language),
      amenities: localized(data.amenities, language),
    };
  } catch {
    return null;
  }
}
