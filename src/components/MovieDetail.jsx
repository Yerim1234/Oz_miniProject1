// src/components/MovieDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import movieDetailData from '../../movieDetailData.json';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movieDetailData.id === parseInt(id, 10)) {
      setMovie(movieDetailData);
    } else {
      console.error('Movie not found for ID:', id);
    }
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail-container">
      <div className="backdrop">
        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
      </div>
      <div className="details">
        <div className="poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="info">
          <h1>{movie.title}</h1>
          <p className="tagline">{movie.tagline}</p>
          <p className="rating">평점: {movie.vote_average} ({movie.vote_count} votes)</p>
          <p className="genres">장르: {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
