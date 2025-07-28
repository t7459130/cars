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

// First set of logos (all same size)
import ferrariLogo from './images/ferrari.png';
import lamborghiniLogo from './images/lamborghini.png';
import rollsLogo from './images/rolls.png';
import bentleyLogo from './images/bentley.png';

// Second set of logos (all same size)
import astonLogo from './images/aston.png';
import paganiLogo from './images/pagani.png';
import bugattiLogo from './images/bugatti.png';
import mercedesLogo from './images/mercedes.png';

import car1 from './images/car1.jpg';
import car2 from './images/car2.jpg';
import car3 from './images/car3.jpg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [currentIndexSet1, setCurrentIndexSet1] = useState(0);
  const [currentIndexSet2, setCurrentIndexSet2] = useState(0);
  const menuRef = useRef(null);

  // Two separate logo arrays as per your order, each set 4 logos
  const logosSet1 = [ferrariLogo, lamborghiniLogo, rollsLogo, bentleyLogo];
  const logosSet2 = [astonLogo, paganiLogo, bugattiLogo, mercedesLogo];

  const carsForSale = [
    { id: 1, make: 'Tesla', model: 'Model S', year: 2021, price: '$80,000', img: car1 },
    { id: 2, make: 'BMW', model: 'i8', year: 2020, price: '$120,000', img: car2 },
    { id: 3, make: 'Audi', model: 'R8', year: 2019, price: '$150,000', img: car3 },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const acceptCookies = () => {
    setCookiesAccepted(true);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  const declineCookies = () => {
    setCookiesAccepted(true);
    localStorage.setItem('cookiesAccepted', 'false');
  };

  useEffect(() => {
    const cookiesConsent = localStorage.getItem('cookiesAccepted');
    if (cookiesConsent) {
      setCookiesAccepted(cookiesConsent === 'true');
    }
  }, []);

  // Rotate indexes for both sets every 4 seconds (4000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexSet1((prev) => (prev + 1) % logosSet1.length);
      setCurrentIndexSet2((prev) => (prev + 1) % logosSet2.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="app">
        <Helmet>
          <title>Car Dealership</title>
          <link rel="icon" href={ferrariLogo} type="image/png" />
        </Helmet>

        <header className="header">
          <div className="header-left">
            <a href="tel:1234567890" className="call-me" style={{ color: '#000', textDecoration: 'none' }}>
              <FaPhone size={20} />
            </a>
          </div>

          <div className="logo-bar">
            {/* Mobile view – single rotating logo cycling through first set */}
            <img
              src={logosSet1[currentIndexSet1]}
              alt="Logo"
              className="car-logo mobile-logo"
            />

            {/* Desktop view – show both sets side by side with current index */}
            <div className="desktop-logos">
              {/* First 4 logos set */}
              <div className="logo-set">
                {logosSet1.map((logo, idx) => (
                  <img
                    key={`set1-${idx}`}
                    src={logo}
                    alt={`Logo set 1 ${idx}`}
                    className={`car-logo ${idx === currentIndexSet1 ? 'active-logo' : ''}`}
                  />
                ))}
              </div>

              {/* Second 4 logos set */}
              <div className="logo-set">
                {logosSet2.map((logo, idx) => (
                  <img
                    key={`set2-${idx}`}
                    src={logo}
                    alt={`Logo set 2 ${idx}`}
                    className={`car-logo ${idx === currentIndexSet2 ? 'active-logo' : ''}`}
                  />
                ))}
              </div>
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

        <section className="banner">
          <img src={bannerImage} alt="Banner" className="banner-image" />
          <div className="banner-text">
            <h1>Welcome to Our Car Dealership</h1>
            <p>Discover our exclusive range of luxury cars.</p>
          </div>
        </section>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Helmet><title>Home - Car Dealership</title></Helmet>
                  <section className="about-us">
                    <div className="about-content">
                      <img src={aboutImage} alt="About Us" className="about-image" />
                      <div className="about-text">
                        <h2>About Us</h2>
                        <p>
                          Welcome to our car dealership. We offer the best selection
                          of luxury cars. Our team is dedicated to providing you with
                          excellent service.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="latest-arrivals">
                    <h2>Latest Arrivals</h2>
                    <div className="car-listings">
                      {carsForSale.map((car) => (
                        <div key={car.id} className="car-card">
                          <Link to={`/car/${car.id}`}>
                            <img src={car.img} alt={`${car.make} ${car.model}`} />
                            <div className="car-details">
                              <h3>{car.year} {car.make} {car.model}</h3>
                              <p>Price: {car.price}</p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              }
            />
            <Route path="/about" element={<><Helmet><title>About Us</title></Helmet><h2>About Us Page</h2></>} />
            <Route path="/contact" element={<><Helmet><title>Contact Us</title></Helmet><ContactUs /></>} />
            <Route path="/sell" element={<Sellyourcar />} />
            <Route path="/news" element={<NewsAndEvents />} />
            <Route path="/services" element={<OtherServices />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/car/:carId" element={<CarDetail />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2025 Car Dealership. All rights reserved.</p>
        </footer>

        {!cookiesAccepted && (
          <div className="cookies-consent">
            <p>This website uses cookies to enhance your experience.</p>
            <button onClick={acceptCookies}>Accept</button>
            <button onClick={declineCookies}>Decline</button>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
