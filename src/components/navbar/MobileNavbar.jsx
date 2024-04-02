import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

const MobileNavbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [openRestaurants, setOpenRestaurants] = useState(false);
  const [openMosques, setOpenMosques] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const toggleRestaurants = () => {
    setOpenRestaurants(!openRestaurants);
  };

  const toggleMosques = () => {
    setOpenMosques(!openMosques);
  };

  const handleClose = () => {
    setDrawerOpen(false);
    setOpenRestaurants(false);
    setOpenMosques(false);
  };

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/', text: 'Restaurants', toggle: toggleRestaurants, open: openRestaurants, subLinks: [
      { to: '/restaurants/cand', text: 'Canada' },
      { to: '/restaurants/jp', text: 'Japan' },
      { to: '/restaurants/sk', text: 'South Korea' },
    ] },
    { to: '/', text: 'Mosques', toggle: toggleMosques, open: openMosques, subLinks: [
      { to: '/mosques/cand', text: 'Canada' },
      { to: '/mosques/jp', text: 'Japan' },
      { to: '/mosques/sk', text: 'South Korea' },
    ] },
    { to: '/numbers', text: 'Numbers' },
    { to: '/about', text: 'About' },
    { to: '/contact', text: 'Contact Us' },
  ];

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#141414', zIndex: 2 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, zIndex: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, zIndex: 2 }}>
            Company Name
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="top"
        open={isDrawerOpen}
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
        sx={{
          '& .MuiDrawer-paper': {
            height: 'auto',
            width: '100%',
            maxWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px',
            zIndex: 2,
          },
        }}
      >
        <List style={{ backgroundColor: '#161616', color: '#ffffff', width: '100%' }}>
          {navLinks.map((link) => (
            <React.Fragment key={link.text}>
              {link.subLinks ? (
                <React.Fragment>
                  <ListItem button onClick={link.toggle} sx={{ textAlign: 'center' }}>
                    <ListItemText primary={link.text} />
                    {link.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={link.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {link.subLinks.map((subLink) => (
                        <ListItem
                          key={subLink.to}
                          button
                          component={Link}
                          to={subLink.to}
                          onClick={handleClose}
                          sx={{ justifyContent: 'center', textAlign: 'center' }}
                        >
                          <ListItemText primary={subLink.text} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ) : (
                <ListItem
                  button
                  onClick={handleClose}
                  component={Link}
                  to={link.to}
                  sx={{ textAlign: 'center' }}
                >
                  <ListItemText primary={link.text} />
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default MobileNavbar;
