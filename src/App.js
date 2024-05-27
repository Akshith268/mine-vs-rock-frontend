import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch ,Routes} from 'react-router-dom';
import Predict from './pages/predict';
import Home from './pages/home';
import Crop from './pages/crop';
function App() {
  return (
    <div className="App">
          <Router>
           <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/predict" element={<Predict />} />
              <Route path="/crop_predict" element={<Crop />} />
           </Routes>
          </Router>
    </div>
  );
}

export default App;
