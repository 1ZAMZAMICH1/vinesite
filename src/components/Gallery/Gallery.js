import React from 'react';
import './Gallery.css';
import spoon from '../../assets/spoon.svg';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

import gallery01 from '../../assets/gallery01.png';
import gallery02 from '../../assets/gallery02.png';
import gallery03 from '../../assets/gallery03.png';
import gallery04 from '../../assets/gallery04.png';

const images = [gallery01, gallery02, gallery03, gallery04];

const Gallery = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  return (
    <section className="app__gallery section__padding">
      <div className="app__gallery-content" data-aos="fade-up-right">
        <h1 className="heading-text">Моменты</h1>
        <img src={spoon} alt="spoon_image" style={{ marginBottom: '1rem' }} />
        <p className="p-text" style={{ marginTop: '2rem' }}>Эстетика в каждой детали. Мы собрали коллекцию моментов, которые передают дух нашей страсти к вину. Вдохновляйтесь вместе с нами.</p>
        <button type="button" className="custom__button">Смотреть еще</button>
      </div>

      <div className="app__gallery-images" data-aos="fade-up-left" data-aos-delay="200">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {images.map((image, index) => (
            <div className="app__gallery-images_card" key={`gallery_image-${index + 1}`}>
              <img src={image} alt="gallery_image" />
              <BsInstagram className="gallery__image-icon" />
            </div>
          ))}
        </div>
        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => scroll('left')} />
          <BsArrowRightShort className="gallery__arrow-icon" onClick={() => scroll('right')} />
        </div>
      </div>
    </section>
  );
};

export default Gallery;