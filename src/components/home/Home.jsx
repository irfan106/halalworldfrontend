import React from 'react';
import Header from '../helpers/Header';
import RestaurantSection from './RestaurantSection';
import MosqueSection from './MosqueSection';
import ENumberCheckSection from './ENumberCheckSection';

const Home = () => {
  return (
    <>
      <section>
        <Header
          heading="Discover Halal World"
          subHeading="Your Gateway To Halal Dining And Prayer And Much More"
          subSubHeading="Find Halal Restaurants and Mosques Worldwide"
        />
      </section>
      <section style={{marginTop:'3%', marginBottom:'5%'}}>
        <RestaurantSection />
      </section>
      <section style={{marginTop:'3%', marginBottom:'5%'}}>
        <MosqueSection />
      </section>
      <section style={{marginTop:'3%', marginBottom:'5%'}}>
        <ENumberCheckSection />
      </section>
    </>
  );
};

export default Home;
