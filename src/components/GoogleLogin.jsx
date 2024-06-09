// src/components/GoogleLogin.jsx
import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import googleLogo from '../assets/google-logo.png'; // 구글 로고 이미지 추가

const GoogleLogin = ({ onSuccess }) => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google user:', user);
      onSuccess(user); // 로그인 성공 시 호출되는 콜백 함수
    } catch (error) {
      console.error('Error logging in with Google:', error);
      alert('Error logging in with Google: ' + error.message);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="google-login-button">
      <img src={googleLogo} alt="Google Logo" className="google-logo" />
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
