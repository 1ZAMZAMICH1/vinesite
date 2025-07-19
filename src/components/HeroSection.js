import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';

// Здесь будут твои бутылки вина
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';
import product6 from '../assets/product6.png';
import product7 from '../assets/product7.png';

const wines = [
  { id: 1, name: ['L\'Étoile', 'Solitaire'], country: 'France', countryColor: 'linear-gradient(90deg, #4d8de3, #1e90ff)', image: product1 },
  { id: 2, name: ['Cuore', 'di Pietra'], country: 'Italy', countryColor: 'linear-gradient(90deg, #18b14c, #008000)', image: product2 },
  { id: 3, name: ['Furia', 'Roja'], country: 'Spain', countryColor: 'linear-gradient(90deg, #e43a15, #e65245)', image: product3 },
  { id: 4, name: ['Crimson', 'Peak'], country: 'USA', countryColor: 'linear-gradient(90deg, #cc2b5e, #753a88)', image: product4 },
  { id: 5, name: ['Sunburnt', 'Earth'], country: 'Australia', countryColor: 'linear-gradient(90deg, #f7971e, #ffd200)', image: product5 },
  { id: 6, name: ['Andean', 'Shadow'], country: 'Argentina', countryColor: 'linear-gradient(90deg, #74ebd5, #acb6e5)', image: product6 },
  { id: 7, name: ['Volcanic', 'Kiss'], country: 'Chile', countryColor: 'linear-gradient(90deg, #d31027, #ea384d)', image: product7 },
];

const ITEM_WIDTH = 300;
const ITEM_MARGIN = 30;
const ITEM_TOTAL_WIDTH = ITEM_WIDTH + ITEM_MARGIN * 2;

const HeroSection = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    const buffer = wines.length;
    setItems([...wines.slice(-buffer), ...wines, ...wines.slice(0, buffer)]);
    setCurrentIndex(buffer);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(() => setCurrentIndex((prev) => prev + 1), 3500);
    return () => clearInterval(timer);
  }, [items.length]);

  const handleTransitionEnd = () => {
    if (currentIndex >= wines.length * 2) {
      if (trackRef.current) {
        trackRef.current.classList.add('no-transition');
        setCurrentIndex(wines.length);
        setTimeout(() => trackRef.current?.classList.remove('no-transition'), 50);
      }
    }
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

  return (
    <section className="app__hero" id="home">
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
    </section>
  );
};

export default HeroSection;