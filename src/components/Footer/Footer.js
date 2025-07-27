import React from 'react';
import './Footer.css';
import spoon from '../../assets/spoon.svg';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => (
  <section className="app__footer section__padding">
    <div className="app__footer-links">
      <div className="app__footer-links_contact" data-aos="fade-up" data-aos-delay="200">
        <h1 className="app__footer-headtext">Свяжитесь с нами</h1>
        <p className="p-text" style={{color: '#AAA'}}>пр. Республики, 6А, Шымкент</p>
        <p className="p-text" style={{color: '#AAA'}}>+7 (707) 123-45-67</p>
      </div>

      <div className="app__footer-links_logo" data-aos="fade-up">
        <h1 className="logo-text">Vinopark</h1>
        <p className="p-text" style={{color: '#AAA'}}>"Лучший способ быть счастливым — это делиться счастьем с другими."</p>
        {/* ВОТ ЗДЕСЬ, БЛЯТЬ, БЫЛ КОСЯК */}
        <img src={spoon} alt="spoon" className="spoon__img" style={{ marginTop: 15 }} />
        <div className="app__footer-links_icons">
          <FiFacebook />
          <FiTwitter />
          <FiInstagram />
        </div>
      </div>

      <div className="app__footer-links_work" data-aos="fade-up" data-aos-delay="200">
        <h1 className="app__footer-headtext">Часы Работы</h1>
        <p className="p-text" style={{color: '#AAA'}}>Понедельник-Пятница:</p>
        <p className="p-text" style={{color: '#AAA'}}>12:00 - 00:00</p>
        <p className="p-text" style={{color: '#AAA'}}>Суббота-Воскресенье:</p>
        <p className="p-text" style={{color: '#AAA'}}>12:00 - 02:00</p>
      </div>
    </div>

    <div className="footer__copyright">
      <p className="p-text" style={{color: '#AAA'}}>2024 Vinopark. Все права защищены.</p>
    </div>
  </section>
);

export default Footer;