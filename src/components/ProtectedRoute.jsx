import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Check if the "key" exists in your browser's pocket
  const token = localStorage.getItem('token');

  // 2. If no key, redirect to Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. If key exists, let them pass (render the child route)
  return <Outlet />;
};

export default ProtectedRoute;