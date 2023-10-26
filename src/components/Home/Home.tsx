import './Home.css';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

function Home() {
    const { strings } = useContext(LanguageContext);

    return (
        <>
        <div className='hor-ver-center-cnt full-height'>
            <h1 className='hor-ver-center-cnt'>{strings.textContent.homeWelcome}</h1>
        </div>
        </>
    );
}

export default Home;