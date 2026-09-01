const MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

export function loadGeminiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  throw new Error('GEMINI_API_KEY is missing.');
}

export async function geminiGenerate({ key, text, images = [], maxOutputTokens = 1600 }) {
  const parts = [{ text }];
  for (const image of images) {
    parts.push({
      inlineData: {
        mimeType: image.mimeType || 'image/png',
        data: image.base64,
      },
    });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          maxOutputTokens,
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      }),
    },
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || `Gemini HTTP ${response.status}`);
  }
  const textOut = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
  if (!textOut) throw new Error('Gemini returned no text.');
  return textOut;
}

export const REVIEW_PROMPT = `You write identification notes for one named cat at Purrfect Coffee, a cat cafe in Ho Chi Minh City.

Goal: help someone holding a phone photo name THIS cat, not write a cute bio.

Look at the photo(s) and the current English notes. Only keep facts you can see or that are already in the notes: coat color and pattern, points, white markings, eye color, ear shape, face shape, body size, hair length, unique scars/spots/cowlicks, and which cafe-mates this cat is easy to mix up with.

Do not invent personality, age stories, or marks that are not visible. Do not mention the photo file. Keep it 4-8 tight sentences.

Return JSON only:
{"action":"update"|"keep","featuresEn":"the full English identification notes"}

If the current notes already cover everything visible, action is keep and featuresEn is the current notes unchanged.
If you add or correct visible marks, action is update and featuresEn is the full replacement notes.`;

export const IDENTIFY_PROMPT = `You are helping a guest at Purrfect Coffee, a cat cafe in Ho Chi Minh City, name the cat in their photo.

You will get:
1. The guest photo
2. The cafe catalog: each cat's name, species, gender, and identification notes

Rules:
- Name a cat from this catalog only. Do not invent a cat.
- Never name a cat in remembrance.
- First filter by species and coat type you can see (hairless vs fluffy, point vs solid, color). Toyger = tiger stripes. Bengal = rosettes or spots. Do not mix those two.
- Then match unique marks from the notes: blaze shape, ear curl, eye color, white patches, skin pattern.
- Prefer one exact name. If two cats are close, still pick the best one and name the runner-up.
- Guests may write in Vietnamese or English. The photo is what matters.

Return JSON only:
{"id":"slug","name":"display name","confidence":"high"|"medium"|"low","why":"short reason using visible marks","runnerUp":"other likely name or empty"}`;
