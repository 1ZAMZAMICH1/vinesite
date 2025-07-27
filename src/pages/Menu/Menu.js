import React, { useState, useEffect } from 'react';
import './Menu.css';
import spoon from '../../assets/spoon.svg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const GIST_ID = process.env.REACT_APP_GIST_ID;

const MenuItem = ({ item }) => (
    <div className="menu-item" data-aos="fade-up">
        <div className="menu-item-head">
            <p className="menu-item-name">{item.title}</p>
            <div className="menu-item-dash" />
            <p className="menu-item-price">₸{item.price}</p>
        </div>
        {item.description && <p className="menu-item-description">{item.description}</p>}
    </div>
);

const MenuCategory = ({ category, items }) => (
    <div className="menu-category" id={category.replace(/\s+/g, '-')}>
        <h2 data-aos="fade-down">{category}</h2>
        {(items || []).map((item, index) => (
            <MenuItem key={index} item={item} />
        ))}
    </div>
);

const menuCategories = {
    osnovnoe: 'Основное меню',
    barnoe: 'Барное меню',
    banketnoe: 'Банкетное меню',
    sigary: 'Сигары'
};

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('osnovnoe');
    const [fullMenuData, setFullMenuData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!GIST_ID) {
            setError("GIST_ID не найден. Проверьте .env файл.");
            return;
        }
        fetch(`https://api.github.com/gists/${GIST_ID}?t=${new Date().getTime()}`)
            .then(res => {
                if (!res.ok) throw new Error('Ошибка сети при запросе к Gist');
                return res.json();
            })
            .then(data => {
                // ГЛАВНЫЙ ФИКС: ЖЕЛЕЗОБЕТОННАЯ ПРОВЕРКА JSON
                try {
                    if (data.files && data.files['vinopark-db.json']) {
                        const content = JSON.parse(data.files['vinopark-db.json'].content);
                        setFullMenuData(content.menu);
                    } else {
                        throw new Error('Файл vinopark-db.json не найден в Gist');
                    }
                } catch (e) {
                    throw new Error('Ошибка парсинга JSON. Проверьте синтаксис в Gist.');
                }
            })
            .catch(err => {
                console.error("Ошибка загрузки меню: ", err);
                setError(err.message);
            });
    }, []);

    const handleSubMenuClick = (id) => {
        const element = document.getElementById(id.replace(/\s+/g, '-'));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    if (error) {
        return <div style={{color: 'red', textAlign: 'center', paddingTop: '10rem'}}>ОШИБКА: {error}</div>;
    }

    if (!fullMenuData) {
        return <div style={{color: 'white', textAlign: 'center', paddingTop: '10rem'}}>Загрузка меню...</div>;
    }

    return (
        <>
            <Header />
            <div className="app__menu section__padding">
                <div className="app__menu-header" data-aos="fade-down">
                    <h1 className="heading-text">Наше Меню</h1>
                    <img src={spoon} alt="spoon_image" className="spoon__img" />
                </div>
                
                <div className="menu-tabs" data-aos="fade-up" data-aos-delay="200">
                    {Object.entries(menuCategories).map(([key, name]) => (
                        <button 
                            key={key} 
                            className={`custom__button ${activeCategory === key ? 'active' : ''}`}
                            onClick={() => setActiveCategory(key)}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                <div className="submenu-nav" data-aos="fade-up" data-aos-delay="300">
                    {fullMenuData[activeCategory] && Object.keys(fullMenuData[activeCategory]).map(subCategory => (
                        <button key={subCategory} onClick={() => handleSubMenuClick(subCategory)}>
                            {subCategory}
                        </button>
                    ))}
                </div>

                <div className="app__menu-content">
                    {fullMenuData[activeCategory] && Object.entries(fullMenuData[activeCategory]).map(([category, items]) => (
                        <MenuCategory key={category} category={category} items={items} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Menu;