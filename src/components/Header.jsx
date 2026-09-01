'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SpaIcon from '@mui/icons-material/Spa';
import PetsIcon from '@mui/icons-material/Pets';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import { initializeI18n } from '@/i18n';
import './Header.css';

const MenuOption = ({ Icon, title, onClick }) => {
  return (
    <div onClick={onClick} className="menuOption">
      {Icon && <Icon className="menuOption-icon" />}
      <p className="menuOption-title">{title}</p>
    </div>
  );
};

const languageMenuItems = [
  {
    label: 'Tiếng Việt',
    key: 'vi',
  },
  {
    label: 'English',
    key: 'en',
  },
];

function Header() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 0);
  };

  useEffect(() => {
    setMounted(true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuVisible) return undefined;

    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isMenuVisible]);

  const onClick = ({ key }) => {
    initializeI18n(key);
    i18n.changeLanguage(key);
  };

  const toggleMenuVisibility = () => setIsMenuVisible(!isMenuVisible);

  const go = (path) => {
    setIsMenuVisible(false);
    router.push(path);
  };

  const FullScreenMenu = () => {
    const overlay = (
      <div className={`overlay ${isMenuVisible ? 'show' : ''}`} aria-hidden={!isMenuVisible}>
        <img className="header-logo" src="/purrfect-logo-white.png" alt="purrfect logo" />
        <MenuOption Icon={SpaIcon} title={t('menuOptions.concept')} onClick={() => go('/concept')} />
        <MenuOption Icon={PetsIcon} title={t('menuOptions.ourCats')} onClick={() => go('/ourcats')} />
        <MenuOption Icon={RateReviewIcon} title={t('menuOptions.review')} onClick={() => go('/review')} />
        <MenuOption Icon={HelpOutlineIcon} title={t('menuOptions.faq')} onClick={() => go('/faq')} />
        <button className="closeButton" onClick={toggleMenuVisibility} type="button">&times;</button>
      </div>
    );

    if (!mounted) return null;
    return createPortal(overlay, document.body);
  };

  return (
    <div className={`header ${isSticky ? 'sticky' : ''}`}>
      <div className="header-left">
        <img
          className="header-logo"
          src="/purrfect-logo-white.png"
          alt="purrfect logo"
          onClick={() => router.push('/')}
        />
        <Dropdown
          menu={{
            items: languageMenuItems,
            onClick,
            className: 'custom-menu',
          }}
        >
          <a className="header-lang" onClick={(e) => e.preventDefault()}>
            <Space>
              {t('header.language')}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className="header-right">
        <div className="menu-container">
          <img className="fat-cat-img" src="/fat-cat.png" alt="Fat cat" />
          <button className="menu-button" onClick={toggleMenuVisibility} type="button">Menu</button>
          <FullScreenMenu />
        </div>
      </div>
    </div>
  );
}

export default Header;
