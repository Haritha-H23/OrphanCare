import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getRole } from '../utils/auth';

const AdminRoute = ({ children }) => {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role !== 'ADMIN' && role !== 'ROLE_ADMIN') {
  return <Navigate to="/home" replace />;
}

  return children;
};

export default AdminRoute;