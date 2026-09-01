'use client';

import { useTranslation } from 'react-i18next';
import FadeImage from '../FadeImage';
import './About.css';

function About() {
  const { t, i18n } = useTranslation();
  const getImage = () => {
    return i18n.language === 'vi' ? '/homepage/purrfect-vi-price.png' : '/homepage/purrfect-en-price.png';
  };

  return (
    <div className="about-us">
      <h1>{t('aboutUsTitle')}</h1>
      <div className="about-info-container">
        <FadeImage src={getImage()} alt="Price" optimizeWidth={800} sizes="(max-width: 900px) 90vw, 30vw" />
        <div className="about-info">
          <p>{t('aboutUsA')}</p>
          <p>{t('aboutUsB')}</p>
          <p>{t('aboutUsC')}</p>
          <p>{t('aboutUsD')}</p>
          <p>{t('aboutUsE')}</p>
          <p>{t('aboutUsF')}</p>
          <p>{t('aboutUsEnd')}</p>
        </div>
      </div>
    </div>
  );
}

export default About;
