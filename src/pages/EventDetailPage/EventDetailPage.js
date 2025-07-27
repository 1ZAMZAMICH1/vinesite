import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'antd';
import './EventDetailPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import spoon from '../../assets/spoon.svg';

const GIST_ID = process.env.REACT_APP_GIST_ID;

const EventDetailPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (!GIST_ID || !eventId) return;
        
        fetch(`https://api.github.com/gists/${GIST_ID}?t=${new Date().getTime()}`)
            .then(res => res.json())
            .then(data => {
                if (data.files && data.files['vinopark-db.json']) {
                    const content = JSON.parse(data.files['vinopark-db.json'].content);
                    const currentEvent = content.events.find(e => e.id.toString() === eventId);
                    setEvent(currentEvent);
                }
            })
            .catch(err => console.error("Ошибка загрузки события: ", err));
    }, [eventId]);

    if (!event) {
        return <div style={{color: 'white', textAlign: 'center', paddingTop: '10rem'}}>Загрузка события...</div>;
    }

    return (
        <>
            <Header />
            <div className="event-detail section__padding">
                <div className="event-detail-header" data-aos="fade-down">
                    <h1 className="heading-text">{event.title}</h1>
                    <img src={spoon} alt="spoon_image" className="spoon__img" style={{margin: '1rem auto'}}/>
                    <p style={{color: 'var(--accent-gold)'}}>{event.date}</p>
                </div>
                
                {event.image && event.image.length > 0 && (
                    <div className="event-detail-carousel">
                        <Carousel autoplay>
                            {event.image.map((img, i) => (
                                <div key={i}>
                                    <img src={img} alt={`${event.title} gallery image ${i + 1}`} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                )}
                
                <div className="event-detail-content" data-aos="fade-up">
                    <p>{event.description}</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EventDetailPage;