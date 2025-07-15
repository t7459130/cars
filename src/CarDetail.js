// src/CarDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const carData = [
  { id: 1, make: 'Tesla', model: 'Model S', year: 2021, price: '$80,000', description: 'The Tesla Model S is an all-electric luxury sedan with cutting-edge technology and performance.', img: './images/car1.jpg' },
  { id: 2, make: 'BMW', model: 'i8', year: 2020, price: '$120,000', description: 'The BMW i8 is a plug-in hybrid sports car combining futuristic design and efficiency.', img: './images/car2.jpg' },
  { id: 3, make: 'Audi', model: 'R8', year: 2019, price: '$150,000', description: 'The Audi R8 is a high-performance sports car with striking looks and powerful performance.', img: './images/car3.jpg' },
  // Add more car details here...
];

const CarDetail = () => {
  const { id } = useParams(); // Get car id from the URL
  const car = carData.find(car => car.id === parseInt(id)); // Find the car by id

  if (!car) {
    return <p>Car not found!</p>;
  }

  return (
    <div className="car-detail">
      <h1>{car.make} {car.model}</h1>
      <img src={car.img} alt={`${car.make} ${car.model}`} />
      <p>Year: {car.year}</p>
      <p>Price: {car.price}</p>
      <p>Description: {car.description}</p>
    </div>
  );
};

export default CarDetail;
