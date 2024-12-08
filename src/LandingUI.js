import React, { useEffect, useState } from 'react';
import './LandingUI.css';
import AnimeCard from './Components/AnimeCard';

function LandingPage({ onAnimeSelect }) {
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

  console.log(animeData);

  return (
    <div className="landing-page">
      <div className="hero-image">
        <h1 className="site-title">AnimeDB</h1>
      </div>
      <div className="anime-list">
        {animeData.map(anime => (
          <AnimeCard key={anime.animeID} anime={anime} onClick={() => onAnimeSelect(anime)} />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
