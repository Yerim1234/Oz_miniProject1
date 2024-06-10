// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import Signup from './components/Signup';
import Login from './components/Login';
import MyPage from './components/MyPage';
import './App.css';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_ACCESS_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

const App = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchInitialMovies();
  }, []);

  return (
    <>
      <NavBar fetchInitialMovies={fetchInitialMovies} setMovies={setMovies} />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            index
            element={
              <div className='container'>
                <ul className='movie-list'>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    movies.map((movie) => (
                      <li key={movie.id} onClick={() => navigate(`/detail/${movie.id}`)}>
                        <MovieCard movie={movie} />
                      </li>
                    ))
                  )}
                </ul>
              </div>
            }
          />
          <Route path='/detail/:id' element={<MovieDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/mypage' element={<MyPage />} />
        </Route>
      </Routes>
    </>
  );
};

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
