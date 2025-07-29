// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Sellyourcar from './Sellyourcar';
import Inventory from './Inventory';
import Testimonials from './Testimonials';
import OtherServices from './OtherServices';
import NewsAndEvents from './NewsAndEvents';
import ContactUs from './ContactUs';
import CarDetail from './CarDetail';

import aboutImage from './images/car1.jpg';

import carwallpaper1 from './images/carwallpaper1.jpeg';
import carwallpaper2 from './images/carwallpaper2.jpeg';
import carwallpaper3 from './images/carwallpaper3.jpeg';
import carwallpaper4 from './images/carwallpaper4.jpeg';
import carwallpaper5 from './images/carwallpaper5.jpeg';
import carwallpaper6 from './images/carwallpaper6.jpeg';
import carwallpaper7 from './images/carwallpaper7.jpeg';
import carwallpaper8 from './images/carwallpaper8.jpeg';

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

function AppWrapper() {
  const location = useLocation();

  const getBannerImage = () => {
    switch (location.pathname) {
      case '/about': return carwallpaper2;
      case '/inventory': return carwallpaper3;
      case '/contact': return carwallpaper4;
      case '/sell': return carwallpaper5;
      case '/news': return carwallpaper6;
      case '/services': return carwallpaper7;
      case '/testimonials': return carwallpaper8;
      default: return carwallpaper1; // Home
    }
  };

  return <App bannerImage={getBannerImage()} />;
}

