import './Header.css';
import { useContext } from 'react';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { values } from '../../../constants/values';
import translateIcon from '../../../assets/images/translation-icon.svg';

type HeaderProps = {
  isMobile: boolean;
}

function Header(props:HeaderProps) {
  const { strings, setLanguage, language } = useContext(LanguageContext);

  const selectLanguage = (e: any) => {
    const value = e.target.value;
    setLanguage(value);
  }

  if (props.isMobile) {
    return (
      <div className='hor-ver-center-cnt exclude-desktop-res exclude-tablet-res'>
        <div id='translate__contnr'>
          <img alt="translate" src={translateIcon} id='translate__icon' />
          <select value={language} onChange={selectLanguage} id="language__selector__dropd">
            <option value={values.english}>{values.englishName}</option>
            <option value={values.spanish}>{values.spanishName}</option>
          </select>
        </div>
      </div>
    );
  } else {
    return (
      <div id="Header__contnr" className='exclude-mobile-res'>
        <div id="Header__signature" className='hor-ver-center-cnt'>
          <p>{strings.labels.headerTitle}</p>
        </div>
        <div id="Header__title" className='hor-ver-center-cnt'>
          <p>{strings.textContent.headerPhrase}</p>
        </div>
        <div className='hor-ver-center-cnt'>
          <div id='translate__contnr'>
            <img alt="translate" src={translateIcon} id='translate__icon' />
            <select value={language} onChange={selectLanguage} id="language__selector__dropd">
              <option value={values.english}>{values.englishName}</option>
              <option value={values.spanish}>{values.spanishName}</option>
            </select>
          </div>
        </div>
      </div>

    );
  }
}

export default Header;