// src/components/GoogleLogin.jsx
import React, { useEffect } from 'react';
import useGoogleAuth from '../hooks/useGoogleAuth';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../assets/google-logo.png';

const GoogleLogin = () => {
  const { user, error, signInWithGoogle } = useGoogleAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/'); 
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <button className="google-login-button" onClick={handleLogin}>
      <img src={googleLogo} alt="Google Logo" className="google-logo" />
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
