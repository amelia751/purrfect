import React from 'react';
import './Footer.css';
import FooterImage from './Footer.png';
import InstaIcon from './instagram.png';
import FBIcon from './facebook.png'
import TiktokIcon from './tiktok.png'

function Footer() {
  return (
    <div className='footer'>
            <div className="social-icons">
              <a href="https://www.facebook.com/purrfectvietnam" target="_blank" rel="noopener noreferrer">
                <img className='facebook-icon' src={FBIcon} alt="Facebook"/>
              </a>
              <a href="https://www.instagram.com/purrfectcoffee_vn/" target="_blank" rel="noopener noreferrer">
                <img className='insta-icon' src={InstaIcon} alt="Instagram"/>
              </a>
              <a href="https://www.tiktok.com/@purrfect_coffee" target="_blank" rel="noopener noreferrer">
                <img className='tiktok-icon' src={TiktokIcon} alt="TikTok"/>
              </a>
            </div>
            <img className='footer-img' src={FooterImage} alt="Footer"/>
            <span>@2024 Purrfect Coffee All Rights Reserved.</span>         

    </div>
              );
}

export default Footer;