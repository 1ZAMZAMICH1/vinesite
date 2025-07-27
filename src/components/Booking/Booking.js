import React, { useState } from 'react';
import './Booking.css';
import { ReactComponent as FloorPlan } from '../../assets/floor-plan.svg';
import spoon from '../../assets/spoon.svg';

const timeSlots = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
const fakeBookedSlots = { 'A1': ["19:00", "20:30"], 'VIP 2': ["20:00"], 'V1': ["18:30"] };

const Booking = () => {
    const [modalStep, setModalStep] = useState(0); // 0: closed, 1: time, 2: form
    const [bookingDetails, setBookingDetails] = useState({ table: null, time: null });

    const handleTableClick = (e) => {
        const tableElement = e.target.closest('.table');
        if (tableElement) {
            const tableId = tableElement.dataset.id;
            setBookingDetails({ ...bookingDetails, table: tableId });
            setModalStep(1); // Открываем первую модалку
        }
    };

    const handleTimeSelect = (time) => {
        setBookingDetails({ ...bookingDetails, time: time });
        setModalStep(2); // Переключаемся на вторую модалку
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const finalBooking = { ...bookingDetails, name: e.target.name.value, phone: e.target.phone.value };
        console.log("Отправка в Телеграм:", finalBooking);
        alert(`Стол ${finalBooking.table} на ${finalBooking.time} успешно забронирован!`);
        setModalStep(0); // Закрываем все модалки
    };

    const closeModal = () => {
        setModalStep(0);
    };

    return (
        <section className="app__booking section__padding" id="booking">
            <div className="app__booking-header" data-aos="fade-down">
                <h1 className="heading-text">Забронировать Стол</h1>
                <img src={spoon} alt="spoon_image" className="spoon__img" />
                <p className="p-text" style={{color: '#AAA', marginTop: '1rem'}}>Выберите любой свободный стол на интерактивной схеме</p>
            </div>

            <div className="app__booking-plan_wrapper" data-aos="zoom-in" data-aos-delay="200">
                <FloorPlan onClick={handleTableClick} />
            </div>
            
            {modalStep > 0 && (
                <div className="booking-modal-overlay">
                    {/* МОДАЛКА 1: ВЫБОР ВРЕМЕНИ */}
                    {modalStep === 1 && (
                        <div className="booking-modal" data-aos="zoom-in">
                            <h2>Стол: {bookingDetails.table}</h2>
                            <p>Выберите доступное время для бронирования</p>
                            <div className="time-slots">
                                {timeSlots.map(time => {
                                    const isBooked = fakeBookedSlots[bookingDetails.table]?.includes(time);
                                    return <button key={time} className="time-slot" disabled={isBooked} onClick={() => handleTimeSelect(time)}>{time}</button>;
                                })}
                            </div>
                            <button type="button" className="custom__button" style={{background: 'transparent', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)'}} onClick={closeModal}>Отмена</button>
                        </div>
                    )}

                    {/* МОДАЛКА 2: ФОРМА ОФОРМЛЕНИЯ */}
                    {modalStep === 2 && (
                        <div className="booking-modal" data-aos="zoom-in">
                            <h2>Подтверждение брони</h2>
                            <p>Вы бронируете стол <strong>{bookingDetails.table}</strong> на <strong>{bookingDetails.time}</strong></p>
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-group"><label htmlFor="name">Ваше Имя</label><input type="text" id="name" required /></div>
                                <div className="form-group"><label htmlFor="phone">Номер Телефона</label><input type="tel" id="phone" required /></div>
                                <button type="submit" className="custom__button" style={{marginTop: '1rem'}}>Подтвердить</button>
                                <button type="button" className="custom__button" style={{marginTop: '0.5rem', background: 'transparent', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)'}} onClick={closeModal}>Отмена</button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default Booking;