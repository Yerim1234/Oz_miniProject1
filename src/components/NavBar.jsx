// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import logoImage from '../assets/MovieLogo.png';
import useDebounce from '../hooks/useDebounce';

const NavBar = ({ setMovies, fetchInitialMovies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      fetchInitialMovies();
      return;
    }

    const API_KEY = import.meta.env.VITE_TMDB_ACCESS_KEY;
    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${debouncedSearchTerm}`;

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(SEARCH_URL);
        const data = await response.json();
        setMovies(data.results);
        navigate('/');
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchTerm, fetchInitialMovies, setMovies]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={handleLogoClick}>
        <img src={logoImage} alt="MyMovieApp Logo" className="logo-icon" />
        <span className="logo-text">MyMovieApp</span>
      </div>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="영화 검색..."
          className="search-input"
        />
      </div>
      <div className="auth-buttons">
        <button className="btn" onClick={handleSignupClick}>회원가입</button>
        <button className="btn" onClick={handleLoginClick}>로그인</button>
      </div>
    </nav>
  );
};

export default NavBar;
