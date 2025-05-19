// Vehicle.js
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const Vehicle = ({ selectedOption, setVehicleData }) => {
  // State for Add Vehicle form
  const [vehicleData, setLocalVehicleData] = useState({
    model: '',
    plate: '',
    type: ''
  });

  const handleVehicleFormChange = (e) => {
    const { name, value } = e.target;
    setLocalVehicleData({ ...vehicleData, [name]: value });
  };

  const handleAddVehicle = () => {
    // Set data to parent component
    setVehicleData(vehicleData);
    console.log('Vehicle Data:', vehicleData);
    setLocalVehicleData({ model: '', plate: '', type: '' });
  };

  return (
    <div>
      {selectedOption === 'Add Vehicle' && (
        <div>
          <Typography variant="h6">Add Vehicle</Typography>

          {/* Add Vehicle Form */}
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Model"
              variant="outlined"
              fullWidth
              name="model"
              value={vehicleData.model}
              onChange={handleVehicleFormChange}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="License Plate"
              variant="outlined"
              fullWidth
              name="plate"
              value={vehicleData.plate}
              onChange={handleVehicleFormChange}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Type"
              variant="outlined"
              fullWidth
              name="type"
              value={vehicleData.type}
              onChange={handleVehicleFormChange}
              sx={{ marginBottom: '16px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddVehicle}
              fullWidth
            >
              ADD
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Vehicle;
