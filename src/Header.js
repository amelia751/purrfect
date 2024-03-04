import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import WhiteLogo from './purrfect-logo-white.png';
import { Menu, Dropdown, Space, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SpaIcon from '@mui/icons-material/Spa';
import PetsIcon from '@mui/icons-material/Pets';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { initializeI18n } from './i18n';
import fatcatimg from './fat-cat.png';

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
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsSticky(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onClick = ({ key }) => {
    initializeI18n(key);
    i18n.changeLanguage(key);
  };

  const toggleMenuVisibility = () => setIsMenuVisible(!isMenuVisible);

  const FullScreenMenu = () => (
    <div className={`overlay ${isMenuVisible ? 'show' : ''}`}>
      <img className='header-logo' src={WhiteLogo} alt='purrfect logo' />
      <MenuOption Icon={SpaIcon} title={t('menuOptions.concept')} onClick={() => navigate('/concept')} />
      <MenuOption Icon={PetsIcon} title={t('menuOptions.ourCats')} onClick={() => navigate('/ourcats')} />
      <MenuOption Icon={RateReviewIcon} title={t('menuOptions.review')} onClick={() => navigate('/review')} />
      <MenuOption Icon={HelpOutlineIcon} title={t('menuOptions.faq')} onClick={() => navigate('/faq')} />
      <button className="closeButton" onClick={toggleMenuVisibility}>&times;</button>    </div>
  );

  return (
    <div className={`header ${isSticky ? 'sticky' : ''}`}>
      <div className='header-left'>
        <img className='header-logo' src={WhiteLogo} alt='purrfect logo' onClick={() => navigate('/')}/>
        <Dropdown overlay={<Menu onClick={onClick} className="custom-menu">{languageMenuItems.map(item => <Menu.Item key={item.key}>{item.label}</Menu.Item>)}</Menu>}>
          <a className="header-lang" onClick={(e) => e.preventDefault()}>
            <Space>
              {t('header.language')}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className='header-right'>
        <div className="menu-container">
          <img className="fat-cat-img" src={fatcatimg} alt="Fat cat" />
          <button className="menu-button" onClick={toggleMenuVisibility}>Menu</button>
          {isMenuVisible && <FullScreenMenu />}
        </div>
      </div>
    </div>
  );
}


export default Header;


