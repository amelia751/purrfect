import { onObjectFinalized } from 'firebase-functions/v2/storage';
import { defineSecret } from 'firebase-functions/params';
import { reviewCatFeaturesHandler } from './triggers/reviewCatFeatures.js';

const geminiApiKey = defineSecret('GEMINI_API_KEY');

export const reviewCatFeatures = onObjectFinalized({
  bucket: 'purrfect-development-cats',
  region: 'asia-southeast1',
  secrets: [geminiApiKey],
  memory: '512MiB',
  timeoutSeconds: 120,
}, async (event) => {
  process.env.GEMINI_API_KEY = geminiApiKey.value();
  return reviewCatFeaturesHandler(event);
});
