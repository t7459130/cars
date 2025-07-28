import React, { useState } from "react";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <button
          aria-label="Toggle menu"
          onClick={toggleMenu}
          className="menu-btn"
        >
          &#9776;
        </button>

        <div className="logo-bar">
          <img
            src="https://cdn.pixabay.com/photo/2016/01/22/11/17/car-1150209_960_720.png"
            alt="Car Logo"
            className="car-logo"
          />
          <img
            src="https://cdn.pixabay.com/photo/2017/01/31/20/12/car-2020350_960_720.png"
            alt="Car Logo"
            className="car-logo"
          />
          <img
            src="https://cdn.pixabay.com/photo/2017/01/31/20/12/car-2020350_960_720.png"
            alt="Car Logo"
            className="car-logo"
          />
        </div>

        <div className="search-bar">
          <button className="search-icon" aria-label="Search">
            🔍
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#home" onClick={toggleMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="#latest-arrivals" onClick={toggleMenu}>
              Latest Arrivals
            </a>
          </li>
          <li>
            <a href="#sell-your-car" onClick={toggleMenu}>
              Sell Your Car
            </a>
          </li>
          <li>
            <a href="#about-us" onClick={toggleMenu}>
              About Us
            </a>
          </li>
          <li>
            <a href="#mailing-list" onClick={toggleMenu}>
              Mailing List
            </a>
          </li>
          <li>
            <a href="#testimonials" onClick={toggleMenu}>
              Testimonials
            </a>
          </li>
          <li>
            <a href="#other-services" onClick={toggleMenu}>
              Other Services
            </a>
          </li>
          <li>
            <a href="#news-and-events" onClick={toggleMenu}>
              News and Events
            </a>
          </li>
        </ul>
      </nav>

      {/* Banner */}
      <section className="banner">
        <img
          src="https://cdn.pixabay.com/photo/2017/02/15/10/39/automobile-2066787_960_720.jpg"
          alt="Banner"
          className="banner-image"
        />
        <div className="banner-text">
          <h1>Welcome to Our Car Marketplace</h1>
          <p>Find your dream car or sell your current one!</p>
        </div>
      </section>

      {/* Sell Your Car Form */}
      <section id="sell-your-car" className="sell-your-car">
        <h2>Sell Your Car</h2>
        <form>
          <div className="name-fields">
            <input
              type="text"
              placeholder="First Name"
              aria-label="First Name"
            />
            <input
              type="text"
              placeholder="Last Name"
              aria-label="Last Name"
            />
          </div>
          <div className="car-details">
            <input type="text" placeholder="Make" aria-label="Car Make" />
            <input type="text" placeholder="Model" aria-label="Car Model" />
          </div>
          <textarea
            placeholder="Description"
            aria-label="Car Description"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="about-us">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/29/04/17/car-1866740_960_720.jpg"
          alt="About Us"
          className="about-image"
        />
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            We are a passionate team dedicated to connecting car buyers and
            sellers. Our mission is to make car trading smooth, trustworthy,
            and enjoyable.
          </p>
        </div>
      </section>

      {/* Latest Arrivals Section */}
      <section id="latest-arrivals" className="latest-arrivals">
        <h2>Latest Arrivals</h2>
        <div className="car-listings">
          <div className="car-card">
            <img
              src="https://cdn.pixabay.com/photo/2012/05/29/00/43/ford-49274_960_720.jpg"
              alt="Car 1"
            />
            <h3>Ford Mustang</h3>
            <p>Powerful and iconic muscle car.</p>
          </div>
          <div className="car-card">
            <img
              src="https://cdn.pixabay.com/photo/2016/01/19/17/41/automobile-1149993_960_720.jpg"
              alt="Car 2"
            />
            <h3>Tesla Model S</h3>
            <p>Electric performance with luxury.</p>
          </div>
          <div className="car-card">
            <img
              src="https://cdn.pixabay.com/photo/2014/06/24/10/47/auto-376672_960_720.jpg"
              alt="Car 3"
            />
            <h3>BMW M3</h3>
            <p>Sporty and sophisticated sedan.</p>
          </div>
        </div>
      </section>

      {/* Mailing List Section */}
      <section id="mailing-list" className="mailing-list">
        <h2>Join Our Mailing List</h2>
        <form className="mailing-form">
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonial-list">
          <div className="testimonial-card">
            <p className="quote">
              "Great experience buying my first car here!"
            </p>
            <p className="author">- John Doe</p>
          </div>
          <div className="testimonial-card">
            <p className="quote">"Selling my car was fast and easy."</p>
            <p className="author">- Jane Smith</p>
          </div>
          <div className="testimonial-card">
            <p className="quote">"Excellent customer support and wide variety."</p>
            <p className="author">- Alex Johnson</p>
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <section id="other-services" className="other-services">
        <h2>Other Services</h2>
        <div className="services-list">
          <div className="service-card">
            <h3>Car Financing</h3>
            <p>Flexible payment plans tailored to you.</p>
          </div>
          <div className="service-card">
            <h3>Car Insurance</h3>
            <p>Comprehensive coverage for peace of mind.</p>
          </div>
          <div className="service-card">
            <h3>Maintenance Services</h3>
            <p>Keep your car running smoothly with us.</p>
          </div>
        </div>
      </section>

      {/* News and Events Section */}
      <section id="news-and-events" className="news-and-events">
        <h2>News and Events</h2>
        <div className="events-list">
          <div className="event-card">
            <h3>Annual Car Expo 2025</h3>
            <p>Join us for the latest in automotive technology.</p>
          </div>
          <div className="event-card">
            <h3>New Models Launch</h3>
            <p>Discover the newest cars hitting the market.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img
              src="https://cdn.pixabay.com/photo/2016/01/22/11/17/car-1150209_960_720.png"
              alt="Car Logo"
            />
          </div>
          <div className="footer-details">
            <p>© 2025 Car Marketplace. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
          <div className="footer-legal">
            <p>Designed by Your Company</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
