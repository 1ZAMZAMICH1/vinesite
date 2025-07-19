import React, { useState } from 'react';
import './Header.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className="app__header">
      <button
        className="menu__button"
        onClick={() => setToggleMenu(true)}
      >
        <GiHamburgerMenu />
      </button>

      <div className={`header__overlay ${toggleMenu ? 'open' : ''}`}>
        <MdOutlineRestaurantMenu
          className="overlay__close"
          onClick={() => setToggleMenu(false)}
        />
        <ul className="overlay__links">
          <li><a href="#home" onClick={() => setToggleMenu(false)}>Главная</a></li>
          <li><a href="#catalog" onClick={() => setToggleMenu(false)}>Коллекция</a></li>
          <li><a href="#about" onClick={() => setToggleMenu(false)}>О Нас</a></li>
          <li><a href="#contacts" onClick={() => setToggleMenu(false)}>Контакты</a></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;