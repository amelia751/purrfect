import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCjQgrIn2sBYISEXjOS5oI8TIp-TYldIXE',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'purrfect-development.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'purrfect-development',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'purrfect-development-cats',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '1011178953242',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:1011178953242:web:9c633db29669b9b73dcfa3',
};

export function getFirebaseApp() {
  return getApps()[0] || initializeApp(firebaseConfig);
}

export function getDb() {
  return getFirestore(getFirebaseApp());
}
