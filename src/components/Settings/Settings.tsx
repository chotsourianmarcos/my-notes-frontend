import './Settings.css';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useContext, useState } from 'react';
import SettingsFormData from '../../models/forms/settingsFormData';

function Settings(this: any) {
  const { strings, setLanguage } = useContext(LanguageContext);

  const [settings, setSettings] = useState(new SettingsFormData);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setLanguage(settings.language);
  };

  const toggleLabel = (event: any) => {
    const value = event.target.id;
    setSettings((values: any) => ({ ...values, ['language']: value }));
  }

  const setClassNames = (lang: string, className: string) => {
    if (lang == settings.language) {
      return className + ' lbl__isActive';
    } else {
      return className + ' lbl__isInactive';
    }
  }

  return (
    <div className='hor-ver-center-cnt'>
      <form noValidate onSubmit={handleSubmit} className='card bg-light mb-3 hor-ver-center-cnt'>
        <div>
          <h5 className='hor-ver-center-cnt'>Settings</h5>
          <br></br>
        </div>
        <div className='inpt-contnr hor-ver-center-cnt'>
          <div className='dflt-column hor-ver-center-cnt margin-right-10'>
            <label>
              Language/Idioma:
            </label>
          </div>
          <div className='dflt-column hor-ver-center-cnt'>
            <label className={setClassNames("EN", 'dflt__lbl')} onClick={toggleLabel} id="EN">English</label>
          </div>
          <div className='dflt-column hor-ver-center-cnt'>
          <label className={setClassNames("ES", 'dflt__lbl')} onClick={toggleLabel} id="ES">Español</label>
          </div>
        </div>
        <br></br>
        <div className='hor-ver-center-cnt'>
          <button className='dflt-btn' type="submit">Accept</button>
          <label>
              Test: {strings.headers.newNote}
            </label>
        </div>
      </form >
    </div >
  );
};

export default Settings;