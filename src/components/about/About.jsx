import React from 'react';
import { Typography, Container, Grid, Divider } from '@material-ui/core';

const About = () => {
  return (
    <Container style={{ marginTop: '100px', marginBottom: '50px', fontFamily: 'Poppins, sans-serif' }}>
      <Typography variant="h2" gutterBottom>Welcome to Halal World</Typography>
      <Typography variant="body1" paragraph>
        Halal World is your ultimate guide for Muslim travelers seeking halal restaurants, mosques, and halal-certified products around the world. Whether you're exploring India, South Korea, Japan, or any other country, we're here to help you find halal options wherever your travels take you.
      </Typography>

      <Divider style={{ marginBottom: '20px' }} />

      <Typography variant="h4" gutterBottom>Our Mission</Typography>
      <Typography variant="body1" paragraph>
        At Halal World, our mission is to make halal travel accessible and enjoyable for Muslims everywhere. We believe that everyone should be able to explore the world without compromising their religious beliefs or dietary restrictions.
      </Typography>

      <Divider style={{ marginBottom: '20px' }} />

      <Typography variant="h4" gutterBottom>What We Offer</Typography>
      <Typography variant="body1" paragraph>
        Halal World offers a comprehensive database of halal restaurants and mosques in various countries. Our platform provides detailed information about each establishment, including location, menu options, prayer facilities, and user reviews.
      </Typography>
      <Typography variant="body1" paragraph>
        In addition to restaurant and mosque listings, we also offer an E Number checker tool. This tool allows users to verify if a food product is halal by checking its E number against our database of halal-certified ingredients.
      </Typography>

      <Divider style={{ marginBottom: '20px' }} />

      <Typography variant="h4" gutterBottom>Our Vision</Typography>
      <Typography variant="body1" paragraph>
        Our vision is to become the go-to resource for Muslim travelers worldwide, empowering them to explore new destinations with confidence and peace of mind. We strive to continuously expand our database and improve our platform to better serve the needs of our users.
      </Typography>

      <Divider style={{ marginBottom: '20px' }} />

      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <Typography variant="body1" paragraph>
        Have questions or feedback? We'd love to hear from you! Contact our team at <a href="mailto:info@halalworld.com">world.halal123@gmail.com</a> or connect with us on social media:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">Twitter: @HalalW71074</Typography>
        </Grid>
        {/* <Grid item xs={12} sm={4}>
          <Typography variant="body1">Facebook: /HalalWorld</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1">Instagram: @HalalWorld</Typography>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default About;
