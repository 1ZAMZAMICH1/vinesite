import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.css';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs/AboutUs';
import SpecialMenu from './components/SpecialMenu/SpecialMenu';
import Intro from './components/Intro/Intro';
import Gallery from './components/Gallery/Gallery';
import Footer from './components/Footer/Footer';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 100,
      easing: 'ease-in-out-cubic',
      once: true,
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <HeroSection />
      <AboutUs />
      <SpecialMenu />
      <Intro />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;