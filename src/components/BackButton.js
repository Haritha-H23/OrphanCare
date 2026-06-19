import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="back-btn"
      onClick={() => navigate(-1)}
    >
      <ArrowBackIcon />
      Back
    </button>
  );
};

export default BackButton;