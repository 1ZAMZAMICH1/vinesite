import React from 'react';
import { Link } from 'react-router-dom';
import './ChoiceSection.css';

const ChoiceSection = () => {
  return (
    <section className="app__choice">
      <Link to="/menu" className="choice-panel menu" data-aos="fade-right">
        <div className="choice-content">
          <h2>Меню</h2>
          <button type="button" className="custom__button">Изучить</button>
        </div>
      </Link>
      <Link to="/vinoteka" className="choice-panel vinoteka" data-aos="fade-left">
        <div className="choice-content">
          <h2>Винотека</h2>
          <button type="button" className="custom__button">Открыть</button>
        </div>
      </Link>
    </section>
  );
};

export default ChoiceSection;