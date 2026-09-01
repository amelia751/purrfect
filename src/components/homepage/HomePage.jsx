'use client';

import { useTranslation } from 'react-i18next';
import Header from '../Header';
import Footer from '../Footer';
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
      <img className="banner-img" src="/homepage/Banner.JPG" alt="purrfect banner" />
      <div className="infos">
        <h1>{t('storeInformation')}</h1>
      </div>
      <StoreInfo />
      <About />
      <div className="discounts">
        <h1>{t('discount')}</h1>
      </div>
      <Discount />
      <Atsmosphere />
      <Rules />
      <div className="cats">
        <h1>{t('menuOptions.ourCats')}</h1>
      </div>
      <CatsProfile />
      <Footer />
    </div>
  );
}

export default HomePage;
