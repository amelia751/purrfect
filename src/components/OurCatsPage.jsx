'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import CatsDetail from './CatsDetail';
import FadeImage from './FadeImage';
import LazyMount from './LazyMount';
import { localCats } from '@/data/cats';
import { fetchCats } from '@/lib/content';
import './Ourcats.css';

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

  return (
    <div className="ourcats">
      <Header />
      <div className="banner-container">
        <FadeImage className="ourcats-banner" src="/ourcats.jpeg" alt="cats-banner" priority optimizeWidth={1920} sizes="100vw" fit="cover" />
        <div className="slogan-container">
          <h1>{t('menuOptions.ourCats')}</h1>
        </div>
      </div>
      {cats.map((cat, index) => (
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
      <Footer />
    </div>
  );
}

export default OurCatsPage;
