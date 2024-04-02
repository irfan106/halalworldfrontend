import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, Button, Chip, FormControl, InputLabel, Tooltip } from '@material-ui/core';
import GeneralHeader from '../helpers/GeneralHeader';
import { Phone as PhoneIcon, Public as PublicIcon } from '@material-ui/icons';
import defaultMosques from '../../assets/defaultMosque.json';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const GET_MOSQUES = gql`
  query GetMosques($country: String!, $prefectures: [String!], $limit: Int!, $offset: Int!) {
    mosques(country: $country, prefectures: $prefectures, limit: $limit, offset: $offset) {
      _id
      name
      location
      prefecture
      contact
      officialPageLink
    }
  }
`;

const GET_ALL_PREFECTURES = gql`
  query GetAllPrefectures($country: String!) {
    allMosques(country: $country) {
      prefecture
    }
  }
`;

const Mosque = () => {
  const { countryId } = useParams();
  const [offset, setOffset] = useState(0);
  const [selectedPrefectures, setSelectedPrefectures] = useState([]);
  const [showFullLocation, setShowFullLocation] = useState([]);
  const [mosqueImages, setMosqueImages] = useState({});
  const limit = 15;

  const { loading: loadingMosques, error: errorMosques, data: dataMosques } = useQuery(GET_MOSQUES, {
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

  useEffect(() => {
    if (dataMosques) {
      const newImages = {};
      dataMosques.mosques.forEach(mosque => {
        if (!mosqueImages[mosque._id]) {
          newImages[mosque._id] = getRandomMosqueImage();
        }
      });
      setMosqueImages(prevState => ({ ...prevState, ...newImages }));
    }
  }, [dataMosques, mosqueImages]);

  const getRandomMosqueImage = () => {
    const randomIndex = Math.floor(Math.random() * defaultMosques.length);
    return defaultMosques[randomIndex];
  };

  const toggleShowFullLocation = (index) => {
    setShowFullLocation(prevState => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  if (loadingMosques || loadingPrefectures) return <p>Loading...</p>;
  if (errorMosques || errorPrefectures) return <p>Error: {errorMosques ? errorMosques.message : errorPrefectures.message}</p>;

  const mosques = dataMosques?.mosques || [];
  const prefecturesData = dataPrefectures?.allMosques || [];
  const prefectures = [...new Set(prefecturesData.map(mosque => mosque.prefecture))];

  const hasMoreMosques = mosques.length === limit;

  return (
    <>
      <GeneralHeader heading="Explore Mosques" subheading="Find mosques in your area" />
      <Container style={{ marginTop: '3%' }}>
      <Typography variant="body1" style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '20px', textAlign:'center',backgroundColor:'#979dac',color:'#eff7f6' }}>Disclaimer: Please note that the images used below are for demonstration purposes only and do not represent the actual mosques.</Typography>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="prefecture-select-label" style={{ fontFamily: 'Poppins, sans-serif' }}>Select Prefectures</InputLabel>
              <div style={{ marginTop: '18%' }}>
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
            {mosques.length === 0 ? (
              <Typography variant="body1" style={{ fontFamily: 'Poppins, sans-serif' }}>No mosques found for this country or prefecture</Typography>
            ) : (
              <>
                <Grid container spacing={3}>
                  {mosques.map((mosque, index) => (
                    <Grid item xs={12} sm={6} md={4} key={mosque._id}>
                      <Card style={{ height: '100%' }}>
                        <div style={{ position: 'relative', height: '60%' }}>
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              width: '100%',
                              background: 'rgba(0, 0, 0, 0.5)',
                              color: 'white',
                              padding: '8px',
                            }}
                          >
                            {mosque.name}
                          </div>
                          <img
                            src={mosqueImages[mosque._id]}
                            alt={mosque.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        <CardContent>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <LocationOnIcon style={{ marginRight: '5px' }} />
                            <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {showFullLocation[index] || mosque.location.length <= 40 ? mosque.location : `${mosque.location.slice(0, 40)}...`}
                              {mosque.location.length > 40 && !showFullLocation[index] && (
                                <span style={{ fontWeight:'bold',color: '#00171f', cursor: 'pointer' }} onClick={() => toggleShowFullLocation(index)}> See more</span>
                              )}
                            </Typography>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {mosque.prefecture} {'>'} {countryId}
                            </Typography>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Tooltip
                                title={
                                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                                    <PhoneIcon style={{ marginRight: '5px' }} />
                                    {mosque.contact}
                                  </div>
                                }
                                placement="top"
                              >
                                <PhoneIcon style={{ marginRight: '5px', cursor: 'pointer' }} />
                              </Tooltip>
                              <a href={mosque.officialPageLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <PublicIcon style={{ cursor: 'pointer' }} />
                              </a>
                            </div>
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
                  <Button variant="contained" onClick={handleNextPage} disabled={!hasMoreMosques} style={{ marginLeft: '10px', fontFamily: 'Poppins, sans-serif', backgroundColor: !hasMoreMosques ? '#5c677d' : '#00171f', color: '#fff' }}>
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

export default Mosque;
