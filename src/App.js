// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaBars, FaTimes, FaPhone, FaSearch, FaFilter } from 'react-icons/fa';
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
import banner1 from './images/carwallpaper1';
import banner2 from './images/carwallpaper2';
import banner3 from './images/carwallpaper3';
import banner4 from './images/carwallpaper4';
import banner5 from './images/carwallpaper5';
import banner6 from './images/carwallpaper6';
import banner7 from './images/carwallpaper7';
import banner8 from './images/carwallpaper8';

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

function Banner() {
  const location = useLocation();
  // Map pathnames to banner images & titles
  const bannerMap = {
    '/': { img: banner1, title: 'Welcome to Nabil’s Super Cars' },
    '/about': { img: banner2, title: 'About Us' },
    '/contact': { img: banner3, title: 'Contact Us' },
    '/services': { img: banner4, title: 'Other Services' },
    '/testimonials': { img: banner5, title: 'Testimonials' },
    '/inventory': { img: banner6, title: 'Our Inventory' },
    '/sell': { img: banner7, title: 'Sell Your Car' },
    '/news': { img: banner8, title: 'News & Events' },
  };

  const { img, title } = bannerMap[location.pathname] || bannerMap['/'];

  return (
    <section className="banner">
      <img src={img} alt="Banner" className="banner-image" />
      <div className="banner-text">
        <h1>{title}</h1>
      </div>
    </section>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const menuRef = useRef(null);
  const searchRef = useRef(null);

  const logoBatches = [
    [ferrariLogo, lamborghiniLogo, rollsLogo, bentleyLogo],
    [astonLogo, paganiLogo, bugattiLogo, mercedesLogo]
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
    rollsLogo
  ];

  const [batchIndex, setBatchIndex] = useState(0);
  const [footerIndex, setFooterIndex] = useState(0);

  const cars = [
    { id: 1, make: 'Tesla', model: 'Model S', year: 2021, price: 80000, mileage: 15000, transmission: 'Automatic', fuelType: 'Electric', bodyType: 'Sedan', color: 'Red', driveType: 'AWD', img: car1 },
    { id: 2, make: 'BMW', model: 'i8', year: 2020, price: 120000, mileage: 20000, transmission: 'Automatic', fuelType: 'Hybrid', bodyType: 'Coupe', color: 'Blue', driveType: 'RWD', img: car2 },
    { id: 3, make: 'Audi', model: 'R8', year: 2019, price: 150000, mileage: 18000, transmission: 'Automatic', fuelType: 'Petrol', bodyType: 'Coupe', color: 'Black', driveType: 'AWD', img: car3 },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterMake, setFilterMake] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterFuel, setFilterFuel] = useState('');
  const [filterBody, setFilterBody] = useState('');
  const [filterTrans, setFilterTrans] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterDrive, setFilterDrive] = useState('');
  const [filterPriceMin, setFilterPriceMin] = useState('');
  const [filterPriceMax, setFilterPriceMax] = useState('');
  const [filterMileageMin, setFilterMileageMin] = useState('');
  const [filterMileageMax, setFilterMileageMax] = useState('');
  const [sortOpt, setSortOpt] = useState('');

  useEffect(() => {
    const closeOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setIsSearchOpen(false);
    };
    document.addEventListener('mousedown', closeOutside);
    return () => document.removeEventListener('mousedown', closeOutside);
  }, []);

  useEffect(() => {
    const iv1 = setInterval(() => setBatchIndex(i => (i + 1) % logoBatches.length), 3000);
    const iv2 = setInterval(() => setFooterIndex(i => (i + 1) % footerLogos.length), 1000);
    return () => { clearInterval(iv1); clearInterval(iv2); };
  }, []);

  const filtered = cars
    .filter(c => `${c.make} ${c.model}`.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(c => !filterMake || c.make === filterMake)
    .filter(c => !filterModel || c.model === filterModel)
    .filter(c => !filterYear || c.year.toString() === filterYear)
    .filter(c => !filterFuel || c.fuelType === filterFuel)
    .filter(c => !filterBody || c.bodyType === filterBody)
    .filter(c => !filterTrans || c.transmission === filterTrans)
    .filter(c => !filterColor || c.color === filterColor)
    .filter(c => !filterDrive || c.driveType === filterDrive)
    .filter(c => !filterPriceMin || c.price >= Number(filterPriceMin))
    .filter(c => !filterPriceMax || c.price <= Number(filterPriceMax))
    .filter(c => !filterMileageMin || c.mileage >= Number(filterMileageMin))
    .filter(c => !filterMileageMax || c.mileage <= Number(filterMileageMax))
    .sort((a, b) => {
      if (sortOpt === 'price-asc') return a.price - b.price;
      if (sortOpt === 'price-desc') return b.price - a.price;
      if (sortOpt === 'year-asc') return a.year - b.year;
      if (sortOpt === 'year-desc') return b.year - a.year;
      return 0;
    });

  return (
    <Router>
      <div className="app">
        <Helmet>
          <title>Car Dealership</title>
          <link rel="icon" href={ferrariLogo} type="image/png" />
        </Helmet>
        <header className="header">
          <div className="header-left">
            <a href="tel:1234567890" className="call-me"><FaPhone size={20} /></a>
          </div>

          <div className="logo-bar desktop-logo-bar">
            {logoBatches[batchIndex].map((l, i) => <img key={i} src={l} className="desktop-logo" alt="" />)}
          </div>
          <div className="logo-bar mobile-logo-bar">
            <img src={footerLogos[footerIndex]} className="mobile-logo" alt="" />
          </div>

          <div className="header-right">
            {/* Search button */}
            <button
              className="search-btn"
              onClick={() => {
                setIsSearchOpen(true);
                setShowFilters(false);
              }}
              aria-label="open search"
            >
              <FaSearch />
            </button>

            {/* Menu toggle button */}
            <button
              className="menu-btn"
              onClick={() => setIsMenuOpen(open => !open)}
              aria-label="toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              {['/', '/inventory', '/about', '/contact', '/sell', '/news', '/services', '/testimonials'].map((path, i) => (
                <li key={i}>
                  <Link to={path} onClick={() => setIsMenuOpen(false)}>
                    {path === '/' ? 'Home' : path.slice(1).replace('-', ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <Banner />

        {isSearchOpen && (
          <div className="search-overlay" ref={searchRef} role="dialog" aria-modal="true">
            <button
              className="close-search-overlay"
              onClick={() => setIsSearchOpen(false)}
              aria-label="close search"
            >
              <FaTimes />
            </button>

            <h2>Search & Filter</h2>

            <input
              type="text"
              placeholder="Search by make or model..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />

            <button
              className="filter-toggle-btn"
              onClick={() => setShowFilters(show => !show)}
              aria-expanded={showFilters}
              aria-controls="filter-panel"
            >
              <FaFilter /> Filters
            </button>

            {showFilters && (
              <section id="filter-panel" className="filters-panel">
                <select value={filterMake} onChange={e => setFilterMake(e.target.value)}>
                  <option value="">All Makes</option>
                  {[...new Set(cars.map(c => c.make))].map(m => <option key={m} value={m}>{m}</option>)}
                </select>

                <select value={filterModel} onChange={e => setFilterModel(e.target.value)}>
                  <option value="">All Models</option>
                  {[...new Set(cars.filter(c => !filterMake || c.make === filterMake).map(c => c.model))].map(m => <option key={m} value={m}>{m}</option>)}
                </select>

                <select value={filterYear} onChange={e => setFilterYear(e.target.value)}>
                  <option value="">All Years</option>
                  {[...new Set(cars.map(c => c.year.toString()))].sort((a,b)=>b-a).map(y => <option key={y} value={y}>{y}</option>)}
                </select>

                <select value={filterFuel} onChange={e => setFilterFuel(e.target.value)}>
                  <option value="">All Fuel Types</option>
                  {[...new Set(cars.map(c => c.fuelType))].map(f => <option key={f} value={f}>{f}</option>)}
                </select>

                <select value={filterBody} onChange={e => setFilterBody(e.target.value)}>
                  <option value="">All Body Types</option>
                  {[...new Set(cars.map(c => c.bodyType))].map(b => <option key={b} value={b}>{b}</option>)}
                </select>

                <select value={filterTrans} onChange={e => setFilterTrans(e.target.value)}>
                  <option value="">All Transmissions</option>
                  {[...new Set(cars.map(c => c.transmission))].map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <select value={filterColor} onChange={e => setFilterColor(e.target.value)}>
                  <option value="">All Colors</option>
                  {[...new Set(cars.map(c => c.color))].map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <select value={filterDrive} onChange={e => setFilterDrive(e.target.value)}>
                  <option value="">All Drive Types</option>
                  {[...new Set(cars.map(c => c.driveType))].map(d => <option key={d} value={d}>{d}</option>)}
                </select>

                <div className="range-filters">
                  <label>Price Range:</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filterPriceMin}
                    onChange={e => setFilterPriceMin(e.target.value)}
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filterPriceMax}
                    onChange={e => setFilterPriceMax(e.target.value)}
                    min="0"
                  />
                </div>

                <div className="range-filters">
                  <label>Mileage Range:</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filterMileageMin}
                    onChange={e => setFilterMileageMin(e.target.value)}
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filterMileageMax}
                    onChange={e => setFilterMileageMax(e.target.value)}
                    min="0"
                  />
                </div>
              </section>
            )}

            <select
              className="sort-select"
              value={sortOpt}
              onChange={e => setSortOpt(e.target.value)}
              aria-label="Sort by"
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price Low → High</option>
              <option value="price-desc">Price High → Low</option>
              <option value="year-asc">Year Ascending</option>
              <option value="year-desc">Year Descending</option>
            </select>

            <section className="latest-arrivals-overlay">
              <h3>Latest Stock</h3>
              <div className="car-listings">
                {filtered.length > 0 ? (
                  filtered.map(c => (
                    <div key={c.id} className="car-card">
                      <img src={c.img} alt={`${c.make} ${c.model}`} />
                      <div className="car-details">
                        <h4>{c.year} {c.make} {c.model}</h4>
                        <p>${c.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No cars match your criteria.</p>
                )}
              </div>
            </section>
          </div>
        )}

        <main>
          <Routes>
            <Route path="/" element={<section className="latest-arrivals"><h2>Welcome!</h2></section>} />
            <Route path="/about" element={<OtherServices />} />
            {/* Add other routes similarly */}
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/car/:id" element={<CarDetail />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={footerLogos[footerIndex]} alt="" className="footer-logo-img" />
            </div>
            <div className="footer-details">…</div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
