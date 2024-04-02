import React from 'react';
import { TextField, IconButton, Box, Grid, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const EnumberHeader = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <Box
      sx={{
        position: 'static',
        height: '450px',
        backgroundColor: '#00171f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 0',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" style={{ color: '#fff', marginBottom: '10px',fontFamily: 'Poppins, sans-serif' }}>Enumber Halal Check</Typography>
            <Typography variant="subtitle1" style={{ color: '#fff', marginBottom: '20px',fontFamily: 'Poppins, sans-serif' }}>Enter the Enumber you want to check</Typography>
            <TextField
              placeholder="Enter Enumber..."
              onChange={handleSearchChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton size="small" style={{ color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
                    <SearchIcon />
                  </IconButton>
                ),
                style: { color: '#fff', border: '1px solid #fff', borderRadius: '4px', padding:'10px', fontFamily: 'Poppins, sans-serif' },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnumberHeader;
