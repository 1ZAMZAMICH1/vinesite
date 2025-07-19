import React from 'react';
import './AboutUs.css';
import aboutImage from '../../assets/about-bg.jpg';
import spoon from '../../assets/spoon.svg';

const AboutUs = () => {
  return (
    <section className="app__aboutus section__padding" id="about">
      <div className="app__aboutus-content">

        <div className="app__aboutus-content_about" data-aos="fade-up-right">
          <h1 className="heading-text">О Нас</h1>
          <img src={spoon} alt="about_spoon" className="spoon__img" />
          <p className="p-text">Мы верим, что вино – это не просто напиток, а история, заключенная в бутылку. Наша миссия — находить и делиться самыми выдающимися историями со всего мира.</p>
          <button type="button" className="custom__button">Узнать больше</button>
        </div>

        <div className="app__aboutus-content_image" data-aos="zoom-in" data-aos-delay="200">
          <img src={aboutImage} alt="about_image" />
        </div>

        <div className="app__aboutus-content_about" data-aos="fade-up-left">
          <h1 className="heading-text">Наша Философия</h1>
          <img src={spoon} alt="about_spoon" className="spoon__img" style={{ transform: 'rotate(180deg)' }} />
          <p className="p-text">Каждая бутылка в нашей коллекции — результат тщательного отбора. Мы ценим традиции, уважаем инновации и стремимся к совершенству в каждой детали.</p>
          <button type="button" className="custom__button">Наша Коллекция</button>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;