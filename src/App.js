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
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [currentFooterLogoIndex, setCurrentFooterLogoIndex] = useState(0);
  const menuRef = useRef(null);

  // Search/filter/sort UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMake, setFilterMake] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterFuel, setFilterFuel] = useState('');
  const [filterBody, setFilterBody] = useState('');
  const [filterTrans, setFilterTrans] = useState('');
  const [filterMileageMax, setFilterMileageMax] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Toggles for filter and sort dropdowns
  const [showFilters, setShowFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  // New: Search overlay toggle
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
      if (
        searchOverlayRef.current &&
        !searchOverlayRef.current.contains(event.target) &&
        showSearchOverlay
      ) {
        setShowSearchOverlay(false);
        setShowFilters(false);
        setShowSortOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, showSearchOverlay]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFooterLogoIndex(
        (prevIndex) => (prevIndex + 1) % footerLogos.length
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredCars = carsForSale
    .filter((car) =>
      `${car.make} ${car.model} ${car.variant}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((car) => (filterMake ? car.make === filterMake : true))
    .filter((car) => (filterModel ? car.model === filterModel : true))
    .filter((car) => (filterYear ? car.year.toString() === filterYear : true))
    .filter((car) => (filterFuel ? car.fuelType === filterFuel : true))
    .filter((car) => (filterBody ? car.bodyType === filterBody : true))
    .filter((car) => (filterTrans ? car.transmission === filterTrans : true))
    .filter((car) =>
      filterMileageMax ? car.mileage <= parseInt(filterMileageMax) : true
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-asc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        case 'mileage-asc':
          return a.mileage - b.mileage;
        case 'mileage-desc':
          return b.mileage - a.mileage;
        default:
          return 0;
      }
    });

  // Handlers for toggling filter and sort panels
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
    if (showSortOptions) setShowSortOptions(false);
  };

  const handleSortToggle = () => {
    setShowSortOptions(!showSortOptions);
    if (showFilters) setShowFilters(false);
  };

  // Open the search overlay
  const openSearchOverlay = () => {
    setShowSearchOverlay(true);
    // Reset filter/sort panel states for clarity
    setShowFilters(false);
    setShowSortOptions(false);
  };

  // Confirm search and close overlay
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSearchOverlay(false);
    setShowFilters(false);
    setShowSortOptions(false);
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
            <a
              href="tel:1234567890"
              className="call-me"
              style={{ color: '#000', textDecoration: 'none' }}
              aria-label="Call phone"
            >
              <FaPhone size={20} />
            </a>
          </div>

          <div className="logo-bar desktop-logo-bar">
            {logoBatches[currentBatchIndex].map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt={`Logo batch ${currentBatchIndex} - ${idx}`}
                className="desktop-logo"
              />
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
            {/* Search icon/button */}
            <button
              className="menu-btn search-btn"
              onClick={openSearchOverlay}
              aria-label="Open Search"
            >
              <FaSearch />
            </button>

            {/* Hamburger menu */}
            <button
              className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li>
                <Link to="/" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/inventory" onClick={toggleMenu}>
                  Inventory
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={toggleMenu}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={toggleMenu}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/sell" onClick={toggleMenu}>
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link to="/news" onClick={toggleMenu}>
                  News and Events
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={toggleMenu}>
                  Other Services
                </Link>
              </li>
              <li>
                <Link to="/testimonials" onClick={toggleMenu}>
                  Testimonials
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Search overlay */}
        {showSearchOverlay && (
          <div className="search-overlay">
            <div className="search-overlay-content" ref={searchOverlayRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="search-row">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search your dream car"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                    aria-label="Search cars"
                  />
                  <button
                    type="button"
                    className={`btn btn-filter ${showFilters ? 'active' : ''}`}
                    onClick={handleFilterToggle}
                    aria-expanded={showFilters}
                    aria-controls="filter-options"
                  >
                    Filter
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sort ${showSortOptions ? 'active' : ''}`}
                    onClick={handleSortToggle}
                    aria-expanded={showSortOptions}
                    aria-controls="sort-options"
                  >
                    Sort By
                  </button>
                </div>

                {/* Filter options */}
                {showFilters && (
                  <div id="filter-options" className="filter-options">
                    <select
                      value={filterMake}
                      onChange={(e) => setFilterMake(e.target.value)}
                      aria-label="Filter by Make"
                    >
                      <option value="">Make</option>
                      <option value="Tesla">Tesla</option>
                      <option value="BMW">BMW</option>
                      <option value="Audi">Audi</option>
                    </select>
                    <select
                      value={filterModel}
                      onChange={(e) => setFilterModel(e.target.value)}
                      aria-label="Filter by Model"
                    >
                      <option value="">Model</option>
                      <option value="Model S">Model S</option>
                      <option value="i8">i8</option>
                      <option value="R8">R8</option>
                    </select>
                    <select
                      value={filterYear}
                      onChange={(e) => setFilterYear(e.target.value)}
                      aria-label="Filter by Year"
                    >
                      <option value="">Year</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </select>
                    <select
                      value={filterFuel}
                      onChange={(e) => setFilterFuel(e.target.value)}
                      aria-label="Filter by Fuel Type"
                    >
                      <option value="">Fuel Type</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Petrol">Petrol</option>
                    </select>
                    <select
                      value={filterBody}
                      onChange={(e) => setFilterBody(e.target.value)}
                      aria-label="Filter by Body Type"
                    >
                      <option value="">Body Type</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Coupe">Coupe</option>
                    </select>
                    <select
                      value={filterTrans}
                      onChange={(e) => setFilterTrans(e.target.value)}
                      aria-label="Filter by Transmission"
                    >
                      <option value="">Transmission</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                    <input
                      type="number"
                      min="0"
                      placeholder="Max Mileage"
                      value={filterMileageMax}
                      onChange={(e) => setFilterMileageMax(e.target.value)}
                      aria-label="Filter by Max Mileage"
                    />
                  </div>
                )}

                {/* Sort options */}
                {showSortOptions && (
                  <div id="sort-options" className="sort-options">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      aria-label="Sort cars by"
                    >
                      <option value="">Sort By</option>
                      <option value="price-asc">Price (Low to High)</option>
                      <option value="price-desc">Price (High to Low)</option>
                      <option value="year-asc">Year (Old to New)</option>
                      <option value="year-desc">Year (New to Old)</option>
                      <option value="mileage-asc">Mileage (Low to High)</option>
                      <option value="mileage-desc">Mileage (High to Low)</option>
                    </select>
                  </div>
                )}

                <div className="search-btn-row">
                  <button type="submit" className="btn btn-search-submit">
                    Search
                  </button>
                  <button
                    type="button"
                    className="btn btn-cancel"
                    onClick={() => {
                      setShowSearchOverlay(false);
                      setShowFilters(false);
                      setShowSortOptions(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="banner">
                    <img src={bannerImage} alt="Car Banner" />
                    <div className="banner-content">
                      <h1>Find Your Dream Car</h1>
                      <p>Browse our extensive collection of luxury vehicles</p>
                    </div>
                  </section>

                  <section className="cars-for-sale">
                    <h2>Cars for Sale</h2>
                    <div className="car-list">
                      {filteredCars.length === 0 ? (
                        <p>No cars found matching your criteria.</p>
                      ) : (
                        filteredCars.map((car) => (
                          <div key={car.id} className="car-card">
                            <img src={car.img} alt={`${car.make} ${car.model}`} />
                            <div className="car-info">
                              <h3>
                                {car.make} {car.model} {car.variant}
                              </h3>
                              <p>Year: {car.year}</p>
                              <p>Price: ${car.price.toLocaleString()}</p>
                              <p>Mileage: {car.mileage.toLocaleString()} km</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
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
            <Route path="/car/:carId" element={<CarDetail />} />
            {/* Add other routes here */}
          </Routes>
        </main>

        {!cookiesAccepted && (
          <div className="cookie-consent">
            <p>
              We use cookies to improve your experience. By continuing, you agree
              to our use of cookies.
            </p>
            <button onClick={acceptCookies}>Accept</button>
            <button onClick={declineCookies}>Decline</button>
          </div>
        )}

        <footer className="footer">
          <p>&copy; 2025 Car Dealership. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
