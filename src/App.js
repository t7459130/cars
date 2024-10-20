import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Ensure CSS is imported
import { FaSearch, FaBars, FaTimes, FaPhone } from 'react-icons/fa'; // Added phone icon
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sellyourcar from './Sellyourcar'; // Add this import
import Inventory from './Inventory'; // Add this import
import Testimonials from './Testimonials'; // Add this import
import OtherServices from './OtherServices'; // Add this import
import NewsAndEvents from './NewsAndEvents'; // Add this import
import ContactUs from './ContactUs'; // Add this import

// Placeholder images
import aboutImage from './images/car1.jpg';
import contactImage from './images/car2.jpg';
import car1 from './images/car1.jpg';
import car2 from './images/car2.jpg';
import car3 from './images/car3.jpg';
import bannerImage from './images/carwallpaper.webp';
import astonLogo from './images/aston.png';
import bentleyLogo from './images/bentley.png';
import porscheLogo from './images/porsche.png';
import rollsLogo from './images/rolls.png';
import ferrariLogo from './images/ferrari.png';
import lamborghiniLogo from './images/lamborghini.png'; // Import the Lamborghini logo

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef(null); // Reference for the menu

  const carsForSale = [
    { id: 1, make: 'Tesla', model: 'Model S', year: 2021, price: '$80,000', img: car1 },
    { id: 2, make: 'BMW', model: 'i8', year: 2020, price: '$120,000', img: car2 },
    { id: 3, make: 'Audi', model: 'R8', year: 2019, price: '$150,000', img: car3 },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // app.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Car = require('./models/Car');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/carInventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory for storing uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Endpoint for adding a new car
app.post('/cars', upload.array('photos', 50), async (req, res) => {
    const { make, model, year, description } = req.body;
    const photos = req.files.map(file => file.path); // Extract file paths

    const newCar = new Car({ make, model, year, description, photos });
    await newCar.save();

    res.status(201).json({ message: 'Car added to inventory', car: newCar });
});

// Get all cars in inventory
app.get('/cars', async (req, res) => {
    const cars = await Car.find();
    res.json(cars);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


  // Close menu when clicking outside
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

  return (
    <Router>
      <div className="app">
        {/* Sticky Header */}
        <header className="header">
          {/* Search Bar Icon */}
          <div className="search-bar">
            <button onClick={toggleSearch} className="search-icon">
              <FaSearch />
            </button>
            <Link to="/contact" className="call-me">
              <FaPhone />
              <span className="phone-number">123-456-7890</span> {/* Random phone number */}
            </Link>
            {isSearchOpen && <input type="text" placeholder="Search..." className="search-input" />}
          </div>

          {/* Logo Bar in the Center */}
          <div className="logo-bar">
            <img src={astonLogo} alt="Aston Martin Logo" className="car-logo" />
            <img src={bentleyLogo} alt="Bentley Logo" className="car-logo" />
            <img src={porscheLogo} alt="Porsche Logo" className="car-logo" />
            <img src={rollsLogo} alt="Rolls-Royce Logo" className="car-logo" />
            <img src={ferrariLogo} alt="Ferrari Logo" className="car-logo" />
            <img src={lamborghiniLogo} alt="Lamborghini Logo" className="car-logo" /> {/* Add the Lamborghini logo here */}
          </div>

          {/* Hamburger Menu on the Right */}
          <div className="header-right">
            <button className={`menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Collapsible Menu */}
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

        {/* Banner Section */}
        <section className="banner">
          <img src={bannerImage} alt="Banner" className="banner-image" />
          <div className="banner-text">
            <h1>Welcome to Our Car Dealership</h1>
            <p>Discover our exclusive range of luxury cars.</p>
          </div>
        </section>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={
              <>
                {/* About Us Section */}
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

                {/* Latest Arrivals */}
                <section className="latest-arrivals">
                  <h2>Latest Arrivals</h2>
                  <div className="car-listings">
                    {carsForSale.map((car) => (
                      <div key={car.id} className="car-card">
                        <img src={car.img} alt={`${car.make} ${car.model}`} />
                        <div className="car-details">
                          <h3>{car.year} {car.make} {car.model}</h3>
                          <p>Price: {car.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            } />
            <Route path="/about" element={<h2>About Us Page</h2>} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/sell" element={<Sellyourcar />} />
            <Route path="/news" element={<NewsAndEvents />} />
            <Route path="/services" element={<OtherServices />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Your Dealership. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
