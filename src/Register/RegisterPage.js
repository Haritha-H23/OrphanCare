import React, { useState } from 'react';
import './Register.css';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (
      !fullName ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      await api.post('/auth/register', {
        fullName,
        phone,
        email,
        password
      });

      setSuccess('Registration successful! Redirecting to login...');

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed. Try again.'
      );
    }
  };

  return (
    <div className="register-wrapper">
      <motion.div
        className="register-box"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="register-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="register-badge">Join Orphan Care Platform</span>

          <h1>Create Your Account</h1>

          <p>
            Become part of a compassionate community helping children with
            education, nutrition, healthcare, and brighter opportunities.
          </p>

          <motion.img
            src="https://previews.123rf.com/images/edgecreative01/edgecreative012407/edgecreative01240700031/231256296-people-donate-concept-men-and-woman-with-cardboard-boxes-send-clothes-and-toys-to-orphanage.jpg"
            alt="register"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        <motion.div
          className="register-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="register-icon-circle">
            <LockOpenIcon style={{ fontSize: 28 }} />
          </div>

          <h2>Create Account</h2>
          <p className="register-subtext">Start your journey with us</p>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <div className="register-input-container">
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <label>Phone Number</label>
            <div className="register-input-container">
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <label>Email Address</label>
            <div className="register-input-container">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <EmailIcon className="register-input-icon" />
            </div>

            <label>Password</label>
            <div className="register-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="register-input-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>

            <label>Confirm Password</label>
            <div className="register-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <span
                className="register-input-icon"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword
                  ? <VisibilityIcon />
                  : <VisibilityOffIcon />}
              </span>
            </div>

            {error && <p className="register-error">{error}</p>}
            {success && (
              <p
                style={{
                  color: '#7dffb1',
                  fontSize: '13px',
                  marginBottom: '12px'
                }}
              >
                {success}
              </p>
            )}

            <Button
              type="submit"
              variant="contained"
              className="register-btn"
            >
              Create Account
            </Button>
          </form>

          <p className="login-link">
            Already have an account?
            <span onClick={() => navigate('/')}> Sign In</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;