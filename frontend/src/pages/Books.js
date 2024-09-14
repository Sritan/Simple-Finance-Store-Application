import React from 'react';
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Drone Dispatch System</h1>
      <div className="navigation-buttons">
        <button onClick={() => handleNavigate('/customer')}>Customers</button>
        <button onClick={() => handleNavigate('/product')}>Products</button>
        <button onClick={() => handleNavigate('/drone')}>Drones</button>
        <button onClick={() => handleNavigate('/pilot')}>Pilots</button>
        <button onClick={() => handleNavigate('/order')}>Orders</button>
        <button onClick={() => handleNavigate('/view')}>Views</button>
        <button onClick={() => handleNavigate('/employee')}>Employees</button>
      </div>
    </div>
  );
};

export default Books;
