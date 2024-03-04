import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './StoreInfo.css';

const BasicInfo = ({ title, description }) => {
  return (
    <div className="basic-info">
      <p className="info-title">{title}</p>
      <p className="info-description">{description}</p>
    </div>
  );
};

function StoreInfo() {
  const { t } = useTranslation(); 

  const iframeCode = `<iframe width="100%" height="400" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=place_id:Eks4IEhvYSBUcsOgLCBQaMaw4budbmcgNywgUGjDuiBOaHXhuq1uLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0iMBIuChQKEgkPxXsCzyh1MRErI-rB-gjFwBAIKhQKEgnLMnoCzyh1MREjRlCpsIkyEA&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}"></iframe>`;

  return (
    <div className="store-info">
      <div className='map-container'>
        <div className='store-map' dangerouslySetInnerHTML={{ __html: iframeCode }} />
      </div>
      <div className='store-basic'>
        <BasicInfo title={t('addressTitle')} description={t('addressDescription')} />
        <BasicInfo title={t('phoneNumberTitle')} description={t('phoneNumberDescription')} />
        <BasicInfo title={t('businessHoursTitle')} description={t('businessHoursDescription')} />
        <BasicInfo title={t('priceTitle')} description={t('priceDescription')} />
        <BasicInfo title={t('amenitiesTitle')} description={t('amenitiesDescription')} />
      </div>
    </div>
  );
}

export default StoreInfo;


