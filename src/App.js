// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Sellyourcar from './Sellyourcar';
import Inventory from './Inventory';
import Testimonials from './Testimonials';
import OtherServices from './OtherServices';
import NewsAndEvents from './NewsAndEvents';
import ContactUs from './ContactUs';
import CarDetail from './CarDetail';

import aboutImage from './images/car1.jpg';
import bannerImage from './images/carwallpaper.webp';

// Logos
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

  // Filters & sorting state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMake, setFilterMake] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterFuel, setFilterFuel] = useState('');
  const [filterBody, setFilterBody] = useState('');
  const [filterTrans, setFilterTrans] = useState('');
  const [filterMileageMax, setFilterMileageMax] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Toggle hamburger menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle search overlay
  const toggleSearchOverlay = () => setIsSearchOverlayOpen(prev => !prev);

  // Close menus if clicking outside
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

  // Cookies acceptance
  const acceptCookies = () => {
    setCookiesAccepted(true);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  const declineCookies = () => {
    setCookiesAccepted(true);
    localStorage.setItem('cookiesAccepted', 'false');
  };

  useEffect(() => {
    const consent = localStorage.getItem('cookiesAccepted');
    if (consent) setCookiesAccepted(consent === 'true');
  }, []);

  // Rotate logo batches in header
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Rotate footer logos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFooterLogoIndex((prevIndex) => (prevIndex + 1) % footerLogos.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter and sort cars based on state
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

          <div className="logo-bar desktop-logo-bar">
            {logoBatches[currentBatchIndex].map((logo, idx) => (
              <img key={idx} src={logo} alt={`Logo batch ${currentBatchIndex} - ${idx}`} className="desktop-logo" />
            ))}
          </div>

          <div className="logo-bar mobile-logo-bar">
            <img
              src={footerLogos[currentFooterLogoIndex]}
              alt={`Rotating footer logo mobile ${currentFooterLogoIndex}`}
              className="mobile-logo"
            />
          </div>

          <div className="header-right">
            {/* Search button */}
            <button
              className="search-btn"
              onClick={toggleSearchOverlay}
              aria-label={isSearchOverlayOpen ? 'Close search filters' : 'Open search filters'}
            >
              <FaSearch />
            </button>

            {/* Hamburger menu button */}
            <button className={`menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
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

        <section className="banner">
          <img src={bannerImage} alt="Banner" className="banner-image" />
          <div className="banner-text">
            <h1>Welcome to Our Car Dealership</h1>
            <p>Discover our exclusive range of luxury cars.</p>
          </div>
        </section>

        {/* Search Overlay menu */}
        {isSearchOverlayOpen && (
          <div className="search-overlay" ref={searchOverlayRef} role="dialog" aria-modal="true">
            <button className="close-search-overlay" onClick={toggleSearchOverlay} aria-label="Close search filters">
              <FaTimes size={24} />
            </button>
            <h2>Search & Filter Cars</h2>
            <input
              type="text"
              placeholder="Search make, model, variant"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <select value={filterMake} onChange={e => setFilterMake(e.target.value)}>
              <option value="">All Makes</option>
              {[...new Set(carsForSale.map(c => c.make))].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select value={filterModel} onChange={e => setFilterModel(e.target.value)}>
              <option value="">All Models</option>
              {[...new Set(carsForSale.map(c => c.model))].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select value={filterYear} onChange={e => setFilterYear(e.target.value)}>
              <option value="">Any Year</option>
              {[...new Set(carsForSale.map(c => c.year.toString()))].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <select value={filterFuel} onChange={e => setFilterFuel(e.target.value)}>
              <option value="">All Fuels</option>
              {[...new Set(carsForSale.map(c => c.fuelType))].map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <select value={filterBody} onChange={e => setFilterBody(e.target.value)}>
              <option value="">All Body Types</option>
              {[...new Set(carsForSale.map(c => c.bodyType))].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <select value={filterTrans} onChange={e => setFilterTrans(e.target.value)}>
              <option value="">All Transmission</option>
              {[...new Set(carsForSale.map(c => c.transmission))].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Max Mileage"
              value={filterMileageMax}
              onChange={e => setFilterMileageMax(e.target.value)}
            />
            <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
              <option value="">Sort By</option>
              <option value="year-desc">Year (Newest)</option>
              <option value="year-asc">Year (Oldest)</option>
              <option value="price-asc">Price (Low→High)</option>
              <option value="price-desc">Price (High→Low)</option>
              <option value="mileage-asc">Mileage (Low→High)</option>
              <option value="mileage-desc">Mileage (High→Low)</option>
            </select>
          </div>
        )}

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Helmet><title>Home - Car Dealership</title></Helmet>

                  {/* Remove original search filters section here because it's now in overlay */}

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
            {/* Add other routes as needed */}
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
    </Router>
  );
}

export default App;
