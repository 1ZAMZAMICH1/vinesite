import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EventsPage.css';
import spoon from '../../assets/spoon.svg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const GIST_ID = process.env.REACT_APP_GIST_ID;

const EventCard = ({ event }) => (
    <Link to={`/events/${event.id}`} className="event__card" data-aos="fade-up">
        <div className="event__card-img">
            {event.image && event.image[0] && <img src={event.image[0]} alt={event.title} />}
        </div>
        <div className="event__card-content">
            <p className="date">{event.date}</p>
            <h3 className="title">{event.title}</h3>
            <p className="description">{event.description}</p>
        </div>
    </Link>
);

const EventsPage = () => {
    const [eventsData, setEventsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!GIST_ID) return;
        fetch(`https://api.github.com/gists/${GIST_ID}?t=${new Date().getTime()}`)
            .then(res => res.json())
            .then(data => {
                if (data.files && data.files['vinopark-db.json']) {
                    const content = JSON.parse(data.files['vinopark-db.json'].content);
                    setEventsData(content.events || []);
                }
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <div style={{color: 'white', textAlign: 'center', paddingTop: '10rem'}}>Загрузка событий...</div>;
    }

    return (
        <>
            <Header />
            <div className="app__events-page section__padding">
                 <div className="app__events-header" data-aos="fade-down">
                    <h1 className="heading-text">Все События</h1>
                    <img src={spoon} alt="spoon" className="spoon__img" />
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