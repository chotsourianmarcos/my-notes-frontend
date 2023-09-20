import './Navbar.css';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Link, Outlet, useNavigate } from "react-router-dom";
import LoginResponseData from '../../../models/responses/loginResponseData';
// import { slide as Menu } from 'react-burger-menu';

function Nav() {

  const { isLogActive, user, setLogActive, setUserData } = useContext(UserContext);

  const logOut = () => {
    setUserData(new LoginResponseData());
    setLogActive(false);
  }

  const logItems =
    [
      {
        key: 0,
        itemRoute: "/login/",
        itemText: "Login",
      },
      {
        key: 1,
        itemRoute: "/register/",
        itemText: "Register"
      }
    ];

  const loggedItems =
    [
      {
        key: 0,
        itemRoute: "/",
        itemText: "Log out",
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
      {/* <button className="dflt-btn nav-btn">
        <Link to="/login/">Login</Link>
      </button>
      <button className="dflt-btn nav-btn">
        <Link to="/register/">Register</Link>
      </button> */}
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
      {/* <button className="dflt-btn nav-btn">
        <Link to="/" onClick={logOut}>Log out</Link>
      </button> */}
    </>
  )
  // const logBurgerAnchors = (
  //   <>
  //     {logItems.map((i: any) => (
  //       <Link key={loggedItems.indexOf(i)} to={i.itemRoute} className="menu-item">{i.itemText}</Link>
  //     ))}
  //   </>
  // )
  // const loggedBurgerAnchors = (
  //   <>
  //     {loggedItems.map((i: any) => (
  //       <Link key={loggedItems.indexOf(i)} to={i.itemRoute} onClick={i.onClick} className="menu-item">{i.itemText}</Link>
  //     ))}
  //   </>
  // )

  return (
    <>
      <div id="Navbar__contnr" className='hor-ver-center-cnt'>
        {/* <div id="navbar__contnr" className='ver-center-cnt'> */}
          <nav id="navbar">
            <ul id='nav__btns__contnr'>
              {isLogActive ? loggedButtons : logButtons}
            </ul>
            {/* <div className='exclude-desktop-res exclude-tablet-res'>
              <Menu>
                {isLogActive ? loggedBurgerAnchors : logBurgerAnchors}
              </Menu>
            </div> */}
          </nav>
        </div>
        <div id="main__cnt__contnr">
          <Outlet />
        </div>
      {/* </div> */}
    </>
  );
}

export default Nav;