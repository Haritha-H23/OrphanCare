import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getRole } from '../utils/auth';

const DonorRoute = ({ children }) => {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role !== 'DONOR' && role !== 'ROLE_DONOR') {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

export default DonorRoute;