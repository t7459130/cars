// CarForm.js
import React, { useState } from 'react';

function CarForm({ onAddCar }) {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    variant: '',
    year: '',
    price: '',
    transmission: '',
    filters: [],
    image: null,
  });

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setCarData({ ...carData, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCar(carData);
    setCarData({
      make: '',
      model: '',
      variant: '',
      year: '',
      price: '',
      transmission: '',
      filters: [],
      image: null,
    });
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <input name="make" placeholder="Make" value={carData.make} onChange={handleChange} required />
      <input name="model" placeholder="Model" value={carData.model} onChange={handleChange} required />
      <input name="variant" placeholder="Variant" value={carData.variant} onChange={handleChange} />
      <input name="year" type="number" placeholder="Year" value={carData.year} onChange={handleChange} required />
      <input name="price" placeholder="Price" value={carData.price} onChange={handleChange} required />
      <input name="transmission" placeholder="Transmission" value={carData.transmission} onChange={handleChange} required />

      <input type="file" accept="image/*" onChange={handleImageUpload} required />
      <button type="submit">Add Car</button>
    </form>
  );
}

export default CarForm;
