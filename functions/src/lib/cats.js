export async function findCatByPhotoPath(db, objectPath) {
  const snapshot = await db.collection('cats').get();
  for (const doc of snapshot.docs) {
    const data = doc.data();
    if (data.profile?.path === objectPath) return { id: doc.id, ...data };
    const photos = Array.isArray(data.photos) ? data.photos : [];
    if (photos.some((photo) => photo.path === objectPath)) return { id: doc.id, ...data };
  }
  return null;
}

export function catalogEntry(id, data) {
  return {
    id,
    name: data.fullname || data.name || id,
    shortName: data.name || id,
    species: data.species || '',
    gender: data.gender || '',
    status: data.status || 'active',
    featuresEn: data.features?.en || '',
  };
}

export function isRemembranceCat(cat) {
  return (cat.status || 'active') === 'in_remembrance';
}

export function searchCatalog(cats, query) {
  const needle = String(query || '').trim().toLowerCase();
  const catalog = cats.filter((cat) => !isRemembranceCat(cat));
  if (!needle) return catalog;
  return catalog.filter((cat) => (
    [cat.id, cat.name, cat.shortName, cat.species, cat.gender, cat.featuresEn]
      .some((value) => String(value || '').toLowerCase().includes(needle))
  ));
}

export function findCatalogCat(cats, idOrName) {
  const needle = String(idOrName || '').trim().toLowerCase();
  if (!needle) return null;
  return cats.filter((cat) => !isRemembranceCat(cat)).find((cat) => (
    cat.id === needle
    || String(cat.shortName || '').toLowerCase() === needle
    || String(cat.name || '').toLowerCase() === needle
    || String(cat.name || '').toLowerCase().includes(needle)
  )) || null;
}
