import React from 'react';
import { Typography, Box } from '@mui/material';
import backgroundImage from '../../assets/hero-img.jpg';

const Header = ({ heading, subHeading, subSubHeading, sx1, headerstyle }) => {
  const containerStyles = headerstyle
    ? headerstyle
    : {
        position: 'relative',
        height: '500px',
        overflow: 'hidden',
      };

  return (
    <>
      <Box
        sx={{
          ...containerStyles,
        }}
      >
        <Box
          component="div"
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            filter: 'blur(3px)',
            borderBottom: '10px solid',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <Typography variant="h1" sx={{fontFamily: 'Poppins, sans-serif', fontWeight:'bold'}}>
            {heading}
          </Typography>
          <Typography variant="h4" sx={{color: '#fff', fontFamily: 'Poppins, sans-serif',fontWeight:'bold'}}>{subHeading}</Typography>
          <Typography variant="h5" sx={{color: '#fff', fontFamily: 'Poppins, sans-serif',fontWeight:'bold'}}>{subSubHeading}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Header;
