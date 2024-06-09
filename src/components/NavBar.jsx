// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './NavBar.css';
import logoImage from '../assets/MovieLogo.png';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => navigate('/')}>
        <img src={logoImage} alt="MyMovieApp Logo" className="logo-icon" />
        <span className="logo-text">MyMovieApp</span>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="영화 검색..."
          className="search-input"
        />
      </div>
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
                <button onClick={handleLogout}>로그아웃</button>
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
