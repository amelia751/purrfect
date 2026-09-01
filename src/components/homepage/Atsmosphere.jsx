'use client';

import { useTranslation } from 'react-i18next';
import ImageCarousel from '../ImageCarousel';
import './Atsmosphere.css';

const atmosphereImages = [
  '/album/atsmosphere/ats1.png',
  '/album/atsmosphere/ats2.png',
  '/album/atsmosphere/ats3.png',
  '/album/atsmosphere/ats4.png',
  '/album/atsmosphere/ats5.png',
  '/album/atsmosphere/ats6.png',
  '/album/atsmosphere/ats7.png',
  '/album/atsmosphere/ats8.png',
  '/album/atsmosphere/ats9.png',
  '/album/atsmosphere/ats10.png',
  '/album/atsmosphere/ats11.png',
  '/album/atsmosphere/ats12.png',
];

function Atsmosphere() {
  const { t } = useTranslation();

  return (
    <div className="atsmosphere">
      <h1>{t('atsmosphereTitle')}</h1>
      <ImageCarousel
        images={atmosphereImages}
        showButtonsMinWidth={650}
        frameClassName="atsmosphere-img-container"
        imageClassName="atsmosphere-img"
        getImagesPerFrame={(screenWidth) => {
          if (screenWidth <= 650) return 1;
          if (screenWidth <= 900) return 2;
          return 3;
        }}
      />
    </div>
  );
}

export default Atsmosphere;
