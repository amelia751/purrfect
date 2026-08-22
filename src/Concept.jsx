import React, { useEffect, useState } from 'react';
import './Concept.css';
import Header from './Header';
import Footer from './Footer';
import ConceptBanner from './concept.jpeg';
import conceptintro from './album/concept/conceptintro.png';
import conceptA from './album/concept/conceptA.png';
import conceptB from './album/concept/conceptB.png';
import conceptC from './album/concept/conceptC.png';
import conceptD from './album/concept/conceptD.png';
import conceptE from './album/concept/conceptE.png';
import conceptF from './album/concept/conceptF.png';
import conceptG from './album/concept/conceptG.png';

import { useTranslation } from 'react-i18next';


function Concept() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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
        <React.Fragment>
        <div className="concept-content">
        <div className="concept-text">
            <h2>{t('ccTitle')}</h2>
            <p>{t('ccIntro')}</p> </div>
        <div className='concept-img-right'>
            <img src={conceptintro} alt="Woman and Cat" />
        </div>
    </div>

    <div className="concept-content">
        <div className='concept-img-left'>
            <img src={conceptA} alt="Woman and Cat" />
        </div>
        <div className="concept-text">
            <h2>{t('cctA')}</h2>
            <p>{t('ccdA')}</p> </div>
    </div>

    <div className="concept-content">
        <div className="concept-text">
            <h2>{t('cctB')}</h2>
            <p>{t('ccdB')}</p> </div>
        <div className='concept-img-left'>
            <img src={conceptB} alt="Woman and Cat" />
        </div>
    </div>

    <div className="concept-content">
        <div className='concept-img-right'>
            <img src={conceptC} alt="Woman and Cat" />
        </div>
        <div className="concept-text">
            <h2>{t('cctC')}</h2>
            <p>{t('ccdC')}</p> </div>
    </div>

    <div className="concept-content">
        <div className="concept-text">
            <h2>{t('cctD')}</h2>
            <p>{t('ccdD')}</p> </div>
        <div className='concept-img-right'>
            <img src={conceptD} alt="Woman and Cat" />
        </div>
    </div>

    <div className="concept-content">
        <div className='concept-img-left'>
            <img src={conceptE} alt="Woman and Cat" />
        </div>
        <div className="concept-text">
            <h2>{t('cctE')}</h2>
            <p>{t('ccdE')}</p> </div>
    </div>

    <div className="concept-content">
        <div className="concept-text">
            <h2>{t('cctF')}</h2>
            <p>{t('ccdF')}</p> </div>
        <div className='concept-img-right'>
            <img src={conceptF} alt="Woman and Cat" />
        </div>
    </div>

    <div className="concept-content">
        <div className='concept-img-left'>
            <img src={conceptG} alt="Woman and Cat" />
        </div>
        <div className="concept-text">
            <h2>{t('cctG')}</h2>
            <p>{t('ccdG')}</p> </div>
    </div>

    </React.Fragment>     );

    const renderContentForSmallScreen = () => (
    <React.Fragment>
        <div className="concept-content">
        <div className="concept-text">
            <h2>{t('ccTitle')}</h2>
            <p>{t('ccIntro')}</p> </div>
        <div className='concept-img-right'>
            <img src={conceptintro} alt="Woman and Cat" />
        </div>
    </div>

    <div className="concept-content">
        <div className="concept-text">
            <h2>{t('cctA')}</h2>
            <p>{t('ccdA')}</p> </div>
       <div className='concept-img-left'>
            <img src={conceptA} alt="Woman and Cat" />
        </div>
    </div>

    <div className="concept-content">
        <div className="concept-text">
            <h2>{t('cctB')}</h2>
            <p>{t('ccdB')}</p> </div>
        <div className='concept-img-left'>
            <img src={conceptB} alt="Woman and Cat" />
        </div>
    </div>

    <div className="concept-content">
        <div className="concept-text">
            <h2>{t('cctC')}</h2>
            <p>{t('ccdC')}</p> </div>
       <div className='concept-img-right'>
            <img src={conceptC} alt="Woman and Cat" />
        </div>
    </div>

    <div className="concept-content">
        <div className="concept-text">
            <h2>{t('cctD')}</h2>
            <p>{t('ccdD')}</p> </div>
        <div className='concept-img-right'>
            <img src={conceptD} alt="Woman and Cat" />
        </div>
    </div>

    <div className="concept-content">
        <div className="concept-text">
            <h2>{t('cctE')}</h2>
            <p>{t('ccdE')}</p> </div>
       <div className='concept-img-left'>
            <img src={conceptE} alt="Woman and Cat" />
        </div>
    </div>

    <div className="concept-content">
        <div className="concept-text">
            <h2>{t('cctF')}</h2>
            <p>{t('ccdF')}</p> </div>
        <div className='concept-img-right'>
            <img src={conceptF} alt="Woman and Cat" />
        </div>
    </div>

    <div className="concept-content">
        <div className="concept-text">
            <h2>{t('cctG')}</h2>
            <p>{t('ccdG')}</p> </div>
       <div className='concept-img-left'>
            <img src={conceptG} alt="Woman and Cat" />
        </div>
    </div>        
    </React.Fragment>

    );

  return (
    <div className="concept">
        <Header />
        <div className="banner">
            <img className='concept-banner' src={ConceptBanner} alt="Concept" />
            <h1>{t('menuOptions.concept')}</h1>
        </div>
        <div className='body'>
        {screenWidth >= 1400 ? renderContentForLargeScreen() : renderContentForSmallScreen()}
        </div> 
        <Footer />

    </div>

  )
}

export default Concept