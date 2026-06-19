import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import './LogoutButton.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      <LogoutIcon />
      Logout
    </button>
  );
};

export default LogoutButton;