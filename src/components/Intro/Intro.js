import React, { useState, useRef, useEffect } from 'react';
import './Intro.css';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import introVideo from '../../assets/intro.mp4';

const Intro = () => {
  const [playVideo, setPlayVideo] = useState(true);
  const vidRef = useRef();

  const handleVideo = () => {
    setPlayVideo((prevPlayVideo) => {
      if (prevPlayVideo) {
        vidRef.current.pause();
      } else {
        vidRef.current.play();
      }
      return !prevPlayVideo;
    });
  };

  useEffect(() => {
    // Этот трюк заставляет браузеры думать, что видео важное, и не останавливать его
    vidRef.current.play().catch(error => {
      console.log("Autoplay was prevented, but we will try to play on interaction.", error);
      setPlayVideo(false);
    });
  }, []);

  return (
    <div className="app__video">
      <video
        ref={vidRef}
        src={introVideo}
        type="video/mp4"
        loop
        controls={false}
        muted
        autoPlay
        playsInline
      />
      <div className="app__video-overlay">
        <div 
          className="app__video-overlay_circle"
          onClick={handleVideo}
        >
          {playVideo 
            ? <BsPauseFill color="#fff" fontSize={30} />
            : <BsFillPlayFill color="#fff" fontSize={30} />}
        </div>
      </div>
    </div>
  );
};

export default Intro;