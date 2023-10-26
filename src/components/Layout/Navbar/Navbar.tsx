import './Navbar.css';
import { useContext } from 'react';
import { Link, Outlet } from "react-router-dom";
import { LanguageContext } from '../../../contexts/LanguageContext';
import { UserContext } from '../../../contexts/UserContext';
import Header from '../Header/Header';
import LoginResponseData from '../../../models/responses/loginResponseData';
import { routes } from '../../../constants/values';

function Nav() {
  const { strings } = useContext(LanguageContext);
  const { isLogActive, user, setLogActive, setUserData } = useContext(UserContext);

  const logOut = () => {
    setUserData(new LoginResponseData());
    setLogActive(false);
  }

  const logItems = [
    {
      key: 0,
      itemRoute: routes.login,
      itemText: strings.labels.login,
    },
    {
      key: 1,
      itemRoute: routes.register,
      itemText:strings.labels.register
    }
  ];

  const loggedItems = [
    {
      key: 0,
      itemRoute: "/",
      itemText: strings.labels.logOut,
      onClick: () => logOut()
    }
  ];

  const logButtons = (
    <>
      {logItems.map((i: any) => (
        <button key={i.key} className="dflt-btn nav-btn">
          <Link to={i.itemRoute}>{i.itemText}</Link>
        </button>
      ))}
    </>
  )
  const loggedButtons = (
    <>
      <h4 className='exclude-mobile-res'>{strings.labels.welcome + " " + user.userName}</h4>
      {loggedItems.map((i: any) => (
        <button key={i.key} className="dflt-btn nav-btn">
          <Link to={i.itemRoute} onClick={i.onClick}>{i.itemText}</Link>
        </button>
      ))}
    </>
  )

  return (
    <>
      <div id="Navbar__contnr" className='hor-ver-center-cnt'>
        <nav id="navbar">
          <ul id='nav__btns__contnr'>
            {isLogActive ? loggedButtons : logButtons}
          </ul>
          <Header isMobile={true} />
        </nav>
      </div>
      <div id="main__cnt__contnr">
        <Outlet />
      </div>
    </>
  );
}

export default Nav;