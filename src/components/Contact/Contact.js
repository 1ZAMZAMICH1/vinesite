import React from 'react';
import './Contact.css';
import mapImage from '../../assets/map.png';

const Contact = () => {
  return (
    <section className="app__contact" id="contacts">
      <div className="app__contact-container">
        <div className="app__contact-map" data-aos="zoom-in-up" data-aos-duration="1000">
          <img src={mapImage} alt="Карта расположения" />
        </div>

        <div className="app__contact-info" data-aos="zoom-in-down" data-aos-duration="1000" data-aos-delay="200">
            <h1>Контакты</h1>
            <div>
                <h3>Адрес</h3>
                <p>пр. Республики, 6А, <br/>Шымкент, Казахстан</p>
            </div>
            <div>
                <h3>Часы Работы</h3>
                <p>Пн - Вс: 12:00 - 02:00</p>
            </div>
            <div>
                <h3>Бронирование</h3>
                <p>+7 (707) 123-45-67</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;