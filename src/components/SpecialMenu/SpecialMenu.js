import React from 'react';
import './SpecialMenu.css';
import menuImage from '../../assets/menu-img.png';
import spoon from '../../assets/spoon.svg';

const data = {
  wines: [
    { title: 'Chapel Hill Shiraz', price: '₽5,900', tags: 'Австралия | Бутылка' },
    { title: 'Catena Malbec', price: '₽6,500', tags: 'Аргентина | Бутылка' },
    { title: 'La Vieille Rosé', price: '₽4,800', tags: 'Франция | 750мл' },
    { title: 'Rhino Pale Ale', price: '₽3,100', tags: 'США | 750мл' },
  ],
  cocktails: [
    { title: 'Aperol Spritz', price: '₽2,000', tags: 'Aperol | Villa Marchesi prosecco | содовая' },
    { title: "Dark 'N' Stormy", price: '₽1,600', tags: 'Темный ром | Имбирное пиво | Ломтик лайма' },
    { title: 'Daiquiri', price: '₽1,800', tags: 'Ром | Цитрусовый сок | Сахар' },
    { title: 'Old Fashioned', price: '₽3,100', tags: 'Бурбон | Коричневый сахар | Биттер Ангостура' },
  ],
};

const MenuItem = ({ title, price, tags }) => (
  <div className="app__menuitem">
    <div className="app__menuitem-head">
      <div className="app__menuitem-name"><p>{title}</p></div>
      <div className="app__menuitem-dash" />
      <div className="app__menuitem-price"><p>{price}</p></div>
    </div>
    <div className="app__menuitem-sub"><p>{tags}</p></div>
  </div>
);


const SpecialMenu = () => {
  return (
    <div className="app__specialMenu section__padding" id="menu">
      <div className="app__specialMenu-title" data-aos="fade-up">
        <h1 className="heading-text">Выбор Сомелье</h1>
        <img src={spoon} alt="spoon_img" className="spoon__img" />
      </div>

      <div className="app__specialMenu-menu">
        <div className="app__specialMenu-menu_wine" data-aos="fade-right" data-aos-delay="200">
          <p className="app__specialMenu-menu_heading">Красные и Розовые</p>
          <div className="app__specialMenu_menu_items">
            {data.wines.map((wine, index) => (
              <MenuItem key={wine.title + index} title={wine.title} price={wine.price} tags={wine.tags} />
            ))}
          </div>
        </div>

        <div className="app__specialMenu-menu_img" data-aos="zoom-in" data-aos-delay="100">
          <img src={menuImage} alt="menu__img" />
        </div>

        <div className="app__specialMenu-menu_cocktails" data-aos="fade-left" data-aos-delay="200">
          <p className="app__specialMenu-menu_heading">Белые и Игристые</p>
          <div className="app__specialMenu_menu_items">
            {data.cocktails.map((cocktail, index) => (
              <MenuItem key={cocktail.title + index} title={cocktail.title} price={cocktail.price} tags={cocktail.tags} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialMenu;