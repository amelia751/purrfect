'use client';

import { useTranslation } from 'react-i18next';
import Header from '../Header';
import Footer from '../Footer';
import FadeImage from '../FadeImage';
import Reveal from '../Reveal';
import StoreInfo from './StoreInfo';
import About from './About';
import Discount from './Discount';
import Atsmosphere from './Atsmosphere';
import Rules from './Rules';
import CatsProfile from './CatsProfile';
import './HomePage.css';

function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="homepage">
      <Header />
      <FadeImage className="banner-img" src="/homepage/Banner.JPG" alt="purrfect banner" priority />
      <Reveal>
        <div className="infos">
          <h1>{t('storeInformation')}</h1>
        </div>
        <StoreInfo />
      </Reveal>
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <div className="discounts">
          <h1>{t('discount')}</h1>
        </div>
        <Discount />
      </Reveal>
      <Reveal>
        <Atsmosphere />
      </Reveal>
      <Reveal>
        <Rules />
      </Reveal>
      <div className="cats">
        <h1>{t('menuOptions.ourCats')}</h1>
      </div>
      <CatsProfile />
      <Footer />
    </div>
  );
}

export default HomePage;
