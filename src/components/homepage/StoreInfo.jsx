'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchSiteSettings } from '@/lib/content';
import './StoreInfo.css';

const BasicInfo = ({ title, description }) => {
  return (
    <div className="basic-info">
      <p className="info-title">{title}</p>
      <p className="info-description">{description}</p>
    </div>
  );
};

const MAP_PLACE_QUERY = 'Purrfect Coffee, 8-10 Hoa Tra, Phu Nhuan, Ho Chi Minh City, Vietnam';

function StoreInfo() {
  const { t, i18n } = useTranslation();
  const [site, setSite] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings(i18n.resolvedLanguage || i18n.language).then((next) => {
      if (!cancelled) setSite(next);
    });
    return () => {
      cancelled = true;
    };
  }, [i18n.language, i18n.resolvedLanguage]);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const mapSrc = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(MAP_PLACE_QUERY)}`
    : `https://www.google.com/maps?q=${encodeURIComponent(MAP_PLACE_QUERY)}&output=embed`;

  return (
    <div className="store-info">
      <div className="map-container">
        <div className="store-map">
          <iframe
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={mapSrc}
            title="Purrfect Coffee map"
          />
        </div>
      </div>
      <div className="store-basic">
        <BasicInfo title={t('addressTitle')} description={site?.address || t('addressDescription')} />
        <BasicInfo title={t('phoneNumberTitle')} description={site?.phone || t('phoneNumberDescription')} />
        <BasicInfo title={t('businessHoursTitle')} description={site?.hours || t('businessHoursDescription')} />
        <BasicInfo title={t('priceTitle')} description={site?.price || t('priceDescription')} />
        <BasicInfo title={t('amenitiesTitle')} description={site?.amenities || t('amenitiesDescription')} />
      </div>
    </div>
  );
}

export default StoreInfo;
