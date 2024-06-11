import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const LogoutButton = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/'); 
    } catch (error) {
      console.error('로그아웃 에러:', error);
    }
  };

  return (
    <button onClick={handleLogout}>로그아웃</button>
  );
};

export default LogoutButton;