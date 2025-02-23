import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Carousel3D from './components/Carousel3D';
import PlayerPage from './components/PlayerPage';
import { players } from './data/players';
import LandingPage from './components/LandingPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-retro-dark text-retro-light">
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          />
          <Route
            path="/carousel"
            element={<Carousel3D items={players} />}
          />
          <Route
            path="/player/:id"
            element={<PlayerPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;