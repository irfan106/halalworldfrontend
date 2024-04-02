import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Enumber from './components/eNumber/Enumber';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Restaurant from './components/restaurant/Restaurant';
import Mosque from './components/mosque/Mosque';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:countryId" element={<Restaurant />} />
        <Route path="/mosques/:countryId" element={<Mosque />} />
        <Route path="/numbers" element={<Enumber />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
