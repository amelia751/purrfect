'use client';

import { useTranslation } from 'react-i18next';
import FadeImage from '../FadeImage';
import './Discount.css';

function Discount() {
  const { t } = useTranslation();
  return (
    <div className="discount">
      <div className="program-container">
        <h2>{t('loyaltytitle')}</h2>
        <p>{t('loyaltydes')}</p>
        <FadeImage className="discount-img" src="/homepage/loyalty.png" alt="" />
      </div>
      <div className="program-container">
        <h2>{t('checkintitle')}</h2>
        <p>{t('checkindes')}</p>
        <FadeImage className="discount-img" src="/homepage/checkin.jpg" alt="" />
      </div>
      <div className="program-container">
        <h2>{t('happytitle')}</h2>
        <p>{t('happydes')}</p>
        <FadeImage className="discount-img" src="/homepage/happyhour.jpg" alt="" />
      </div>
    </div>
  );
}

export default Discount;
