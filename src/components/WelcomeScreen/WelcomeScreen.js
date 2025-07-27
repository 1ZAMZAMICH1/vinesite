import React, { useRef, useEffect } from 'react';
import './WelcomeScreen.css';
import welcomeVideo from '../../assets/welcome-video.webm';
import logoImage from '../../assets/logovin.png';

const WelcomeScreen = ({ onEnter, isHidden }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Замедляем видео на 25%
    }
  }, []);

  return (
    <div className={`app__welcome ${isHidden ? 'hidden' : ''}`}>
      <video
        ref={videoRef}
        className="app__welcome-video"
        loop
        controls={false}
        muted
        autoPlay
        playsInline
      >
        <source src={welcomeVideo} type="video/webm" />
      </video>
      <div className="app__welcome-content" data-aos="zoom-in">
        <img src={logoImage} alt="Vinopark Logo" className="welcome-logo" />
        <p>Эстетика в каждом моменте</p>
        <button type="button" className="custom__button" onClick={onEnter}>
          Открыть для себя
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;