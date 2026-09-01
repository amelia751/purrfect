'use client';

import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import CatsDetail from './CatsDetail';
import { catsInfo } from '@/data/cats';
import './Ourcats.css';

function OurCatsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div className="banner-container">
        <img className="ourcats-banner" src="/ourcats.jpeg" alt="cats-banner" />
        <div className="slogan-container">
          <h1>{t('menuOptions.ourCats')}</h1>
        </div>
      </div>
      {catsInfo.map((cat) => (
        <CatsDetail
          key={cat.name}
          profile={cat.profile}
          gender={cat.gender}
          name={cat.fullname}
          species={cat.species}
          DOB={cat.DOB}
          images={cat.imageIds.map((id) => `/album/ourcats/${cat.name.toLowerCase()}/${id}.png`)}
        />
      ))}
      <Footer />
    </div>
  );
}

export default OurCatsPage;
