import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import DevNerdLogo from '../../assets/Logo-5.png';

const DesktopNavbar = () => {
  const [restaurantsAnchorEl, setRestaurantsAnchorEl] = React.useState(null);
  const [mosquesAnchorEl, setMosquesAnchorEl] = React.useState(null);

  const handleRestaurantsClick = (event) => {
    setRestaurantsAnchorEl(event.currentTarget);
  };

  const handleMosquesClick = (event) => {
    setMosquesAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setRestaurantsAnchorEl(null);
    setMosquesAnchorEl(null);
  };

  const buttonStyle = {
    textDecoration: 'none',
    position: 'relative',
    fontWeight: '600',
    fontFamily:'Poppins',
    marginRight:'10px',
    fontSize:'17px',
    color: 'black',
    '&:hover': {
      color: '#70e000',
      backgroundColor:'#ffffff',
      '&::after': {
        content: '""',
        position: 'absolute',
        left: '15%',
        bottom: 0,
        width: '70%',
        height: '2px',
        backgroundColor: '#70e000',
        animation: 'underline 0.3s forwards',
        animationTimingFunction: 'ease-out',
        marginTop: '2px',
      },
    },
  };
  
  const menuItemStyle = {
    fontWeight: '600',
    textAlign: 'center',
    justifyContent: 'center',
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: '#ffffff' }}>
      <style>
        {`
          @keyframes underline {
            from {
              width: 0;
              left: 50%;
            }
            to {
              width: 70%;
              left: 15%;
            }
          }
        `}
      </style>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">
            <img src={DevNerdLogo} alt="DevNerd Logo" style={{ height: '70px', marginRight: '20px', marginLeft:'20px' }} />
          </Link>
        </Typography>
        <Button component={Link} to="/" color="inherit" sx={buttonStyle}>
          Home
        </Button>
        <Button color="inherit" onClick={handleRestaurantsClick} sx={buttonStyle}>
          Restaurants
        </Button>
        <Menu
          id="restaurants-menu"
          anchorEl={restaurantsAnchorEl}
          keepMounted
          open={Boolean(restaurantsAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/restaurants/jp" onClick={handleMenuClose} sx={menuItemStyle}>Japan</MenuItem>
          <MenuItem component={Link} to="/restaurants/sk" onClick={handleMenuClose} sx={menuItemStyle}>South Korea</MenuItem>
          <MenuItem component={Link} to="/restaurants/cand" onClick={handleMenuClose} sx={menuItemStyle}>Canada</MenuItem>
        </Menu>
        <Button color="inherit" onClick={handleMosquesClick} sx={buttonStyle}>
          Mosques
        </Button>
        <Menu
          id="mosques-menu"
          anchorEl={mosquesAnchorEl}
          keepMounted
          open={Boolean(mosquesAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/mosques/jp" onClick={handleMenuClose} sx={menuItemStyle}>Japan</MenuItem>
          <MenuItem component={Link} to="/mosques/sk" onClick={handleMenuClose} sx={menuItemStyle}>South Korea</MenuItem>
          <MenuItem component={Link} to="/mosques/cand" onClick={handleMenuClose} sx={menuItemStyle}>Canada</MenuItem>
        </Menu>
        <Button component={Link} to="/numbers" color="inherit" sx={buttonStyle}>
          E-Number check
        </Button>
        <Button component={Link} to="/about" color="inherit" sx={buttonStyle}>
          About Us
        </Button>
        <Button component={Link} to="/contact" color="inherit" sx={buttonStyle}>
          Contact Us
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default DesktopNavbar;
