'use client';

import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import './Concept.css';

function ConceptPage() {
  const [screenWidth, setScreenWidth] = useState(1400);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderContentForLargeScreen = () => (
    <Fragment>
      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('ccTitle')}</h2>
          <p>{t('ccIntro')}</p>
        </div>
        <div className="concept-img-right">
          <img src="/album/concept/conceptintro.png" alt="Woman and Cat" />
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-img-left">
          <img src="/album/concept/conceptA.png" alt="Woman and Cat" />
        </div>
        <div className="concept-text">
          <h2>{t('cctA')}</h2>
          <p>{t('ccdA')}</p>
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('cctB')}</h2>
          <p>{t('ccdB')}</p>
        </div>
        <div className="concept-img-left">
          <img src="/album/concept/conceptB.png" alt="Woman and Cat" />
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-img-right">
          <img src="/album/concept/conceptC.png" alt="Woman and Cat" />
        </div>
        <div className="concept-text">
          <h2>{t('cctC')}</h2>
          <p>{t('ccdC')}</p>
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('cctD')}</h2>
          <p>{t('ccdD')}</p>
        </div>
        <div className="concept-img-right">
          <img src="/album/concept/conceptD.png" alt="Woman and Cat" />
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-img-left">
          <img src="/album/concept/conceptE.png" alt="Woman and Cat" />
        </div>
        <div className="concept-text">
          <h2>{t('cctE')}</h2>
          <p>{t('ccdE')}</p>
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('cctF')}</h2>
          <p>{t('ccdF')}</p>
        </div>
        <div className="concept-img-right">
          <img src="/album/concept/conceptF.png" alt="Woman and Cat" />
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-img-left">
          <img src="/album/concept/conceptG.png" alt="Woman and Cat" />
        </div>
        <div className="concept-text">
          <h2>{t('cctG')}</h2>
          <p>{t('ccdG')}</p>
        </div>
      </div>
    </Fragment>
  );

  const renderContentForSmallScreen = () => (
    <Fragment>
      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('ccTitle')}</h2>
          <p>{t('ccIntro')}</p>
        </div>
        <div className="concept-img-right">
          <img src="/album/concept/conceptintro.png" alt="Woman and Cat" />
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('cctA')}</h2>
          <p>{t('ccdA')}</p>
        </div>
        <div className="concept-img-left">
          <img src="/album/concept/conceptA.png" alt="Woman and Cat" />
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('cctB')}</h2>
          <p>{t('ccdB')}</p>
        </div>
        <div className="concept-img-left">
          <img src="/album/concept/conceptB.png" alt="Woman and Cat" />
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('cctC')}</h2>
          <p>{t('ccdC')}</p>
        </div>
        <div className="concept-img-right">
          <img src="/album/concept/conceptC.png" alt="Woman and Cat" />
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('cctD')}</h2>
          <p>{t('ccdD')}</p>
        </div>
        <div className="concept-img-right">
          <img src="/album/concept/conceptD.png" alt="Woman and Cat" />
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('cctE')}</h2>
          <p>{t('ccdE')}</p>
        </div>
        <div className="concept-img-left">
          <img src="/album/concept/conceptE.png" alt="Woman and Cat" />
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('cctF')}</h2>
          <p>{t('ccdF')}</p>
        </div>
        <div className="concept-img-right">
          <img src="/album/concept/conceptF.png" alt="Woman and Cat" />
        </div>
      </div>

      <div className="concept-content">
        <div className="concept-text">
          <h2>{t('cctG')}</h2>
          <p>{t('ccdG')}</p>
        </div>
        <div className="concept-img-left">
          <img src="/album/concept/conceptG.png" alt="Woman and Cat" />
        </div>
      </div>
    </Fragment>
  );

  return (
    <div className="concept">
      <Header />
      <div className="banner">
        <img className="concept-banner" src="/concept.jpeg" alt="Concept" />
        <h1>{t('menuOptions.concept')}</h1>
      </div>
      <div className="body">
        {screenWidth >= 1400 ? renderContentForLargeScreen() : renderContentForSmallScreen()}
      </div>
      <Footer />
    </div>
  );
}

export default ConceptPage;
