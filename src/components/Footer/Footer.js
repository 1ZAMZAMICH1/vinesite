import React from 'react';
import './Footer.css';
import spoon from '../../assets/spoon.svg';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => (
  <section className="app__footer section__padding">
    <div className="app__footer-links">
      <div className="app__footer-links_contact">
        <h1 className="app__footer-headtext">Свяжитесь с нами</h1>
        <p className="p-text">ул. Винная, 9, Москва, Россия</p>
        <p className="p-text">+7 (999) 123-45-67</p>
      </div>

      <div className="app__footer-links_logo">
        <h1 className="app__footer-headtext" style={{ fontFamily: 'var(--font-accent)', fontSize: '48px', color: 'var(--accent-gold)'}}>Vinum</h1>
        <p className="p-text">"Лучший способ быть счастливым — это делиться счастьем с другими."</p>
        <img src={spoon} className="spoon__img" style={{ marginTop: 15 }} alt="spoon" />
        <div className="app__footer-links_icons">
          <FiFacebook />
          <FiTwitter />
          <FiInstagram />
        </div>
      </div>

      <div className="app__footer-links_work">
        <h1 className="app__footer-headtext">Часы Работы</h1>
        <p className="p-text">Понедельник-Пятница:</p>
        <p className="p-text">10:00 - 00:00</p>
        <p className="p-text">Суббота-Воскресенье:</p>
        <p className="p-text">10:00 - 02:00</p>
      </div>
    </div>

    <div className="footer__copyright">
      <p className="p-text">2024 Vinum. Все права защищены.</p>
    </div>
  </section>
);

export default Footer;