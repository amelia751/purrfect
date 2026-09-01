import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="social-icons">
        <a href="https://www.facebook.com/purrfectvietnam" target="_blank" rel="noopener noreferrer">
          <img className="facebook-icon" src="/facebook.png" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/purrfectcoffee_vn/" target="_blank" rel="noopener noreferrer">
          <img className="insta-icon" src="/instagram.png" alt="Instagram" />
        </a>
        <a href="https://www.tiktok.com/@purrfect_coffee" target="_blank" rel="noopener noreferrer">
          <img className="tiktok-icon" src="/tiktok.png" alt="TikTok" />
        </a>
      </div>
      <img className="footer-img" src="/footer.png" alt="Footer" />
      <span>@2024 Purrfect Coffee All Rights Reserved.</span>
    </div>
  );
}

export default Footer;
