import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Grid, Card, CardContent, Typography, Tooltip, IconButton, Button } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import EnumberHeader from '../helpers/EnumberHeader';

const GET_ENUMBERS = gql`
  query GetENumbers {
    enumbers {
      _id
      Number
      Name
      HalalStatusFirst
      HalalStatusSecond
      Tag
      Type
    }
  }
`;

const Enumber = () => {
  const { loading, error, data } = useQuery(GET_ENUMBERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCount, setShowCount] = useState(15);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const enumbers = data.enumbers || [];

  const getBackgroundColor = (tag) => {
    switch (tag) {
      case 'Halal':
        return '#40916c';
      case 'Haram':
        return '#d62839';
      case 'Doubtful':
        return '#ffef9f';
      default:
        return 'white';
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredEnumbers = enumbers.filter(enumber =>
    enumber.Number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setShowCount(prevCount => prevCount + 15);
  };

  return (
    <>
      <EnumberHeader onSearch={handleSearch} />
      <Container style={{ marginTop: '10%' }}>
        {filteredEnumbers.length === 0 ? (
          <Typography variant="body1" style={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>No numbers found</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredEnumbers.slice(0, showCount).map(enumber => (
              <Grid item xs={12} sm={6} md={4} key={enumber._id}>
                <Card style={{ height: '100%', backgroundColor: getBackgroundColor(enumber.Tag) }} >
                  <CardContent>
                    <Typography variant="h5" style={{ fontFamily: 'Poppins, sans-serif' }}>{enumber.Number} - {enumber.Tag}</Typography>
                    <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '5px', fontFamily: 'Poppins, sans-serif' }}>{enumber.Name}</Typography>
                    <Typography variant="body1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <strong>Type:</strong> {enumber.Type}
                      <Tooltip title={
                        <>
                          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                            <CheckCircleOutlineIcon style={{ marginRight: '5px' }} />
                            {enumber.HalalStatusFirst}
                          </div>
                          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                            <CheckCircleOutlineIcon style={{ marginRight: '5px' }} />
                            {enumber.HalalStatusSecond}
                          </div>
                        </>
                      } placement="top">
                        <IconButton size="small">
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {filteredEnumbers.length > showCount && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="contained" style={{ fontFamily: 'Poppins, sans-serif', color: '#fff', backgroundColor: '#003566' }} onClick={handleLoadMore}>Load More...</Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Enumber;
