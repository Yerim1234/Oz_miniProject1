// src/components/NavBar.jsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import './NavBar.css';
import logoImage from '../assets/MovieLogo.png'; // 이미지 경로를 정확히 지정해주세요

const NavBar = () => {
  const history = useHistory();

  const handleSignupClick = () => {
    history.push('/signup');
  };

  const handleLoginClick = () => {
    history.push('/login');
  };

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={handleLogoClick}>
        <img src={logoImage} alt="MyMovieApp Logo" className="logo-icon" />
        <span className="logo-text">MyMovieApp</span>
      </div>
      <div className="auth-buttons">
        <button className="btn" onClick={handleSignupClick}>회원가입</button>
        <button className="btn" onClick={handleLoginClick}>로그인</button>
      </div>
    </nav>
  );
};

export default NavBar;