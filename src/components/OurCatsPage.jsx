'use client';

import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import CatsDetail from './CatsDetail';
import FadeImage from './FadeImage';
import LazyMount from './LazyMount';
import { catsInfo } from '@/data/cats';
import './Ourcats.css';

function OurCatsPage() {
  const { t } = useTranslation();

  return (
    <div className="ourcats">
      <Header />
      <div className="banner-container">
        <FadeImage className="ourcats-banner" src="/ourcats.jpeg" alt="cats-banner" priority />
        <div className="slogan-container">
          <h1>{t('menuOptions.ourCats')}</h1>
        </div>
      </div>
      {catsInfo.map((cat, index) => (
        <LazyMount key={cat.name} eager={index < 2} minHeight={440}>
          <CatsDetail
            profile={cat.profile}
            gender={cat.gender}
            name={cat.fullname}
            species={cat.species}
            DOB={cat.DOB}
            images={cat.imageIds.map((id) => `/album/ourcats/${cat.name.toLowerCase()}/${id}.png`)}
          />
        </LazyMount>
      ))}
      <Footer />
    </div>
  );
}

export default OurCatsPage;
