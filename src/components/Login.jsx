// src/components/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import './Login.css';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      navigate('/'); // 로그인 성공 시 홈 페이지로 이동
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in: ' + error.message);
    }
  };

  const handleGoogleLoginSuccess = (user) => {
    console.log('Google user logged in:', user);
    navigate('/'); // 구글 로그인 성공 시 홈 페이지로 이동
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">이메일 또는 아이디</label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">로그인</button>
      </form>
      <GoogleLogin onSuccess={handleGoogleLoginSuccess} />
    </div>
  );
};

export default Login;
