import React from 'react';
import { Link } from 'react-router-dom';
import './AnimeCard.css';

function AnimeCard({ anime, onClick }) {
  return (
    <Link to={`/anime/${anime.title}`} className="anime-card-link" onClick={onClick}>
      <div className="anime-card">
        <img src={anime.coverURL} alt={anime.title} className="anime-image" />
        <div className="anime-info">
          <h2 className="anime-name">{anime.title}</h2>
          <p className="anime-genre">{anime.type}</p>
        </div>
      </div>
    </Link>
  );
}

export default AnimeCard;
