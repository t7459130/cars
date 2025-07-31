// SearchOverlay.js
import React, { useState } from 'react';

function SearchOverlay({ cars, isOpen, onClose }) {
  const [search, setSearch] = useState('');
  const [transmission, setTransmission] = useState('');
  const [sort, setSort] = useState('latest');

  const filteredCars = cars
    .filter((car) =>
      `${car.make} ${car.model}`.toLowerCase().includes(search.toLowerCase())
    )
    .filter((car) => (transmission ? car.transmission === transmission : true))
    .sort((a, b) => {
      if (sort === 'price') return parseInt(a.price) - parseInt(b.price);
      return b.year - a.year; // latest by year
    });

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <button className="close-btn" onClick={onClose}>Close</button>
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search by make or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setTransmission(e.target.value)} value={transmission}>
          <option value="">All Transmissions</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="latest">Sort by: Latest</option>
          <option value="price">Sort by: Price (Low to High)</option>
        </select>
      </div>

      <div className="search-results">
        {filteredCars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={`${car.make} ${car.model}`} />
            <div className="car-details">
              <h3>{car.year} {car.make} {car.model}</h3>
              <p>{car.variant}</p>
              <p>Price: {car.price}</p>
              <p>{car.transmission}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchOverlay;
