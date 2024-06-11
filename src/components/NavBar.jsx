// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import './NavBar.css';
import logoImage from '../assets/MovieLogo.png';
import LogoutButton from './LogoutButton';
import Search from './Search';

const NavBar = ({ fetchInitialMovies, setMovies }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => navigate('/')}>
        <img src={logoImage} alt="MyMovieApp Logo" className="logo-icon" />
        <span className="logo-text">MyMovieApp</span>
      </div>
      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <div className="search-container">
          <Search setMovies={setMovies} fetchInitialMovies={fetchInitialMovies} />
        </div>
      )}
      <div className="auth-buttons">
        {initializing ? (
          <div className="loading">Loading...</div>
        ) : user ? (
          <>
            <img
              src={user.photoURL || 'https://via.placeholder.com/150'}
              alt="User Thumbnail"
              className="user-thumbnail"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="dropdown-menu">
                <button onClick={() => navigate('/mypage')}>마이 페이지</button>
                <LogoutButton setUser={setUser} />
              </div>
            )}
          </>
        ) : (
          <>
            <button className="btn" onClick={() => navigate('/signup')}>회원가입</button>
            <button className="btn" onClick={() => navigate('/login')}>로그인</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
