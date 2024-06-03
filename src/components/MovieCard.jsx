// src/components/MovieCard.jsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import movieListData from '../../movieListData.json';
import './MovieCard.css';

const MovieCard = () => {
  const history = useHistory();

  const handleCardClick = (movie) => {
    history.push(`/details/${movie.id}`);
  };

  return (
    <div className="movie-list">
      {movieListData.results.map((movie) => (
        <div key={movie.id} className="movie-card" onClick={() => handleCardClick(movie)}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <p>평점: {movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
