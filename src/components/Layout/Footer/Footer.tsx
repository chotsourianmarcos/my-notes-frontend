import './Footer.css';
import { useContext } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';

function Footer() {
  const { strings } = useContext(LanguageContext);
  return (
      <div id="Footer__contnr" className='hor-ver-center-cnt exclude-mobile-res'>
        <div className='footer-item'>
          {strings.textContent.devDelopedBy}
        </div>
        <div className='footer-item'>
          {strings.textContent.devMailContact}
        </div>
        <div className='footer-item'>
          <a href="https://www.linkedin.com/in/marcos-chotsourian-019815207/">{strings.labels.linkedIn}</a>
        </div>
      </div>
  );
}

export default Footer;