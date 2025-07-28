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

// Logos imported as described:
import paganiLogo from './images/pagani.png';
import mercedesLogo from './images/mercedes.png';
import bugattiLogo from './images/bugatti.png';
import rollsLogo from './images/rolls.png';
import ferrariLogo from './images/ferrari.png';
import lamborghiniLogo from './images/lamborghini.png';
import bentleyLogo from './images/bentley.png';
import astonLogo from './images/aston.png';
import porscheLogo from './images/porsche.png';

import car1 from './images/car1.jpg';
import car2 from './images/car2.jpg';
import car3 from './images/car3.jpg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const menuRef = useRef(null);

  // Define the 3 batches of 4 logos each exactly as you want:
  const logoBatches = [
    [ferrariLogo, lamborghiniLogo, rollsLogo, bentleyLogo],
    [astonLogo, paganiLogo, bugattiLogo, mercedesLogo],
  //  [porscheLogo, astonLogo, ferrariLogo, lamborghiniLogo],
  ];

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  // Rotate entire batch every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="app">
        <Helmet>
          <title>Car Dealership</title>
          <link rel="icon" href={ferrariLogo} type="image/png" />
        </Helmet>

        <header className="header" style={{ position: 'relative' }}>
          <div className="header-left">
            <a href="tel:1234567890" className="call-me" style={{ color: '#000', textDecoration: 'none' }}>
              <FaPhone size={20} />
            </a>
          </div>

          {/* Banner area with rotating batch of logos next to menu & phone */}
          <div className="logo-bar" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {logoBatches[currentBatchIndex].map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`Logo batch ${currentBatchIndex} - ${idx}`}
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'contain',
                }}
              />
            ))}
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
          {/* No logos here as per your request */}
        </section>

        <main>
          <Routes>
            <Route path="/" element={
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
            } />
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
          <div className="footer-content">
            <div className="footer-logo">
              {/* You can keep footer rotating logo or static */}
              <img src={logoBatches[currentBatchIndex][0]} alt="Footer Logo" className="car-logo rotating-footer-logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
            </div>
            <div className="footer-details">
              <p>Nabils Surrey Supercar Website</p>
              <p>Surrey, England, UK</p>
              <p>0777777777</p>
              <p>
                NabilsSurreySUppercars are authorised and regulated by the Financial Conduct Authority
                (“FCA”) under Firm Reference Number (FRN) 660610. We are a credit broker, not a lender,
                and we do not charge a fee for our credit broking services.
              </p>
              <p>
                We can introduce you to a limited number of lenders and their finance products, which may
                have different interest rates and charges. We typically receive commission from them, 
                calculated by vehicle age or loan amount. Commission does not affect the amount you pay.
              </p>
            </div>
            <div className="footer-links">
              <Link to="/inventory">Current Stock</Link>
              <Link to="/sell">Sell Your Car</Link>
              <Link to="/sold">Previously Sold</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/luxury-cars">Luxury Cars</Link>
              <p>&copy; 2025 All Rights Reserved</p>
              <div className="footer-legal">
                <Link to="/sitemap">Sitemap</Link> | 
                <Link to="/cookie-policy">Cookie Policy</Link> | 
                <Link to="/privacy-policy">Privacy Policy</Link> | 
                <Link to="/complaints-procedure">Complaints Procedure</Link> | 
                <Link to="/modern-slavery">Modern Slavery Statement</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