function App({ bannerImage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [currentFooterLogoIndex, setCurrentFooterLogoIndex] = useState(0);
  const menuRef = useRef(null);
  const searchOverlayRef = useRef(null);

  const logoBatches = [
    [ferrariLogo, lamborghiniLogo, rollsLogo, bentleyLogo],
    [astonLogo, paganiLogo, bugattiLogo, mercedesLogo],
  ];

  const footerLogos = [
    lamborghiniLogo,
    ferrariLogo,
    porscheLogo,
    paganiLogo,
    mercedesLogo,
    astonLogo,
    bugattiLogo,
    bentleyLogo,
    rollsLogo,
  ];

  const carsForSale = [
    {
      id: 1,
      make: 'Tesla',
      model: 'Model S',
      variant: 'Long Range',
      year: 2021,
      price: 80000,
      mileage: 15000,
      transmission: 'Automatic',
      fuelType: 'Electric',
      bodyType: 'Sedan',
      img: car1,
    },
    {
      id: 2,
      make: 'BMW',
      model: 'i8',
      variant: 'Coupe',
      year: 2020,
      price: 120000,
      mileage: 20000,
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      bodyType: 'Coupe',
      img: car2,
    },
    {
      id: 3,
      make: 'Audi',
      model: 'R8',
      variant: 'V10 Plus',
      year: 2019,
      price: 150000,
      mileage: 18000,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      bodyType: 'Coupe',
      img: car3,
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterMake, setFilterMake] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterFuel, setFilterFuel] = useState('');
  const [filterBody, setFilterBody] = useState('');
  const [filterTrans, setFilterTrans] = useState('');
  const [filterMileageMax, setFilterMileageMax] = useState('');
  const [sortOption, setSortOption] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearchOverlay = () => setIsSearchOverlayOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (searchOverlayRef.current && !searchOverlayRef.current.contains(event.target) && isSearchOverlayOpen) {
        setIsSearchOverlayOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isSearchOverlayOpen]);

  useEffect(() => {
    const consent = localStorage.getItem('cookiesAccepted');
    if (consent) setCookiesAccepted(consent === 'true');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFooterLogoIndex((prevIndex) => (prevIndex + 1) % footerLogos.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const acceptCookies = () => {
    setCookiesAccepted(true);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  const declineCookies = () => {
    setCookiesAccepted(true);
    localStorage.setItem('cookiesAccepted', 'false');
  };

  const filteredCars = carsForSale
    .filter(car =>
      `${car.make} ${car.model} ${car.variant}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(car => filterMake ? car.make === filterMake : true)
    .filter(car => filterModel ? car.model === filterModel : true)
    .filter(car => filterYear ? car.year.toString() === filterYear : true)
    .filter(car => filterFuel ? car.fuelType === filterFuel : true)
    .filter(car => filterBody ? car.bodyType === filterBody : true)
    .filter(car => filterTrans ? car.transmission === filterTrans : true)
    .filter(car => filterMileageMax ? car.mileage <= parseInt(filterMileageMax) : true)
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'year-asc': return a.year - b.year;
        case 'year-desc': return b.year - a.year;
        case 'mileage-asc': return a.mileage - b.mileage;
        case 'mileage-desc': return b.mileage - a.mileage;
        default: return 0;
      }
    });

  return (
    <div className="app">
      <Helmet>
        <title>Car Dealership</title>
        <link rel="icon" href={ferrariLogo} type="image/png" />
      </Helmet>

      <header className="header" style={{ position: 'relative' }}>
        <div className="header-left">
          <a href="tel:1234567890" className="call-me">
            <FaPhone size={20} />
          </a>
        </div>

        <div className="logo-bar desktop-logo-bar">
          {logoBatches[currentBatchIndex].map((logo, idx) => (
            <img key={idx} src={logo} alt="Brand logo" className="desktop-logo" />
          ))}
        </div>

        <div className="logo-bar mobile-logo-bar">
          <img
            src={footerLogos[currentFooterLogoIndex]}
            alt="Brand logo"
            className="mobile-logo"
          />
        </div>

        <div className="header-right">
          <button className="search-btn" onClick={toggleSearchOverlay}>
            <FaSearch />
          </button>
          <button className="menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/inventory" onClick={toggleMenu}>Inventory</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
            <li><Link to="/contact" onClick={toggleMenu}>Contact Us</Link></li>
            <li><Link to="/sell" onClick={toggleMenu}>Sell Your Car</Link></li>
            <li><Link to="/news" onClick={toggleMenu}>News and Events</Link></li>
            <li><Link to="/services" onClick={toggleMenu}>Other Services</Link></li>
            <li><Link to="/testimonials" onClick={toggleMenu}>Testimonials</Link></li>
          </ul>
        </nav>
      </header>

      {/* Shared Banner Section */}
      <section className="banner">
        <img src={bannerImage} alt="Banner" className="banner-image" />
        <div className="banner-text">
          <h1>Welcome to Our Car Dealership</h1>
          <p>Discover our exclusive range of luxury cars.</p>
        </div>
      </section>

      {/* Search Overlay */}
      {isSearchOverlayOpen && (
        <div className="search-overlay" ref={searchOverlayRef}>
          <button className="close-search-overlay" onClick={toggleSearchOverlay}>
            <FaTimes size={24} />
          </button>
          <h2>Search & Filter Cars</h2>
          {/* Filter inputs here... same as before */}
        </div>
      )}

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
                      <p>Welcome to our car dealership. We offer the best selection of luxury cars.</p>
                    </div>
                  </div>
                </section>

                <section className="cars-for-sale">
                  <h2>Cars For Sale</h2>
                  {filteredCars.length === 0 ? (
                    <p>No cars match your criteria.</p>
                  ) : (
                    <div className="car-list">
                      {filteredCars.map(car => (
                        <div key={car.id} className="car-card">
                          <img src={car.img} alt={`${car.make} ${car.model}`} />
                          <h3>{car.make} {car.model}</h3>
                          <p>{car.variant} - {car.year}</p>
                          <p>Price: ${car.price.toLocaleString()}</p>
                          <p>Mileage: {car.mileage.toLocaleString()} km</p>
                          <p>Transmission: {car.transmission}</p>
                          <p>Fuel: {car.fuelType}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            }
          />
          <Route path="/sell" element={<Sellyourcar />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/services" element={<OtherServices />} />
          <Route path="/news" element={<NewsAndEvents />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cardetail/:id" element={<CarDetail />} />
        </Routes>
      </main>

      {!cookiesAccepted && (
        <div className="cookie-consent">
          <p>We use cookies to improve your experience. Accept cookies?</p>
          <button onClick={acceptCookies}>Accept</button>
          <button onClick={declineCookies}>Decline</button>
        </div>
      )}

      <footer>
        <div className="footer-logos">
          {footerLogos.map((logo, idx) => (
            <img key={idx} src={logo} alt="Brand logo" className="footer-logo" />
          ))}
        </div>
        <p>© 2025 Car Dealership. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Wrap App with Router and AppWrapper
export default function WrappedApp() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
