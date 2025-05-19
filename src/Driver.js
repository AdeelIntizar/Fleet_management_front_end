// Driver.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material'; 

const Driver = ({ selectedOption, setDriverData }) => {
  const [driverData, setDriverDataState] = useState({
    name: '',
    contact: '',
    license_number: ''
  });
  const [drivers, setDrivers] = useState([]);
  const [editingDriver, setEditingDriver] = useState(null);
  const [editField, setEditField] = useState('');
  const [newValue, setNewValue] = useState('');


  useEffect(() => {
    if (selectedOption === 'Edit Driver') {
      const fetchDrivers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/drivers'); 
          setDrivers(response.data);
        } catch (error) {
          console.error('Error fetching drivers:', error);
        }
      };
      fetchDrivers();
    }
  }, [selectedOption]);


  const handleChange = (e) => {
    setDriverDataState({
      ...driverData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddDriver = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:5000/api/driver', driverData);
      alert('Driver added successfully');
      setDriverDataState({ name: '', contact: '', license_number: '' }); // Clear the form after submission
    } catch (error) {
      console.error('Error adding driver:', error.response ? error.response.data : error.message);
      alert('Error adding driver');
    }
  };


  const handleSelectDriver = (driverId) => {
    const driver = drivers.find(d => d.id === driverId);
    setEditingDriver(driver);
    setNewValue(driver[editField]);
  };


  const handleEditDriver = async () => {
    if (!editField || !newValue) {
      alert('Please select a field to edit and provide a value');
      return;
    }

    try {
      const updatedDriver = { ...editingDriver, [editField]: newValue };
      await axios.put(`http://localhost:5000/api/driver/${editingDriver.id}`, updatedDriver);
      alert('Driver updated successfully');
      setEditingDriver(null); // Clear the editing form
      setNewValue('');
    } catch (error) {
      console.error('Error updating driver:', error);
      alert('Error updating driver');
    }
  };

  return (
    <div>
      {selectedOption === 'Add Driver' && (
        <div>
          <Typography variant="h6">Add Driver</Typography>
          <form onSubmit={handleAddDriver}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={driverData.name}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="Contact"
              variant="outlined"
              fullWidth
              name="contact"
              value={driverData.contact}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              label="License Number"
              variant="outlined"
              fullWidth
              name="license_number"
              value={driverData.license_number}
              onChange={handleChange}
              sx={{ marginBottom: '16px' }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              ADD
            </Button>
          </form>
        </div>
      )}

      {selectedOption === 'Edit Driver' && (
        <div>
          <Typography variant="h6">Edit Driver</Typography>
          <FormControl fullWidth sx={{ marginBottom: '16px' }}>
            <InputLabel id="edit-driver-select-label">Select Driver</InputLabel>
            <Select
              labelId="edit-driver-select-label"
              value={editingDriver ? editingDriver.id : ''}
              onChange={(e) => handleSelectDriver(e.target.value)}
            >
              {drivers.map((driver) => (
                <MenuItem key={driver.id} value={driver.id}>
                  {driver.name} - {driver.license_number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {editingDriver && (
            <div>
              <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                <InputLabel id="edit-field-select-label">Field to Edit</InputLabel>
                <Select
                  labelId="edit-field-select-label"
                  value={editField}
                  onChange={(e) => setEditField(e.target.value)}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="contact">Contact</MenuItem>
                  <MenuItem value="license_number">License Number</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="New Value"
                variant="outlined"
                fullWidth
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                sx={{ marginBottom: '16px' }}
              />

              <Button variant="contained" color="primary" onClick={handleEditDriver} fullWidth>
                UPDATE
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Driver;
