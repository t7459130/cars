// CarForm.js
import React, { useState } from 'react';
import { upload } from '@vercel/blob';

function CarForm({ onAddCar }) {
  const [carData, setCarData] = useState({
    make: '', model: '', variant: '', year: '', price: '',
    transmission: '', fuelType: '', mileage: '', bodyStyle: '',
    colour: '', engineSize: '', fuelEconomy: '', images: [],
    description: '',
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = async (e) => {
    const files = e.target.files;
    setUploading(true);

    try {
      const uploadedUrls = [];
      for (let file of files) {
        // Upload each file to Vercel Blob
        const blob = await upload(file.name, file, { access: 'public' });
        uploadedUrls.push(blob.url);
      }
      setCarData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (error) {
      alert('Image upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
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
      colour: '', engineSize: '', fuelEconomy: '', images: [],
      description: '',
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      {/* your inputs here */}
      <input name="make" value={carData.make} onChange={handleChange} placeholder="Make" required />
      {/* ...other inputs */}
      <label>Upload Images</label>
      <input type="file" accept="image/*" multiple onChange={handleFileInput} disabled={uploading} />
      {uploading && <p>Uploading images...</p>}
      <div>
        {carData.images.map((url, idx) => (
          <img key={idx} src={url} alt={`Car image ${idx}`} style={{ width: 100, marginRight: 10 }} />
        ))}
      </div>

      <button type="submit" disabled={uploading}>Add Car</button>
    </form>
  );
}

export default CarForm;
