import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import twitterLogo from '../assets/twitter-logo.png';
import './Login.css'; // custom CSS

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use VITE_API_URL environment variable instead of localhost
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API_URL}/api/auth/login`, formData, { withCredentials: true });

      // Save token in localStorage
      localStorage.setItem('token', res.data.token);

      // Check if user is admin
      const isAdmin = !!res.data?.user?.isAdmin;
      navigate(isAdmin ? '/admin' : '/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <img src={twitterLogo} alt="Twitter Logo" className="logo" />
        <h2>Login to Twitter</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <p className="switch">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
