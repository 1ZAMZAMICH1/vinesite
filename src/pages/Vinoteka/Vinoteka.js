import React, { useState, useEffect } from 'react';
import { Modal, Carousel } from 'antd';
import './Vinoteka.css';
import spoon from '../../assets/spoon.svg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const GIST_ID = process.env.REACT_APP_GIST_ID;

const Vinoteka = () => {
    const [allWines, setAllWines] = useState([]);
    const [wines, setWines] = useState([]);
    const [filters, setFilters] = useState({ type: 'all', country: 'all', search: '' });
    const [selectedWine, setSelectedWine] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!GIST_ID) {
            console.error("GIST_ID не найден. Проверьте .env файл.");
            setIsLoading(false);
            return;
        }
        fetch(`https://api.github.com/gists/${GIST_ID}?t=${new Date().getTime()}`)
            .then(res => res.json())
            .then(data => {
                if (data.files && data.files['vinopark-db.json']) {
                    const content = JSON.parse(data.files['vinopark-db.json'].content);
                    setAllWines(content.vinoteka || []);
                    setWines(content.vinoteka || []);
                }
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        let filteredWines = allWines;
        if (filters.type !== 'all') {
            filteredWines = filteredWines.filter(wine => wine.type === filters.type);
        }
        if (filters.country !== 'all') {
            filteredWines = filteredWines.filter(wine => wine.country === filters.country);
        }
        if (filters.search) {
            filteredWines = filteredWines.filter(wine => wine.name.toLowerCase().includes(filters.search.toLowerCase()));
        }
        setWines(filteredWines);
    }, [filters, allWines]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    if (isLoading) {
        return <div style={{color: 'white', textAlign: 'center', paddingTop: '10rem'}}>Загрузка винотеки...</div>;
    }

    return (
        <>
            <Header />
            <div className="app__vinoteka section__padding">
                <div className="app__vinoteka-header" data-aos="fade-down">
                    <h1 className="heading-text">Наша Винотека</h1>
                    <img src={spoon} alt="spoon_image" className="spoon__img" />
                </div>
                <div className="app__vinoteka-filters" data-aos="fade-up" data-aos-delay="200">
                    <input type="text" name="search" placeholder="Поиск по названию..." onChange={handleFilterChange} />
                    <select name="type" onChange={handleFilterChange}>
                        <option value="all">Все типы</option>
                        <option value="Красное">Красное</option>
                        <option value="Белое">Белое</option>
                        <option value="Розовое">Розовое</option>
                        <option value="Оранжевое">Оранжевое</option>
                    </select>
                    <select name="country" onChange={handleFilterChange}>
                        <option value="all">Все страны</option>
                        {[...new Set(allWines.map(w => w.country))].sort().map(country => <option key={country} value={country}>{country}</option>)}
                    </select>
                </div>
                <div className="app__vinoteka-grid" data-aos="fade-up" data-aos-delay="400">
                    {wines.map(wine => (
                        <div className="wine-card" key={wine.id} onClick={() => setSelectedWine(wine)}>
                            <img src={wine.image && wine.image[0]} alt={wine.name} />
                            <h3>{wine.name}</h3>
                            <p>{wine.country} | {wine.type}</p>
                            <p style={{fontFamily: 'var(--font-accent)', color: 'var(--text-light)', fontSize: '20px', marginTop: '1rem'}}>₸ {parseInt(wine.price).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
            <Modal open={!!selectedWine} onCancel={() => setSelectedWine(null)} footer={null} width={800} centered>
                {selectedWine && (
                    <div className="wine-modal-layout">
                        <div className="wine-modal-image">
                            <Carousel autoplay>
                                {(selectedWine.image || []).map((img, i) => <img key={i} src={img} alt=""/>)}
                            </Carousel>
                        </div>
                        <div className="wine-modal-content">
                            <h2>{selectedWine.name}</h2>
                            <p className="tags">{selectedWine.country} | {selectedWine.type}</p>
                            <p>Здесь будет подробное описание вкуса, аромата и гастрономических сочетаний, которое будет добавляться через админку.</p>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default Vinoteka;