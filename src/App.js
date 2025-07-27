import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.css';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection'; // <-- ИСПРАВЛЕНО ЗДЕСЬ, БЛЯТЬ. НАВСЕГДА.
import ChoiceSection from './components/ChoiceSection/ChoiceSection';
import Contact from './components/Contact/Contact';
import Booking from './components/Booking/Booking';
import Events from './components/Events/Events';
import Footer from './components/Footer/Footer';
import Vinoteka from './pages/Vinoteka/Vinoteka';
import Menu from './pages/Menu/Menu';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import EventsPage from './pages/EventsPage/EventsPage';
import EventDetailPage from './pages/EventDetailPage/EventDetailPage';

const MainPage = () => (
    <>
        <Header />
        <HeroSection />
        <ChoiceSection />
        <Booking />
        <Contact />
        <Events />
        <Footer />
    </>
);

function App() {
  const [isIntroDone, setIsIntroDone] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1200, offset: 100, easing: 'ease-in-out-cubic', once: true });
  }, []);
  
  useEffect(() => {
    if (location.pathname === '/') { setIsIntroDone(false); } 
    else { setIsIntroDone(true); }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!isIntroDone && location.pathname === '/') { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = 'auto'; }
  }, [isIntroDone, location.pathname]);

  const handleEnter = () => { setIsIntroDone(true); };

  return (
      <div className="App">
        <WelcomeScreen onEnter={handleEnter} isHidden={isIntroDone} />
        
        <div className={`main-content-wrapper ${isIntroDone ? 'visible' : ''}`}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/vinoteka" element={<Vinoteka />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;