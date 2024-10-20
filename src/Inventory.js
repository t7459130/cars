// src/Inventory.js
import React from 'react';
import car1 from './images/car1.jpg'; // Ensure you have the correct path to car1 image

const carsInventory = [
  { id: 1, make: 'Tesla', model: 'Model S', year: 2021, price: '$80,000' },
  { id: 2, make: 'BMW', model: 'i8', year: 2020, price: '$120,000' },
  { id: 3, make: 'Audi', model: 'R8', year: 2019, price: '$150,000' },
  { id: 4, make: 'Mercedes-Benz', model: 'C-Class', year: 2022, price: '$55,000' },
  { id: 5, make: 'Porsche', model: '911', year: 2023, price: '$150,000' },
  { id: 6, make: 'Jaguar', model: 'F-Type', year: 2021, price: '$102,000' },
  { id: 7, make: 'Ford', model: 'Mustang', year: 2021, price: '$45,000' },
  { id: 8, make: 'Chevrolet', model: 'Corvette', year: 2022, price: '$70,000' },
  { id: 9, make: 'Lexus', model: 'LC', year: 2022, price: '$90,000' },
  { id: 10, make: 'Ferrari', model: '488 GTB', year: 2018, price: '$250,000' },
];

const Inventory = () => {
  return (
    <div className="inventory">
      <h2>Our Inventory</h2>
      <div className="car-listings">
        {carsInventory.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car1} alt={`${car.make} ${car.model}`} />
            <div className="car-details">
              <h3>{car.year} {car.make} {car.model}</h3>
              <p>Price: {car.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
