// AddCarPage.js
import React, { useState } from 'react';
import { useAdmin } from './AdminContext';
import CarForm from './CarForm';

const AddCarPage = () => {
  const { isAdmin, loginAsAdmin, logout } = useAdmin();
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginAsAdmin(passwordInput);
    if (!success) alert('Incorrect admin password');
    setPasswordInput('');
  };

  const handleAddCar = (carData) => {
    console.log('New car added:', carData);
    alert('Car added successfully (not saved yet — implement backend)');
    // Implement backend logic here
  };

  if (!isAdmin) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter admin password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="add-car-page">
      <button onClick={logout}>Logout</button>
      <h2>Add New Car to Inventory</h2>
      <CarForm onAddCar={handleAddCar} />
    </div>
  );
};

export default AddCarPage;
