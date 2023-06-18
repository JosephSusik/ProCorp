import React from 'react';
import Homepage from './pages/Homepage';
import FlightProvider from './context/FlightContext';

import './colors.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FlightPage from './pages/FlightPage';
import TestPage from './pages/TestPage';

function App() {
  return (
      <FlightProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />}/>
            <Route path='/flight/:id' element={<FlightPage />}/>
            <Route path='/test' element={<TestPage />}/>
          </Routes>
        </BrowserRouter>
      </FlightProvider>
  );
}

export default App;
