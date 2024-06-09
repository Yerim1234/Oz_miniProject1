// src/components/Search.jsx
import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';

const Search = ({ setMovies, fetchInitialMovies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      fetchInitialMovies();
      return;
    }

    const API_KEY = import.meta.env.VITE_TMDB_ACCESS_KEY;
    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${debouncedSearchTerm}`;

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(SEARCH_URL);
        setMovies(response.data.results);
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
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="영화 검색..."
      className="search-input"
    />
  );
};

export default Search;
