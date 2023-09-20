import './Layout.css';
import Header from "./Header/Header";
import Nav from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { AlertContext } from '../../contexts/AlertContext';
import AlertModal from '../AlertModal/AlertModal';
import { useContext } from 'react';

function Layout() {

  const { modalValues } = useContext(AlertContext);
  
  return (
    <div id="Layout__frm">
      <div id="Layout" className='frm-bor'>
        <Header />
        <Nav />
        <div id="footer__separator" className='exclude-mobile-res'>
        </div>
        <Footer />
        <AlertModal { ...modalValues }/>
      </div>
    </div>
  );
}

export default Layout;