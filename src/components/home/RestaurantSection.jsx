import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import japanImage from '../../assets/japan.jpg';
import southKoreaImage from '../../assets/south-korea.jpg';
import canadaImage from '../../assets/canada.jpg';

const useStyles = makeStyles({
    card: {
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        '&:hover img': {
            transform: 'scale(1.1)',
        },
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease-out',
    },
    countryName: {
        position: 'absolute',
        bottom: '900%',
        left: '8%',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '2.3rem',
    },
});

const RestaurantSection = () => {
    const classes = useStyles();

    const countries = [
        { name: 'Japan', code: 'jp', image: japanImage },
        { name: 'South Korea', code: 'sk', image: southKoreaImage },
        { name: 'Canada', code: 'cand', image: canadaImage },
    ];

    return (
        <section>
            <Typography variant="h4" style={{ marginLeft: '10%', fontWeight: 'bold', fontFamily:'Poppins' }}>
                Find Halal Restaurants
            </Typography>
            <Typography variant="body1" gutterBottom style={{ marginLeft: '10%', fontWeight: 'bold', opacity:0.5 }}>
                You can find your authentic halal restaurant in the following countries
            </Typography>
            <Container maxWidth={false} style={{ width: '100%', padding: 0, overflow: 'hidden' }}>
                <Grid container spacing={0.5}>
                    {countries.map((country, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card className={classes.card} component={Link} to={`/restaurants/${country.code}`}>
                                <img
                                    src={country.image}
                                    alt={country.name}
                                    className={classes.image}
                                />
                                <span className={classes.countryName}>{country.name}</span>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </section>
    );
};

export default RestaurantSection;
