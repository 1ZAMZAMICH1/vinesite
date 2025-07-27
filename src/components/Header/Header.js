import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <header className="app__header">
      <button className="menu__button" onClick={() => setToggleMenu(true)}><GiHamburgerMenu /></button>
      <div className={`header__overlay ${toggleMenu ? 'open' : ''}`}>
        <MdOutlineRestaurantMenu className="overlay__close" onClick={() => setToggleMenu(false)} />
        <ul className="overlay__links">
          <li><Link to="/" onClick={() => setToggleMenu(false)}>Главная</Link></li>
          <li><Link to="/vinoteka" onClick={() => setToggleMenu(false)}>Винотека</Link></li>
          <li><Link to="/menu" onClick={() => setToggleMenu(false)}>Меню</Link></li>
          <li><Link to="/events" onClick={() => setToggleMenu(false)}>События</Link></li> {/* <-- ДОБАВЛЯЕМ ССЫЛКУ */}
          <li><a href="/#booking" onClick={() => setToggleMenu(false)}>Бронь</a></li>
        </ul>
      </div>
    </header>
  );
};
export default Header;