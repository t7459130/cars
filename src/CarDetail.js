// CarDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

function CarDetail({ cars }) {
  const { carId } = useParams();
  const car = cars?.find((c) => String(c.id) === carId);

  if (!car) return <p>Car not found</p>;

  return (
    <div className="car-detail">
      <h2>{car.year} {car.make} {car.model}</h2>
      <div className="car-images">
        {car.images?.map((img, idx) => (
          <img key={idx} src={img} alt={`Car ${idx}`} />
        ))}
      </div>
      <p><strong>Variant:</strong> {car.variant}</p>
      <p><strong>Price:</strong> £{car.price}</p>
      <p><strong>Transmission:</strong> {car.transmission}</p>
      <p><strong>Fuel Type:</strong> {car.fuelType}</p>
      <p><strong>Mileage:</strong> {car.mileage}</p>
      <p><strong>Body Style:</strong> {car.bodyStyle}</p>
      <p><strong>Colour:</strong> {car.colour}</p>
      <p><strong>Engine Size:</strong> {car.engineSize}</p>
      <p><strong>Fuel Economy:</strong> {car.fuelEconomy}</p>
      <p><strong>Description:</strong> {car.description}</p>
    </div>
  );
}

export default CarDetail;
