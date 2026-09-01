export function genderLabel(gender) {
  if (gender === 'male') return 'Male';
  if (gender === 'female') return 'Female';
  return '';
}

export function bornLabel(dob) {
  const text = String(dob || '').replace(/^Born\s+/i, '').trim();
  return text ? `Born ${text}` : '';
}

export function hasCatMeta(gender, species) {
  return Boolean(genderLabel(gender) || species);
}
