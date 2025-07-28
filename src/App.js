// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Sellyourcar from './Sellyourcar';
import Inventory from './Inventory';
import Testimonials from './Testimonials';
import OtherServices from './OtherServices';
import NewsAndEvents from './NewsAndEvents';
import ContactUs from './ContactUs';
import CarDetail from './CarDetail';
import Car1 from './Car1';
import Car2 from './Car2';
import Car3 from './Car3';

import aboutImage from './images/car1.jpg';
import bannerImage from './images/carwallpaper.webp';
import astonLogo from './images/aston.png';
import bentleyLogo from './images/bentley.png';
import porscheLogo from './images/porsche.png';
import rollsLogo from './images/rolls.png';
import ferrariLogo from './images/ferrari.png';
import lamborghiniLogo from './images/lamborghini.png';

import car1 from './images/car1.jpg';
import car2 from './images/car2.jpg';
import car3 from './images/car3.jpg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const menuRef = useRef(null);

  const logos = [
    astonLogo,
    bentleyLogo,
    porscheLogo,
    rollsLogo,
    ferrariLogo,
    lamborghiniLogo,
  ];

  const carsForSale = [ /* ... unchanged ... */ ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const consent = localStorage.getItem('cookiesAccepted');
    if (consent) setCookiesAccepted(consent === 'true');
  }, []);

  // Logo rotation for all screen sizes:
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 4) % logos.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="app">
        <Helmet><title>Car Dealership</title><link rel="icon" href={ferrariLogo} type="image/png"/></Helmet>

        <header className="header">
          <div className="header-left">
            <a href="tel:1234567890" className="call-me" style={{ color: '#000', textDecoration: 'none' }}>
              <FaPhone size={20} />
            </a>
          </div>

          <div className="logo-bar">
            {/* Mobile: one rotating logo */}
            <img src={logos[currentLogoIndex]} alt="Logo" className="car-logo mobile-logo" />

            {/* Desktop: show 4 logos in a row */}
            <div className="desktop-logos">
              {logos.slice(currentLogoIndex, currentLogoIndex + 4).length === 4
                ? logos.slice(currentLogoIndex, currentLogoIndex + 4)
                : [
                    ...logos.slice(currentLogoIndex),
                    ...logos.slice(0, 4 - (logos.length - currentLogoIndex)),
                  ]
              }.map((logo, idx) => (
                <img key={idx} src={logo} alt={`Logo ${idx}`} className="car-logo" />
              ))}
            </div>
          </div>

          <div className="header-right">
            <button className={`menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
              <li><Link to="/contact" onClick={toggleMenu}>Contact Us</Link></li>
              <li><Link to="/sell" onClick={toggleMenu}>Sell Your Car</Link></li>
              <li><Link to="/news" onClick={toggleMenu}>News and Events</Link></li>
              <li><Link to="/services" onClick={toggleMenu}>Other Services</Link></li>
              <li><Link to="/testimonials" onClick={toggleMenu}>Testimonials</Link></li>
              <li><Link to="/inventory" onClick={toggleMenu}>Inventory</Link></li>
            </ul>
          </nav>
        </header>

        {/* rest of your component remains exactly the same */}

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={logos[currentLogoIndex]} alt="Rotating Logo" className="car-logo rotating-footer-logo" />
            </div>
            {/* footer text unchanged */}
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
