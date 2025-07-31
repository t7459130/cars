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
    fuelType: '',
    mileage: '',
    bodyStyle: '',
    colour: '',
    engineSize: '',
    fuelEconomy: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiles = (files) => {
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setCarData((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
  };

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (carData.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    onAddCar(carData);
    setCarData({
      make: '', model: '', variant: '', year: '', price: '',
      transmission: '', fuelType: '', mileage: '', bodyStyle: '',
      colour: '', engineSize: '', fuelEconomy: '', images: []
    });
  };

  return (
    <form className="car-form" onSubmit={onFormSubmit}>
      <h3>Add New Car</h3>

      <div className="form-group">
        <input name="make" placeholder="Make" value={carData.make} onChange={handleChange} required />
        <input name="model" placeholder="Model" value={carData.model} onChange={handleChange} required />
        <input name="variant" placeholder="Variant" value={carData.variant} onChange={handleChange} />
      </div>

      <div className="form-group">
        <input name="year" type="number" placeholder="Year" value={carData.year} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={carData.price} onChange={handleChange} required />
        <select name="transmission" value={carData.transmission} onChange={handleChange} required>
          <option value="">Transmission</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>

      <div className="form-group">
        <select name="fuelType" value={carData.fuelType} onChange={handleChange}>
          <option value="">Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <input name="mileage" type="number" placeholder="Mileage" value={carData.mileage} onChange={handleChange} />
        <input name="bodyStyle" placeholder="Body Style" value={carData.bodyStyle} onChange={handleChange} />
        <input name="colour" placeholder="Colour" value={carData.colour} onChange={handleChange} />
      </div>

      <div className="form-group">
        <input name="engineSize" placeholder="Engine Size (e.g. 2.0L)" value={carData.engineSize} onChange={handleChange} />
        <input name="fuelEconomy" placeholder="Fuel Economy (mpg or L/100km)" value={carData.fuelEconomy} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Upload Images (multi-select allowed)</label>
        <input type="file" accept="image/*" multiple onChange={handleFileInput} />
        <div className="image-previews">
          {carData.images.map((src, idx) => (
            <img key={idx} src={src} alt={`preview-${idx}`} className="preview-img" />
          ))}
        </div>
      </div>

      <button type="submit">Add Car to Inventory</button>
    </form>
  );
}

export default CarForm;
