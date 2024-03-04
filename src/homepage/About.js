import React from 'react'
import { useTranslation } from 'react-i18next';
import './About.css';
import enprice from './purrfect-en-price.png';
import viprice from './purrfect-vi-price.png';

function About() {
    const { t, i18n } = useTranslation();
    const getImage = () => {
        return i18n.language === 'vi' ? viprice : enprice;
      };
  return (
    <div className='about-us'>
        <h1>{t('aboutUsTitle')}</h1>
        <div className='about-info-container'>
            <img src={getImage()} alt="Price" />
            <div className='about-info'>
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
  )
}

export default About
