import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AnimeDescriptionPage.css';

function AnimeDescriptionPage({ animeData, onBack }) {
  const { title } = useParams();
  const navigate = useNavigate();

  const anime = animeData.find(a => a.title === title);

  if (!anime) {
    return <div>Anime not found</div>;
  }

  const handleBackClick = () => {
    onBack();
    navigate('/');
  };

  return (
    <div className="anime-description-page">
      <img src={anime.coverURL} alt={anime.title} className="anime-detail-image" />
      <div className="anime-details">
        <h1>{anime.title}</h1>
        <p><strong>Rating:</strong> {anime.averageRating}</p>
        <p><strong>Genre:</strong> {anime.type}</p>
        <p>{anime.plot}</p>
        <button className="back-button" onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
}

export default AnimeDescriptionPage;
