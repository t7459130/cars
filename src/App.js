import React, { useState } from 'react';
import './App.css';

// Replace with your actual image imports or URLs
import logo1 from './images/logo1.png';
import logo2 from './images/logo2.png';
import logo3 from './images/logo3.png';
import banner from './images/banner.jpg';
import aboutImage from './images/about.jpg';
import car1 from './images/car1.jpg';
import car2 from './images/car2.jpg';
import car3 from './images/car3.jpg';
import footerLogo from './images/footerLogo.png';

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button
            onClick={toggleMenu}
            className="menu-btn"
            aria-label="Toggle navigation menu"
          >
            &#9776;
          </button>
        </div>

        <div className="logo-bar">
          <img src={logo1} alt="Logo 1" className="rotating-banner-logo" />
          <img src={logo2} alt="Logo 2" className="rotating-banner-logo" />
          <img src={logo3} alt="Logo 3" className="rotating-banner-logo" />
        </div>

        <div className="header-right">
          <div className="search-bar">
            <button className="search-icon" aria-label="Search">
              🔍
            </button>
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
              aria-label="Search input"
            />
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className={`nav-menu ${menuActive ? 'active' : ''}`}>
        <ul>
          <li>
            <a href="#home" onClick={() => setMenuActive(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#sell" onClick={() => setMenuActive(false)}>
              Sell Your Car
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setMenuActive(false)}>
              About Us
            </a>
          </li>
          <li>
            <a href="#latest" onClick={() => setMenuActive(false)}>
              Latest Arrivals
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuActive(false)}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Banner */}
      <section className="banner">
        <img src={banner} alt="Banner" className="banner-image" />
        <div className="banner-text">
          <h1>Welcome to Our Car Dealership</h1>
          <p>Find your dream car today</p>
        </div>
      </section>

      {/* Sell Your Car Section */}
      <section id="sell" className="sell-your-car">
        <h2>Sell Your Car</h2>
        <form>
          <div className="name-fields">
            <input type="text" placeholder="First Name" aria-label="First Name" />
            <input type="text" placeholder="Last Name" aria-label="Last Name" />
          </div>
          <div className="car-details">
            <input type="text" placeholder="Make" aria-label="Car Make" />
            <input type="text" placeholder="Model" aria-label="Car Model" />
          </div>
          <textarea placeholder="Description" aria-label="Car Description" />
          <button type="submit">Submit</button>
        </form>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-us">
        <img src={aboutImage} alt="About Us" className="about-image" />
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            We are dedicated to providing the best car buying and selling experience. Our
            knowledgeable staff and extensive inventory ensure you find the perfect vehicle.
          </p>
        </div>
      </section>

      {/* Latest Arrivals Section */}
      <section id="latest" className="latest-arrivals">
        <h2>Latest Arrivals</h2>
        <div className="car-listings">
          <div className="car-card">
            <img src={car1} alt="Car 1" />
            <h3>Car Model 1</h3>
            <p>Details about car 1.</p>
          </div>
          <div className="car-card">
            <img src={car2} alt="Car 2" />
            <h3>Car Model 2</h3>
            <p>Details about car 2.</p>
          </div>
          <div className="car-card">
            <img src={car3} alt="Car 3" />
            <h3>Car Model 3</h3>
            <p>Details about car 3.</p>
          </div>
        </div>
      </section>

      {/* Mailing List Section */}
      <section id="contact" className="mailing-list">
        <h2>Join Our Mailing List</h2>
        <form className="mailing-form">
          <input type="email" placeholder="Enter your email" aria-label="Email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={footerLogo} alt="Footer Logo" />
          </div>
          <div className="footer-details">
            <p>© 2025 Car Dealership. All rights reserved.</p>
            <p>123 Main Street, City, Country</p>
            <p>Phone: +123 456 7890 | Email: info@cardealership.com</p>
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#sell">Sell Your Car</a>
            <a href="#about">About Us</a>
            <a href="#latest">Latest Arrivals</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-legal">
            <a href="#terms">Terms & Conditions</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
