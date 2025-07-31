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

// New admin & pages
import { AdminProvider, useAdmin } from './AdminContext';
import AddCarPage from './AddCarPage';
import CarForm from './CarForm';
import SearchOverlay from './SearchOverlay';

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

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [currentFooterLogoIndex, setCurrentFooterLogoIndex] = useState(0);
  const menuRef = useRef(null);
  const { isAdmin } = useAdmin();

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

  const [cars, setCars] = useState([
    { id: 1, make: 'Tesla', model: 'Model S', year: 2021, price: '80000', transmission: 'Automatic', fuelType: 'Electric', mileage: '15000', bodyStyle: 'Sedan', colour: 'Red', engineSize: '', fuelEconomy: '', images: [car1] },
    { id: 2, make: 'BMW', model: 'i8', year: 2020, price: '120000', transmission: 'Automatic', fuelType: 'Hybrid', mileage: '8000', bodyStyle: 'Coupe', colour: 'Blue', engineSize: '', fuelEconomy: '', images: [car2] },
    { id: 3, make: 'Audi', model: 'R8', year: 2019, price: '150000', transmission: 'Manual', fuelType: 'Petrol', mileage: '5000', bodyStyle: 'Coupe', colour: 'Black', engineSize: '5.2L', fuelEconomy: '', images: [car3] }
  ]);

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
    const interval = setInterval(() => {
      setCurrentBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval2 = setInterval(() => {
      setCurrentFooterLogoIndex((prev) => (prev + 1) % footerLogos.length);
    }, 1000);
    return () => clearInterval(interval2);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const addCar = (newCar) => {
    setCars((prev) => [...prev, { ...newCar, id: Date.now() }]);
  };

  return (
    <Router>
      <div className="app">
        <Helmet>
          <title>Car Dealership</title>
          <link rel="icon" href={ferrariLogo} type="image/png" />
        </Helmet>

        <header className="header" style={{ position: 'relative' }}>
          <div className="header-left">
            <a href="tel:1234567890" className="call‑me" style={{ color: '#000', textDecoration: 'none' }}>
              <FaPhone size={20} />
            </a>
          </div>

          {/* Desktop: rotating logos */}
          <div className="logo-bar desktop-logo-bar">
            {logoBatches[currentBatchIndex].map((logo, idx) => (
              <img key={idx} src={logo} alt={`Logo batch ${currentBatchIndex} - ${idx}`} className="desktop-logo" />
            ))}
          </div>

          <div className="header‑icons">
            <button onClick={openSearch} className="search-btn"><FaSearch size={20} /></button>
            <button className={`menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
              style={{ position: 'relative', zIndex: 1001 }}
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile rotating single logo */}
          <div className="logo-bar mobile-logo-bar">
            <img
              src={footerLogos[currentFooterLogoIndex]}
              alt={`Rotating footer logo mobile ${currentFooterLogoIndex}`}
              className="mobile-logo"
            />
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
              {isAdmin && <li><Link to="/admin/add-car" onClick={toggleMenu}>Add Car (Admin)</Link></li>}
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

        {/* Search overlay */}
        <SearchOverlay cars={cars} isOpen={isSearchOpen} onClose={closeSearch} />

        {/* CarForm used by /admin/add-car page for adding cars */}
        {/* So CarForm not rendered here in main flow */}

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
                      {cars.map((car) => (
                        <div key={car.id} className="car-card">
                          <Link to={`/car/${car.id}`}>
                            <img src={car.images?.[0] || car.img} alt={`${car.make} ${car.model}`} />
                            <div className="car-details">
                              <h3>{car.year} {car.make} {car.model}</h3>
                              <p>Price: £{car.price}</p>
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
            <Route
              path="/inventory"
              element={
                <>
                  <Helmet><title>Inventory</title></Helmet>
                  <h2>Inventory</h2>
                  <div className="car-listings">
                    {cars.map((car) => (
                      <div key={car.id} className="car-card">
                        <Link to={`/car/${car.id}`}>
                          <img src={car.images?.[0] || car.img} alt={`${car.make} ${car.model}`} />
                          <div className="car-details">
                            <h3>{car.year} {car.make} {car.model}</h3>
                            <p>Price: £{car.price}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              }
            />
            <Route path="/car/:carId" element={<CarDetail />} />
            <Route path="/admin/add-car" element={<AddCarPage onAddCar={addCar} />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo footer-logo-rotating">
              <img
                src={footerLogos[currentFooterLogoIndex]}
                alt={`Footer Logo ${currentFooterLogoIndex}`}
                className="footer-logo-img"
              />
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
                <Link to="/sitemap">Sitemap</Link> |{' '}
                <Link to="/cookie-policy">Cookie Policy</Link> |{' '}
                <Link to="/privacy-policy">Privacy Policy</Link> |{' '}
                <Link to="/complaints-procedure">Complaints Procedure</Link> |{' '}
                <Link to="/modern-slavery">Modern Slavery Statement</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
