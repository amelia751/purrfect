'use client';

import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import FadeImage from './FadeImage';
import Reveal from './Reveal';
import './Concept.css';

function ConceptImage({ src, alt }) {
  return (
    <FadeImage
      src={src}
      alt={alt}
      optimizeWidth={1000}
      sizes="(max-width: 900px) 92vw, 42vw"
    />
  );
}

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
      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('ccTitle')}</h2>
          <p>{t('ccIntro')}</p>
        </div>
        <div className="concept-img-right">
          <ConceptImage src="/album/concept/conceptintro.png" alt="Woman and Cat" />
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-img-left">
          <ConceptImage src="/album/concept/conceptA.png" alt="Woman and Cat" />
        </div>
        <div className="concept-text">
          <h2>{t('cctA')}</h2>
          <p>{t('ccdA')}</p>
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('cctB')}</h2>
          <p>{t('ccdB')}</p>
        </div>
        <div className="concept-img-left">
          <ConceptImage src="/album/concept/conceptB.png" alt="Woman and Cat" />
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-img-right">
          <ConceptImage src="/album/concept/conceptC.png" alt="Woman and Cat" />
        </div>
        <div className="concept-text">
          <h2>{t('cctC')}</h2>
          <p>{t('ccdC')}</p>
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('cctD')}</h2>
          <p>{t('ccdD')}</p>
        </div>
        <div className="concept-img-right">
          <ConceptImage src="/album/concept/conceptD.png" alt="Woman and Cat" />
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-img-left">
          <ConceptImage src="/album/concept/conceptE.png" alt="Woman and Cat" />
        </div>
        <div className="concept-text">
          <h2>{t('cctE')}</h2>
          <p>{t('ccdE')}</p>
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('cctF')}</h2>
          <p>{t('ccdF')}</p>
        </div>
        <div className="concept-img-right">
          <ConceptImage src="/album/concept/conceptF.png" alt="Woman and Cat" />
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-img-left">
          <ConceptImage src="/album/concept/conceptG.png" alt="Woman and Cat" />
        </div>
        <div className="concept-text">
          <h2>{t('cctG')}</h2>
          <p>{t('ccdG')}</p>
        </div>
      </Reveal>
    </Fragment>
  );

  const renderContentForSmallScreen = () => (
    <Fragment>
      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('ccTitle')}</h2>
          <p>{t('ccIntro')}</p>
        </div>
        <div className="concept-img-right">
          <ConceptImage src="/album/concept/conceptintro.png" alt="Woman and Cat" />
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('cctA')}</h2>
          <p>{t('ccdA')}</p>
        </div>
        <div className="concept-img-left">
          <ConceptImage src="/album/concept/conceptA.png" alt="Woman and Cat" />
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('cctB')}</h2>
          <p>{t('ccdB')}</p>
        </div>
        <div className="concept-img-left">
          <ConceptImage src="/album/concept/conceptB.png" alt="Woman and Cat" />
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('cctC')}</h2>
          <p>{t('ccdC')}</p>
        </div>
        <div className="concept-img-right">
          <ConceptImage src="/album/concept/conceptC.png" alt="Woman and Cat" />
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('cctD')}</h2>
          <p>{t('ccdD')}</p>
        </div>
        <div className="concept-img-right">
          <ConceptImage src="/album/concept/conceptD.png" alt="Woman and Cat" />
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('cctE')}</h2>
          <p>{t('ccdE')}</p>
        </div>
        <div className="concept-img-left">
          <ConceptImage src="/album/concept/conceptE.png" alt="Woman and Cat" />
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('cctF')}</h2>
          <p>{t('ccdF')}</p>
        </div>
        <div className="concept-img-right">
          <ConceptImage src="/album/concept/conceptF.png" alt="Woman and Cat" />
        </div>
      </Reveal>

      <Reveal className="concept-content">
        <div className="concept-text">
          <h2>{t('cctG')}</h2>
          <p>{t('ccdG')}</p>
        </div>
        <div className="concept-img-left">
          <ConceptImage src="/album/concept/conceptG.png" alt="Woman and Cat" />
        </div>
      </Reveal>
    </Fragment>
  );

  return (
    <div className="concept">
      <Header />
      <div className="banner">
        <FadeImage className="concept-banner" src="/concept.jpeg" alt="Concept" priority optimizeWidth={1920} sizes="100vw" fit="cover" />
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
