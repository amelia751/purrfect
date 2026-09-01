'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import CatsDetail from './CatsDetail';
import FadeImage from './FadeImage';
import LazyMount from './LazyMount';
import Reveal from './Reveal';
import { isRemembranceCat, localCats } from '@/data/cats';
import { fetchCats } from '@/lib/content';
import './Ourcats.css';

function remembranceImages(cats) {
  const seen = new Set();
  const images = [];
  cats.forEach((cat) => {
    const urls = [cat.profileUrl, ...(cat.photos || []).map((photo) => photo.url)].filter(Boolean);
    urls.forEach((url) => {
      if (seen.has(url)) return;
      seen.add(url);
      images.push({ url, alt: cat.fullname || cat.name });
    });
  });
  return images;
}

function OurCatsPage() {
  const { t } = useTranslation();
  const [cats, setCats] = useState(localCats);

  useEffect(() => {
    let cancelled = false;
    fetchCats().then((next) => {
      if (!cancelled) setCats(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const livingCats = useMemo(() => cats.filter((cat) => !isRemembranceCat(cat)), [cats]);
  const rememberedCats = useMemo(() => cats.filter(isRemembranceCat), [cats]);
  const rememberedPhotos = useMemo(() => remembranceImages(rememberedCats), [rememberedCats]);

  return (
    <div className="ourcats">
      <Header />
      <div className="banner-container">
        <FadeImage className="ourcats-banner" src="/ourcats.jpeg" alt="cats-banner" priority optimizeWidth={1920} sizes="100vw" fit="cover" />
        <div className="slogan-container">
          <h1>{t('menuOptions.ourCats')}</h1>
        </div>
      </div>
      {livingCats.map((cat, index) => (
        <LazyMount key={cat.id} eager={index < 2} minHeight={560}>
          <CatsDetail
            profile={cat.profileUrl}
            gender={cat.gender}
            name={cat.fullname}
            species={cat.species}
            DOB={cat.dob}
            images={cat.photos.map((photo) => photo.url)}
            stripe={index % 2 ? 'even' : 'odd'}
            priority={index < 2}
          />
        </LazyMount>
      ))}
      {rememberedPhotos.length ? (
        <section className="cat-planet">
          <Reveal>
            <h2>{t('catPlanetTitle')}</h2>
          </Reveal>
          <div className="cat-planet-grid">
            {rememberedPhotos.map((photo) => (
              <FadeImage
                key={photo.url}
                className="cat-planet-photo"
                src={photo.url}
                alt={photo.alt}
                optimizeWidth={720}
                sizes="(max-width: 700px) 46vw, 30vw"
                fit="cover"
              />
            ))}
          </div>
        </section>
      ) : null}
      <Footer />
    </div>
  );
}

export default OurCatsPage;
