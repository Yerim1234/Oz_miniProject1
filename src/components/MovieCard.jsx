// src/components/MovieCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="movie-card" onClick={() => handleCardClick(movie.id)}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>평점: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
