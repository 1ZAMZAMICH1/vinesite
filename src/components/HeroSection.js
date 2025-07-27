import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';
import { MdClose } from 'react-icons/md';

// ВСЕ ПУТИ ИСПРАВЛЕНЫ НА ПРАВИЛЬНЫЕ. НАВСЕГДА.
import logoV from '../assets/logov.png';

import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';
import product6 from '../assets/product6.png';
import product7 from '../assets/product7.png';

const wines = [
  { id: 1, name: ['L\'Étoile', 'Solitaire'], country: 'France', countryColor: 'linear-gradient(90deg, #4d8de3, #1e90ff)', image: product1, description: 'Элегантное Шардоне из Бургундии. Ноты белых цветов, зеленого яблока и легкая минеральность. Идеально к морепродуктам и белому мясу.' },
  { id: 2, name: ['Cuore', 'di Pietra'], country: 'Italy', countryColor: 'linear-gradient(90deg, #18b14c, #008000)', image: product2, description: 'Мощное и структурированное Неббиоло. Ароматы вишни, розы и табака. Прекрасно сочетается с трюфелями и выдержанными сырами.' },
  { id: 3, name: ['Furia', 'Roja'], country: 'Spain', countryColor: 'linear-gradient(90deg, #e43a15, #e65245)', image: product3, description: 'Сочный и пряный Темпранильо из Риохи. Вкусы красных ягод, ванили и кожи. Лучший друг для хамона и блюд из баранины.' },
  { id: 4, name: ['Crimson', 'Peak'], country: 'USA', countryColor: 'linear-gradient(90deg, #cc2b5e, #753a88)', image: product4, description: 'Насыщенный Зинфандель из Калифорнии. Яркие ноты джема, черного перца и шоколада. Создан для стейков на гриле и барбекю.' },
  { id: 5, name: ['Sunburnt', 'Earth'], country: 'Australia', countryColor: 'linear-gradient(90deg, #f7971e, #ffd200)', image: product5, description: 'Полнотелый Шираз из долины Баросса. Ароматы сливы, эвкалипта и специй. Великолепно с дичью и острыми блюдами.' },
  { id: 6, name: ['Andean', 'Shadow'], country: 'Argentina', countryColor: 'linear-gradient(90deg, #74ebd5, #acb6e5)', image: product6, description: 'Бархатистый Мальбек из Мендосы. Вкусы ежевики, фиалки и дуба. Безупречно подходит к аргентинскому асадо.' },
  { id: 7, name: ['Volcanic', 'Kiss'], country: 'Chile', countryColor: 'linear-gradient(90deg, #d31027, #ea384d)', image: product7, description: 'Карменер с вулканических почв. Ноты черной смородины, зеленого перца и кофе. Прекрасная пара для эмпанадас и тушеного мяса.' },
];

const ITEM_WIDTH = 300;
const ITEM_MARGIN = 30;
const ITEM_TOTAL_WIDTH = ITEM_WIDTH + ITEM_MARGIN * 2;

const HeroSection = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWine, setSelectedWine] = useState(null);
  const trackRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const buffer = wines.length;
    setItems([...wines.slice(-buffer), ...wines, ...wines.slice(0, buffer)]);
    setCurrentIndex(buffer);
  }, []);

  useEffect(() => {
    if (items.length === 0 || selectedWine) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, [items.length, selectedWine]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= wines.length * 2) {
      if (trackRef.current) {
        trackRef.current.classList.add('no-transition');
        setCurrentIndex(wines.length);
        setTimeout(() => trackRef.current?.classList.remove('no-transition'), 50);
      }
    }
  };

  const handleButtonClick = () => {
    setSelectedWine(items[currentIndex]);
  };

  if (items.length === 0) return null;

  const trackStyle = {
    transform: `translateX(calc(-${currentIndex * ITEM_TOTAL_WIDTH}px + 50vw - ${ITEM_TOTAL_WIDTH / 2}px)) translateY(-50%)`,
  };

  const getItemStyle = (index) => {
    const distance = index - currentIndex;
    const absDistance = Math.abs(distance);
    return {
      transform: `scale(${Math.max(1.4 - absDistance * 0.25, 0)})`,
      filter: `blur(${Math.max(absDistance - 1, 0) * 4}px)`,
      opacity: Math.max(1 - absDistance * 0.35, 0),
      zIndex: items.length - absDistance,
    };
  };

  const getTextStyle = (index) => ({
    opacity: index === currentIndex ? 1 : 0,
  });

  const heroStyle = { '--hero-bg-logo': `url(${logoV})` };

  return (
    <section className="app__hero" id="home" style={heroStyle}>
      <div
        className="showcase-track"
        ref={trackRef}
        style={trackStyle}
        onTransitionEnd={handleTransitionEnd}
      >
        {items.map((wine, index) => (
          <div className="showcase-item" key={`${wine.id}-${index}`} style={getItemStyle(index)}>
            <img src={wine.image} alt={wine.name.join(' ')} />
            <h3 className="wine-title" style={getTextStyle(index)}>
              {wine.name.map(line => <span key={line}>{line}</span>)}
              <span className="country-overlay" style={{ backgroundImage: wine.countryColor }}>
                {wine.country}
              </span>
            </h3>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`details-button ${!isTransitioning ? 'visible' : ''}`}
        onClick={handleButtonClick}
      >
        Подробнее
      </button>

      {selectedWine && (
        <div className="wine-modal-overlay" data-aos="fade" data-aos-duration="600">
            <div className="wine-modal" data-aos="zoom-in" data-aos-delay="200">
                <MdClose className="wine-modal-close" onClick={() => setSelectedWine(null)} />
                <div className="wine-modal-image">
                    <img src={selectedWine.image} alt={selectedWine.name.join(' ')} />
                </div>
                <div className="wine-modal-content">
                    <h2>{selectedWine.name.join(' ')}</h2>
                    <p className="tags">{selectedWine.country}</p>
                    <p>{selectedWine.description}</p>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;