import React from 'react';
import Homepage from './pages/Homepage';
import FlightProvider from './context/FlightContext';

import './colors.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FlightPage from './pages/FlightPage';
import Navbar from './components/Navbar';

function App() {
  return (
      <FlightProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/flight/:id' element={<FlightPage />}/>
          </Routes>
        </BrowserRouter>
      </FlightProvider>
  );
}

export default App;
