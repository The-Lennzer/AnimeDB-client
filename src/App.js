import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingUI';
import AnimeDescriptionPage from './Components/AnimeDescriptionPage';
import QueryExecuter from './QueryExecuter';

function App() {
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/anime');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setAnimeData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAnimeSelect = (anime) => {
    setSelectedAnime(anime);
  };

  const handleBackToLanding = () => {
    setSelectedAnime(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage animeData={animeData} onAnimeSelect={handleAnimeSelect} />} />
        <Route path="/query-page" element={<QueryExecuter />} />
        <Route path="/anime/:title" element={<AnimeDescriptionPage animeData={animeData} onBack={handleBackToLanding} />} />
      </Routes>
    </Router>
  );
}

export default App;
