// src/Inventory.js
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import car1 from './images/car1.jpg';
import car2 from './images/car2.jpg';
import car3 from './images/car3.jpg';

const carsInventory = [
  { id: 1, make: 'Tesla', model: 'Model S', year: 2021, price: '$80,000', image: car1, link: '/car1' },
  { id: 2, make: 'BMW', model: 'i8', year: 2020, price: '$120,000', image: car2, link: '/car2' },
  { id: 3, make: 'Audi', model: 'R8', year: 2019, price: '$150,000', image: car3, link: '/car3' },
];

const manufacturers = [
  'Alfa Romeo', 'Aston Martin', 'Bac', 'BMW', 'Ferrari',
  'Ford', 'Honda', 'Lamborghini', 'Land Rover', 'Maserati',
  'McLaren', 'Mercedes-Benz', 'Porsche', 'Rolls-Royce'
];

const bodyStyles = ['Coupe', 'SUV', 'Convertible', 'Saloon', 'Light 4x4 utility'];

const Inventory = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const overlayRef = useRef();

  const toggleOverlay = () => setIsOverlayOpen(prev => !prev);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        setIsOverlayOpen(false);
      }
    };
    if (isOverlayOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOverlayOpen]);

  return (
    <div className="inventory">
      <h2>Our Inventory</h2>

      {/* Filter Stock Button */}
      <div className="filter-stock-container">
        <button className="filter-stock-button" onClick={toggleOverlay}>
          Filter Stock
        </button>
      </div>

      {/* Overlay */}
      {isOverlayOpen && (
        <div className="inventory-overlay">
          <div className="overlay-content" ref={overlayRef}>
            <button className="close-overlay" onClick={toggleOverlay}>×</button>
            <h3>Search by Manufacturer</h3>
            <div className="manufacturer-list">
              {manufacturers.map((mfr, idx) => (
                <button key={idx} className="filter-tag">{mfr}</button>
              ))}
            </div>

            <h3>Search by Bodystyle</h3>
            <div className="bodystyle-list">
              {bodyStyles.map((style, idx) => (
                <button key={idx} className="filter-tag">{style}</button>
              ))}
            </div>

            <h3>Latest Arrivals</h3>
            <div className="latest-arrivals">
              {carsInventory.map(car => (
                <div key={car.id} className="arrival-card">
                  <img src={car.image} alt={car.model} />
                  <div className="arrival-info">
                    <h4>{car.make} {car.model}</h4>
                    <p>{car.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Inventory */}
      <div className="car-listings">
        {carsInventory.map((car) => (
          <div key={car.id} className="car-card">
            <Link to={car.link}>
              <img src={car.image} alt={`${car.make} ${car.model}`} />
            </Link>
            <div className="car-details">
              <h3>{car.year} {car.make} {car.model}</h3>
              <p>Price: {car.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
