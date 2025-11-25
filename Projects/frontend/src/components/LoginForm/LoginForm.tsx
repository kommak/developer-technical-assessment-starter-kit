/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./LoginForm.css";
import { login as loginAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/authSlice';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginAPI(email, password); // API call
      const token = res.data.access_token;

      // Save token in cookie for 7 days
      Cookies.set('token', token, { expires: 7 });

      // Update Redux state
      dispatch(setToken(token));

      alert('Login successful!');
      navigate('/'); 
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Welcome back</h2>
        <p className="subtitle">Login to find your dream home</p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button type="submit" className="register-btn">
            Login
          </button>
        </form>

        <p className="login-text">
         Don't have an account?{" "}
          <a href="/register" className="login-link">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
