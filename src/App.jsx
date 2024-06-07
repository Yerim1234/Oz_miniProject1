// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_ACCESS_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialMovies();
  }, []);

  const fetchInitialMovies = async () => {
    try {
      const response = await axios.get(API_URL);
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
      <div className="app">
        <NavBar setMovies={setMovies} fetchInitialMovies={fetchInitialMovies} />
        <div className="content">
          <Routes>
            <Route path="/details/:id" element={<MovieDetail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <div className='movie-list'>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))
                )}
              </div>
            } />
          </Routes>
        </div>
      </div>
  );
};

export default App;
