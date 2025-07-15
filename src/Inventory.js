// src/Inventory.js
import React from 'react';

// Car images for each car in the inventory
import car1_1 from './images/car1.jpg';
import car1_2 from './images/car1.jpg';
import car2_1 from './images/car1.jpg';
import car2_2 from './images/car1.jpg';
// You can continue to import all the images for different cars

const carsInventory = [
  { 
    id: 1, 
    make: 'Tesla', 
    model: 'Model S', 
    year: 2021, 
    price: '$80,000', 
    images: [car1_1, car1_2] // Multiple images for the car
  },
  { 
    id: 2, 
    make: 'BMW', 
    model: 'i8', 
    year: 2020, 
    price: '$120,000', 
    images: [car2_1, car2_2] // Multiple images for the car
  },
  { 
    id: 3, 
    make: 'Audi', 
    model: 'R8', 
    year: 2019, 
    price: '$150,000', 
    images: [car1_1, car1_2] // Example images
  },
  // Add more cars here with their respective images
];

const Inventory = () => {
  return (
    <div className="inventory">
      <h2>Our Inventory</h2>
      <div className="car-listings">
        {carsInventory.map((car) => (
          <div key={car.id} className="car-card">
            {/* Display multiple images for each car */}
            <div className="car-images">
              {car.images.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`${car.make} ${car.model} ${index + 1}`} 
                  className="car-image"
                />
              ))}
            </div>
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
