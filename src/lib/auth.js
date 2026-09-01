import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getFirebaseAuth } from './firebase';

export const ADMIN_EMAIL = 'purrfect.vietnam@gmail.com';

export function isAdminUser(user) {
  return Boolean(user?.emailVerified && user.email === ADMIN_EMAIL);
}

export function watchAdminUser(onChange) {
  return onAuthStateChanged(getFirebaseAuth(), async (user) => {
    if (!user) {
      onChange(null);
      return;
    }
    if (!isAdminUser(user)) {
      await signOut(getFirebaseAuth());
      onChange(null);
      return;
    }
    onChange(user);
  });
}

export async function signInAdmin() {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
    login_hint: ADMIN_EMAIL,
  });
  const result = await signInWithPopup(auth, provider);
  if (!isAdminUser(result.user)) {
    await signOut(auth);
    throw new Error(`Only ${ADMIN_EMAIL} can sign in.`);
  }
  return result.user;
}

export function signOutAdmin() {
  return signOut(getFirebaseAuth());
}
