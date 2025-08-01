import React, { useState } from 'react';

function CarForm({ onAddCar }) {
  const [carData, setCarData] = useState({
    make: '', model: '', variant: '', year: '', price: '',
    transmission: '', fuelType: '', mileage: '', bodyStyle: '',
    colour: '', engineSize: '', fuelEconomy: '', description: ''
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    const formData = new FormData();

    // Append text fields
    Object.entries(carData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append image files
    imageFiles.forEach((file, idx) => {
      formData.append('images', file); // append as array (Node will parse this as `images[]`)
    });

    onAddCar(formData);

    // Reset form
    setCarData({
      make: '', model: '', variant: '', year: '', price: '',
      transmission: '', fuelType: '', mileage: '', bodyStyle: '',
      colour: '', engineSize: '', fuelEconomy: '', description: ''
    });
    setImageFiles([]);
    setImagePreviews([]);
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
        <input name="engineSize" placeholder="Engine Size" value={carData.engineSize} onChange={handleChange} />
        <input name="fuelEconomy" placeholder="Fuel Economy" value={carData.fuelEconomy} onChange={handleChange} />
      </div>

      <div className="form-group">
        <textarea
          name="description"
          placeholder="Description"
          value={carData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div className="form-group">
        <label>Upload Images</label>
        <input type="file" accept="image/*" multiple onChange={handleFileInput} />
        <div className="image-previews">
          {imagePreviews.map((src, idx) => (
            <img key={idx} src={src} alt={`preview-${idx}`} className="preview-img" />
          ))}
        </div>
      </div>

      <button type="submit">Add Car to Inventory</button>
    </form>
  );
}

export default CarForm;
