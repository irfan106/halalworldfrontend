import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, Button, Chip, FormControl, InputLabel, Tooltip } from '@material-ui/core';
import GeneralHeader from '../helpers/GeneralHeader';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import defaultRestaurants from '../../assets/defaultRestaurant.json'; // Import default restaurant URLs

const GET_RESTAURANTS = gql`
  query GetRestaurants($country: String!, $prefectures: [String!], $limit: Int!, $offset: Int!) {
    restaurants(country: $country, prefectures: $prefectures, limit: $limit, offset: $offset) {
      _id
      name
      description
      prefecture
      location
      imgUrl
    }
  }
`;

const GET_ALL_PREFECTURES = gql`
  query GetAllPrefectures($country: String!) {
    allrestaurant(country: $country) {
      prefecture
    }
  }
`;

const Restaurant = () => {
  const { countryId } = useParams();
  const [offset, setOffset] = useState(0);
  const [selectedPrefectures, setSelectedPrefectures] = useState([]);
  const limit = 15;

  const { loading: loadingRestaurants, error: errorRestaurants, data: dataRestaurants } = useQuery(GET_RESTAURANTS, {
    variables: { country: countryId, prefectures: selectedPrefectures, limit, offset },
  });

  const { loading: loadingPrefectures, error: errorPrefectures, data: dataPrefectures } = useQuery(GET_ALL_PREFECTURES, {
    variables: { country: countryId },
  });

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePrevPage = () => {
    setOffset(Math.max(offset - limit, 0));
  };

  const handlePrefectureToggle = (prefecture) => {
    if (selectedPrefectures.includes(prefecture)) {
      setSelectedPrefectures(prevState => prevState.filter(item => item !== prefecture));
    } else {
      setSelectedPrefectures(prevState => [...prevState, prefecture]);
    }
    setOffset(0);
  };

  if (loadingRestaurants || loadingPrefectures) return <p>Loading...</p>;
  if (errorRestaurants || errorPrefectures) return <p>Error: {errorRestaurants ? errorRestaurants.message : errorPrefectures.message}</p>;

  const restaurants = dataRestaurants?.restaurants || [];
  const prefecturesData = dataPrefectures?.allrestaurant || [];
  const prefectures = [...new Set(prefecturesData.map(restaurant => restaurant.prefecture))];

  const hasMoreRestaurants = restaurants.length === limit;

  const getRandomRestaurantImage = () => {
    const randomIndex = Math.floor(Math.random() * defaultRestaurants.length);
    return defaultRestaurants[randomIndex];
  };

  return (
    <>
      <GeneralHeader heading="Explore Restaurants" subheading="Find delicious restaurants in your area" />
      <Container style={{ marginTop: '3%' }}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="prefecture-select-label" style={{ fontFamily: 'Poppins, sans-serif' }}>Select Prefectures</InputLabel>
              <div style={{ marginTop: '18%', fontFamily: 'Poppins, sans-serif' }}>
                {prefectures.map(prefecture => (
                  <Chip
                    key={prefecture}
                    label={prefecture}
                    clickable
                    color={selectedPrefectures.includes(prefecture) ? 'primary' : 'default'}
                    onClick={() => handlePrefectureToggle(prefecture)}
                    style={{
                      marginRight: '5px',
                      marginBottom: '5px',
                      fontFamily: 'Poppins, sans-serif',
                      backgroundColor: selectedPrefectures.includes(prefecture) ? '#70e000' : '#00171f',
                      color: selectedPrefectures.includes(prefecture) ? '#00171f' : 'white'
                    }}
                  />
                ))}
              </div>
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            {restaurants.length === 0 ? (
              <Typography variant="body1" style={{ fontFamily: 'Poppins, sans-serif' }}>No restaurants found for this country or prefecture</Typography>
            ) : (
              <>
                <Grid container spacing={3}>
                  {restaurants.map((restaurant) => (
                    <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
                      <Card style={{ height: '270px' }}>
                        <div style={{ position: 'relative', height: '68%' }}>
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '100%',
                              background: 'rgba(0, 0, 0, 0.5)',
                              color: 'white',
                              padding: '8px',
                              fontFamily: 'Poppins, sans-serif'
                            }}
                          >
                            {restaurant.name}
                          </div>
                          <div
                            style={{
                              height: '100%',
                              background: `url(${restaurant.imgUrl || getRandomRestaurantImage()})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          />
                        </div>
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {restaurant?.description?.length > 50 ? `${restaurant.description.substring(0, 50)}...` : restaurant.description}
                          </Typography>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {restaurant.prefecture} {'>'} {countryId}
                            </Typography>
                            <Tooltip
                              title={
                                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                                  <LocationOnIcon style={{ marginRight: '5px' }} />
                                  {restaurant.location || ''}
                                </div>
                              }
                              placement="top"
                            >
                              <LocationOnIcon fontSize="small" style={{ verticalAlign: 'middle' }} />
                            </Tooltip>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <Button variant="contained" onClick={handlePrevPage} disabled={offset === 0} style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: offset === 0 ? '#5c677d' : '#00171f', color: '#fff' }}>
                    Previous Page
                  </Button>
                  <Button variant="contained" onClick={handleNextPage} disabled={!hasMoreRestaurants} style={{ marginLeft: '10px', fontFamily: 'Poppins, sans-serif', backgroundColor: !hasMoreRestaurants ? '#5c677d' : '#00171f', color: '#fff' }}>
                    Next Page
                  </Button>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Restaurant;
