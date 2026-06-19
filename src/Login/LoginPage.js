import React, { useState } from 'react';
import './LoginPage.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  setError('');

  if (!email || !password) {
    setError('Please fill in all fields.');
    return;
  }

  try {
    setLoading(true);

    const response = await api.post('/auth/login', {
      email,
      password
    });

    const token = response.data.token;
    const role = response.data.role;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);

    if (role === 'ADMIN') {
      navigate('/admin-dashboard');
    } else {
      navigate('/home');
    }

  } catch (err) {
    setError(
      err.response?.data?.message ||
      'Invalid email or password'
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-wrapper">
      <motion.div
        className="login-box"
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="login-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <span className="badge">Orphan Care Platform</span>

          <h1>Give Hope. Build Futures.</h1>

          <p>
            Every contribution matters. Support children with education,
            healthcare, nutrition, and opportunities for a brighter tomorrow.
          </p>

          <Button
            variant="contained"
            className="signup-btn"
            onClick={() => navigate('/register')}
          >
            Create Account
          </Button>

          <motion.img
            src="https://previews.123rf.com/images/edgecreative01/edgecreative012407/edgecreative01240700031/231256296-people-donate-concept-men-and-woman-with-cardboard-boxes-send-clothes-and-toys-to-orphanage.jpg"
            alt="Orphan care"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        <motion.div
          className="login-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <div className="icon-circle">
            <LockOpenIcon style={{ fontSize: 28 }} />
          </div>

          <h2>Welcome Back</h2>
          <p className="sub-text">Sign in to continue your journey</p>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>

            <div className="input-container">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <EmailIcon className="input-icon" />
            </div>

            <label>Password</label>

            <div className="input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>


            {error && <p className="error">{error}</p>}

            <Button
              type="submit"
              variant="contained"
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In →'}
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;