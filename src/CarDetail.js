import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to get carId

// Import the car images and data
import car1 from './images/car1.jpg';
import car2 from './images/car2.jpg';
import car3 from './images/car3.jpg';

const carsForSale = [
  { id: 1, make: 'Tesla', model: 'Model S', year: 2021, price: '$80,000', img: car1, description: 'The Tesla Model S is an all-electric luxury sedan with cutting-edge technology and performance.' },
  { id: 2, make: 'BMW', model: 'i8', year: 2020, price: '$120,000', img: car2, description: 'The BMW i8 is a plug-in hybrid sports car combining futuristic design and efficiency.' },
  { id: 3, make: 'Audi', model: 'R8', year: 2019, price: '$150,000', img: car3, description: 'The Audi R8 is a high-performance sports car with striking looks and powerful performance.' },
];

const CarDetail = () => {
  const { carId } = useParams(); // Get carId from the URL
  const navigate = useNavigate(); // Optional: To navigate if car not found

  // Find the car data based on the carId
  const car = carsForSale.find((car) => car.id.toString() === carId);

  if (!car) {
    return (
      <div>
        <h2>Car Not Found</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="car-detail">
      <h1>{car.make} {car.model} ({car.year})</h1>
      <img src={car.img} alt={`${car.make} ${car.model}`} />
      <p>{car.description}</p>
      <p><strong>Price: {car.price}</strong></p>
    </div>
  );
};

export default CarDetail;
