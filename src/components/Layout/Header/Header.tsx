import './Header.css';

function Header() {
  return (
    <div id="Header__contnr" className='exclude-mobile-res'>
      <div id="Header__signature" className='hor-ver-center-cnt'>
        <p>My Notes</p>
      </div>
      <div id="Header__title" className='hor-ver-center-cnt'>
        <p>Note. Tag. Filter. Work flowing, mind clear.</p>
      </div>
    </div>
  );
}

export default Header;