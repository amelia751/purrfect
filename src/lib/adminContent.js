import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { getDb } from './firebase';

export async function loadCatsAdmin() {
  const snapshot = await getDocs(query(collection(getDb(), 'cats'), orderBy('sortOrder')));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

function withoutId(data) {
  const { id, ...rest } = data;
  return rest;
}

export async function saveCatAdmin(id, data) {
  await setDoc(doc(getDb(), 'cats', id), withoutId(data), { merge: true });
}

export async function loadFaqAdmin() {
  const db = getDb();
  const [sectionsSnap, itemsSnap] = await Promise.all([
    getDocs(query(collection(db, 'faqSections'), orderBy('sortOrder'))),
    getDocs(query(collection(db, 'faqItems'), orderBy('sortOrder'))),
  ]);
  return {
    sections: sectionsSnap.docs.map((item) => ({ id: item.id, ...item.data() })),
    items: itemsSnap.docs.map((item) => ({ id: item.id, ...item.data() })),
  };
}

export async function saveFaqSectionAdmin(id, data) {
  await setDoc(doc(getDb(), 'faqSections', id), data, { merge: true });
}

export async function saveFaqItemAdmin(id, data) {
  await setDoc(doc(getDb(), 'faqItems', id), withoutId(data), { merge: true });
}

export async function addFaqItemAdmin(data) {
  const created = await addDoc(collection(getDb(), 'faqItems'), data);
  return created.id;
}

export async function deleteFaqItemAdmin(id) {
  await deleteDoc(doc(getDb(), 'faqItems', id));
}

export async function loadReviewsAdmin() {
  const snapshot = await getDocs(query(collection(getDb(), 'reviews'), orderBy('sortOrder')));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function saveReviewAdmin(id, data) {
  await setDoc(doc(getDb(), 'reviews', id), withoutId(data), { merge: true });
}

export async function addReviewAdmin(data) {
  const created = await addDoc(collection(getDb(), 'reviews'), data);
  return created.id;
}

export async function deleteReviewAdmin(id) {
  await deleteDoc(doc(getDb(), 'reviews', id));
}

export async function loadSiteAdmin() {
  const snapshot = await getDoc(doc(getDb(), 'site', 'settings'));
  return snapshot.exists() ? snapshot.data() : {};
}

export async function saveSiteAdmin(data) {
  await setDoc(doc(getDb(), 'site', 'settings'), data, { merge: true });
}
