import React, { useState } from 'react';
import { AppBar, Box, Button, CssBaseline, Drawer, Toolbar, Typography, List, ListItem, ListItemButton } from '@mui/material';
import Driver from './Driver'; // Import Driver component
import Vehicle from './Vehicle'; // Import Vehicle component

const App = () => {
  const [openDriverMenu, setOpenDriverMenu] = useState(false);
  const [openVehicleMenu, setOpenVehicleMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [driverData, setDriverData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);  // New state to toggle dashboard description visibility

  const handleDriverClick = () => {
    setOpenDriverMenu(!openDriverMenu); // Toggle the "Add" button for Driver
    setOpenVehicleMenu(false); // Close Vehicle menu when Driver is clicked
  };

  const handleVehicleClick = () => {
    setOpenVehicleMenu(!openVehicleMenu); // Toggle the "Add" button for Vehicle
    setOpenDriverMenu(false); // Close Driver menu when Vehicle is clicked
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleDashboardClick = () => {
    setShowDashboard(!showDashboard);  // Toggle the visibility of the dashboard description
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            paddingTop: '20px',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ paddingLeft: '16px' }}>
          <Typography variant="h6" component="div" sx={{ marginBottom: '20px' }} onClick={handleDashboardClick}>
            Dashboard
          </Typography>

          <List>
            {/* Driver Menu */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleDriverClick}>
                <Typography>Driver</Typography>
              </ListItemButton>
            </ListItem>
            {openDriverMenu && (
              <List sx={{ paddingLeft: '16px' }}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleOptionClick('Add Driver')} sx={{ fontSize: '14px' }}>
                    <Typography>Add</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleOptionClick('Edit Driver')} sx={{ fontSize: '14px' }}>
                    <Typography>Edit</Typography>
                  </ListItemButton>
                </ListItem>
              </List>
            )}

            {/* Vehicle Menu */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleVehicleClick}>
                <Typography>Vehicle</Typography>
              </ListItemButton>
            </ListItem>
            {openVehicleMenu && (
              <List sx={{ paddingLeft: '16px' }}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleOptionClick('Add Vehicle')} sx={{ fontSize: '14px' }}>
                    <Typography>Add</Typography>
                  </ListItemButton>
                </ListItem>
              </List>
            )}
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          padding: '16px',
        }}
      >
        {/* Top Bar */}
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Fleet Management System
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box sx={{ marginTop: '20px' }}>
          <Driver selectedOption={selectedOption} setDriverData={setDriverData} />
          <Vehicle selectedOption={selectedOption} setVehicleData={setVehicleData} />

          {/* Optionally show driver and vehicle data */}
          {driverData && (
            <div>
              <Typography variant="h6">Driver Data Submitted:</Typography>
              <pre>{JSON.stringify(driverData, null, 2)}</pre>
            </div>
          )}
          {vehicleData && (
            <div>
              <Typography variant="h6">Vehicle Data Submitted:</Typography>
              <pre>{JSON.stringify(vehicleData, null, 2)}</pre>
            </div>
          )}

          {/* Display Dashboard description */}
          {showDashboard && (
            <Box
              sx={{
                marginTop: '40px',
                padding: '20px',
                backgroundColor: 'lightgrey',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <Typography variant="h6">
                Welcome to the Fleet Management System. This app allows you to manage your drivers and vehicles efficiently.
                You can add, edit, and view driver and vehicle information with ease.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
