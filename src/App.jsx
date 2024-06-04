// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';
import axios from './api/axios';

const API_KEY = import.meta.env.VITE_TMDB_ACCESS_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Router>
      <div className="app">
        <NavBar />
        <Switch>
          <Route path="/details/:id" component={MovieDetail} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/">
            <div className='container'>
              {loading ? (
                <p>Loading...</p>
              ) : (
                movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              )}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;