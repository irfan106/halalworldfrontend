import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Grid, Box } from '@material-ui/core';

const ENumberCheckSection = () => {
    return (
        <section style={{ backgroundColor: '#f0f0f0', padding: '40px 0' }}>
            <Container maxWidth="md">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                            <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: 'red', marginBottom: '20px' }}>
                                Check E-Numbers
                            </Typography>
                            <Typography variant="body1" gutterBottom style={{ fontFamily: 'Poppins, sans-serif' }}>
                                E-numbers are number codes for food additives. They are commonly found on food labels and are used to identify specific additives. 
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                            <Typography variant="body1" gutterBottom style={{ fontFamily: 'Poppins', marginBottom: '20px' }}>
                                Check the halal status of E-numbers.
                            </Typography>
                            <Button
                                component={Link}
                                to="/numbers"
                                variant="outlined"
                                color="secondary"
                                sx={{fontFamily: 'Poppins, sans-serif', '&:hover': { backgroundColor: '#ff3d00', color: '#fff' } }} 
                            >
                                Check E-Numbers
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default ENumberCheckSection;
