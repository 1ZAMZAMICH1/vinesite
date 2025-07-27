import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EventsPage.css';
import spoon from '../../assets/spoon.svg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const GIST_ID = process.env.REACT_APP_GIST_ID;

const EventCard = ({ event }) => (
    <Link to={`/events/${event.id}`}>
        <div className="event__card" data-aos="fade-up">
            <div className="event__card-img"><img src={event.image && event.image[0]} alt={event.title} /></div>
            <div className="event__card-content">
                <p className="date">{event.date}</p>
                <h3 className="title">{event.title}</h3>
                <p className="description">{event.description}</p>
                <button type="button" className="custom__button">Подробнее</button>
            </div>
        </div>
    </Link>
);

const EventsPage = () => {
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        fetch(`https://api.github.com/gists/${GIST_ID}?t=${new Date().getTime()}`)
            .then(res => res.json())
            .then(data => {
                if (data.files && data.files['vinopark-db.json']) {
                    const content = JSON.parse(data.files['vinopark-db.json'].content);
                    setEventsData(content.events || []);
                }
            });
    }, []);

    if (!eventsData.length) return <div style={{color: 'white', paddingTop: '10rem'}}>Загрузка...</div>;

    return (
        <>
            <Header />
            <div className="app__events-page section__padding">
                 <div className="app__events-header" data-aos="fade-down">
                    <h1 className="heading-text">Все События</h1>
                    <img src={spoon} alt="spoon_image" className="spoon__img" />
                </div>
                <div className="app__events-container">
                    {eventsData.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EventsPage;