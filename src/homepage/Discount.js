import React from 'react';
import { useTranslation } from 'react-i18next';
import './Discount.css';
import loyaltyimg from './loyalty.png';
import checkinimg from './checkin.jpg';
import happyhour from './happyhour.jpg';


function Discount() {
    const { t } = useTranslation(); 
  return (
    <div className='discount'>
        <div className='program-container'>
            <h2>{t('loyaltytitle')}</h2>
            <p>{t('loyaltydes')}</p>
            <img className='discount-img' src={loyaltyimg} />
        </div>
        <div className='program-container'>
            <h2>{t('checkintitle')}</h2>
            <p>{t('checkindes')}</p> 
            <img className='discount-img' src={checkinimg} />           
        </div>
        <div className='program-container'>
            <h2>{t('happytitle')}</h2>
            <p>{t('happydes')}</p> 
            <img className='discount-img' src={happyhour} />           
        </div>
    </div>
  )
}

export default Discount
