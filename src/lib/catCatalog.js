import { isRemembranceCat } from '@/data/cats';

export function toCatalogCat(cat) {
  return {
    id: cat.id || cat.slug,
    name: cat.fullname || cat.name,
    shortName: cat.name,
    species: cat.species || '',
    gender: cat.gender || '',
    status: cat.status || 'active',
    dob: cat.dob || '',
    featuresEn: cat.features?.en || '',
    showOnHome: cat.showOnHome !== false,
  };
}

export function searchCatsTool(cats, query) {
  const needle = String(query || '').trim().toLowerCase();
  const catalog = cats.filter((cat) => !isRemembranceCat(cat)).map(toCatalogCat);
  if (!needle) return catalog;
  return catalog.filter((cat) => (
    [cat.id, cat.name, cat.shortName, cat.species, cat.gender, cat.featuresEn]
      .some((value) => String(value || '').toLowerCase().includes(needle))
  ));
}

export function getCatProfileTool(cats, idOrName) {
  const needle = String(idOrName || '').trim().toLowerCase();
  if (!needle) return null;
  return cats.filter((cat) => !isRemembranceCat(cat)).map(toCatalogCat).find((cat) => (
    cat.id === needle
    || String(cat.shortName || '').toLowerCase() === needle
    || String(cat.name || '').toLowerCase() === needle
    || String(cat.name || '').toLowerCase().includes(needle)
  )) || null;
}

export function getCatFeaturesTool(cats, idOrName) {
  const cat = getCatProfileTool(cats, idOrName);
  if (!cat) return null;
  return {
    id: cat.id,
    name: cat.name,
    species: cat.species,
    gender: cat.gender,
    status: cat.status,
    featuresEn: cat.featuresEn,
  };
}
