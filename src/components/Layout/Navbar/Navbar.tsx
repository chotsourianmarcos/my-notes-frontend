import './Navbar.css';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Link, Outlet } from "react-router-dom";
import LoginResponseData from '../../../models/responses/loginResponseData';

function Nav() {
  const { isLogActive, user, setLogActive, setUserData } = useContext(UserContext);

  const logOut = () => {
    setUserData(new LoginResponseData());
    setLogActive(false);
  }

  const logItems = [
    {
      key: 0,
      itemRoute: "/login/",
      itemText: "Login",
    },
    {
      key: 1,
      itemRoute: "/register/",
      itemText: "Register"
    },
    {
      key: 2,
      itemRoute: "/settings/",
      itemText: "Settings"
    }
  ];

  const loggedItems = [
    {
      key: 0,
      itemRoute: "/",
      itemText: "Log out",
      onClick: () => logOut()
    },
    {
      key: 1,
      itemRoute: "/settings/",
      itemText: "Settings"
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
      <h4 className='exclude-mobile-res'>Welcome {user.userName}</h4>
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
        </nav>
      </div>
      <div id="main__cnt__contnr">
        <Outlet />
      </div>
    </>
  );
}

export default Nav;